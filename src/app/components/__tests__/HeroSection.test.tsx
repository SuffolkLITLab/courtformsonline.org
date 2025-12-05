import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from '../HeroSection';

describe('HeroSection SPOT modal', () => {
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

    // The SPOT link should appear after the checkbox in the DOM order
    const checkbox = screen.getByLabelText('Use my reply to help others');
    // Info button should be a following node after checkbox
    expect(
      checkbox.compareDocumentPosition(infoButton) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
