import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSearchParams } from 'next/navigation';
import DetailInterviewLaunch from '../DetailInterviewLaunch';

jest.mock('next/navigation', () => ({ useSearchParams: jest.fn() }));

it('changes the provider launch language when the form link came from a Spanish page', () => {
  const params = useSearchParams as jest.Mock;
  params.mockReturnValue(new URLSearchParams());
  const props = {
    serverUrl: 'https://example.org',
    link: '/start/form/?source=catalog',
  };
  const { rerender } = render(<DetailInterviewLaunch {...props} />);

  expect(screen.getByRole('button', { name: 'Start tool' })).toHaveAttribute(
    'href',
    'https://example.org/start/form/?source=catalog'
  );

  params.mockReturnValue(new URLSearchParams('lang=es'));
  rerender(<DetailInterviewLaunch {...props} />);
  expect(
    screen.getByRole('button', { name: 'Iniciar la entrevista' })
  ).toHaveAttribute(
    'href',
    'https://example.org/start/form/?source=catalog&lang=es'
  );
});
