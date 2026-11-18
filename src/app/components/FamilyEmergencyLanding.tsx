import type { ReactNode } from 'react';
import Link from 'next/link';
import { fetchFamilyEmergencyForms } from '../../data/familyEmergencyForms';
import { message, type Locale, type MessageId } from '../../i18n/messages';
import FormDirectory from './FormDirectory';
import styles from '../css/FamilyEmergency.module.css';

const clinicUrl = 'https://www.cliniclegal.org/epif';
const appleseedUrl =
  'https://deportationpreparation.org/state-child-safety-plans/';
const legalHelpUrl = '/guides/find-a-lawyer';
const maGuide = {
  en: 'https://www.masslegalhelp.org/family-emergency',
  es: 'https://www.masslegalhelp.org/es/inmigracion/conozca-sus-derechos/planificar-una-emergencia-familiar',
};
const temporaryAgent = {
  en: 'https://www.masslegalhelp.org/children-families-divorce/guardians-other-caregivers/appointing-temporary-agent-my-child',
  es: 'https://www.masslegalhelp.org/es/ninos-familias-divorcio/tutores-otros-cuidadores-responsables/nombrar-un-agente-temporal-para-mis-hijos',
};
const caregiverForm = {
  en: 'https://selfhelp.courts.ca.gov/sites/default/files/2026-01/CaregiversAuthorizationAffidavit.pdf',
  es: 'https://selfhelp.courts.ca.gov/sites/default/files/2026-01/SP_CaregiversAuthorizationAffidavit_FiNAL.pdf',
};

type FamilyMessage = MessageId & `family.${string}`;

export default async function FamilyEmergencyLanding({
  locale,
}: {
  locale: Locale;
}) {
  const forms = await fetchFamilyEmergencyForms(locale);
  const t = (id: FamilyMessage) => message(locale, id);
  const link = (href: string, id: FamilyMessage, lang?: Locale) => (
    <a key={id} href={href} hrefLang={lang}>
      {t(id)}
    </a>
  );
  const rich = (id: FamilyMessage, links: Record<string, ReactNode>) =>
    t(id)
      .split(/(\{\w+\})/)
      .map((part) => links[part.slice(1, -1)] ?? part);
  const legalHelp = link(legalHelpUrl, 'family.legalHelpInline', 'en');
  const resources = [
    {
      title: 'family.clinicTitle',
      description: 'family.clinicDescription',
      links: [{ href: clinicUrl, id: 'family.clinicLink', lang: 'en' }],
    },
    {
      title: 'family.appleseedTitle',
      description: 'family.appleseedDescription',
      links: [{ href: appleseedUrl, id: 'family.appleseedLink', lang: 'en' }],
    },
    {
      title: 'family.ilrcTitle',
      description: 'family.ilrcDescription',
      links: [
        {
          href: 'https://www.ilrc.org/community-resources/know-your-rights/step-step-family-preparedness-plan',
          id: 'family.ilrcLink',
        },
        {
          href: `https://www.ilrc.org/sites/default/files/2026-04/Step-by-Step-Family-Preparedness-Plan-${locale === 'es' ? 'SPA' : 'ENG'}.pdf`,
          id: 'family.ilrcDownload',
          lang: locale,
        },
      ],
    },
    {
      title: 'family.maTitle',
      description: 'family.maDescription',
      links: [{ href: maGuide[locale], id: 'family.maLink', lang: locale }],
    },
  ] satisfies {
    title: FamilyMessage;
    description: FamilyMessage;
    links: { href: string; id: FamilyMessage; lang?: Locale }[];
  }[];
  const questions: { question: FamilyMessage; paragraphs: ReactNode[] }[] = [
    {
      question: 'family.detentionQuestion',
      paragraphs: [
        t('family.detentionFirst'),
        rich('family.detentionSecond', {
          appleseed: link(appleseedUrl, 'family.appleseedPlans', 'en'),
          urgentHelp: link(legalHelpUrl, 'family.urgentHelp', 'en'),
        }),
      ],
    },
    {
      question: 'family.absenceQuestion',
      paragraphs: [
        t('family.absenceFirst'),
        rich('family.absenceSecond', {
          temporaryAgent: link(
            temporaryAgent[locale],
            'family.temporaryAgent',
            locale
          ),
        }),
      ],
    },
    {
      question: 'family.typesQuestion',
      paragraphs: [
        rich('family.typesCaregiver', {
          caregiverForm: link(
            caregiverForm[locale],
            'family.caregiverForm',
            locale
          ),
        }),
        t('family.typesPowers'),
        t('family.typesGuardianship'),
        rich('family.typesAdvice', { legalHelp }),
      ],
    },
    {
      question: 'family.careQuestion',
      paragraphs: [
        t('family.careFirst'),
        rich('family.careSecond', {
          packets: link('#more-forms', 'family.carePackets'),
        }),
      ],
    },
    {
      question: 'family.dependentQuestion',
      paragraphs: [
        rich('family.dependentAnswer', {
          clinic: link(clinicUrl, 'family.clinicDirectory', 'en'),
        }),
      ],
    },
    {
      question: 'family.missingStateQuestion',
      paragraphs: [
        rich('family.missingStateAnswer', {
          guided: link('#tools', 'family.guided'),
          packets: link('#more-forms', 'family.packets'),
        }),
      ],
    },
  ];

  return (
    <main>
      <section className={styles.heroSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-primary mb-2">{t('family.badge')}</span>
              <h1 className="display-4 fw-bold mb-3">{t('family.heading')}</h1>
              <p className="lead mb-4">{t('family.intro')}</p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#tools" className="btn btn-primary btn-lg">
                  {t('family.find')}
                </a>
                <a
                  href="#more-forms"
                  className="btn btn-outline-primary btn-lg"
                >
                  {t('family.more')}
                </a>
                <Link
                  href={locale === 'es' ? '/es' : '/'}
                  className="btn btn-outline-secondary btn-lg"
                >
                  {t('family.back')}
                </Link>
              </div>
            </div>
            <div
              className="col-lg-4 d-none d-lg-block text-center"
              aria-hidden="true"
            >
              <i
                className="fa-solid fa-shield-heart text-primary"
                style={{ fontSize: '8rem', opacity: 0.8 }}
              />
            </div>
          </div>
        </div>
      </section>
      <FormDirectory forms={forms} locale={locale} />
      <section
        id="more-forms"
        className="py-5 container"
        aria-labelledby="more-forms-heading"
      >
        <h2 id="more-forms-heading">{t('family.more')}</h2>
        <p>{t('family.resourceIntro')}</p>
        <p>{rich('family.resourceAdvice', { legalHelp })}</p>
        <div className="row g-4">
          {resources.map(({ title, description, links }) => (
            <div className="col-md-6" key={title}>
              <article className={`card p-4 ${styles.cardHover}`}>
                <h3 className="h5">{t(title)}</h3>
                <p>{t(description)}</p>
                {links.map(({ href, id, lang }, index) => (
                  <a
                    href={href}
                    hrefLang={lang}
                    key={id}
                    className={index === 0 ? 'mt-auto' : undefined}
                  >
                    {t(id)}
                  </a>
                ))}
              </article>
            </div>
          ))}
        </div>
      </section>
      <section
        id="family-planning-faq"
        className="py-5 bg-light"
        aria-labelledby="family-planning-faq-heading"
      >
        <div className="container">
          <h2 id="family-planning-faq-heading">{t('family.faq')}</h2>
          <p>{t('family.faqIntro')}</p>
          {questions.map(({ question, paragraphs }) => (
            <details key={question} className={styles.faqItem}>
              <summary>
                <h3>{t(question)}</h3>
              </summary>
              <div className="px-4 pb-4">
                {paragraphs.map((text, index) => (
                  <p
                    key={index}
                    className={
                      index === paragraphs.length - 1 ? 'mb-0' : undefined
                    }
                  >
                    {text}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <h2>{t('family.moreHelp')}</h2>
          <div className="list-group">
            <Link
              href={legalHelpUrl}
              hrefLang="en"
              className="list-group-item list-group-item-action p-4"
            >
              <h3 className="h5">{t('family.legalHelp')}</h3>
              <p className="mb-0">{t('family.legalHelpDescription')}</p>
            </Link>
            <Link
              href="/guides/how-interviews-work"
              hrefLang="en"
              className="list-group-item list-group-item-action p-4"
            >
              <h3 className="h5">{t('family.guidedHow')}</h3>
              <p className="mb-0">{t('family.guidedDescription')}</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
