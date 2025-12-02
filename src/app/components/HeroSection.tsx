'use client';
import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import { fetchSpotData } from '../../data/fetchSpotData';
import SpotResultsContainer from './SpotResultsContainer';
import styles from '../css/HeroSection.module.css';

const HeroSection = ({ path, interviews, isError }) => {
  const [text, setText] = useState('');
  const [saveData, setSaveData] = useState(true);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  // Stable container ref for popover
  const popoverContainerRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (event) => {
    setText(event.target.value);
    if (validationError) setValidationError('');
  };

  const handleCheckboxChange = () => {
    setSaveData(!saveData);
  };

  const handleFindHelpClick = async () => {
    if (text.length < 6) {
      setValidationError(
        'Please enter at least 6 characters to perform a search.'
      );
      return;
    }

    try {
      const data = { text: text, save_data: saveData ? 1 : 0 };
      const fetchedResults = await fetchSpotData(data);
      setResults(fetchedResults);
      setError('');
      // Manage display of topic cards when spot search is used. dom manipulation is used to keep Page components server components
      const topicCards = document.querySelectorAll('.topic-card-parent');
      topicCards.forEach((card) => {
        card.classList.add('hidden');
      });
      const showAllButton = document.querySelector('.show-all-toggle');
      if (showAllButton) {
        showAllButton.classList.add('hidden');
      }
    } catch (e) {
      setError(e.message);
      setResults(null);
    }
  };

  const handleCancelSpotSearch = () => {
    setResults(null);
    setText('');
    setError('');
    setValidationError('');
    // Restore topic cards visibility
    const topicCards = document.querySelectorAll('.topic-card-parent');
    topicCards.forEach((card) => {
      card.classList.remove('hidden');
    });
    const showAllButton = document.querySelector('.show-all-toggle');
    if (showAllButton) {
      showAllButton.classList.remove('hidden');
    }
  };

  return (
    <section id="hero-section" className={styles.HeroSection + ' py-5'}>
      <div className="container">
        <div className="row gx-5">
          <div className="col-lg-6" id="hero-left">
            <h1 className="display-5 mb-4">
              Free DIY legal help for Massachusetts
            </h1>
            <p>
              Use our free step-by-step interactive forms to get help with your
              legal problem. Use your own words to find the right form or browse
              forms by category.
            </p>
          </div>
          <div className="col-lg-6" id="hero-right" ref={popoverContainerRef}>
            <h2>Describe your legal problem</h2>
            <textarea
              className="form-control form-control-lg"
              value={text}
              onChange={handleInputChange}
              placeholder="Tell us without including your personal information, like name or address"
              aria-label="Tell us without including your personal information, like name or address"
            />
            <div className="d-flex align-items-center justify-content-between mt-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={saveData}
                  onChange={handleCheckboxChange}
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Use my reply to help others
                </label>
              </div>
              <Button onClick={handleFindHelpClick} className="btn btn-primary">
                Find help
              </Button>
            </div>
            <div className={styles.SpotInfo + ' mt-2'}>
              <OverlayTrigger
                placement="right"
                trigger={['click']}
                rootClose={true}
                container={() => popoverContainerRef.current}
                overlay={
                  <Popover id="spot-popover">
                    <Popover.Header as="h3">About SPOT</Popover.Header>
                    <Popover.Body>
                      <p className="mb-1">
                        When you type in your problem description, we use the
                        nonprofit SPOT legal problem spotter to help find the
                        best legal resources for you. If you do not want to
                        share your problem with SPOT, please pick a topic from
                        the list below.
                      </p>
                      <p className="mb-0">
                        Read SPOT's{' '}
                        <a
                          href="https://spot.suffolklitlab.org/terms/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          privacy policy
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
                  aria-label="What is this?"
                >
                  what is this?
                </button>
              </OverlayTrigger>
            </div>
            {validationError && (
              <p className="text-danger">{validationError}</p>
            )}
            {error && (
              <p className="text-danger">Error. Please try again later.</p>
            )}
          </div>
        </div>
      </div>
      {results && (
        <SpotResultsContainer
          data={results}
          interviews={interviews}
          path={path}
          searchQuery={text}
          onCancel={handleCancelSpotSearch}
        />
      )}
    </section>
  );
};

export default HeroSection;
