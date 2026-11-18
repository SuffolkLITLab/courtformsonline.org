import React from 'react';
import localFont from 'next/font/local';
import Script from 'next/script';

import NavigationBar from './NavigationBar';
import Footer from './Footer';
import type { Locale } from '../../i18n/messages';
import { getAllBlogSlugs } from '../../data/getBlogPosts';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../globals.css';

const albertSans = localFont({
  src: [
    {
      path: '../fonts/AlbertSans.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../fonts/AlbertSans-Italic.woff2',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-albert-sans',
  display: 'swap',
  adjustFontFallback: false,
  fallback: [
    'system-ui',
    '-apple-system',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'Noto Sans',
    'Liberation Sans',
    'sans-serif',
  ],
});

export default function SiteDocument({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <html lang={locale} className={albertSans.variable}>
      <body className={albertSans.className}>
        <NavigationBar
          locale={locale}
          translatedBlogSlugs={getAllBlogSlugs('es')}
        />
        <div className="body-container py-5">{children}</div>
        <Footer locale={locale} />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}
