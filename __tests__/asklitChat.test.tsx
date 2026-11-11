import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AskLitChat from '../src/app/components/AskLitChat';

const botId = 'a'.repeat(32);
const metadata = {
  title: 'Housing assistant',
  welcome: 'Ask about housing.',
  footer: 'Made with AskLit',
  retention_days: 7,
  profiles: [{ key: 'default', label: 'Default', conversation_starters: [] }],
};
const response = (value: unknown, status = 200) =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: async () => value,
  } as Response);

beforeEach(() => {
  global.fetch = jest.fn();
  Object.defineProperty(global.crypto, 'randomUUID', {
    configurable: true,
    value: jest.fn(() => 'request-1'),
  });
  localStorage.clear();
  sessionStorage.clear();
});

test('uses the public POST API with an in-memory capability and escapes answers', async () => {
  const fetchMock = global.fetch as jest.Mock;
  fetchMock
    .mockImplementationOnce(() => response(metadata))
    .mockImplementationOnce(() =>
      response({ id: 'conversation', token: 'capability' })
    )
    .mockImplementationOnce(() =>
      response({
        answer: '<img src=x onerror=alert(1)>',
        sources: [{ filename: 'guide.txt', page: 1, content: 'Source text' }],
      })
    )
    .mockImplementationOnce(() => response({ deleted: true }));
  const { container } = render(
    <AskLitChat botId={botId} apiBase="https://asklit.example" />
  );
  await screen.findByRole('heading', { name: 'Housing assistant' });
  fireEvent.change(screen.getByLabelText('Your question'), {
    target: { value: 'Help with housing' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Send' }));
  await screen.findByText('<img src=x onerror=alert(1)>');
  expect(container.querySelector('img')).toBeNull();
  expect(fetchMock.mock.calls[1][1].method).toBe('POST');
  expect(fetchMock.mock.calls[2][1].headers.Authorization).toBe(
    'Bearer capability'
  );
  expect(fetchMock.mock.calls[2][1].credentials).toBe('omit');
  expect(fetchMock.mock.calls[2][0]).not.toContain('capability');
  expect(localStorage.length).toBe(0);
  expect(sessionStorage.length).toBe(0);
  fireEvent.click(screen.getByRole('button', { name: 'Clear conversation' }));
  await waitFor(() =>
    expect(
      screen.queryByText('<img src=x onerror=alert(1)>')
    ).not.toBeInTheDocument()
  );
  expect(fetchMock.mock.calls[3][1].method).toBe('DELETE');
});

test('reuses the request ID after a network failure', async () => {
  const fetchMock = global.fetch as jest.Mock;
  fetchMock
    .mockImplementationOnce(() => response(metadata))
    .mockImplementationOnce(() =>
      response({ id: 'conversation', token: 'capability' })
    )
    .mockRejectedValueOnce(new TypeError('Network disconnected'))
    .mockImplementationOnce(() =>
      response({ answer: 'Recovered answer', sources: [] })
    );
  render(<AskLitChat botId={botId} apiBase="https://asklit.example" />);
  await screen.findByRole('heading', { name: 'Housing assistant' });
  fireEvent.change(screen.getByLabelText('Your question'), {
    target: { value: 'Question' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Send' }));
  await screen.findByRole('alert');
  fireEvent.click(screen.getByRole('button', { name: 'Send' }));
  await screen.findByText('Recovered answer');
  expect(fetchMock.mock.calls[3][1].body).toBe(fetchMock.mock.calls[2][1].body);
  expect(fetchMock.mock.calls[3][0]).toBe(fetchMock.mock.calls[2][0]);
});

test('a failed deletion keeps the visible conversation', async () => {
  const fetchMock = global.fetch as jest.Mock;
  fetchMock
    .mockImplementationOnce(() => response(metadata))
    .mockImplementationOnce(() =>
      response({ id: 'conversation', token: 'capability' })
    )
    .mockImplementationOnce(() =>
      response({ answer: 'Answer to keep', sources: [] })
    )
    .mockImplementationOnce(() => response({ detail: 'Busy' }, 409));
  render(<AskLitChat botId={botId} apiBase="https://asklit.example" />);
  await screen.findByRole('heading', { name: 'Housing assistant' });
  fireEvent.change(screen.getByLabelText('Your question'), {
    target: { value: 'Question' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Send' }));
  await screen.findByText('Answer to keep');
  fireEvent.click(screen.getByRole('button', { name: 'Clear conversation' }));
  await screen.findByRole('alert');
  expect(screen.getByText('Answer to keep')).toBeInTheDocument();
});

test('invalid bot IDs do not trigger requests', async () => {
  render(
    <AskLitChat
      botId="https://untrusted.example/code.py"
      apiBase="https://asklit.example"
    />
  );
  await screen.findByRole('alert');
  expect(global.fetch).not.toHaveBeenCalled();
});

test('a terminal failed attempt can be retried with a new request ID', async () => {
  (global.crypto.randomUUID as jest.Mock)
    .mockReturnValueOnce('request-1')
    .mockReturnValueOnce('request-2');
  const fetchMock = global.fetch as jest.Mock;
  fetchMock
    .mockImplementationOnce(() => response(metadata))
    .mockImplementationOnce(() =>
      response({ id: 'conversation', token: 'capability' })
    )
    .mockRejectedValueOnce(new TypeError('Network disconnected'))
    .mockImplementationOnce(() =>
      response({ detail: 'Previous attempt failed', code: 'turn_failed' }, 410)
    )
    .mockImplementationOnce(() =>
      response({ answer: 'New answer', sources: [] })
    );
  render(<AskLitChat botId={botId} apiBase="https://asklit.example" />);
  await screen.findByRole('heading', { name: 'Housing assistant' });
  fireEvent.change(screen.getByLabelText('Your question'), {
    target: { value: 'Question' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Send' }));
  await screen.findByText('Network disconnected');
  fireEvent.click(screen.getByRole('button', { name: 'Send' }));
  await screen.findByText('Previous attempt failed');
  fireEvent.click(screen.getByRole('button', { name: 'Send' }));
  await screen.findByText('New answer');
  expect(JSON.parse(fetchMock.mock.calls[2][1].body).request_id).toBe(
    'request-1'
  );
  expect(JSON.parse(fetchMock.mock.calls[3][1].body).request_id).toBe(
    'request-1'
  );
  expect(JSON.parse(fetchMock.mock.calls[4][1].body).request_id).toBe(
    'request-2'
  );
});

test('unlocks with a shared password and keeps its grant in memory', async () => {
  const fetchMock = global.fetch as jest.Mock;
  fetchMock
    .mockImplementationOnce(() =>
      response({
        ...metadata,
        title: 'Protected AskLit',
        locked: true,
        access_mode: 'password',
        profiles: [],
      })
    )
    .mockImplementationOnce(() =>
      response({
        token: 'access-grant',
        metadata: { ...metadata, locked: false, access_mode: 'password' },
      })
    )
    .mockImplementationOnce(() =>
      response({ id: 'conversation', token: 'conversation-token' })
    )
    .mockImplementationOnce(() => response({ answer: 'Answer', sources: [] }));
  render(<AskLitChat botId={botId} apiBase="https://asklit.example" />);
  const password = await screen.findByLabelText('Password');
  expect(screen.queryByLabelText('Your question')).not.toBeInTheDocument();
  fireEvent.change(password, { target: { value: '1234' } });
  fireEvent.click(screen.getByRole('button', { name: 'Open AskLit' }));
  fireEvent.change(await screen.findByLabelText('Your question'), {
    target: { value: 'Help' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Send' }));
  await screen.findByText('Answer');
  expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toEqual({
    password: '1234',
  });
  expect(JSON.parse(fetchMock.mock.calls[2][1].body).access_token).toBe(
    'access-grant'
  );
  expect(
    fetchMock.mock.calls.every(([, options]) => options.credentials === 'omit')
  ).toBe(true);
  expect(localStorage.length).toBe(0);
  expect(sessionStorage.length).toBe(0);
});

test('organization sign-in accepts only messages from the trusted popup', async () => {
  const fetchMock = global.fetch as jest.Mock;
  fetchMock
    .mockImplementationOnce(() =>
      response({
        ...metadata,
        title: 'Protected AskLit',
        locked: true,
        access_mode: 'organization',
        profiles: [],
      })
    )
    .mockImplementationOnce(() =>
      response({ ...metadata, locked: false, access_mode: 'organization' })
    );
  const open = jest.spyOn(window, 'open').mockReturnValue(window);
  render(<AskLitChat botId={botId} apiBase="https://asklit.example" />);
  fireEvent.click(
    await screen.findByRole('button', { name: 'Sign in to your organization' })
  );
  window.dispatchEvent(
    new MessageEvent('message', {
      origin: 'https://evil.example',
      source: window,
      data: { type: 'asklit-access', botId, token: 'bad' },
    })
  );
  expect(fetchMock).toHaveBeenCalledTimes(1);
  window.dispatchEvent(
    new MessageEvent('message', {
      origin: 'https://asklit.example',
      source: window,
      data: { type: 'asklit-access', botId, token: 'good' },
    })
  );
  await screen.findByLabelText('Your question');
  expect(fetchMock.mock.calls[1][1].headers.Authorization).toBe('Bearer good');
  open.mockRestore();
});

test('returns to the password form when starting with an expired grant', async () => {
  const locked = {
    ...metadata,
    locked: true,
    access_mode: 'password',
    profiles: [],
  };
  (global.fetch as jest.Mock)
    .mockImplementationOnce(() => response(locked))
    .mockImplementationOnce(() => response({ token: 'grant', metadata }))
    .mockImplementationOnce(() => response({ detail: 'Unlock again.' }, 403))
    .mockImplementationOnce(() => response(locked));
  render(<AskLitChat botId={botId} apiBase="https://asklit.example" />);
  fireEvent.change(await screen.findByLabelText('Password'), {
    target: { value: '1234' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Open AskLit' }));
  fireEvent.change(await screen.findByLabelText('Your question'), {
    target: { value: 'Help' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Send' }));
  await screen.findByLabelText('Password');
  expect(screen.queryByLabelText('Your question')).not.toBeInTheDocument();
});

test.each([
  ['single line', 'Hello', false, false, 1],
  ['shift enter', 'Hello', true, false, 0],
  ['multiple lines', 'Hello\nMore context', false, false, 0],
  ['composition', 'Hello', false, true, 0],
])('composer handles %s', async (_, text, shiftKey, isComposing, calls) => {
  (global.fetch as jest.Mock).mockImplementationOnce(() => response(metadata));
  const submit = jest
    .spyOn(HTMLFormElement.prototype, 'requestSubmit')
    .mockImplementation(() => {});
  render(<AskLitChat botId={botId} apiBase="https://asklit.example" />);
  const input = await screen.findByLabelText('Your question');
  fireEvent.change(input, { target: { value: text } });
  fireEvent.keyDown(input, { key: 'Enter', shiftKey, isComposing });
  expect(submit).toHaveBeenCalledTimes(calls as number);
  submit.mockRestore();
});

test('uploads a private attachment before sending, and removes it', async () => {
  const file = {
    id: 'file-1',
    filename: 'notice.txt',
    size: 16,
    characters: 16,
  };
  const fetchMock = global.fetch as jest.Mock;
  fetchMock
    .mockImplementationOnce(() =>
      response({
        ...metadata,
        uploads: {
          enabled: true,
          extensions: ['.txt'],
          max_bytes: 5242880,
          max_files: 3,
        },
      })
    )
    .mockImplementationOnce(() =>
      response({ id: 'conversation', token: 'capability' })
    )
    .mockImplementationOnce(() => response(file))
    .mockImplementationOnce(() => response([file]))
    .mockImplementationOnce(() => response({ answer: 'Friday', sources: [] }))
    .mockImplementationOnce(() => response({ deleted: true }))
    .mockImplementationOnce(() => response([]));
  const { container } = render(
    <AskLitChat botId={botId} apiBase="https://asklit.example" />
  );
  await screen.findByRole('button', { name: 'Attach file' });
  fireEvent.change(container.querySelector('input[type=file]')!, {
    target: {
      files: [
        new File(['Deadline Friday'], 'notice.txt', { type: 'text/plain' }),
      ],
    },
  });
  await screen.findByText('notice.txt');
  expect(fetchMock.mock.calls[2][1].body).toBeInstanceOf(FormData);
  expect(fetchMock.mock.calls[2][1].headers.Authorization).toBe(
    'Bearer capability'
  );
  expect(fetchMock.mock.calls[2][1].headers['Content-Type']).toBeUndefined();
  expect(fetchMock.mock.calls.some(([url]) => url.endsWith('/messages'))).toBe(
    false
  );
  fireEvent.change(screen.getByLabelText('Your question'), {
    target: { value: 'When?' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Send' }));
  await screen.findByText('Friday');
  fireEvent.click(screen.getByRole('button', { name: 'Remove notice.txt' }));
  await waitFor(() =>
    expect(screen.queryByText('notice.txt')).not.toBeInTheDocument()
  );
  expect(fetchMock.mock.calls[5][1].method).toBe('DELETE');
  expect(
    fetchMock.mock.calls.every(([, options]) => options.credentials === 'omit')
  ).toBe(true);
});

test('does not show file uploads when the author has not enabled them', async () => {
  (global.fetch as jest.Mock).mockImplementationOnce(() => response(metadata));
  render(<AskLitChat botId={botId} apiBase="https://asklit.example" />);
  await screen.findByLabelText('Your question');
  expect(
    screen.queryByRole('button', { name: 'Attach file' })
  ).not.toBeInTheDocument();
});
