'use client';
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import type { FamilyEmergencyForm } from '../../data/familyEmergencyForms';
import { message, type Locale } from '../../i18n/messages';
import styles from '../css/FamilyEmergency.module.css';
export default function FamilyPlanningTools({
  forms,
  descriptions = {},
  locale = 'en',
}: {
  forms: FamilyEmergencyForm[];
  descriptions?: Record<string, ReactNode>;
  locale?: Locale;
}) {
  const [state, setState] = useState('');
  const states = Array.from(
    new Set(forms.map((form) => form.jurisdiction))
  ).filter((name) => !['United States', 'State not specified'].includes(name));
  states.sort((a, b) => a.localeCompare(b, locale));
  const visible = forms.filter(
    (form) =>
      !state ||
      form.jurisdiction === state ||
      form.jurisdiction === 'United States'
  );
  const count = visible.length;
  const countMessage = state
    ? count === 1
      ? 'catalog.oneForState'
      : 'catalog.manyForState'
    : count === 1
      ? 'catalog.one'
      : 'catalog.many';
  const startLabel = message(locale, 'catalog.start');
  const detailsLabel = message(locale, 'catalog.details');
  return (
    <>
      <div className="container">
        <div className={styles.stateSelector}>
          <label htmlFor="family-planning-state" className="h4 d-block">
            {message(locale, 'catalog.state')}
          </label>
          <select
            id="family-planning-state"
            className="form-select form-select-lg"
            value={state}
            onChange={(event) => setState(event.target.value)}
          >
            <option value="">{message(locale, 'catalog.allStates')}</option>
            {states.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <section
        id="tools"
        className="py-5 mt-4 container"
        aria-labelledby="family-tools-heading"
      >
        <h2 id="family-tools-heading">
          {message(locale, 'catalog.familyHeading')}
        </h2>
        <p>{message(locale, 'catalog.familyIntro')}</p>
        <p role="status" aria-live="polite">
          {message(locale, countMessage, { count, state })}.
        </p>
        <div className="row g-4">
          {visible.map((form, index) => {
            const jurisdiction =
              form.jurisdiction === 'United States'
                ? message(locale, 'catalog.national')
                : form.jurisdiction === 'State not specified'
                  ? message(locale, 'catalog.unknownState')
                  : form.jurisdiction;
            const titleId = `directory-form-title-${index}`;
            const languages = (form.languages ?? []).map(
              (language) => language.toLowerCase().split(/[-_]/)[0]
            );
            const interviewLanguage = languages.includes('es')
              ? 'catalog.spanish'
              : languages.length > 0 &&
                  languages.every((language) => language === 'en')
                ? 'catalog.english'
                : 'catalog.unknownLanguage';
            return (
              <div className="col-md-6 col-xl-4" key={form.id}>
                <article className={`card p-4 ${styles.cardHover}`}>
                  <h3
                    id={titleId}
                    lang={form.titleLanguage}
                    className="h5 fw-bold"
                  >
                    {form.title}
                  </h3>
                  <p>{jurisdiction}</p>
                  {descriptions[form.id]}
                  <p className="small text-muted">
                    {message(locale, interviewLanguage)}
                  </p>
                  <a
                    href={form.href}
                    className="btn btn-primary mt-auto"
                    aria-describedby={locale === 'es' ? titleId : undefined}
                    aria-label={
                      locale === 'en'
                        ? `${startLabel}: ${form.title} (${jurisdiction})`
                        : undefined
                    }
                  >
                    {startLabel}
                  </a>
                  {form.detailsHref && (
                    <Link
                      href={form.detailsHref}
                      hrefLang="en"
                      className="btn btn-outline-primary mt-2"
                      aria-describedby={locale === 'es' ? titleId : undefined}
                      aria-label={
                        locale === 'en'
                          ? `${detailsLabel}: ${form.title} (${jurisdiction})`
                          : undefined
                      }
                    >
                      {detailsLabel}
                    </Link>
                  )}
                </article>
              </div>
            );
          })}
        </div>
        {forms.length === 0 && <p>{message(locale, 'catalog.familyEmpty')}</p>}
      </section>
    </>
  );
}
