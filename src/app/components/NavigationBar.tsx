'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faLanguage,
} from '@fortawesome/free-solid-svg-icons';
import { prefix } from '../../../prefix';
import styles from '../css/NavigationBar.module.css';
import nextConfig from '../../../next.config';

export default function NavigationBar() {
  const params = useParams();
  const path = typeof params.path !== 'undefined' ? params.path : false;
  let pathSegment = '';
  if (path && path.length > 0) pathSegment = '/' + path;
  return (
    <nav
      role="navigation"
      className={styles.NavigationBar + ' navbar navbar-expand-lg navbar-dark'}
    >
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image
            src={nextConfig.basePath + '/lit-lab-torch-inverted.svg'}
            alt="LIT Lab logo"
            className={styles.NavLogo + ' logo-image me-2'}
            height={263.32}
            width={120.52}
          />
          <span
            id="nav-header-text"
            className={styles.NavHeaderText + ' logo-text'}
          >
            Court Forms Online
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Removed until spanish data is available */}
            {/* <li className="nav-item dropdown">
              <a
                className={styles.NavLink + ' dropdown-toggle'
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-language fa-lg"></i> Language
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link href="#" className="dropdown-item">
                    English
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-item">
                    Español
                  </Link>
                </li>
              </ul>
            </li> */}
            <li className="nav-item">
              <Link href={pathSegment + '/forms'} className={styles.NavLink}>
                All{' '}
                {path && path.length > 0 ? (
                  <span className={styles.AllFormsPath}>{path}</span>
                ) : (
                  ' '
                )}{' '}
                Forms
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="https://suffolklitlab.org/category/document-assembly-line/"
                className={styles.NavLink}
                target="_blank"
              >
                News
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className={styles.ExternalLinkIcon + ' text-white ms-1'}
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className={styles.NavLink}>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
