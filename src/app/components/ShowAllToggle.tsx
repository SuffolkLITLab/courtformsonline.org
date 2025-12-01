'use client';

import { useState } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import styles from '../css/ShowAllToggle.module.css';

const ShowAllToggle = () => {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    const topics = document.querySelectorAll(
      '.topic-card-parent'
    ) as NodeListOf<HTMLElement>;
    setShowAll(!showAll);

    if (showAll) {
      // Hide all boxes after index 8 (hide all rows after the first 3 rows)
      topics.forEach((topic, index) => {
        if (index > 8) {
          topic.style.display = 'none';
        }
      });
    } else {
      // Show all boxes
      topics.forEach((topic) => {
        topic.style.display = 'block';
      });
    }
  };

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
