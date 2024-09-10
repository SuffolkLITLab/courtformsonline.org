'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { prefix } from '../../../prefix';
import styles from '../css/NavigationBar.module.css';
import nextConfig from '../../../next.config';
import toUpperCase from 'react';

interface PageProps {
  params: {
    path: string;
  };
}


export default function NavigationBar({ params }: PageProps) {
  let { path = '' } = useParams();
  console.log(path);
  let abbrev = '';
  if (typeof path === 'string' && path.trim().length > 0) {
    abbrev = ' ' + path.toUpperCase();
    path = '/' + path;
  }
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
              <Link href={path + '/forms'} className={styles.NavLink}>
                All{abbrev} Forms
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
