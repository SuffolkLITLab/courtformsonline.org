'use client';

import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  checkupTopics,
  CheckupForm,
  getCheckupRecommendations,
} from '../../data/maCheckup';
import styles from '../css/LegalCheckup.module.css';

const PAGE_SIZE = 3;
const INITIAL_VIEW = { screen: 'areas', page: 0, needPage: 0 };
type CheckupView = typeof INITIAL_VIEW;

function readHistoryView(state: unknown): CheckupView | null {
  const view = (state as { courtFormsCheckup?: CheckupView } | null)
    ?.courtFormsCheckup;
  if (
    !view ||
    !['areas', 'summary', ...checkupTopics.map((topic) => topic.id)].includes(
      view.screen
    ) ||
    !Number.isSafeInteger(view.page) ||
    view.page < 0 ||
    !Number.isSafeInteger(view.needPage) ||
    view.needPage < 0
  )
    return null;
  // Pages are clamped at render time, where the page counts are known.
  return { screen: view.screen, page: view.page, needPage: view.needPage };
}

export default function LegalCheckup({
  forms,
  hasFetchErrors = false,
}: {
  forms: CheckupForm[];
  hasFetchErrors?: boolean;
}) {
  const [view, setView] = useState<CheckupView>(INITIAL_VIEW);
  const { screen } = view;
  const [selected, setSelected] = useState<string[]>([]);
  const [reviewed, setReviewed] = useState<string[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const topic = checkupTopics.find((item) => item.id === screen);
  const needsPerPage = topic && topic.needs.length > 4 ? 3 : 4;
  const needPageCount = topic
    ? Math.ceil(topic.needs.length / needsPerPage)
    : 1;
  const needPage = Math.min(view.needPage, needPageCount - 1);
  const hasMoreNeeds = needPage + 1 < needPageCount;
  const visibleNeeds = topic?.needs.slice(
    needPage * needsPerPage,
    (needPage + 1) * needsPerPage
  );
  const pickedIn = (area: (typeof checkupTopics)[number]) =>
    area.needs.filter((need) => selected.includes(need.id));
  const selectedNeeds = checkupTopics.flatMap(pickedIn);
  const { recommendations: results, missingCount } = getCheckupRecommendations(
    selected,
    forms
  );
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  // An older history entry can refer to a results page removed by edited choices.
  const page = Math.min(view.page, pageCount - 1);

  useEffect(() => {
    // Answers are memory-only, so a fresh mount starts a fresh checkup.
    window.history.replaceState(
      { ...window.history.state, courtFormsCheckup: INITIAL_VIEW },
      ''
    );

    const restoreView = (event: PopStateEvent) => {
      const previous = readHistoryView(event.state);
      if (previous) setView(previous);
    };
    window.addEventListener('popstate', restoreView);
    return () => window.removeEventListener('popstate', restoreView);
  }, []);

  function navigate(nextScreen: string, pages: Partial<CheckupView> = {}) {
    const next = { ...INITIAL_VIEW, screen: nextScreen, ...pages };
    // Preserve Next.js's own router state. Store navigation only, never answers.
    window.history.pushState(
      { ...window.history.state, courtFormsCheckup: next },
      ''
    );
    setView(next);
  }

  function goBack() {
    if (window.history.length > 1) window.history.back();
    else window.location.assign('/ma');
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus();
  }, [screen, page, needPage]);

  function toggleNeed(id: string) {
    setSelected((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function finishArea() {
    if (topic) {
      setReviewed((previous) =>
        previous.includes(topic.id) ? previous : [...previous, topic.id]
      );
    }
    navigate('areas');
  }

  return (
    <main className={styles.checkup} aria-label="Massachusetts legal checkup">
      <header className={styles.header}>
        <p className={styles.eyebrow}>Massachusetts · Free legal checkup</p>
      </header>

      {screen === 'areas' && (
        <section aria-labelledby="checkup-heading">
          <h1 id="checkup-heading" ref={heading} tabIndex={-1}>
            What could be easier in your life?
          </h1>
          <p className={styles.intro}>
            More than one part of life may need attention. Explore any of these
            areas and choose all the situations that fit. We’ll put your options
            together in one summary.
          </p>
          <p>Takes about 5 minutes. No account, names, or documents needed.</p>
          <p role="status" className={styles.finePrint}>
            {reviewed.length} of {checkupTopics.length} areas reviewed ·{' '}
            {selected.length}{' '}
            {selected.length === 1 ? 'situation' : 'situations'} selected
          </p>
          <div className={styles.choices}>
            {checkupTopics.map((area) => {
              const count = pickedIn(area).length;
              return (
                <button
                  key={area.id}
                  className={styles.choice}
                  onClick={() => navigate(area.id)}
                >
                  <span>
                    <strong>{area.label}</strong>
                    <span>{area.description}</span>
                    {count > 0 && (
                      <span className={styles.selected}>
                        {count} {count === 1 ? 'situation' : 'situations'} saved
                      </span>
                    )}
                    {reviewed.includes(area.id) && count === 0 && (
                      <span className={styles.selected}>
                        Reviewed — none selected
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.back} onClick={goBack}>
              Back
            </button>
            <button
              className={styles.primary}
              onClick={() => navigate('summary')}
            >
              {selected.length
                ? `See my summary (${selected.length})`
                : 'Something else / see other help'}
            </button>
          </div>
          <p className={styles.finePrint}>
            You can check more than one area. Your choices stay in this page and
            clear when you reload or close it. This checkup suggests tools; it
            does not decide whether you qualify. Filling out a tool takes extra
            time.
          </p>
        </section>
      )}

      {topic && (
        <section aria-labelledby="checkup-heading">
          <p className={styles.eyebrow}>{topic.label}</p>
          <h1 id="checkup-heading" ref={heading} tabIndex={-1}>
            Which of these sound familiar?
          </h1>
          <p className={styles.intro}>
            Choose all that fit. You can select more than one, or leave them all
            blank. Select a situation again to remove it.
          </p>
          {needPageCount > 1 && (
            <p className={styles.pagination}>
              Situations {needPage * needsPerPage + 1}–
              {Math.min((needPage + 1) * needsPerPage, topic.needs.length)} of{' '}
              {topic.needs.length}
            </p>
          )}
          <div className={styles.choices}>
            {visibleNeeds?.map((need) => {
              const isSelected = selected.includes(need.id);
              return (
                <button
                  key={need.id}
                  className={styles.choice}
                  aria-pressed={isSelected}
                  onClick={() => toggleNeed(need.id)}
                >
                  <span>
                    <strong>{need.label}</strong>
                    <span>{need.description}</span>
                    {isSelected && (
                      <span className={styles.selected}>
                        Selected — tap to remove
                      </span>
                    )}
                  </span>
                  {isSelected && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.selectionCheck}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
          <p role="status" className={styles.finePrint}>
            {pickedIn(topic).length} selected in this area · {selected.length}{' '}
            total
          </p>
          <div className={styles.actions}>
            <button type="button" className={styles.back} onClick={goBack}>
              Back
            </button>
            {needPageCount > 1 && (
              <button
                className={hasMoreNeeds ? styles.primary : styles.secondary}
                onClick={() =>
                  navigate(screen, {
                    needPage: (needPage + 1) % needPageCount,
                  })
                }
              >
                {hasMoreNeeds ? 'More situations' : 'Back to first situations'}
              </button>
            )}
            <button
              className={hasMoreNeeds ? styles.secondary : styles.primary}
              onClick={finishArea}
            >
              Done with this area
            </button>
          </div>
        </section>
      )}

      {screen === 'summary' && (
        <section aria-labelledby="checkup-heading">
          <h1 id="checkup-heading" ref={heading} tabIndex={-1}>
            Your checkup summary
          </h1>
          <p className={styles.intro}>
            {selected.length
              ? 'These tools may help with the situations you picked. Open a tool’s information page to learn more and check whether it fits.'
              : 'Nothing selected yet? You can check another area or explore the help below. There may be options this checkup does not cover.'}
          </p>
          {selectedNeeds.length > 0 && (
            <div className={styles.saved}>
              <h2>You picked</h2>
              {checkupTopics.map((area) => {
                const needs = pickedIn(area);
                return needs.length > 0 ? (
                  <div key={area.id}>
                    <h3>{area.label}</h3>
                    <ul>
                      {needs.map((need) => (
                        <li key={need.id}>{need.label}</li>
                      ))}
                    </ul>
                  </div>
                ) : null;
              })}
              <p>
                To remove a situation, choose “Check another area” and tap that
                saved situation again.
              </p>
            </div>
          )}
          {selectedNeeds
            .filter((need) => need.note)
            .map((need) => (
              <p className={styles.note} key={need.id}>
                <strong>{need.label}: </strong>
                {need.note}
              </p>
            ))}
          {(hasFetchErrors || missingCount > 0) && (
            <p role="status" className={styles.note}>
              Some tool information is unavailable. This is not a complete list
              of possible help. Try the legal help finder below or check back
              later.
            </p>
          )}
          {selected.length > 0 && results.length === 0 && (
            <p>
              We could not find an available tool for your choices. That does
              not mean you have no legal options.
            </p>
          )}
          <div className={styles.resultsHeading}>
            <h2>Possible next steps</h2>
            <p className={styles.pagination} role="status">
              {results.length > 0
                ? `Options ${page * PAGE_SIZE + 1}–${Math.min((page + 1) * PAGE_SIZE, results.length)} of ${results.length}`
                : 'No matching tools to display'}
            </p>
          </div>
          <p className={styles.newTab}>
            Links open in a new tab so you can keep your summary here.
          </p>
          <div className={styles.results}>
            {results.map((result, index) => (
              <article
                key={result.filename}
                // Off-page results stay in the DOM so printing includes them.
                hidden={Math.floor(index / PAGE_SIZE) !== page}
                className={styles.result}
              >
                <h3>{result.label}</h3>
                <p>{result.description}</p>
                {result.reasons.length > 0 && (
                  <p className={styles.reason}>
                    Because you picked: {result.reasons.join('; ')}.
                  </p>
                )}
                <a
                  href={result.href}
                  data-print-url={`https://courtformsonline.org${result.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Explore this option: ${result.label} (opens in a new tab)`}
                >
                  Explore this option
                </a>
              </article>
            ))}
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.back} onClick={goBack}>
              Back
            </button>
            <button
              className={styles.primary}
              onClick={() => navigate('areas')}
            >
              Check another area / change answers
            </button>
            {pageCount > 1 && (
              <button
                className={styles.secondary}
                onClick={() =>
                  navigate('summary', { page: (page + 1) % pageCount })
                }
              >
                {page + 1 === pageCount
                  ? 'Back to first options'
                  : 'More options'}
              </button>
            )}
          </div>
          <aside className={styles.otherHelp} aria-label="Other help">
            <p>
              Looking for something else?{' '}
              <a
                href="/ma/forms"
                target="_blank"
                rel="noopener noreferrer"
                data-print-url="https://courtformsonline.org/ma/forms"
              >
                Browse all Massachusetts forms
              </a>
              {' or '}
              <a
                href="https://masslrf.org/en/home"
                target="_blank"
                rel="noopener noreferrer"
                data-print-url="https://masslrf.org/en/home"
              >
                find legal help
              </a>
              .
            </p>
          </aside>
          <p className={styles.finePrint}>
            You can stop here or check another area. Use your browser’s Print
            command to print or save your whole summary, including options on
            other pages. Your choices clear when this page reloads or closes.
          </p>
          <p className={styles.finePrint}>
            These are possible starting points, not a determination of your
            rights or eligibility. Each tool has its own instructions and
            screening.
          </p>
        </section>
      )}
    </main>
  );
}
