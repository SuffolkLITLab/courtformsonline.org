'use client';
import { useState } from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from '../css/SearchSection.module.css';

// This is a front-end search form. It only searches the information shown
// in the DOM (the interview title and description).

export default function SearchSection({ serverName }) {
  const [searchText, setSearchText] = useState('');
  const interviews = document.querySelectorAll('.form');

  const handleSearchInput = (event) => {
    let searchText = event.target.value.toLowerCase();
    let clearSearch = document.querySelector('#clear-search');
    setSearchText(searchText);
    if (searchText) {
      clearSearch.classList.remove('hidden');
    } else {
      clearSearch.classList.add('hidden');
      interviews.forEach((interview) => {
        interview.classList.remove('hidden');
      });
    }
    interviews.forEach((interview) => {
      if (interview.textContent.toLowerCase().indexOf(searchText) == -1) {
        interview.classList.add('hidden');
      } else {
        interview.classList.remove('hidden');
      }
    });
  };

  const clearSearchInput = () => {
    interviews.forEach((interview) => {
      let searchField = document.querySelector(
        '#search-field'
      ) as HTMLInputElement;
      let clearSearch = document.querySelector('#clear-search');
      searchField.value = '';
      clearSearch.classList.add('hidden');
      interview.classList.remove('hidden');
    });
  };

  return (
    <section id="search-forms" className="mb-5">
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
    </section>
  );
}
