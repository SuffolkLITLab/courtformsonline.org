import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('TopicsSection toggle behavior', () => {
  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  it("doesn't show the ShowAllToggle when number of topics <= MAX_VISIBLE_CATEGORIES", async () => {
    // Mock topics.config with exactly MAX_VISIBLE_CATEGORIES entries
    const { MAX_VISIBLE_CATEGORIES } = require('../../../config/constants');
    const topics = new Array(MAX_VISIBLE_CATEGORIES)
      .fill(null)
      .map((_, idx) => ({
        codes: [`T-${idx}`],
        name: `topic${idx}`,
        long_name: `Topic ${idx}`,
        icon: 'file',
        always_visible: false,
        priority: 0,
      }));

    jest.doMock('../../../config/topics.config', () => ({
      legalTopics: topics,
    }));

    jest.doMock('../../../config/formSources.config', () => ({
      formSources: {
        docassembleServers: [{ path: 'ma', url: 'http://localhost' }],
      },
    }));

    // Stub out the client-side ShowAllToggle to avoid client-side hooks in tests
    jest.doMock('../ShowAllToggle', () => ({
      __esModule: true,
      default: () => <button>Show all categories</button>,
    }));

    // Import after mocking
    const TopicsSection = require('../TopicsSection').default;

    // Build an interviews object with one entry for each mocked topic
    const interviews = {};
    for (let i = 0; i < MAX_VISIBLE_CATEGORIES; i++) {
      interviews[`topic${i}`] = [
        { metadata: { title: `Form ${i}` }, filename: `form-${i}` },
      ];
    }

    const sectionJsx = await TopicsSection({
      path: 'ma',
      interviews,
      isError: false,
    });
    const { container } = render(sectionJsx);
    expect(container).toBeTruthy();
    // The button text should not be present
    expect(screen.queryByText('Show all categories')).not.toBeInTheDocument();
  });

  it('shows the ShowAllToggle when number of topics > MAX_VISIBLE_CATEGORIES', async () => {
    // Mock topics.config with one more than MAX_VISIBLE_CATEGORIES entries
    const { MAX_VISIBLE_CATEGORIES } = require('../../../config/constants');
    const topics = new Array(MAX_VISIBLE_CATEGORIES + 1)
      .fill(null)
      .map((_, idx) => ({
        codes: [`T-${idx}`],
        name: `topic${idx}`,
        long_name: `Topic ${idx}`,
        icon: 'file',
        always_visible: false,
        priority: 0,
      }));

    jest.doMock('../../../config/topics.config', () => ({
      legalTopics: topics,
    }));

    jest.doMock('../../../config/formSources.config', () => ({
      formSources: {
        docassembleServers: [{ path: 'ma', url: 'http://localhost' }],
      },
    }));

    // Stub out the client-side ShowAllToggle for this test case too
    jest.doMock('../ShowAllToggle', () => ({
      __esModule: true,
      default: () => <button>Show all categories</button>,
    }));

    // Stub out TopicCard (client component that uses hooks) to avoid hook errors
    jest.doMock('../TopicCard', () => ({
      __esModule: true,
      default: ({ topic }) => <div>{topic?.long_name}</div>,
    }));
    // Stub out TopicCard (client component that uses hooks) to avoid hook errors
    jest.doMock('../TopicCard', () => ({
      __esModule: true,
      default: ({ topic }) => <div>{topic?.long_name}</div>,
    }));

    const TopicsSection = require('../TopicsSection').default;

    // Build interviews for each mocked topic
    const interviews = {};
    for (let i = 0; i <= MAX_VISIBLE_CATEGORIES; i++) {
      interviews[`topic${i}`] = [
        { metadata: { title: `Form ${i}` }, filename: `form-${i}` },
      ];
    }

    const sectionJsx = await TopicsSection({
      path: 'ma',
      interviews,
      isError: false,
    });
    render(sectionJsx);
    expect(screen.getByText('Show all categories')).toBeInTheDocument();
  });
});
