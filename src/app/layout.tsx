import { Inter } from 'next/font/google';
import Script from 'next/script';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fontsource/inter/700.css'; // Bold weight
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Court Forms Online',
  description:
    'Free online interactive court forms from Suffolk University Law School',
};

interface LayoutParams {
  params: {
    path: string;
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // console.log('params: ' + JSON.stringify(params));
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationBar />
        <div className="body-container">{children}</div>
        <Footer />
      </body>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />
    </html>
  );
}
