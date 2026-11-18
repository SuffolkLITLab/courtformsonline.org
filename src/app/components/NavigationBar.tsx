'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

import styles from '../css/NavigationBar.module.css';
import { pathToServerConfig } from '../../config/formSources.config';
import { message, type Locale } from '../../i18n/messages';
import {
  alternateLanguagePath,
  blogPath,
  formsPath,
  spanishLandingPath,
} from '../../i18n/routes';
import { getAvailableJurisdictions } from '../../utils/jurisdiction';

export default function NavigationBar({
  locale = 'en',
  translatedBlogSlugs = [],
}: {
  locale?: Locale;
  translatedBlogSlugs?: string[];
}) {
  const params = useParams();
  const pathname = usePathname();
  const isSpanish = locale === 'es';
  const otherLocale = isSpanish ? 'en' : 'es';
  const path = params && Object.hasOwn(params, 'path') ? params.path : 'ma';
  // Get current jurisdiction name and available jurisdictions
  const currentJurisdiction =
    pathToServerConfig[path as string]?.name || 'Massachusetts';
  const availableJurisdictions = getAvailableJurisdictions();
  return (
    <nav
      role="navigation"
      className={styles.NavigationBar + ' navbar navbar-expand-lg navbar-dark'}
    >
      <div className="container">
        <Link
          href={isSpanish ? '/es' : '/'}
          className={styles.NavBrand + ' navbar-brand'}
        >
          <Image
            src="/court-forms-online-logo.svg"
            alt="Court Forms Online"
            className={styles.NavLogo}
            height={48}
            width={252}
            priority
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label={message(locale, 'nav.toggle')}
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
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="jurisdictionDropdown"
              >
                {availableJurisdictions.map((j) => (
                  <li key={j.path}>
                    <Link
                      href={
                        isSpanish ? spanishLandingPath(j.path) : `/${j.path}`
                      }
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
              <Link
                href={formsPath(
                  locale,
                  typeof path === 'string' ? path : undefined
                )}
                className={styles.NavLink}
              >
                {message(locale, 'nav.forms')}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href={isSpanish ? '/es/family' : '/family'}
                className={styles.NavLink}
              >
                {message(locale, 'nav.family')}
              </Link>
            </li>
            <li className="nav-item">
              <Link href={blogPath(locale)} className={styles.NavLink}>
                {message(locale, 'nav.news')}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/guides" hrefLang="en" className={styles.NavLink}>
                {message(locale, 'nav.guides')}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" hrefLang="en" className={styles.NavLink}>
                {message(locale, 'nav.about')}
              </Link>
            </li>
            <li className="nav-item">
              <a
                href={alternateLanguagePath(
                  pathname || '/',
                  locale,
                  translatedBlogSlugs
                )}
                className={styles.NavLink}
                hrefLang={otherLocale}
                lang={otherLocale}
              >
                <FontAwesomeIcon
                  icon={faLanguage}
                  className="me-1"
                  aria-hidden="true"
                />
                {isSpanish ? 'English' : 'Español'}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
