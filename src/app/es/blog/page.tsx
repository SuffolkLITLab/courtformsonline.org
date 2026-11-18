import type { Metadata } from 'next';
import BlogIndex from '../../components/BlogIndex';
import { message } from '../../../i18n/messages';
import { localizedMetadata, blogPath } from '../../../i18n/routes';

export const metadata: Metadata = {
  title: message('es', 'blog.title'),
  description: message('es', 'blog.description'),
  alternates: localizedMetadata(blogPath('es'), 'es'),
};

export default function BlogPage() {
  return <BlogIndex locale="es" />;
}
