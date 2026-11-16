'use client';

import { useEffect, useId, useRef, useState } from 'react';
import AskLitChat from './AskLitChat';
import styles from './AskLitWidget.module.css';

/** Keep the chat mounted after opening so closing never discards a conversation. */
export default function AskLitWidget({ botId }: { botId: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState(false);
  const [started, setStarted] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!opened || !window.visualViewport) return;
    const viewport = window.visualViewport;
    const resize = () => {
      dialog.current?.style.setProperty(
        '--viewport-height',
        `${viewport.height}px`
      );
      dialog.current?.style.setProperty(
        '--viewport-top',
        `${viewport.offsetTop}px`
      );
    };
    resize();
    viewport.addEventListener('resize', resize);
    viewport.addEventListener('scroll', resize);
    return () => {
      viewport.removeEventListener('resize', resize);
      viewport.removeEventListener('scroll', resize);
    };
  }, [opened]);

  function close() {
    dialog.current?.close();
    setOpened(false);
  }

  return (
    <>
      <button
        type="button"
        className={`btn btn-primary ${styles.launcher}`}
        aria-haspopup="dialog"
        aria-expanded={opened}
        aria-controls={id}
        onClick={() => {
          setStarted(true);
          setOpened(true);
          dialog.current?.showModal();
        }}
      >
        Ask LIT · Help with this form
      </button>
      <dialog
        ref={dialog}
        id={id}
        className={styles.panel}
        aria-labelledby={`${id}-title`}
        onClose={() => setOpened(false)}
      >
        <header className={styles.header}>
          <strong id={`${id}-title`}>Ask LIT</strong>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            aria-label="Close Ask LIT chat"
            onClick={close}
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </header>
        <div className={styles.body}>
          {started && <AskLitChat botId={botId} active={opened} />}
        </div>
      </dialog>
    </>
  );
}
