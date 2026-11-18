import Link from 'next/link';
import Image from 'next/image';
import styles from '../css/Footer.module.css';
import { message, type Locale } from '../../i18n/messages';

export default function Footer({ locale = 'en' }: { locale?: Locale }) {
  return (
    <footer
      id="footer"
      role="contentinfo"
      className={styles.Footer + ' text-center py-4'}
    >
      <div className="container">
        <div className="row">
          <div className="col">
            <a href="https://suffolklitlab.org" className={styles.SuffolkLogo}>
              <Image
                src={'/lit-lab-logo-large.svg'}
                alt={message(locale, 'footer.logoAlt')}
                className="img-fluid mb-3"
                width={792}
                height={321.38}
              />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex gap-2 justify-content-center flex-wrap">
            <a href="mailto:massaccess@suffolk.edu">
              {message(locale, 'footer.contact')}
            </a>
            <Link href="/privacy" hrefLang="en">
              {message(locale, 'footer.privacy')}
            </Link>
            <Link href="/sitemap.xml">{message(locale, 'footer.sitemap')}</Link>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <p>© {new Date().getFullYear()} Suffolk University Law School</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
