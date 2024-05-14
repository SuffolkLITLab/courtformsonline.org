import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function NavigationBar() {
  return (
    <nav
      role="navigation"
      className="navbar navbar-expand-lg navbar-dark courtformsonline-navbar"
    >
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image
            src="/logo-short.png"
            width={66.5}
            height={40}
            alt="Logo"
            className="logo-image me-2"
          />
          <span id="nav-header-text" className="logo-text">
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
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
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
            </li>
            <li className="nav-item">
              <Link href="/forms" className="nav-link">
                Forms
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/news" className="nav-link">
                News
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link">
                About us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
