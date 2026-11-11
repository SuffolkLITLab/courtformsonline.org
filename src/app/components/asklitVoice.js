/* Shared browser voice controller. Audio is captured only after an explicit Start action. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.AskLitVoice = factory();
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  function createVoiceController(options) {
    const env = options.env || window;
    let epoch = 0,
      active = false,
      stage = '',
      config = {},
      recognition = null;
    let stream = null,
      context = null,
      player = null,
      audioUrl = null;
    let listenTimer = null,
      playbackTimer = null,
      sessionTimer = null,
      turns = 0;
    let finishRecording = null;
    function state(next) {
      stage = next;
      options.onState?.({ active, stage });
    }
    function releaseCapture() {
      clearTimeout(listenTimer);
      const old = recognition;
      recognition = null;
      if (old) {
        old.onend = old.onresult = old.onerror = old.onspeechend = null;
        try {
          old.abort();
        } catch {}
      }
      stream?.getTracks().forEach((track) => track.stop());
      stream = null;
      if (context) void context.close().catch(() => {});
      context = null;
      finishRecording = null;
    }
    function releasePlayback() {
      clearTimeout(playbackTimer);
      env.speechSynthesis?.cancel();
      if (player) {
        player.onended = player.onerror = null;
        player.pause();
        player.src = '';
        player = null;
      }
      if (audioUrl) env.URL.revokeObjectURL(audioUrl);
      audioUrl = null;
    }
    function stop() {
      ++epoch;
      active = false;
      clearTimeout(sessionTimer);
      releaseCapture();
      releasePlayback();
      state('');
    }
    function fail(message) {
      stop();
      options.onError?.(message instanceof Error ? message.message : message);
    }
    async function check(version) {
      const policy =
        config.mode === 'service' ? await options.getPolicy() : { paid: false };
      if (version !== epoch || !active) return false;
      if (config.mode === 'service' && !policy.paid)
        throw new Error(
          'Paid voice is unavailable for this organization. Select Browser.'
        );
      return true;
    }
    async function received(text, version) {
      if (version !== epoch || !active) return;
      releaseCapture();
      text = text.trim();
      if (!text) return fail('No speech was detected. Try again.');
      if (text.length > 8000)
        return fail('That message is too long. Use a shorter recording.');
      if (config.loop && ++turns > 12)
        return fail('Start a new conversation to continue using voice.');
      state(config.loop ? 'Thinking…' : 'Review the text, then send.');
      try {
        await options.onTranscript(text, !!config.loop);
      } catch (e) {
        if (version === epoch) fail(e);
      }
    }
    function browserListen(version) {
      const Recognition = env.SpeechRecognition || env.webkitSpeechRecognition;
      if (!Recognition)
        throw new Error(
          'This browser does not support speech recognition. You can still type or read replies aloud.'
        );
      const rec = new Recognition();
      recognition = rec;
      rec.lang = config.lang || env.navigator.language || 'en-US';
      rec.continuous = false;
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      const results = new Map();
      let ended = false;
      rec.onresult = (event) => {
        if (version !== epoch || !active || ended) return;
        for (let i = event.resultIndex; i < event.results.length; i++)
          if (event.results[i].isFinal)
            results.set(i, event.results[i][0].transcript);
      };
      rec.onspeechend = () => {
        if (version === epoch)
          try {
            rec.stop();
          } catch {}
      };
      rec.onerror = (event) => {
        if (version !== epoch || !active || ended) return;
        const messages = {
          'not-allowed':
            'Microphone permission was denied. Enable it in your browser to use voice.',
          'audio-capture': 'No microphone is available.',
          network:
            'Browser speech recognition could not connect. Try again or type your message.',
          'no-speech': 'No speech was detected. Try again.',
        };
        fail(messages[event.error] || 'Speech recognition stopped. Try again.');
      };
      rec.onend = () => {
        if (version !== epoch || !active || ended) return;
        ended = true;
        recognition = null;
        void received([...results.values()].join(' '), version);
      };
      rec.start();
      state('Listening…');
      listenTimer = setTimeout(() => {
        if (version === epoch)
          fail('Listening timed out. Start voice again when you are ready.');
      }, 45000);
    }
    function wav(chunks, rate) {
      const length = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
      const samples = new Float32Array(length);
      let at = 0;
      for (const chunk of chunks) {
        samples.set(chunk, at);
        at += chunk.length;
      }
      const frames = Math.min(480000, Math.floor((length * 16000) / rate));
      const buffer = new ArrayBuffer(44 + frames * 2),
        view = new DataView(buffer);
      const write = (offset, text) =>
        [...text].forEach((c, i) => view.setUint8(offset + i, c.charCodeAt(0)));
      write(0, 'RIFF');
      view.setUint32(4, 36 + frames * 2, true);
      write(8, 'WAVE');
      write(12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, 1, true);
      view.setUint32(24, 16000, true);
      view.setUint32(28, 32000, true);
      view.setUint16(32, 2, true);
      view.setUint16(34, 16, true);
      write(36, 'data');
      view.setUint32(40, frames * 2, true);
      for (let i = 0; i < frames; i++) {
        const sample = Math.max(
          -1,
          Math.min(1, samples[Math.floor((i * rate) / 16000)] || 0)
        );
        view.setInt16(44 + i * 2, sample * (sample < 0 ? 32768 : 32767), true);
      }
      return new Blob([buffer], { type: 'audio/wav' });
    }
    async function serviceListen(version) {
      const AudioContext = env.AudioContext || env.webkitAudioContext;
      if (
        !AudioContext ||
        !env.AudioWorkletNode ||
        !env.navigator.mediaDevices?.getUserMedia
      )
        throw new Error(
          'This browser cannot record service audio. Try Browser voice or type your message.'
        );
      const media = await env.navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      if (version !== epoch || !active) {
        media.getTracks().forEach((t) => t.stop());
        return;
      }
      stream = media;
      const ctx = new AudioContext();
      context = ctx;
      await ctx.audioWorklet.addModule(options.workletUrl);
      if (version !== epoch || !active) return;
      await ctx.resume();
      const source = ctx.createMediaStreamSource(media);
      const node = new env.AudioWorkletNode(ctx, 'asklit-recorder');
      const chunks = [];
      let frames = 0,
        silent = 0,
        voiced = 0,
        heard = false,
        finishing = false;
      async function finish() {
        if (finishing || version !== epoch || !active) return;
        finishing = true;
        const audio = wav(chunks, ctx.sampleRate);
        releaseCapture();
        if (!heard) return fail('No speech was detected. Try again.');
        state('Transcribing…');
        try {
          if (!(await check(version))) return;
          const text = await options.transcribe(audio);
          if (version === epoch) await received(text, version);
        } catch (e) {
          if (version === epoch) fail(e);
        }
      }
      finishRecording = finish;
      node.port.onmessage = (event) => {
        if (version !== epoch || !active || finishing) return;
        const samples = event.data;
        chunks.push(samples);
        frames += samples.length;
        const loud =
          Math.sqrt(
            samples.reduce((sum, n) => sum + n * n, 0) / samples.length
          ) > 0.012;
        if (loud) {
          voiced += samples.length / ctx.sampleRate;
          heard = voiced >= 0.25;
          silent = 0;
        } else silent += samples.length / ctx.sampleRate;
        if ((heard && silent > 1.4) || frames / ctx.sampleRate >= 30)
          void finish();
        else if (!heard && frames / ctx.sampleRate > 10)
          fail('No speech was detected. Try again.');
      };
      source.connect(node);
      node.connect(ctx.destination); // The worklet outputs silence, never microphone feedback.
      state('Listening…');
      listenTimer = setTimeout(() => void finish(), 30000);
    }
    async function listen(version) {
      if (version !== epoch || !active) return;
      try {
        if (!(await check(version))) return;
        releasePlayback();
        if (config.mode === 'service') await serviceListen(version);
        else browserListen(version);
      } catch (e) {
        if (version === epoch) fail(e);
      }
    }
    async function start(value) {
      stop();
      config = { mode: 'browser', loop: false, readReplies: true, ...value };
      active = true;
      turns = 0;
      const version = epoch;
      state('Starting…');
      sessionTimer = setTimeout(() => {
        if (active)
          fail('Voice paused after ten minutes. Start it again to continue.');
      }, 600000);
      await listen(version);
    }
    async function reply(text) {
      if (!active) return;
      const version = epoch;
      releaseCapture();
      function complete() {
        if (version !== epoch || !active) return;
        releasePlayback();
        if (config.loop) void listen(version);
        else stop();
      }
      if (!config.readReplies) return complete();
      if (!text || text.length > 8000)
        return fail(
          'This reply is too long to read aloud. Read it in the conversation.'
        );
      state('Speaking…');
      try {
        if (!(await check(version))) return;
        playbackTimer = setTimeout(
          () => {
            if (version === epoch) fail('Speech playback timed out.');
          },
          Math.max(120000, text.length * 100)
        );
        if (config.mode === 'service') {
          const blob = await options.synthesize(text);
          if (version !== epoch || !active) return;
          audioUrl = env.URL.createObjectURL(blob);
          const audio = new env.Audio(audioUrl);
          player = audio;
          audio.onended = complete;
          audio.onerror = () => {
            if (version === epoch)
              fail(
                'Audio could not play. Use Browser voice or read the reply.'
              );
          };
          await audio.play();
        } else {
          if (!env.speechSynthesis || !env.SpeechSynthesisUtterance)
            throw new Error('Read-aloud is not supported in this browser.');
          const chunks = text.match(/.{1,220}(?:\s|$)|.{1,220}/gs) || [text];
          let index = 0;
          const next = () => {
            if (version !== epoch || !active) return;
            if (index >= chunks.length) return complete();
            const utterance = new env.SpeechSynthesisUtterance(chunks[index++]);
            utterance.lang = config.lang || env.navigator.language || 'en-US';
            const voices = env.speechSynthesis.getVoices();
            utterance.voice =
              voices.find((v) => v.localService && v.lang === utterance.lang) ||
              voices.find((v) => v.lang === utterance.lang) ||
              null;
            utterance.onend = next;
            utterance.onerror = () => {
              if (version === epoch) fail('Read-aloud stopped. Try again.');
            };
            env.speechSynthesis.speak(utterance);
          };
          next();
        }
      } catch (e) {
        if (version === epoch) fail(e);
      }
    }
    async function read(text, value) {
      stop();
      config = { mode: 'browser', ...value, readReplies: true, loop: false };
      active = true;
      await reply(text);
    }
    const hidden = () => {
      if (env.document?.hidden) stop();
    };
    env.document?.addEventListener('visibilitychange', hidden);
    return {
      start,
      stop,
      reply,
      read,
      wait() {
        if (active) {
          ++epoch;
          releaseCapture();
          state('Thinking…');
        }
      },
      finish: () => finishRecording?.(),
      isActive: () => active,
      destroy() {
        stop();
        env.document?.removeEventListener('visibilitychange', hidden);
      },
    };
  }
  return { createVoiceController };
});
