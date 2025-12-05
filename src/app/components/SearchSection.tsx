'use client';
import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from '../css/SearchSection.module.css';

// This is a front-end search form. It only searches the information shown
// in the DOM (the interview title and description).

export default function SearchSection({ serverName }) {
  const [searchText, setSearchText] = useState('');

  // Function to perform the actual search/filter
  const performSearch = useCallback((text: string) => {
    const interviews = document.querySelectorAll('.form');
    const clearSearch = document.querySelector('#clear-search');
    const noSearchResults = document.querySelector('#no-search-results');

    if (!noSearchResults || !clearSearch) return;

    let interviewsShown = 0;
    const searchLower = text.toLowerCase();

    noSearchResults.classList.add('hidden');

    if (text) {
      clearSearch.classList.remove('hidden');
    } else {
      clearSearch.classList.add('hidden');
      interviews.forEach((interview) => {
        interview.classList.remove('hidden');
      });
      return;
    }

    interviews.forEach((interview) => {
      if (interview.textContent?.toLowerCase().indexOf(searchLower) === -1) {
        interview.classList.add('hidden');
      } else {
        interview.classList.remove('hidden');
        interviewsShown++;
      }
    });

    if (interviewsShown === 0) {
      noSearchResults.classList.remove('hidden');
    }
  }, []);

  // Check for stored search keyword from 404 page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedKeyword = sessionStorage.getItem('searchKeyword');
      if (storedKeyword) {
        sessionStorage.removeItem('searchKeyword');
        setSearchText(storedKeyword);

        // Set the search field value
        const searchField = document.querySelector(
          '#search-field'
        ) as HTMLInputElement;
        if (searchField) {
          searchField.value = storedKeyword;
        }

        // Wait for the forms to be rendered, then perform search
        // Use a small delay and also observe for DOM changes
        const trySearch = () => {
          const interviews = document.querySelectorAll('.form');
          if (interviews.length > 0) {
            performSearch(storedKeyword);
          } else {
            // Retry after a short delay if forms aren't loaded yet
            setTimeout(trySearch, 100);
          }
        };

        // Start trying after a brief delay to let the page render
        setTimeout(trySearch, 100);
      }
    }
  }, [performSearch]);

  const handleSearchInput = (event) => {
    const text = event.target.value;
    setSearchText(text);
    performSearch(text);
  };

  const clearSearchInput = () => {
    const searchField = document.querySelector(
      '#search-field'
    ) as HTMLInputElement;
    if (searchField) {
      searchField.value = '';
    }
    setSearchText('');
    performSearch('');
  };

  return (
    <section id="search-forms" className="mt-3 mb-5">
      <label htmlFor="search-field" className="form-label">
        {serverName && serverName.length > 0
          ? 'Search ' + serverName + ' forms'
          : 'Search forms'}
      </label>
      <input
        id="search-field"
        className="search-field form-control"
        onInput={handleSearchInput}
      />
      <a
        id="clear-search"
        className={styles.ClearSearchButton + ' clear-search hidden'}
        role="button"
        onClick={clearSearchInput}
      >
        Clear search
      </a>
      <p id="no-search-results" className="no-search-results mt-5 hidden">
        No forms found.
      </p>
    </section>
  );
}
