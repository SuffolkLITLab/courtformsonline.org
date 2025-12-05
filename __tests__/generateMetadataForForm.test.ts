/* eslint-disable @typescript-eslint/no-var-requires */
import { toUrlFriendlyString } from '../src/app/utils/helpers';
import { render, screen as screenLib } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// Stub ESM imports from node_modules which Jest doesn't transform by default
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));
jest.mock('remark-gfm', () => ({}));
jest.mock('../src/data/fetchInterviewData', () => ({
  fetchInterviews: jest.fn(),
}));
jest.mock('../src/data/getFormDetails', () => ({
  getFormDetails: jest.fn(),
}));

import { fetchInterviews } from '../src/data/fetchInterviewData';
import { getFormDetails } from '../src/data/getFormDetails';

describe('generateMetadata for form page', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('returns the form title in metadata.title', async () => {
    const formTitle = 'My Great Form';
    const slug = toUrlFriendlyString(formTitle);

    const mockFormDetails = {
      title: formTitle,
      metadata: { description: 'A form for testing' },
      serverUrl: 'https://example.com',
      link: '/start',
    };

    (getFormDetails as jest.Mock).mockResolvedValue({
      formDetails: mockFormDetails,
      formTopic: 'other',
      formTopics: [],
      relatedForms: [],
    });

    const { generateMetadata } = require('../src/app/[path]/forms/[form]/page');

    const metadata = await generateMetadata({
      params: { path: 'ma', form: slug },
    });
    expect(metadata.title).toBe(`${formTitle} - Court Forms Online`);
    expect(metadata.description).toBe('A form for testing');
  });

  test('includes description in OpenGraph and meta tags for SEO', async () => {
    const formTitle = 'My Great Form';
    const slug = toUrlFriendlyString(formTitle);
    const description = 'A form for testing';

    const mockFormDetails = {
      title: formTitle,
      metadata: { description },
      serverUrl: 'https://example.com',
      link: '/start',
    };

    (getFormDetails as jest.Mock).mockResolvedValue({
      formDetails: mockFormDetails,
      formTopic: 'other',
    });

    const { generateMetadata } = require('../src/app/[path]/forms/[form]/page');

    const metadata = await generateMetadata({
      params: { path: 'ma', form: slug },
    });
    expect(metadata.openGraph?.title).toBe(`${formTitle} - Court Forms Online`);
    expect(metadata.openGraph?.description).toBe(description);
    expect(metadata.openGraph?.type).toBe('website');
    expect(metadata.other?.description).toBe(description);
  });

  test('includes LIST codes in meta tags for semantic content', async () => {
    const formTitle = 'My Great Form';
    const slug = toUrlFriendlyString(formTitle);
    const description = 'A form for testing';
    const listTopics = ['family-law', 'estate-planning'];

    const mockFormDetails = {
      title: formTitle,
      metadata: { description, LIST_topics: listTopics },
      serverUrl: 'https://example.com',
      link: '/start',
    };

    (getFormDetails as jest.Mock).mockResolvedValue({
      formDetails: mockFormDetails,
      formTopic: 'other',
    });

    const { generateMetadata } = require('../src/app/[path]/forms/[form]/page');

    const metadata = await generateMetadata({
      params: { path: 'ma', form: slug },
    });
    expect(metadata.other?.LIST).toEqual(listTopics);
  });

  test('handles forms with no LIST codes', async () => {
    const formTitle = 'My Great Form';
    const slug = toUrlFriendlyString(formTitle);
    const description = 'A form for testing';

    const mockFormDetails = {
      title: formTitle,
      metadata: { description, LIST_topics: [] },
      serverUrl: 'https://example.com',
      link: '/start',
    };

    (getFormDetails as jest.Mock).mockResolvedValue({
      formDetails: mockFormDetails,
      formTopic: 'other',
    });

    const { generateMetadata } = require('../src/app/[path]/forms/[form]/page');

    const metadata = await generateMetadata({
      params: { path: 'ma', form: slug },
    });
    expect(metadata.other?.LIST).toBeUndefined();
  });

  test('renders an H1 with the form title', async () => {
    const formTitle = 'My Great Form';
    const slug = toUrlFriendlyString(formTitle);

    const mockFormDetails = {
      title: formTitle,
      metadata: { description: 'A form for testing' },
      serverUrl: 'https://example.com',
      link: '/start',
    };

    (getFormDetails as jest.Mock).mockResolvedValue({
      formDetails: mockFormDetails,
      formTopic: 'other',
      formTopics: [],
      relatedForms: [],
    });

    const { default: Page } = require('../src/app/[path]/forms/[form]/page');
    const element = await Page({ params: { path: 'ma', form: slug } });
    render(element as any);
    expect(screenLib.getByRole('heading', { level: 1 })).toHaveTextContent(
      
      formTitle
    
    );
  });

  // This test verifies that a JSON-LD script tag is emitted with schema.org properties
  // See: https://schema.legalhelpdashboard.org/ and https://schema.org/SoftwareApplication
  test('renders schema.org structured data (JSON-LD)', async () => {
    const formTitle = 'My Great Form';
    const slug = toUrlFriendlyString(formTitle);
    const description = 'A form for testing';
    const listTopics = ['family-law', 'estate-planning'];
    const jurisdiction = 'Massachusetts';
    const estimatedTime = 30;

    const mockFormDetails = {
      title: formTitle,
      metadata: {
        description,
        LIST_topics: listTopics,
        jurisdiction,
        estimated_completion_minutes: estimatedTime,
      },
      serverUrl: 'https://example.com',
      link: '/start',
    };

    (getFormDetails as jest.Mock).mockResolvedValue({
      formDetails: mockFormDetails,
      formTopic: 'other',
    });

    const { default: Page } = require('../src/app/[path]/forms/[form]/page');
    const element = await Page({ params: { path: 'ma', form: slug } });
    const { container } = render(element as any);

    const schemaScript = container.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(schemaScript).toBeInTheDocument();

    if (schemaScript && schemaScript.textContent) {
      const schema = JSON.parse(schemaScript.textContent);
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('SoftwareApplication');
      expect(schema.name).toBe(formTitle);
      expect(schema.description).toBe(description);
      expect(schema.applicationCategory).toBe('LegalApplication');
      expect(schema.url).toBe('https://example.com/start');
      expect(schema.isAccessibleForFree).toBe(true);
      expect(schema.about).toEqual(
        listTopics.map((topic) => ({
          '@type': 'Thing',
          name: topic,
        }))
      );
      expect(schema.timeRequired).toBe('PT30M');
      expect(schema.areaServed).toEqual({
        '@type': 'Place',
        name: jurisdiction,
      });
    }
  });
});
