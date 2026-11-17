import React from 'react';
import localFont from 'next/font/local';
import Script from 'next/script';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './globals.css';

const albertSans = localFont({
  src: [
    {
      path: './fonts/AlbertSans.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: './fonts/AlbertSans-Italic.woff2',
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

export const metadata = {
  title: 'Court Forms Online',
  description:
    'Free online interactive court forms from Suffolk University Law School',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={albertSans.variable}>
      <body className={albertSans.className}>
        <NavigationBar />
        <div className="body-container py-5">{children}</div>
        <Footer />
      </body>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />
    </html>
  );
}
