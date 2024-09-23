'use client';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import { fetchSpotData } from '../../data/fetchSpotData';
import SpotResultsContainer from './SpotResultsContainer';
import styles from '../css/HeroSection.module.css';

const HeroSection = ({ path, interviews, isError }) => {
  const [text, setText] = useState('');
  const [saveData, setSaveData] = useState(true);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');

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
        showAllButton.classList.remove('hidden');
      }
    } catch (e) {
      setError(e.message);
      setResults(null);
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
          <div className="col-lg-6" id="hero-right">
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
        />
      )}
    </section>
  );
};

export default HeroSection;
