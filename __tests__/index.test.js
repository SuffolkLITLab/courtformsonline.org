import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../src/app/page';
import RootLayout from '../src/app/layout';
import { fetchInterviews } from '../src/data/fetchInterviewData';

describe('Layout component', () => {
  beforeEach(() => {
    render(<RootLayout />);
  });

  it('should contain a navigation bar', () => {
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  });

  it('should contain a footer', () => {
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });
});

// Mock the fetchInterviews function from your data fetching module
jest.mock('../src/data/fetchInterviewData', () => ({
  fetchInterviews: jest.fn(() =>
    Promise.resolve({
      interviewsByTopic: {
        Topic1: [{ id: 1, name: 'Interview 1' }],
        Topic2: [{ id: 2, name: 'Interview 2' }],
      },
    })
  ),
}));
