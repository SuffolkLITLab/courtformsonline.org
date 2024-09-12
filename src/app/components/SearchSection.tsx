'use client';
import React from 'react';
import { useState } from 'react';
import { formSources } from '../../config/formSources.config';
import TopicCard from './TopicCard';
import { log } from 'console';

// This is a front-end search form. It only searches the information shown 
// in the DOM (the interview title and description).

const interviews = document.querySelectorAll('.form');

export default function SearchSection() {
  const [text, setText] = useState('');

  const handleSearchInput = (event) => {
    setText(event.target.value.toLowerCase());
    // Filter based on search value; show message if no results
  }

  console.log(interviews);

  return (
    <section id="search-forms" className="mb-5">
      <label htmlFor="search-field" className="form-label">Search forms</label>
      <input 
        id="search-field"
        className="search-field form-control"
        onInput={handleSearchInput}
      />
    </section>
  );
}
