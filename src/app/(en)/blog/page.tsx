import type { Metadata } from 'next';
import BlogIndex from '../../components/BlogIndex';
import { message } from '../../../i18n/messages';
import { localizedMetadata, blogPath } from '../../../i18n/routes';

export const metadata: Metadata = {
  title: message('en', 'blog.title'),
  description: message('en', 'blog.description'),
  alternates: localizedMetadata(blogPath('en'), 'en'),
};

export default function BlogPage() {
  return <BlogIndex locale="en" />;
}
