import Link from 'next/link';
import Image from 'next/image';
import { prefix } from '../../../prefix';
import styles from '../css/Footer.module.css';

export default function Footer() {
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
                src="lit-lab-logo-large.svg"
                alt="Suffolk University Law School Legal Information & Technology Lab logo"
                className="img-fluid mb-3"
                width={792}
                height={321.38}
              />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Link href="/privacy">Terms of Use</Link>
          </div>
          <div className="col">
            <a href="mailto:massaccess@suffolk.edu">Contact</a>
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
