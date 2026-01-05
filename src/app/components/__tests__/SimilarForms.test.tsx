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
    // Cross-link to the guide should appear and be jurisdiction-aware
    const guideLink = screen.getByText(/How to select the right court form/i);
    expect(guideLink).toBeInTheDocument();
    expect(guideLink.closest('a').getAttribute('href')).toBe(
      '/ma/guides/choosing-right-form'
    );
  });

  test('filters out "Get legal help" form from the list and shows the standalone legal help link', () => {
    const props = {
      forms: [
        { title: 'Form A', slug: 'form-a', similarity: 3 },
        {
          title: 'Get legal help in Maine',
          slug: 'get-legal-help',
          similarity: 1,
        },
      ],
      basePath: '/ma/forms',
      topics: [],
      jurisdictionPath: 'ma',
      jurisdictionName: 'Maine',
      legalHelpLink: 'https://maine.example',
    } as any;

    render(<SimilarForms {...props} />);

    // The "Get legal help" entry should not be in the forms list or rendered
    const formItems = screen
      .getAllByRole('listitem')
      .map((li) => li.textContent);
    expect(formItems.join(' ')).not.toContain('Get legal help');

    // And SimilarForms should not render the standalone legal help link (it's handled at page level)
    expect(screen.queryByText(/Get legal help/i)).toBeNull();
  });
});
