import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ShowAllToggle from '../ShowAllToggle';
import { MAX_VISIBLE_CATEGORIES } from '../../../config/constants';

describe('ShowAllToggle component', () => {
  afterEach(() => {
    // Clean up DOM elements we added during tests
    document.body.innerHTML = '';
    jest.restoreAllMocks();
  });

  it("doesn't render when topic count <= MAX_VISIBLE_CATEGORIES", async () => {
    // Create exactly MAX_VISIBLE_CATEGORIES topic containers
    for (let i = 0; i < MAX_VISIBLE_CATEGORIES; i++) {
      const div = document.createElement('div');
      div.className = 'topic-card-parent';
      div.textContent = `topic-${i}`;
      document.body.appendChild(div);
    }

    render(<ShowAllToggle />);

    // Wait for effect to run and ensure the button is not present
    await waitFor(() => {
      expect(screen.queryByText('Show all categories')).not.toBeInTheDocument();
    });
  });

  it('renders and toggles hidden class when topics > MAX_VISIBLE_CATEGORIES', async () => {
    // Create topics, with the last one starting hidden
    const total = MAX_VISIBLE_CATEGORIES + 1;
    for (let i = 0; i < total; i++) {
      const div = document.createElement('div');
      div.className = 'topic-card-parent';
      if (i >= MAX_VISIBLE_CATEGORIES) div.classList.add('hidden');
      div.textContent = `topic-${i}`;
      document.body.appendChild(div);
    }

    render(<ShowAllToggle />);

    // Wait for the component to decide it should render
    await waitFor(() => expect(screen.getByText('Show all categories')).toBeInTheDocument());

    const button = screen.getByText('Show all categories');
    const extraTopic = document.querySelectorAll('.topic-card-parent')[MAX_VISIBLE_CATEGORIES];
    expect(extraTopic).toHaveClass('hidden');

    // Click to show all
    fireEvent.click(button);
    // After clicking, hidden should be removed
    expect(extraTopic).not.toHaveClass('hidden');
    // Label should update to 'Hide extra categories'
    expect(screen.getByText('Hide extra categories')).toBeInTheDocument();

    // Click again to hide
    fireEvent.click(screen.getByText('Hide extra categories'));
    expect(extraTopic).toHaveClass('hidden');
  });
});
