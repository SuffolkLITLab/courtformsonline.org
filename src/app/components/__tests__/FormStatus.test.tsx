import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormStatus from '../FormStatus';

describe('FormStatus component', () => {
  test('renders Preview badge for preview maturity', () => {
    render(<FormStatus maturity="Preview" />);
    expect(screen.getByText(/Preview/i)).toBeInTheDocument();
  });

  test('renders Testing badge for testing maturity', () => {
    render(<FormStatus maturity="Testing" />);
    expect(screen.getByText(/Testing/i)).toBeInTheDocument();
  });

  test('renders Development badge for development maturity', () => {
    render(<FormStatus maturity="Development" />);
    expect(screen.getByText(/Development/i)).toBeInTheDocument();
  });

  test('does not render anything for production maturity', () => {
    const { container } = render(<FormStatus maturity="production" />);
    expect(container.firstChild?.firstChild).toBeNull();
  });

  test('does not render anything when maturity is undefined', () => {
    const { container } = render(<FormStatus />);
    expect(container.firstChild?.firstChild).toBeNull();
  });
});
