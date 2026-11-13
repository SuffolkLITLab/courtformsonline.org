import type { Metadata } from 'next';
import AskLitPageClient from './AskLitPageClient';

export const metadata: Metadata = {
  title: 'AskLit assistant | Court Forms Online',
  description:
    'Ask questions using a published, source-grounded AskLit assistant.',
  robots: { index: false, follow: true },
};

export default function AskLitPage() {
  return (
    <main className="container">
      <AskLitPageClient />
    </main>
  );
}
