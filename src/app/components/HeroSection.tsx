'use client';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import SpotResultsContainer from './SpotResultsContainer';
import { fetchSpotData } from '../../data/fetchSpotData';

const HeroSection = () => {
  const [text, setText] = useState('');
  const [saveData, setSaveData] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleCheckboxChange = () => {
    setSaveData(!saveData);
  };

  const handleFindHelpClick = async () => {
    try {
      const data = { text: text, save_data: saveData ? 1 : 0 };
      const fetchedResults = await fetchSpotData(data);
      setResults(fetchedResults);
      setError('');
    } catch (e) {
      setError(e.message);
      setResults(null);
    }
  };

  return (
    <section id="hero-section">
      <div className="container">
        <div className="row gx-5">
          <div className="col-lg-6" id="hero-left">
            <h1>Free DIY legal help for Massachusetts</h1>
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

              <Button onClick={handleFindHelpClick} className="hero-button">
                Find help
              </Button>
            </div>
            {error && <p className="text-danger">{error}</p>}
          </div>
        </div>
      </div>
      {results && <SpotResultsContainer data={results} />}
    </section>
  );
};

export default HeroSection;
