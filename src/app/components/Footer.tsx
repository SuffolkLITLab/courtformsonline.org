import Link from 'next/link';
import Image from 'next/image'
import { prefix } from '../../../prefix'

export default function Footer() {
  return (
    <footer role="contentinfo" className="text-center py-4">
      <div className="container">
        <div className="row">
          <div className="col">
            <a href="https://suffolk.edu">
            <Image
                src={`${prefix}/suffolk_law.png`}
                alt="Suffolk University Law School"
                className="img-fluid mb-2 suffolk-logo"
                width={497}
                height={70}
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
        <div className="row mt-2">
          <div className="col">
            <p>© {new Date().getFullYear()} Suffolk University Law School</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
