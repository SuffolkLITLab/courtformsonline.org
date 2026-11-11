'use client';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { createVoiceController } from './asklitVoice';

export type VoiceHandle = {
  reply: (text: string) => Promise<void>;
  stop: () => void;
  wait: () => void;
};
type Policy = { browser: boolean; paid: boolean };
type Props = {
  policy: Policy;
  answer: string;
  busy: boolean;
  getPolicy: () => Promise<Policy>;
  transcribe: (audio: Blob) => Promise<string>;
  synthesize: (text: string) => Promise<Blob>;
  onTranscript: (text: string, auto: boolean) => Promise<void>;
  onError: (message: string) => void;
};

const AskLitVoiceControls = forwardRef<VoiceHandle, Props>(
  function AskLitVoiceControls(props, ref) {
    const latest = useRef(props);
    latest.current = props;
    const controller = useRef<ReturnType<typeof createVoiceController> | null>(
      null
    );
    const [state, setState] = useState({ active: false, stage: '' });
    const [mode, setMode] = useState('browser');
    const [loop, setLoop] = useState(false);
    const [readReplies, setReadReplies] = useState(true);
    const [lang, setLang] = useState('');
    const selectedMode = useRef(mode);
    selectedMode.current = mode;
    useEffect(() => {
      let mounted = true;
      const voice = createVoiceController({
        workletUrl: '/asklit-voice-worklet.js',
        getPolicy: () => latest.current.getPolicy(),
        transcribe: (audio: Blob) => latest.current.transcribe(audio),
        synthesize: (text: string) => latest.current.synthesize(text),
        onTranscript: (text: string, auto: boolean) =>
          latest.current.onTranscript(text, auto),
        onError: (message: string) => {
          if (mounted) latest.current.onError(message);
        },
        onState: (next: { active: boolean; stage: string }) => {
          if (mounted) setState(next);
        },
      });
      controller.current = voice;
      const timer = setInterval(async () => {
        if (!voice.isActive() || selectedMode.current !== 'service') return;
        try {
          if (!(await latest.current.getPolicy()).paid && mounted) {
            voice.stop();
            setMode('browser');
            latest.current.onError(
              'Paid voice was disabled. Browser voice remains available.'
            );
          }
        } catch (e) {
          if (mounted) {
            voice.stop();
            latest.current.onError(
              e instanceof Error ? e.message : 'Voice stopped.'
            );
          }
        }
      }, 15000);
      return () => {
        mounted = false;
        clearInterval(timer);
        voice.destroy();
        controller.current = null;
      };
    }, []);
    useEffect(() => {
      if (!props.policy.paid && mode === 'service') {
        controller.current?.stop();
        setMode('browser');
      }
    }, [props.policy.paid, mode]);
    useImperativeHandle(
      ref,
      () => ({
        reply: async (text) => {
          await controller.current?.reply(text);
        },
        stop: () => controller.current?.stop(),
        wait: () => controller.current?.wait(),
      }),
      []
    );
    const config = () => ({
      mode,
      loop,
      readReplies,
      lang: lang || navigator.language,
    });
    const change = (fn: () => void) => {
      controller.current?.stop();
      fn();
    };
    return (
      <section className="mt-3" aria-label="Voice controls">
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button
            type="button"
            className="btn btn-outline-secondary"
            disabled={props.busy && !state.active}
            onClick={() =>
              state.active
                ? controller.current?.stop()
                : void controller.current?.start(config())
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              className="me-2"
            >
              <rect x="9" y="2" width="6" height="12" rx="3" />
              <path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8" />
            </svg>
            {state.active ? 'Stop voice' : 'Start voice'}
          </button>
          <button
            type="button"
            className="btn btn-link"
            disabled={props.busy || state.active || !props.answer}
            onClick={() =>
              void controller.current?.read(props.answer, config())
            }
          >
            Read reply
          </button>
          {state.active &&
            mode === 'service' &&
            state.stage === 'Listening…' && (
              <button
                type="button"
                className="btn btn-link"
                onClick={() => controller.current?.finish()}
              >
                Finish recording
              </button>
            )}
          <span role="status" className="small text-muted">
            {state.stage}
          </span>
        </div>
        <details className="mt-2">
          <summary>Voice options</summary>
          <label className="form-label mt-2">
            Speech
            <select
              className="form-select"
              value={mode}
              onChange={(e) => change(() => setMode(e.target.value))}
            >
              <option value="browser">Browser</option>
              <option value="service" disabled={!props.policy.paid}>
                Paid service
              </option>
            </select>
          </label>
          <label className="d-block">
            <input
              type="checkbox"
              checked={loop}
              onChange={(e) => change(() => setLoop(e.target.checked))}
            />{' '}
            Hands-free conversation — send when I finish speaking
          </label>
          <label className="d-block">
            <input
              type="checkbox"
              checked={readReplies}
              onChange={(e) => change(() => setReadReplies(e.target.checked))}
            />{' '}
            Read replies aloud
          </label>
          <label className="form-label mt-2">
            Language
            <select
              className="form-select"
              value={lang}
              onChange={(e) => change(() => setLang(e.target.value))}
            >
              <option value="">Browser language</option>
              <option value="en-US">English</option>
              <option value="es-US">Español</option>
              <option value="pt-BR">Português</option>
              <option value="fr-FR">Français</option>
              <option value="zh-CN">中文</option>
              <option value="ar-SA">العربية</option>
            </select>
          </label>
        </details>
        <p className="small text-muted mt-2">
          Speech may be processed by your browser’s or organization’s provider.
          Replies use a computer-generated voice.
        </p>
      </section>
    );
  }
);
export default AskLitVoiceControls;
