import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  children?: string | null;
}

const transformMarkdownUrl = (value: string) => {
  if (/^tel:/i.test(value)) {
    return value;
  }

  return defaultUrlTransform(value);
};

const MarkdownContent = ({ children = '' }: MarkdownContentProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      urlTransform={transformMarkdownUrl}
    >
      {children}
    </ReactMarkdown>
  );
};

export default MarkdownContent;
