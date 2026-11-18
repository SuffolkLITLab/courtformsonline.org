import dynamic from 'next/dynamic';
import Link from 'next/link';
import { fetchInterviews } from '../../data/fetchInterviewData';
import { message, type Locale } from '../../i18n/messages';
import { formDetailsPath, formsPath } from '../../i18n/routes';
import {
  getAvailableJurisdictions,
  getJurisdictionFromPath,
} from '../../utils/jurisdiction';
import { getLegalHelpInfo } from '../../utils/legalHelpService';
import { pathToServerConfig } from '../../config/formSources.config';
import InteractiveForm from './InteractiveForm';
import LegalResourceLink from './LegalResourceLink';
import styles from '../css/AllFormsContainer.module.css';

const SearchSection = dynamic(() => import('./SearchSection'), { ssr: false });

async function getForms(path: string, locale: Locale) {
  const { interviewsByTopic } = await fetchInterviews(path, { locale });
  const listed = Object.values(interviewsByTopic).flat();
  const forms = new Map<string, (typeof listed)[number] & { path: string }>();
  for (const form of listed) {
    if (!forms.has(form.canonicalTitle))
      forms.set(form.canonicalTitle, { ...form, path });
  }
  return Array.from(forms.values());
}

export default async function FormsIndex({
  path,
  locale,
}: {
  path?: string;
  locale: Locale;
}) {
  const states = getAvailableJurisdictions();
  const jurisdiction = path ? getJurisdictionFromPath(path) : '';
  const moreFormsUrl = path
    ? pathToServerConfig[path]?.moreFormsUrl
    : undefined;
  const [pages, help] = await Promise.all([
    Promise.all(
      (path ? [path] : states.map((state) => state.path)).map((state) =>
        getForms(state, locale)
      )
    ),
    path ? getLegalHelpInfo({ jurisdiction: path }) : null,
  ]);
  const cards = pages
    .flat()
    .map((form) => (
      <InteractiveForm
        key={`${form.path}:${form.canonicalTitle}`}
        title={form.title}
        titleLanguage={form.titleLanguage}
        descriptionLanguage={form.descriptionLanguage}
        metadata={form.metadata}
        landingPageURL={formDetailsPath(locale, form.path, form.canonicalTitle)}
        canonicalTitle={form.canonicalTitle}
        filename={form.filename}
        link={form.link}
        serverUrl={form.serverUrl}
        locale={locale}
      />
    ));
  const Disclaimer = help?.DisclaimerComponent;

  return (
    <div className={styles.AllFormsContainer + ' container'}>
      {path ? (
        <>
          <h1 className="form-heading text-center mb-3">
            {message(locale, 'forms.heading', { state: jurisdiction })}
          </h1>
          <p className="text-center text-muted mb-3">
            {message(locale, 'forms.new')}{' '}
            <Link href="/guides/how-interviews-work" hrefLang="en">
              {message(locale, 'forms.how')}
            </Link>
            {' · '}
            <Link href="/guides/what-information-you-need" hrefLang="en">
              {message(locale, 'forms.need')}
            </Link>
            {' · '}
            <Link href="/guides/choosing-right-form" hrefLang="en">
              {message(locale, 'forms.choose')}
            </Link>
          </p>
          {states.length > 1 && (
            <p className="text-center mb-3">
              {message(locale, 'forms.different')}{' '}
              {states
                .filter((state) => state.path !== path)
                .map((state, index, options) => (
                  <span key={state.path}>
                    <a href={formsPath(locale, state.path)}>{state.name}</a>
                    {index < options.length - 1 ? ', ' : ''}
                  </span>
                ))}
            </p>
          )}
          {moreFormsUrl && (
            <p className="text-muted small mb-2">
              {message(locale, 'forms.missing')}{' '}
              <a
                href={moreFormsUrl}
                target="_blank"
                rel="noopener noreferrer"
                hrefLang="en"
              >
                {message(locale, 'forms.more', { state: jurisdiction })}
              </a>
            </p>
          )}
        </>
      ) : (
        <h1 className="text-center">{message(locale, 'forms.title')}</h1>
      )}
      <SearchSection
        serverName={jurisdiction}
        currentPath={path}
        locale={locale}
      />
      {path ? cards : <div className="forms">{cards}</div>}
      {help?.deepLink && Disclaimer && (
        <LegalResourceLink
          locale={locale}
          topic={message(locale, 'forms.legalAssistance')}
          jurisdiction={jurisdiction}
          deepLink={help.deepLink}
          disclaimerInfo={<Disclaimer />}
        />
      )}
    </div>
  );
}
