'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function extractKeywordFromPath(pathname: string): string {
  // Get the last segment of the path
  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || '';

  // Replace common URL separators with spaces
  return lastSegment.replace(/[-_]/g, ' ').replace(/%20/g, ' ').trim();
}

export default function NotFound() {
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    // Get the actual URL path on the client side
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      setKeyword(extractKeywordFromPath(pathname));

      const endpoint = process.env.NEXT_PUBLIC_404_LOG_ENDPOINT;
      if (endpoint) {
        const payload = JSON.stringify({
          event: '404',
          pathname,
          referrer: document.referrer || null,
          timestamp: new Date().toISOString(),
        });

        if (navigator.sendBeacon) {
          navigator.sendBeacon(
            endpoint,
            new Blob([payload], { type: 'application/json' })
          );
        } else {
          void fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
            body: payload,
            keepalive: true,
            mode: 'no-cors',
          });
        }
      }
    }
  }, []);

  const handleSearchClick = () => {
    // Store the keyword in sessionStorage so the forms page can pre-fill the search
    if (typeof window !== 'undefined' && keyword) {
      sessionStorage.setItem('searchKeyword', keyword);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <h1 className="display-4 mb-3">404</h1>
          <p className="lead mb-4">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>

          {keyword && (
            <p className="mb-4">
              Were you looking for a form?
              <br />
              <Link
                href="/forms"
                className="btn btn-primary mt-3"
                onClick={handleSearchClick}
              >
                Search for forms about &quot;{keyword}&quot;
              </Link>
            </p>
          )}

          <p className="mb-4">
            <Link href="/" className="btn btn-outline-secondary me-2">
              Go to home
            </Link>
            <Link href="/forms" className="btn btn-outline-secondary">
              Browse all forms
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
