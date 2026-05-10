'use client';
import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import { fetchSpotData } from '../../data/fetchSpotData';
import SpotResultsContainer from './SpotResultsContainer';
import styles from '../css/HeroSection.module.css';
import { pathToServerConfig } from '../../config/formSources.config';

const stateOutlines = {
  ma: {
    viewBox: '0 0 4.571 2.391',
    path: 'M3.091 0.500 L3.189 0.516 L3.228 0.692 L3.184 0.834 L3.025 0.966 L3.019 1.119 L3.238 1.141 L3.370 1.300 L3.348 1.426 L3.458 1.458 L3.469 1.573 L3.748 1.672 L4.071 1.579 L4.000 1.716 L3.523 1.836 L3.348 1.842 L3.244 1.749 L3.080 1.776 L3.074 1.847 L2.888 1.891 L2.811 1.710 L2.784 1.678 L2.680 1.606 L2.625 1.371 L2.477 1.371 L2.209 1.382 L2.209 1.365 L0.955 1.349 L0.522 1.338 L0.500 1.300 L0.741 0.642 L1.552 0.659 L2.713 0.692 L2.822 0.599 L3.091 0.500 Z',
  },
  me: {
    viewBox: '0 0 5.102 5.403',
    path: 'M0.878 4.903 L0.757 4.832 L0.774 4.734 L0.615 4.619 L0.549 3.304 L0.500 2.658 L0.933 2.521 L0.861 2.450 L1.026 2.296 L1.196 2.225 L1.163 2.165 L1.322 2.072 L1.272 1.897 L1.371 1.634 L1.524 1.546 L1.584 1.267 L2.357 0.500 L2.537 0.533 L2.548 0.719 L2.680 0.785 L3.003 0.675 L3.206 0.675 L3.348 0.604 L3.627 0.763 L3.792 0.894 L3.803 2.017 L3.781 2.285 L4.126 2.357 L4.076 2.472 L4.164 2.581 L4.093 2.680 L4.235 2.833 L4.421 2.800 L4.602 3.156 L4.394 3.315 L4.274 3.255 L4.175 3.364 L4.033 3.337 L4.016 3.430 L3.830 3.419 L3.534 3.633 L3.463 3.485 L3.359 3.474 L3.408 3.633 L3.178 3.709 L3.123 3.584 L3.014 3.649 L2.757 3.649 L2.751 3.501 L2.598 3.534 L2.625 3.638 L2.483 3.857 L2.510 3.918 L2.324 4.038 L2.138 3.994 L2.028 4.120 L1.875 4.137 L1.749 4.241 L1.595 4.219 L1.552 4.109 L1.327 4.285 L1.387 4.394 L1.223 4.432 L1.212 4.526 L1.026 4.641 L0.878 4.903 Z',
  },
  mi: {
    viewBox: '0 0 9.002 7.479',
    path: 'M7.461 6.941 L6.108 6.979 L6.108 6.913 L4.925 6.913 L4.093 6.913 L4.296 6.782 L4.432 6.557 L4.558 6.421 L4.652 6.229 L4.706 5.955 L4.684 5.659 L4.389 5.079 L4.482 4.860 L4.416 4.597 L4.646 4.328 L4.695 4.104 L4.662 3.983 L4.827 3.934 L4.849 3.770 L5.106 3.726 L5.303 3.545 L5.287 3.907 L5.391 3.923 L5.522 3.742 L5.528 3.436 L5.610 3.359 L5.884 3.310 L5.796 3.096 L5.977 2.915 L6.201 2.904 L6.453 3.019 L6.700 3.036 L6.820 3.178 L7.007 3.189 L7.319 3.321 L7.428 3.315 L7.598 3.529 L7.461 3.644 L7.593 3.792 L7.642 3.961 L7.582 4.334 L7.379 4.427 L7.330 4.619 L7.089 4.684 L6.957 4.914 L7.007 5.002 L7.248 5.084 L7.434 4.958 L7.653 4.701 L7.998 4.602 L8.168 4.679 L8.272 4.821 L8.376 5.238 L8.392 5.446 L8.502 5.698 L8.398 6.059 L8.233 6.114 L8.228 5.982 L8.118 6.021 L7.992 6.322 L7.790 6.437 L7.730 6.667 L7.478 6.859 L7.461 6.941 Z M5.407 2.943 L5.424 3.063 L5.292 3.085 L5.347 2.915 L5.407 2.943 Z M3.326 3.578 L3.173 3.474 L3.266 3.332 L3.030 3.310 L3.123 3.173 L3.134 2.997 L2.926 2.877 L2.811 2.751 L2.384 2.652 L2.253 2.685 L1.825 2.537 L0.796 2.335 L0.686 2.165 L0.500 2.105 L0.889 2.001 L1.064 1.880 L1.502 1.831 L1.787 1.683 L1.919 1.678 L2.028 1.573 L2.340 1.426 L2.499 1.300 L2.735 1.217 L2.959 1.289 L2.565 1.595 L2.472 1.699 L2.477 1.886 L2.669 1.743 L3.014 1.765 L3.282 1.864 L3.523 2.138 L3.655 2.187 L3.907 2.143 L3.967 2.203 L4.219 2.236 L4.756 2.006 L5.035 1.984 L5.407 1.995 L5.659 1.919 L5.851 1.913 L5.889 2.192 L6.086 2.231 L6.284 2.187 L6.366 2.253 L6.497 2.170 L6.788 2.143 L6.793 2.494 L6.924 2.641 L7.122 2.680 L7.144 2.581 L7.335 2.581 L7.439 2.685 L7.352 2.762 L6.804 2.696 L6.541 2.740 L6.256 2.620 L6.174 2.729 L6.212 2.822 L6.086 2.800 L5.900 2.663 L5.577 2.581 L5.413 2.576 L5.254 2.707 L4.991 2.740 L4.706 2.713 L4.591 2.767 L4.564 2.877 L4.252 2.970 L4.268 2.839 L4.131 2.811 L4.076 2.948 L3.846 2.954 L3.742 3.014 L3.589 3.249 L3.304 3.551 L3.326 3.578 Z M2.110 0.697 L1.858 0.823 L1.727 0.840 L1.738 0.736 L2.368 0.500 L2.247 0.664 L2.110 0.697 Z',
  },
  mn: {
    viewBox: '0 0 8.613 6.882',
    path: 'M5.714 3.178 L5.637 3.134 L5.435 3.217 L5.435 3.808 L5.374 3.868 L5.090 3.950 L4.860 4.164 L4.843 4.306 L4.958 4.317 L5.084 4.443 L4.969 4.597 L4.991 4.767 L4.920 5.133 L5.183 5.314 L5.391 5.331 L5.495 5.440 L5.802 5.550 L5.851 5.681 L6.136 5.851 L6.295 5.889 L6.486 6.108 L6.459 6.267 L6.514 6.382 L6.360 6.382 L1.278 6.382 L1.278 4.586 L1.048 4.471 L0.872 4.279 L1.146 4.065 L1.168 3.950 L1.130 3.551 L1.009 3.447 L0.927 3.228 L0.944 2.959 L0.905 2.915 L0.872 2.275 L0.675 1.935 L0.599 1.743 L0.566 1.338 L0.631 1.201 L0.500 0.883 L2.576 0.883 L2.576 0.500 L2.773 0.511 L2.904 0.588 L3.036 1.108 L3.140 1.168 L3.469 1.185 L3.507 1.234 L3.890 1.256 L3.934 1.365 L4.263 1.338 L4.263 1.294 L4.520 1.239 L4.745 1.261 L5.002 1.343 L5.073 1.448 L5.221 1.437 L5.358 1.661 L5.424 1.568 L5.676 1.524 L5.720 1.617 L6.015 1.683 L6.015 1.771 L6.163 1.842 L6.464 1.804 L6.645 1.705 L6.892 1.645 L6.979 1.793 L7.149 1.760 L7.352 1.793 L7.587 1.771 L7.856 1.897 L8.113 1.875 L8.091 1.929 L7.757 2.055 L7.291 2.154 L6.990 2.258 L6.557 2.516 L6.371 2.674 L6.086 2.855 L5.637 3.096 L5.714 3.178 Z',
  },
  mo: {
    viewBox: '0 0 7.633 5.617',
    path: 'M4.432 0.505 L4.537 0.500 L4.739 0.703 L4.849 0.736 L4.761 0.878 L4.772 1.081 L4.898 1.387 L5.205 1.645 L5.539 1.858 L5.605 2.187 L5.681 2.247 L5.796 2.154 L6.015 2.198 L6.158 2.269 L6.059 2.390 L6.086 2.483 L5.917 2.740 L5.911 2.899 L6.207 3.102 L6.317 3.233 L6.426 3.211 L6.749 3.425 L6.749 3.578 L6.831 3.770 L6.749 3.835 L6.974 4.120 L7.133 4.131 L7.050 4.537 L6.903 4.493 L6.848 4.619 L6.782 4.619 L6.727 4.619 L6.733 4.865 L6.536 5.117 L5.889 5.117 L6.048 4.931 L6.201 4.810 L6.114 4.619 L1.793 4.613 L1.650 4.613 L1.650 4.115 L1.656 1.957 L1.442 1.908 L1.283 1.672 L1.157 1.573 L1.382 1.283 L1.059 1.207 L0.960 1.113 L0.714 0.851 L0.500 0.527 L1.634 0.544 L3.008 0.533 L4.432 0.505 Z',
  },
  vt: {
    viewBox: '0 0 2.944 3.284',
    path: 'M2.433 0.500 L2.444 0.599 L2.307 0.763 L2.400 0.927 L2.236 1.097 L1.902 1.190 L1.908 1.437 L1.820 1.519 L1.732 1.743 L1.557 1.940 L1.480 2.362 L1.491 2.505 L1.404 2.559 L1.393 2.707 L1.480 2.784 L0.670 2.767 L0.659 2.680 L0.692 1.990 L0.533 1.825 L0.588 1.743 L0.500 1.469 L0.615 1.267 L0.642 1.075 L0.549 0.894 L0.604 0.708 L0.593 0.500 L1.628 0.511 L2.433 0.500 Z',
  },
  il: {
    viewBox: '0 0 5.009 6.526',
    path: 'M1.365 0.500 L3.217 0.516 L4.202 0.516 L4.170 0.708 L4.323 0.933 L4.482 1.300 L4.476 3.660 L4.367 3.841 L4.493 4.055 L4.509 4.230 L4.383 4.372 L4.350 4.504 L4.170 4.717 L4.055 4.734 L4.082 4.860 L4.005 4.909 L3.945 5.144 L3.978 5.210 L3.846 5.353 L3.940 5.528 L3.529 5.621 L3.490 5.725 L3.584 5.856 L3.458 5.939 L3.091 5.785 L2.976 5.796 L2.822 5.971 L2.872 6.026 L2.713 6.015 L2.488 5.730 L2.570 5.665 L2.488 5.473 L2.488 5.320 L2.165 5.106 L2.055 5.128 L1.946 4.997 L1.650 4.794 L1.656 4.635 L1.825 4.378 L1.798 4.285 L1.897 4.164 L1.754 4.093 L1.535 4.049 L1.420 4.142 L1.343 4.082 L1.278 3.753 L0.944 3.540 L0.637 3.282 L0.511 2.976 L0.500 2.773 L0.588 2.631 L0.604 2.450 L0.883 2.340 L0.911 2.187 L1.042 2.088 L1.059 1.913 L0.894 1.771 L0.960 1.595 L1.349 1.546 L1.661 1.420 L1.694 1.267 L1.825 1.201 L1.864 1.009 L1.836 0.883 L1.612 0.785 L1.584 0.681 L1.365 0.500 Z',
  },
};

function StateOutline({ pathKey, className }) {
  const outline = stateOutlines[pathKey] || stateOutlines.ma;

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

const HeroSection = ({ path, interviews, isError }) => {
  const [text, setText] = useState('');
  const [saveData, setSaveData] = useState(true);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  // Stable container ref for popover
  const popoverContainerRef = useRef<HTMLDivElement | null>(null);

  // Get jurisdiction name from path
  const jurisdictionName = pathToServerConfig[path]?.name || 'Massachusetts';
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
            <h1 className={`${styles.HeroHeadline} display-5 mb-4`}>
              <span className={styles.StateOutlineWrap} aria-hidden="true">
                <StateOutline
                  pathKey={path}
                  className={styles.StateOutlineIcon}
                />
              </span>
              <span className={styles.HeroHeadlineText}>
                Free DIY legal help for {jurisdictionName}
              </span>
            </h1>
            <p>
              Use our free step-by-step interactive forms to get help with your
              legal problem. Use your own words to find the right form or browse
              forms by category.
            </p>
          </div>
          <div className="col-lg-6" id="hero-right" ref={popoverContainerRef}>
            <div className="d-flex align-items-end gap-2 flex-wrap mb-3">
              <h2 className="mb-0">Describe your legal problem</h2>
              <div className={styles.SpotInfo}>
                <OverlayTrigger
                  placement="left"
                  trigger={['click']}
                  rootClose={true}
                  container={() => popoverContainerRef.current}
                  overlay={
                    <Popover id="spot-popover">
                      <Popover.Header as="h3">How this works</Popover.Header>
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
                    What is this?
                  </button>
                </OverlayTrigger>
              </div>
            </div>
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
              <div className="d-flex gap-2">
                {results && (
                  <Button
                    variant="outline-secondary"
                    onClick={handleCancelSpotSearch}
                    aria-label="Cancel search and return to all categories"
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  onClick={handleFindHelpClick}
                  className="btn btn-primary"
                >
                  Find help
                </Button>
              </div>
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
