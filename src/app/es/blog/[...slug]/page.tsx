import BlogArticle, { blogPostMetadata } from '../../../components/BlogArticle';
import { getAllBlogSlugs } from '../../../../data/getBlogPosts';

type Props = { params: { slug: string[] } };

export function generateStaticParams() {
  return getAllBlogSlugs('es').map((slug) => ({ slug: slug.split('/') }));
}

export function generateMetadata({ params }: Props) {
  return blogPostMetadata(params.slug.join('/'), 'es');
}

export default function BlogPostPage({ params }: Props) {
  return <BlogArticle locale="es" slug={params.slug.join('/')} />;
}
