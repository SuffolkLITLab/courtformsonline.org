import { createVoiceController } from '../src/app/components/asklitVoice';

const flush = async () => {
  for (let i = 0; i < 12; i++) await Promise.resolve();
};
function harness(overrides: Record<string, unknown> = {}) {
  const recognizers: any[] = [],
    utterances: any[] = [],
    states: any[] = [];
  class Recognition {
    onresult: any;
    onend: any;
    onerror: any;
    onspeechend: any;
    start = jest.fn();
    stop = jest.fn();
    abort = jest.fn();
    constructor() {
      recognizers.push(this);
    }
  }
  class Utterance {
    text: string;
    onend: any;
    onerror: any;
    constructor(text: string) {
      this.text = text;
    }
  }
  const env: any = {
    navigator: { language: 'en-US' },
    document,
    SpeechRecognition: Recognition,
    SpeechSynthesisUtterance: Utterance,
    speechSynthesis: {
      cancel: jest.fn(),
      getVoices: () => [],
      speak: (value: unknown) => utterances.push(value),
    },
  };
  const options = {
    env,
    getPolicy: jest.fn(async () => ({ browser: true, paid: false })),
    onTranscript: jest.fn(async () => {}),
    onError: jest.fn(),
    onState: (state: unknown) => states.push(state),
    transcribe: jest.fn(async () => 'Paid transcript'),
    synthesize: jest.fn(),
    workletUrl: '/asklit-voice-worklet.js',
    ...overrides,
  };
  const voice = createVoiceController(options);
  function result(text: string) {
    const rec = recognizers[recognizers.length - 1];
    rec.onresult({
      resultIndex: 0,
      results: [{ isFinal: true, 0: { transcript: text } }],
    });
    rec.onend();
  }
  return { voice, env, options, states, recognizers, utterances, result };
}
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

test('dictation fills a draft without automatically submitting', async () => {
  const h = harness();
  await h.voice.start({ mode: 'browser', loop: false });
  h.result('A question');
  await flush();
  expect(h.options.onTranscript).toHaveBeenCalledWith('A question', false);
  expect(h.options.transcribe).not.toHaveBeenCalled();
  expect(h.states.at(-1)).toEqual({
    active: true,
    stage: 'Review the text, then send.',
  });
  h.voice.destroy();
});

test('hands-free waits for playback to end before reopening the microphone', async () => {
  const h = harness();
  await h.voice.start({ loop: true });
  h.result('Question');
  await flush();
  expect(h.options.onTranscript).toHaveBeenCalledWith('Question', true);
  await h.voice.reply('Answer');
  expect(h.recognizers).toHaveLength(1);
  expect(h.utterances).toHaveLength(1);
  h.utterances[0].onend();
  await flush();
  expect(h.recognizers).toHaveLength(2);
  h.voice.destroy();
});

test('stop ignores delayed recognition and playback callbacks', async () => {
  const h = harness();
  await h.voice.start({ loop: true });
  const delayed = h.recognizers[0].onresult;
  h.voice.stop();
  delayed({
    resultIndex: 0,
    results: [{ isFinal: true, 0: { transcript: 'late' } }],
  });
  await flush();
  expect(h.options.onTranscript).not.toHaveBeenCalled();
  expect(h.recognizers[0].abort).toHaveBeenCalled();
  expect(h.states.at(-1).active).toBe(false);
  h.voice.destroy();
});

test('permission errors and silence stop the loop without sending', async () => {
  const h = harness();
  await h.voice.start({ loop: true });
  h.recognizers[0].onerror({ error: 'not-allowed' });
  expect(h.options.onError).toHaveBeenCalledWith(
    expect.stringContaining('permission')
  );
  expect(h.options.onTranscript).not.toHaveBeenCalled();
  await h.voice.start({ loop: true });
  h.recognizers[1].onend();
  await flush();
  expect(h.options.onTranscript).not.toHaveBeenCalled();
  expect(h.states.at(-1).active).toBe(false);
  h.voice.destroy();
});

test('paid mode cannot start when the organization disallows it', async () => {
  const h = harness();
  await h.voice.start({ mode: 'service' });
  expect(h.options.onError).toHaveBeenCalledWith(
    expect.stringContaining('Paid voice is unavailable')
  );
  expect(h.options.transcribe).not.toHaveBeenCalled();
  h.voice.destroy();
});

test('browser read-aloud works even without speech recognition', async () => {
  const h = harness();
  delete h.env.SpeechRecognition;
  await h.voice.read('Read this reply', { mode: 'browser' });
  expect(h.utterances[0].text).toBe('Read this reply');
  h.utterances[0].onend();
  expect(h.voice.isActive()).toBe(false);
  h.voice.destroy();
});

test('paid recording stops microphone tracks and produces bounded PCM WAV', async () => {
  const h = harness({
    getPolicy: jest.fn(async () => ({ browser: true, paid: true })),
  });
  const track = { stop: jest.fn() };
  let node: any;
  h.env.navigator.mediaDevices = {
    getUserMedia: jest.fn(async () => ({ getTracks: () => [track] })),
  };
  h.env.AudioContext = class {
    sampleRate = 16000;
    destination = {};
    audioWorklet = { addModule: jest.fn(async () => {}) };
    createMediaStreamSource() {
      return { connect: jest.fn() };
    }
    resume = async () => {};
    close = async () => {};
  };
  h.env.AudioWorkletNode = class {
    port = { onmessage: null };
    connect = jest.fn();
    constructor() {
      node = this;
    }
  };
  await h.voice.start({ mode: 'service' });
  for (let i = 0; i < 3; i++)
    node.port.onmessage({ data: new Float32Array(2048).fill(0.1) });
  for (let i = 0; i < 12; i++)
    node.port.onmessage({ data: new Float32Array(2048) });
  await flush();
  expect(track.stop).toHaveBeenCalled();
  expect(h.options.transcribe).toHaveBeenCalledTimes(1);
  const audio = (h.options.transcribe as jest.Mock).mock.calls[0][0];
  expect(audio.type).toBe('audio/wav');
  expect(audio.size).toBeLessThan(1024 * 1024);
  expect(h.options.onTranscript).toHaveBeenCalledWith('Paid transcript', false);
  h.voice.destroy();
});

test('explicit read ignores automatic-read preference and browser voice needs no server policy', async () => {
  const h = harness({
    getPolicy: jest.fn(async () => {
      throw new Error('offline');
    }),
  });
  await h.voice.read('Read this explicitly', {
    mode: 'browser',
    readReplies: false,
  });
  expect(h.utterances[0].text).toBe('Read this explicitly');
  expect(h.options.getPolicy).not.toHaveBeenCalled();
  h.voice.destroy();
});
