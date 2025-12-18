'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faLanguage,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

import { prefix } from '../../../prefix';
import styles from '../css/NavigationBar.module.css';
import { pathToServerConfig } from '../../config/formSources.config';

export default function NavigationBar() {
  const params = useParams();
  const path = params && Object.hasOwn(params, 'path') ? params.path : 'ma';
  let pathSegment = '';
  if (path && path.length > 0) pathSegment = '/' + path;

  // Get current jurisdiction name and available jurisdictions
  const currentJurisdiction =
    pathToServerConfig[path as string]?.name || 'Massachusetts';
  const availableJurisdictions = Object.entries(pathToServerConfig).map(
    ([p, config]) => ({
      path: p,
      name: (config as any).name,
    })
  );
  return (
    <nav
      role="navigation"
      className={styles.NavigationBar + ' navbar navbar-expand-lg navbar-dark'}
    >
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image
            src={'/lit-lab-torch-inverted.svg'}
            alt="LIT Lab logo"
            className={styles.NavLogo + ' logo-image me-2'}
            height={47.99}
            width={21.97}
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
            {/* Jurisdiction selector dropdown */}
            <li className="nav-item dropdown">
              <a
                className={styles.NavLink + ' dropdown-toggle'}
                href="#"
                id="jurisdictionDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {currentJurisdiction}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="ms-1"
                  style={{ fontSize: '0.7em' }}
                />
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="jurisdictionDropdown"
              >
                {availableJurisdictions.map((j) => (
                  <li key={j.path}>
                    <Link
                      href={`/${j.path}`}
                      className={
                        'dropdown-item' +
                        (j.path === path ? ' active fw-bold' : '')
                      }
                    >
                      {j.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link href={pathSegment + '/forms'} className={styles.NavLink}>
                All forms
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
