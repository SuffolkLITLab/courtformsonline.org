import { render, screen, fireEvent } from '@testing-library/react';
import FamilyPlanningTools from '../FamilyPlanningTools';

const form = (id: string, jurisdiction: string) => ({
  id,
  jurisdiction,
  title: id,
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
  expect(screen.getByRole('heading', { name: 'RI education' })).toBeTruthy();
  expect(screen.getByRole('heading', { name: 'RI health care' })).toBeTruthy();
  expect(screen.getByRole('status').textContent).toContain(
    '3 forms available for Rhode Island'
  );
});
