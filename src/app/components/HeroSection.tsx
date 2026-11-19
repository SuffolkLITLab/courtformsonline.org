'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import { message, type Locale } from '../../i18n/messages';
import { fetchFormSearch } from '../../data/fetchFormSearch';
import { SearchResults } from '../../data/formSearch';
import { stateOutlines } from '../../data/stateOutlines';
import SpotResultsContainer from './SpotResultsContainer';
import styles from '../css/HeroSection.module.css';
import { pathToServerConfig } from '../../config/formSources.config';

function StateOutline({ pathKey, className }) {
  const outline = stateOutlines[pathKey];
  if (!outline) return null;

  return (
    <svg
      viewBox={outline.viewBox}
      aria-hidden="true"
      focusable="false"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={outline.path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

const HeroSection = ({
  path,
  interviews,
  isError,
  locale = 'en',
}: {
  path: string;
  interviews: import('../../data/formSearch').InterviewsByTopic | [];
  isError: boolean;
  locale?: Locale;
}) => {
  const [text, setText] = useState('');
  const [helpMode, setHelpMode] = useState<'describe' | 'checkup'>('describe');
  const [saveData, setSaveData] = useState(true);
  const [results, setResults] = useState<SearchResults | null>(null);
  const [error, setError] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [slowSearch, setSlowSearch] = useState(false);
  useEffect(() => {
    setSlowSearch(false);
    if (!loading) return;
    const timer = setTimeout(() => setSlowSearch(true), 8000);
    return () => clearTimeout(timer);
  }, [loading]);
  const requestRef = useRef<AbortController | null>(null);
  useEffect(() => () => requestRef.current?.abort(), []);
  const [validationError, setValidationError] = useState('');
  // Stable container ref for popover
  const popoverContainerRef = useRef<HTMLDivElement | null>(null);

  // Get jurisdiction name from path
  const jurisdictionName = pathToServerConfig[path]?.name || 'Massachusetts';
  const hasCheckup = path === 'ma';
  const showDescribe = !hasCheckup || helpMode === 'describe';
  const SearchHeading = hasCheckup ? 'h3' : 'h2';
  const handleInputChange = (event) => {
    setText(event.target.value);
    if (validationError) setValidationError('');
  };

  const handleCheckboxChange = () => {
    setSaveData(!saveData);
  };

  const handleFindHelpClick = async () => {
    const query = text.trim();
    if (!query || query.length > 4000) {
      setValidationError(message(locale, 'hero.validation'));
      return;
    }
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setSubmittedText(query);
    setResults({ labels: [] });
    setError('');
    setValidationError('');
    if (!saveData) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const fetchedResults = await fetchFormSearch(
        query,
        saveData,
        controller.signal
      );
      if (requestRef.current === controller && !controller.signal.aborted)
        setResults(fetchedResults);
    } catch (e) {
      if (requestRef.current === controller)
        setError(
          e instanceof Error && e.name !== 'AbortError'
            ? locale === 'en'
              ? e.message
              : message(
                  locale,
                  e.message.startsWith('Please wait')
                    ? 'hero.searchRateLimit'
                    : 'hero.searchError'
                )
            : message(locale, 'hero.timeout')
        );
    } finally {
      clearTimeout(timeout);
      if (requestRef.current === controller) setLoading(false);
    }
  };

  const handleCancelSpotSearch = () => {
    requestRef.current?.abort();
    requestRef.current = null;
    setLoading(false);
    setResults(null);
    setText('');
    setError('');
    setValidationError('');
  };

  useEffect(() => {
    if (!results || !showDescribe) return;
    // These cards are rendered by the server page. Restore their previous
    // visibility when leaving search, including the Show all collapsed state.
    const elements = Array.from(
      document.querySelectorAll('.topic-card-parent, .show-all-toggle')
    ).map((element) => ({
      element,
      wasHidden: element.classList.contains('hidden'),
    }));
    elements.forEach(({ element }) => element.classList.add('hidden'));
    return () => {
      elements.forEach(({ element, wasHidden }) =>
        element.classList.toggle('hidden', wasHidden)
      );
    };
  }, [results, showDescribe]);

  return (
    <section id="hero-section" className={styles.HeroSection + ' py-5'}>
      <div className="container">
        <div className="row gx-5">
          <div className="col-lg-6" id="hero-left">
            <h1 className={`${styles.HeroHeadline} display-5 mb-4`}>
              <span className={styles.StateOutlineWrap} aria-hidden="true">
                <StateOutline
                  pathKey={path}
                  className={styles.StateOutlineIcon}
                />
              </span>
              <span className={styles.HeroHeadlineText}>
                {message(locale, 'hero.headline', { state: jurisdictionName })}
              </span>
            </h1>
            <p>{message(locale, 'hero.intro')}</p>
          </div>
          <div className="col-lg-6" id="hero-right" ref={popoverContainerRef}>
            {hasCheckup && (
              <>
                <h2 className="mb-3">
                  {message(locale, 'hero.findLegalHelp')}
                </h2>
                <div
                  className={styles.HelpSwitch}
                  role="group"
                  aria-label={message(locale, 'hero.choose')}
                >
                  <button
                    type="button"
                    aria-pressed={helpMode === 'describe'}
                    aria-controls="describe-option"
                    onClick={() => setHelpMode('describe')}
                  >
                    {message(locale, 'hero.describe')}
                  </button>
                  <button
                    type="button"
                    aria-pressed={helpMode === 'checkup'}
                    aria-controls="checkup-option"
                    onClick={() => setHelpMode('checkup')}
                  >
                    {message(locale, 'hero.checkup')}
                  </button>
                </div>
              </>
            )}
            <section
              id="describe-option"
              hidden={!showDescribe}
              aria-labelledby="describe-problem-heading"
            >
              <div className="d-flex align-items-end gap-2 flex-wrap mb-3">
                <SearchHeading
                  id="describe-problem-heading"
                  className={hasCheckup ? 'visually-hidden' : 'mb-0'}
                >
                  {message(locale, 'hero.searchHeading')}
                </SearchHeading>
                {hasCheckup && (
                  <p className="mb-0">{message(locale, 'hero.searchIntro')}</p>
                )}
                <div className={styles.SpotInfo}>
                  <OverlayTrigger
                    placement="left"
                    trigger={['click']}
                    rootClose={true}
                    container={() => popoverContainerRef.current}
                    overlay={
                      <Popover id="spot-popover">
                        <Popover.Header as="h3">
                          {message(locale, 'hero.infoTitle')}
                        </Popover.Header>
                        <Popover.Body>
                          <p className="mb-1">
                            {message(locale, 'hero.infoSearch')}
                          </p>
                          <p className="mb-1">
                            {message(locale, 'hero.infoAI')}
                          </p>
                          <p className="mb-0">
                            {message(locale, 'hero.privacyIntro')}{' '}
                            <a
                              href="/privacy"
                              hrefLang="en"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {message(locale, 'hero.privacy')}
                            </a>
                            .
                          </p>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <button
                      type="button"
                      className="btn btn-link p-0 small text-muted"
                      aria-label={message(locale, 'hero.info')}
                    >
                      {message(locale, 'hero.info')}
                    </button>
                  </OverlayTrigger>
                </div>
              </div>
              <textarea
                className="form-control form-control-lg"
                maxLength={4000}
                value={text}
                onChange={handleInputChange}
                placeholder={message(locale, 'hero.placeholder')}
                aria-label={message(locale, 'hero.placeholder')}
              />
              <p className="small mt-2 mb-0">
                {message(locale, 'hero.keywordOnly')}
              </p>
              <div className="d-flex flex-wrap gap-3 align-items-center justify-content-between mt-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={saveData}
                    onChange={handleCheckboxChange}
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {message(locale, 'hero.share')}
                  </label>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {results && (
                    <Button
                      variant="outline-secondary"
                      onClick={handleCancelSpotSearch}
                      aria-label={message(locale, 'hero.cancelLabel')}
                    >
                      {message(locale, 'hero.cancel')}
                    </Button>
                  )}
                  <Button
                    disabled={loading}
                    onClick={handleFindHelpClick}
                    className="btn btn-primary"
                  >
                    {message(
                      locale,
                      loading ? 'hero.finding' : 'hero.findHelp'
                    )}
                  </Button>
                </div>
              </div>
              {loading && (
                <p role="status" className="mt-3">
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  />
                  {message(locale, slowSearch ? 'hero.slow' : 'hero.loading')}
                </p>
              )}
              {validationError && (
                <p className="text-danger">{validationError}</p>
              )}
              {error && (
                <p role="status">
                  {error} {message(locale, 'hero.keywordFallback')}
                </p>
              )}
            </section>
            {hasCheckup && (
              <section
                id="checkup-option"
                hidden={helpMode !== 'checkup'}
                aria-labelledby="checkup-option-heading"
              >
                <h3 id="checkup-option-heading" className="visually-hidden">
                  {message(locale, 'hero.checkupHeading')}
                </h3>
                <p>{message(locale, 'hero.checkupIntro')}</p>
                <Link
                  href="/ma/checkup"
                  hrefLang="en"
                  className="btn btn-primary"
                >
                  {message(locale, 'hero.startCheckup')}
                </Link>
              </section>
            )}
          </div>
        </div>
      </div>
      {results && showDescribe && (
        <SpotResultsContainer
          data={results}
          interviews={Array.isArray(interviews) ? {} : interviews}
          path={path}
          searchQuery={submittedText}
          loading={loading}
          locale={locale}
        />
      )}
    </section>
  );
};

export default HeroSection;
