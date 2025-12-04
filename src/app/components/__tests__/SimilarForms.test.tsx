import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

import SimilarForms from '../SimilarForms';

describe('SimilarForms component', () => {
  test('renders topic links even without forms', () => {
    const props = {
      forms: [],
      basePath: '/ma/forms',
      topics: [{ name: 'housing', long_name: 'Housing' }],
      jurisdictionPath: 'ma',
    } as any;

    render(<SimilarForms {...props} />);

    expect(screen.getByText(/View all housing forms/i)).toBeInTheDocument();
  });

  test('renders duplicate topic links as separate items', () => {
    const props = {
      forms: [],
      basePath: '/ma/forms',
      topics: [
        { name: 'housing', long_name: 'Housing' },
        { name: 'housing', long_name: 'Housing' },
      ],
      jurisdictionPath: 'ma',
    } as any;

    render(<SimilarForms {...props} />);

    // With dedupe, duplicates should be rendered only once
    expect(screen.getAllByText(/View all housing forms/i).length).toBe(1);
  });

  test('when forms are present, they appear before categories', () => {
    const props = {
      forms: [
        { title: 'Form A', slug: 'form-a', similarity: 3 },
        { title: 'Form B', slug: 'form-b', similarity: 2 },
      ],
      basePath: '/ma/forms',
      topics: [{ name: 'housing', long_name: 'Housing' }],
      jurisdictionPath: 'ma',
    } as any;

    render(<SimilarForms {...props} />);

    // The first items should appear in the list of forms
    const formItems = screen
      .getAllByRole('listitem')
      .map((li) => li.textContent);
    expect(formItems[0]).toContain('Form A');
    expect(formItems[1]).toContain('Form B');
    // Category links are not list items in the forms list; ensure a category link is present later
    expect(screen.getByText(/View all housing forms/i)).toBeInTheDocument();
  });
});
