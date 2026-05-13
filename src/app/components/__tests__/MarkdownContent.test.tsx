import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import MarkdownContent from '../MarkdownContent';

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: jest.fn(({ children }) => (
    <div data-testid="markdown">{children}</div>
  )),
  defaultUrlTransform: jest.fn((value) =>
    /^javascript:/i.test(value) ? '' : value
  ),
}));

jest.mock('rehype-raw', () => ({
  __esModule: true,
  default: 'rehypeRawPlugin',
}));

jest.mock('remark-gfm', () => ({
  __esModule: true,
  default: 'remarkGfmPlugin',
}));

describe('MarkdownContent', () => {
  test('configures react-markdown to render raw HTML', () => {
    const markdown =
      'Call <a href="tel:+16515551234">651-555-1234</a> for help.';

    render(<MarkdownContent>{markdown}</MarkdownContent>);

    expect(screen.getByTestId('markdown')).toHaveTextContent(markdown);

    const reactMarkdownMock = ReactMarkdown as jest.Mock;
    expect(reactMarkdownMock).toHaveBeenCalledTimes(1);
    const props = reactMarkdownMock.mock.calls[0][0];

    expect(props).toMatchObject({
      children: markdown,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeRaw],
    });

    expect(props.urlTransform('tel:+16515551234')).toBe('tel:+16515551234');
    expect(props.urlTransform('javascript:alert(1)')).toBe('');
    expect(defaultUrlTransform).toHaveBeenCalledWith('javascript:alert(1)');
  });
});
