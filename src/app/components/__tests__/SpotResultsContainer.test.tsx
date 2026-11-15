import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpotResultsContainer from '../SpotResultsContainer';
jest.mock('../TopicCard', () => ({
  __esModule: true,
  default: ({ topic, path }) => (
    <a href={`/${path}/${topic.name}`}>{topic.long_name}</a>
  ),
}));
test('title matches appear before topics, using the selected jurisdiction', () => {
  render(
    <SpotResultsContainer
      data={{ labels: [{ id: 'HO-02-00-00-00', confidence: 1 }] }}
      interviews={{
        housing: [
          { filename: 'eviction.yml', metadata: { title: 'Eviction answer' } },
        ],
      }}
      path="me"
      searchQuery="eviction"
    />
  );
  const form = screen.getByRole('link', { name: 'Eviction answer' });
  const topic = screen.getByRole('link', { name: 'Housing' });
  expect(form).toHaveAttribute('href', '/me/forms/eviction-answer');
  expect(topic).toHaveAttribute('href', '/me/housing');
  expect(
    form.compareDocumentPosition(topic) & Node.DOCUMENT_POSITION_FOLLOWING
  ).toBeTruthy();
});

test('description keyword matches stay above topics when classification finishes', () => {
  const interviews = {
    housing: [
      { filename: 'answer.yml', metadata: { title: 'Eviction answer' } },
      {
        filename: 'made.yml',
        metadata: {
          title: 'Massachusetts Defense for Eviction',
          description: 'Prepare an eviction answer for court.',
        },
      },
    ],
  };
  const props = { interviews, path: 'ma', searchQuery: 'Eviction answer' };
  const { rerender } = render(
    <SpotResultsContainer {...props} data={{ labels: [] }} loading />
  );
  expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual([
    'Eviction answer',
    'Massachusetts Defense for Eviction',
  ]);
  rerender(
    <SpotResultsContainer
      {...props}
      data={{ labels: [{ id: 'HO-02-00-00-00', confidence: 1 }] }}
    />
  );
  expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual([
    'Eviction answer',
    'Massachusetts Defense for Eviction',
    'Housing',
  ]);
  expect(screen.queryByText('More keyword matches')).not.toBeInTheDocument();
});
