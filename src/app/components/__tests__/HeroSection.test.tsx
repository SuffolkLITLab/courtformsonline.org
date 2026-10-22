import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from '../HeroSection';
import { fetchSpotData } from '../../../data/fetchSpotData';

jest.mock('../../../data/fetchSpotData', () => ({
  fetchSpotData: jest.fn(),
}));
jest.mock('../SpotResultsContainer', () => ({
  __esModule: true,
  default: () => <div>Mock search results</div>,
}));

describe('HeroSection SPOT modal', () => {
  test('restores category visibility when switching modes, including an in-flight search', async () => {
    let resolveSearch: (value: object) => void;
    (fetchSpotData as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSearch = resolve;
        })
    );
    const { container, unmount } = render(
      <>
        <HeroSection path="ma" interviews={[]} isError={false} />
        <div className="topic-card-parent">Visible category</div>
        <div className="topic-card-parent hidden">Collapsed category</div>
        <button className="show-all-toggle">Show all categories</button>
      </>
    );
    const cards = container.querySelectorAll('.topic-card-parent');
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'My landlord will not fix my heat' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Find help' }));
    fireEvent.click(screen.getByRole('button', { name: 'Legal checkup' }));
    resolveSearch!({});
    await waitFor(() => expect(fetchSpotData).toHaveBeenCalledTimes(1));
    expect(cards[0]).not.toHaveClass('hidden');
    expect(cards[1]).toHaveClass('hidden');
    expect(screen.queryByText('Mock search results')).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: 'Describe your problem' })
    );
    await screen.findByText('Mock search results');
    expect(cards[0]).toHaveClass('hidden');
    fireEvent.click(screen.getByRole('button', { name: 'Legal checkup' }));
    expect(cards[0]).not.toHaveClass('hidden');
    expect(cards[1]).toHaveClass('hidden');
    expect(
      screen.getByRole('button', { name: 'Show all categories' })
    ).not.toHaveClass('hidden');
    fireEvent.click(
      screen.getByRole('button', { name: 'Describe your problem' })
    );
    expect(cards[0]).toHaveClass('hidden');
    unmount();
    expect(cards[0]).not.toHaveClass('hidden');
  });

  test('renders a state outline next to the jurisdiction headline', () => {
    const { container } = render(
      <HeroSection path="me" interviews={[]} isError={false} />
    );

    expect(
      screen.getByRole('heading', { name: /free diy legal help for maine/i })
    ).toBeInTheDocument();
    expect(container.querySelector('#hero-left h1 svg')).toBeInTheDocument();
  });

  test('renders the small "what is this?" link and opens popover with explanation and privacy policy link', async () => {
    render(<HeroSection path="test" interviews={[]} isError={false} />);

    const infoButton = screen.getByRole('button', { name: /what is this\?/i });
    expect(infoButton).toBeInTheDocument();

    // Click to show the popover with SPOT explanation
    fireEvent.click(infoButton);
    // Popover content should appear
    const popoverText = await screen.findByText(
      /When you type in your problem description/i
    );
    expect(popoverText).toBeInTheDocument();
    // Tooltip should contain a link to SPOT terms/privacy
    const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute(
      'href',
      'https://spot.suffolklitlab.org/terms/'
    );

    // Close the modal
    // Hide the popover by clicking the info button again
    fireEvent.click(infoButton);
    await waitFor(() =>
      expect(
        screen.queryByText(/When you type in your problem description/i)
      ).not.toBeInTheDocument()
    );

    // There should be no question icon near the link
    const iconQuery = screen.queryByRole('img', { hidden: true });
    // We don't require any icons, but ensure the specific question icon class is not present
    expect(document.querySelector('.fa-question-circle')).toBeNull();

    // The SPOT link should appear before the checkbox in the DOM order
    const checkbox = screen.getByLabelText('Use my reply to help others');
    // Info button should be a preceding node before checkbox
    expect(
      infoButton.compareDocumentPosition(checkbox) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
