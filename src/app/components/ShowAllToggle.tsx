'use client';

import { useState } from 'react';

const ShowAllToggle = () => {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    const topics = document.querySelectorAll(
      '.topic-card-parent'
    ) as NodeListOf<HTMLElement>;
    setShowAll(!showAll);
    topics.forEach((topic, index) => {
      if (index > 9) {
        if (topic.style.display === 'none' || !topic.style.display) {
          topic.style.display = 'block';
        } else {
          topic.style.display = 'none';
        }
      }
    });
  };

  return (
    <button className={'show-all-toggle'} onClick={handleToggle}>
      {showAll ? 'Hide extra categories' : 'Show all categories'}
    </button>
  );
};

export default ShowAllToggle;
