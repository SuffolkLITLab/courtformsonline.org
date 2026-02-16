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

  test('renders E-filing available badge when efilingEnabled is true', () => {
    render(<FormStatus efilingEnabled={true} />);
    expect(screen.getByText('E-filing available')).toBeInTheDocument();
  });

  test('renders Email filing available badge when efilingEnabled is "email"', () => {
    render(<FormStatus efilingEnabled="email" />);
    expect(screen.getByText('Email filing available')).toBeInTheDocument();
  });

  test('does not render e-filing badge when efilingEnabled is false', () => {
    const { container } = render(<FormStatus efilingEnabled={false} />);
    expect(screen.queryByText('E-filing available')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Email filing available')
    ).not.toBeInTheDocument();
  });

  test('renders both maturity and e-filing badges when both are present', () => {
    render(<FormStatus maturity="Preview" efilingEnabled={true} />);
    expect(screen.getByText('Preview')).toBeInTheDocument();
    expect(screen.getByText('E-filing available')).toBeInTheDocument();
  });

  test('renders Email filing available for integrated_email_filing metadata', () => {
    render(<FormStatus integratedEmailFiling={true} />);
    expect(screen.getByText('Email filing available')).toBeInTheDocument();
  });

  test('renders E-filing available for integrated_efiling metadata', () => {
    render(<FormStatus integratedEfiling={true} />);
    expect(screen.getByText('E-filing available')).toBeInTheDocument();
  });

  test('integrated metadata takes precedence over efiling_enabled', () => {
    render(<FormStatus efilingEnabled={true} integratedEmailFiling={true} />);
    expect(screen.getByText('Email filing available')).toBeInTheDocument();
    expect(screen.queryByText('E-filing available')).not.toBeInTheDocument();
  });
});
