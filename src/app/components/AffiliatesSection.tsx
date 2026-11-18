import Link from 'next/link';
import Image from 'next/image';
import { message, type Locale } from '../../i18n/messages';
import styles from '../css/AffiliatesSection.module.css';

interface Affiliate {
  name: string;
  filename: string;
  url: string;
  height: number;
  width: number;
}

const affiliates: Array<Affiliate> = [
  {
    name: 'Hello Prenup',
    filename: 'hello_prenup.png',
    url: 'https://helloprenup.com/',
    height: 226,
    width: 1280,
  },
];

export default function AffiliatesSection({
  locale = 'en',
}: { locale?: Locale } = {}) {
  return (
    <section
      id="affiliates-section"
      className={styles.AffiliatesSection + ' container-fluid p-4'}
    >
      <div className={styles.AffiliatesContainer}>
        <p className="text-center">
          {message(locale, 'home.affiliateIntro')}{' '}
          <a href="https://suffolklitlab.org/#affiliates" hrefLang="en">
            {message(locale, 'home.affiliates')}
          </a>
          {message(locale, 'home.affiliatesEnding')}
        </p>
        {affiliates.map((affiliate) => {
          return (
            <Link href={affiliate.url} className="d-block" key={affiliate.name}>
              <Image
                src={'/affiliates/' + affiliate.filename}
                alt={affiliate.name}
                className={styles.AffiliateLogo}
                height={affiliate.height}
                width={affiliate.width}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
