import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TopicsPage from '../src/app/page';
import RootLayout from '../src/app/layout';

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

describe('TopicsPage', () => {
  beforeEach(() => {
    render(<TopicsPage />);
  });
  it('renders the hero section', () => {
    const heroSection = document.getElementById('hero-section');
    expect(heroSection).toBeInTheDocument();
  });

  it('renders the how it works section', () => {
    const howItWorksSection = document.getElementById('how-it-works-section');
    expect(howItWorksSection).toBeInTheDocument();
  });

  it('renders the topics section', () => {
    const topicsSection = document.getElementById('topics');
    expect(topicsSection).toBeInTheDocument();
  });
});
