import type { ReactNode } from 'react';
import SiteDocument from '../components/SiteDocument';

export const metadata = {
  title: 'Court Forms Online',
  description:
    'Free online interactive court forms from Suffolk University Law School',
};

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
