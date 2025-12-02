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
    });

    const { generateMetadata } = require('../src/app/[path]/forms/[form]/page');

    const metadata = await generateMetadata({
      params: { path: 'ma', form: slug },
    });
    expect(metadata.title).toBe(`${formTitle} - Court Forms Online`);
    expect(metadata.description).toBe('A form for testing');
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
    });

    const { default: Page } = require('../src/app/[path]/forms/[form]/page');
    const element = await Page({ params: { path: 'ma', form: slug } });
    render(element as any);
    expect(screenLib.getByRole('heading', { level: 1 })).toHaveTextContent(
      formTitle
    );
  });
});
