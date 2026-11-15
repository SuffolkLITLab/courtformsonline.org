import { render, screen, fireEvent } from '@testing-library/react';
import FamilyPlanningTools from '../FamilyPlanningTools';

const form = (id: string, jurisdiction: string) => ({
  id,
  jurisdiction,
  title: id,
  detailsHref: `/family/forms/${encodeURIComponent(id)}`,
  href: `https://example.org/${id}`,
});

it('filters state-specific forms, keeps both Rhode Island tools, and includes national tools', () => {
  render(
    <FamilyPlanningTools
      forms={[
        form('California caregiver', 'California'),
        form('RI education', 'Rhode Island'),
        form('RI health care', 'Rhode Island'),
        form('National planning', 'United States'),
      ]}
    />
  );
  expect(
    screen.getAllByRole('link', { name: /^Start interview:/ })
  ).toHaveLength(4);
  fireEvent.change(screen.getByLabelText('Find forms for your state'), {
    target: { value: 'Rhode Island' },
  });
  expect(
    screen.getAllByRole('link', { name: /^Start interview:/ })
  ).toHaveLength(3);
  expect(
    screen.queryByRole('heading', { name: 'California caregiver' })
  ).toBeNull();
  expect(
    screen.getAllByRole('link', { name: /^View form details:/ })
  ).toHaveLength(3);
  expect(
    screen
      .getByRole('link', {
        name: 'View form details: RI education (Rhode Island)',
      })
      .getAttribute('href')
  ).toBe('/family/forms/RI%20education');
  expect(screen.getByRole('heading', { name: 'RI education' })).toBeTruthy();
  expect(screen.getByRole('heading', { name: 'RI health care' })).toBeTruthy();
  expect(screen.getByRole('status').textContent).toContain(
    '3 forms available for Rhode Island'
  );
});
