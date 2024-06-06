'use client';

import { useState } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';

const ShowAllToggle = () => {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    const topics = document.querySelectorAll(
      '.topic-card-parent'
    ) as NodeListOf<HTMLElement>;
    setShowAll(!showAll);
    topics.forEach((topic, index) => {
      if (topic.style.display === 'none' || !topic.style.display) {
        topic.style.display = 'block';
      } else {
        if (index > 8) {
          topic.style.display = 'none';
        }
      }
    });
  };

  return (
    <Button className={'show-all-toggle'} onClick={handleToggle}>
      {showAll ? 'Hide extra categories' : 'Show all categories'}
    </Button>
  );
};

export default ShowAllToggle;
