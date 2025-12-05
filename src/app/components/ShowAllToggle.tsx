'use client';

import { useState, useEffect } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import styles from '../css/ShowAllToggle.module.css';
import { MAX_VISIBLE_CATEGORIES } from '../../config/constants';

const ShowAllToggle = () => {
  const [showAll, setShowAll] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if there are more categories than the visible max
    const topicCount = document.querySelectorAll('.topic-card-parent').length;
    // Only render the button if there are extra categories to toggle
    setShouldRender(topicCount > MAX_VISIBLE_CATEGORIES);
  }, []);

  const handleToggle = () => {
    const topics = document.querySelectorAll(
      '.topic-card-parent'
    ) as NodeListOf<HTMLElement>;
    setShowAll(!showAll);

    if (showAll) {
      // Hide all boxes at or after index MAX_VISIBLE_CATEGORIES
      topics.forEach((topic, index) => {
        if (index >= MAX_VISIBLE_CATEGORIES) {
          topic.classList.add('hidden');
        }
      });
    } else {
      // Show all boxes by removing the hidden class
      topics.forEach((topic) => {
        topic.classList.remove('hidden');
      });
    }
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <Button
      className={styles.ShowAllToggle + ' show-all-toggle'}
      onClick={handleToggle}
    >
      {showAll ? 'Hide extra categories' : 'Show all categories'}
    </Button>
  );
};

export default ShowAllToggle;
