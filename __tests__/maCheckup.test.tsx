import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import LegalCheckup from '../src/app/components/LegalCheckup';
import {
  checkupTopics,
  getCheckupRecommendations,
} from '../src/data/maCheckup';

const forms = Array.from(
  new Map(
    checkupTopics.flatMap((topic) =>
      topic.needs.flatMap((need) =>
        need.tools.map(
          (tool) =>
            [
              tool.filename,
              { filename: tool.filename, title: tool.label },
            ] as const
        )
      )
    )
  ).values()
);

function expectSmallScreen() {
  const main = within(screen.getByRole('main'));
  expect(
    main.queryAllByRole('button').length + main.queryAllByRole('link').length
  ).toBeLessThanOrEqual(
    main.queryByRole('heading', { name: 'What could be easier in your life?' })
      ? 7
      : main.queryByRole('heading', { name: 'Your checkup summary' })
        ? 8
        : 6
  );
}

beforeEach(() => {
  window.history.replaceState(null, '', '/ma/checkup');
});

describe('Massachusetts checkup matching', () => {
  it('uses indexed titles for URLs, drops unavailable tools, and deduplicates overlaps', () => {
    const filename =
      'docassemble.MAPetitionToSealEviction:data/questions/petition_to_seal_eviction.yml';
    const { recommendations, missingCount } = getCheckupRecommendations(
      ['moving', 'records'],
      [
        { filename, title: 'An updated title!' },
        { filename: 'unrelated.yml', title: 'Unrelated form' },
      ]
    );
    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].href).toBe('/ma/forms/an-updated-title');
    expect(recommendations[0].reasons).toHaveLength(2);
    expect(missingCount).toBeGreaterThan(0);
    expect(getCheckupRecommendations([], forms).recommendations).toEqual([]);
  });

  it('covers expanded public tools without mixing opposing roles', () => {
    expect(forms).toHaveLength(57);
    const debt = getCheckupRecommendations(['debt'], forms).recommendations;
    expect(
      debt.some((item) =>
        item.filename.includes('MAAffidavitofAddressVerification')
      )
    ).toBe(false);
    const collection = getCheckupRecommendations(
      ['collecting-debt'],
      forms
    ).recommendations;
    expect(collection).toHaveLength(1);
    expect(collection[0].filename).toContain(
      'MAAffidavitofAddressVerification'
    );
    const eviction = getCheckupRecommendations(
      ['eviction'],
      forms
    ).recommendations;
    expect(
      eviction.some((item) =>
        item.filename.includes('MAObjectionToEvictionPetition')
      )
    ).toBe(false);
    expect(
      getCheckupRecommendations(['review-decision', 'appeal-papers'], forms)
        .recommendations
    ).toHaveLength(10);
    expect(
      forms.some((form) =>
        form.filename.includes('ImmigrationCourtEnteringRepresentation')
      )
    ).toBe(false);
    expect(
      forms.some((form) => form.filename.includes('NoticeOfLimitedAppearance'))
    ).toBe(false);
  });

  it('has unique situation IDs across five areas', () => {
    const ids = checkupTopics.flatMap((topic) =>
      topic.needs.map((need) => need.id)
    );
    expect(new Set(ids).size).toBe(ids.length);
    expect(checkupTopics).toHaveLength(5);
  });
});

function finishArea() {
  fireEvent.click(screen.getByRole('button', { name: 'Done with this area' }));
}

function showSummary() {
  fireEvent.click(screen.getByRole('button', { name: /See my summary/ }));
}

describe('Massachusetts checkup interaction', () => {
  it('shows directory and legal help links without creating another results page', () => {
    render(<LegalCheckup forms={forms} />);
    fireEvent.click(screen.getByRole('button', { name: /My home/ }));
    fireEvent.click(
      screen.getByRole('button', { name: /My rental home has problems/ })
    );
    finishArea();
    showSummary();
    expect(screen.getByRole('status')).toHaveTextContent('Options 1–2 of 2');
    expect(
      screen.queryByRole('button', { name: 'More options' })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Browse all Massachusetts forms' })
    ).toBeVisible();
    expect(screen.getByRole('link', { name: 'find legal help' })).toBeVisible();
  });

  it('supports Back and Forward between situation pages without undoing selections', async () => {
    render(<LegalCheckup forms={forms} />);
    fireEvent.click(screen.getByRole('button', { name: /My home/ }));
    const historyLength = window.history.length;
    fireEvent.click(
      screen.getByRole('button', { name: /My rental home has problems/ })
    );
    expect(window.history.length).toBe(historyLength);
    expect(window.history.state.courtFormsCheckup).toEqual({
      screen: 'home',
      page: 0,
      needPage: 0,
    });
    fireEvent.click(screen.getByRole('button', { name: 'More situations' }));
    fireEvent.click(screen.getByRole('button', { name: 'Back', exact: true }));
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /My rental home has problems/ })
      ).toHaveAttribute('aria-pressed', 'true')
    );
    act(() => window.history.forward());
    await waitFor(() =>
      expect(
        screen.getByRole('button', {
          name: /I disagree with a request about an old eviction case/,
        })
      ).toBeVisible()
    );
    expect(screen.getByRole('status')).toHaveTextContent(
      '1 selected in this area'
    );
    expect(window.history.state.courtFormsCheckup).not.toHaveProperty(
      'selected'
    );
  });

  it('clamps a restored results page after answers have been removed', () => {
    render(<LegalCheckup forms={forms} />);
    act(() =>
      window.dispatchEvent(
        new PopStateEvent('popstate', {
          state: {
            courtFormsCheckup: { screen: 'summary', page: 20, needPage: 0 },
          },
        })
      )
    );
    expect(screen.getByRole('status')).toHaveTextContent(
      'No matching tools to display'
    );
    expect(screen.getByRole('link', { name: /find legal help/ })).toBeVisible();
  });

  it('keeps earlier selections when paging and allows returning to edit them', () => {
    render(<LegalCheckup forms={forms} />);
    fireEvent.click(screen.getByRole('button', { name: /My home/ }));
    fireEvent.click(
      screen.getByRole('button', { name: /My rental home has problems/ })
    );
    fireEvent.click(screen.getByRole('button', { name: 'More situations' }));
    expect(
      screen.getByRole('heading', { name: 'Which of these sound familiar?' })
    ).toHaveFocus();
    fireEvent.click(
      screen.getByRole('button', {
        name: /I disagree with a request about an old eviction case/,
      })
    );
    expect(screen.getByRole('status')).toHaveTextContent(
      '2 selected in this area'
    );
    expectSmallScreen();
    fireEvent.click(
      screen.getByRole('button', { name: 'Back to first situations' })
    );
    const repairs = screen.getByRole('button', {
      name: /My rental home has problems/,
    });
    expect(repairs).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(repairs);
    finishArea();
    showSummary();
    expect(
      screen.getByRole('link', {
        name: /Explore this option: Respond to a petition about an eviction record/,
      })
    ).toBeInTheDocument();
    expect(
      screen.queryByText('My rental home has problems')
    ).not.toBeInTheDocument();
  });

  it('selects multiple situations without leaving the area and combines different areas', () => {
    render(<LegalCheckup forms={forms} />);
    fireEvent.click(screen.getByRole('button', { name: /My home/ }));
    const repairs = screen.getByRole('button', {
      name: /My rental home has problems/,
    });
    fireEvent.click(repairs);
    expect(repairs).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.queryByRole('heading', { name: 'Your checkup summary' })
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /I may lose my home/ }));
    expect(screen.getByRole('status')).toHaveTextContent(
      '2 selected in this area'
    );
    expectSmallScreen();
    finishArea();
    expect(screen.getByRole('status')).toHaveTextContent(
      '1 of 5 areas reviewed'
    );
    fireEvent.click(
      screen.getByRole('button', { name: /Money, benefits & work/ })
    );
    fireEvent.click(
      screen.getByRole('button', { name: /Debt collectors keep contacting me/ })
    );
    finishArea();
    showSummary();
    expect(
      screen.getByRole('heading', { name: 'Your checkup summary' })
    ).toHaveFocus();
    expect(screen.getByText('My rental home has problems')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'My home' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Money, benefits & work' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A letter to a debt collector does not answer a lawsuit/)
    ).toBeInTheDocument();
    expectSmallScreen();
    fireEvent.click(screen.getByRole('button', { name: /Check another area/ }));
    fireEvent.click(screen.getByRole('button', { name: /My home/ }));
    fireEvent.click(
      screen.getByRole('button', { name: /My rental home has problems/ })
    );
    finishArea();
    showSummary();
    expect(
      screen.queryByText('My rental home has problems')
    ).not.toBeInTheDocument();
  });

  it('shows all five areas together and keeps situation and result pages small', () => {
    render(<LegalCheckup forms={forms} />);
    expectSmallScreen();
    for (const topic of checkupTopics) {
      expect(
        screen.getByRole('button', { name: new RegExp(topic.label) })
      ).toBeVisible();
    }
    expect(
      screen.queryByRole('button', { name: 'More areas' })
    ).not.toBeInTheDocument();
    for (const topic of checkupTopics) {
      fireEvent.click(
        screen.getByRole('button', { name: new RegExp(topic.label) })
      );
      const pageSize = topic.needs.length > 4 ? 3 : 4;
      for (const [index, need] of topic.needs.entries()) {
        if (index > 0 && index % pageSize === 0) {
          fireEvent.click(
            screen.getByRole('button', { name: 'More situations' })
          );
          expectSmallScreen();
        }
        fireEvent.click(
          screen.getByRole('button', { name: new RegExp(need.label) })
        );
        expectSmallScreen();
      }
      finishArea();
      expectSmallScreen();
    }
    expect(screen.getByRole('status')).toHaveTextContent(
      '5 of 5 areas reviewed'
    );
    expect(screen.getByRole('status')).toHaveTextContent(
      '26 situations selected'
    );
    showSummary();
    const seen = new Set<string>();
    do {
      expectSmallScreen();
      screen
        .getAllByRole('link')
        .forEach((link) => seen.add(link.getAttribute('href')!));
      const next = screen.queryByRole('button', { name: 'More options' });
      if (!next) break;
      fireEvent.click(next);
    } while (true);
    expect(seen.size).toBe(forms.length + 2);
    fireEvent.click(
      screen.getByRole('button', { name: 'Back to first options' })
    );
    expect(screen.getByRole('status')).toHaveTextContent('Options 1–3');
  });

  it('allows an area to be reviewed with no selections', () => {
    render(<LegalCheckup forms={forms} />);
    fireEvent.click(screen.getByRole('button', { name: /My home/ }));
    finishArea();
    expect(screen.getByText('Reviewed — none selected')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /My home/ }));
    finishArea();
    expect(screen.getByRole('status')).toHaveTextContent(
      '1 of 5 areas reviewed'
    );
    fireEvent.click(screen.getByRole('button', { name: /Something else/ }));
    expect(
      screen.getByRole('link', {
        name: /find legal help/,
      })
    ).toBeInTheDocument();
  });

  it('does not equate missing data with no legal needs', () => {
    render(<LegalCheckup forms={[]} hasFetchErrors />);
    fireEvent.click(screen.getByRole('button', { name: /My home/ }));
    fireEvent.click(
      screen.getByRole('button', { name: /My rental home has problems/ })
    );
    finishArea();
    showSummary();
    expect(
      screen.getByText(/That does not mean you have no legal options/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Some tool information is unavailable/)
    ).toBeInTheDocument();
    expectSmallScreen();
  });
});
