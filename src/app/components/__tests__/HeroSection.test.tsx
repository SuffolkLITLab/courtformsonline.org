import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from '../HeroSection';
import { fetchFormSearch } from '../../../data/fetchFormSearch';

jest.mock('../../../data/fetchFormSearch', () => ({
  fetchFormSearch: jest.fn(),
}));
jest.mock('../SpotResultsContainer', () => ({
  __esModule: true,
  default: () => <div>Mock search results</div>,
}));

describe('HeroSection SPOT modal', () => {
  test('restores category visibility when switching modes, including an in-flight search', async () => {
    let resolveSearch: (value: object) => void;
    (fetchFormSearch as jest.Mock).mockImplementation(
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
    resolveSearch!({ labels: [] });
    await waitFor(() => expect(fetchFormSearch).toHaveBeenCalledTimes(1));
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

  test('uses the selected state name without substituting a Massachusetts outline', () => {
    const { container } = render(
      <HeroSection path="wv" interviews={[]} isError={false} />
    );
    expect(
      screen.getByRole('heading', {
        name: /free diy legal help for west virginia/i,
      })
    ).toBeInTheDocument();
    expect(container.querySelector('#hero-left h1 svg')).toBeNull();
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
    expect(privacyLink).toHaveAttribute('href', '/privacy');

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
    const checkbox = screen.getByLabelText(
      'Share my search with FETCH for topic suggestions'
    );
    // Info button should be a preceding node before checkbox
    expect(
      infoButton.compareDocumentPosition(checkbox) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});

test('keeps local results when topic search fails and passes the sharing choice', async () => {
  (fetchFormSearch as jest.Mock).mockRejectedValueOnce(
    new Error('Topic search is unavailable.')
  );
  render(<HeroSection path="ma" interviews={{}} isError={false} />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'fee' } });
  fireEvent.click(
    screen.getByRole('button', { name: 'Find help', exact: true })
  );
  expect(
    await screen.findByText(/Keyword matches are still shown/)
  ).toBeInTheDocument();
  expect(screen.getByText('Mock search results')).toBeInTheDocument();
  expect(fetchFormSearch).toHaveBeenCalledWith(
    'fee',
    true,
    expect.any(AbortSignal)
  );
});

test('unchecked searches stay local and accept short keywords', async () => {
  render(<HeroSection path="ma" interviews={{}} isError={false} />);
  fireEvent.click(screen.getByRole('checkbox'));
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'fee' } });
  fireEvent.click(
    screen.getByRole('button', { name: 'Find help', exact: true })
  );
  expect(screen.getByText('Mock search results')).toBeInTheDocument();
  expect(fetchFormSearch).not.toHaveBeenCalled();
});

test('cancel prevents a late response from restoring results', async () => {
  let resolveSearch: (value: object) => void;
  (fetchFormSearch as jest.Mock).mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        resolveSearch = resolve;
      })
  );
  render(<HeroSection path="ma" interviews={{}} isError={false} />);
  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'eviction' },
  });
  fireEvent.click(
    screen.getByRole('button', { name: 'Find help', exact: true })
  );
  fireEvent.click(
    screen.getByRole('button', {
      name: 'Cancel search and return to all categories',
    })
  );
  resolveSearch!({ labels: [] });
  await waitFor(() =>
    expect(screen.queryByText('Mock search results')).not.toBeInTheDocument()
  );
  expect((fetchFormSearch as jest.Mock).mock.calls[0][2].aborted).toBe(true);
});
