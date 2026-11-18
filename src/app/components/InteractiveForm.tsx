import React from 'react';
import Button from 'react-bootstrap/Button';

import Link from 'next/link';

import { toUrlFriendlyString } from '../utils/helpers';
import styles from '../css/InteractiveForm.module.css';
import FormStatus from './FormStatus';
import { message, type Locale } from '../../i18n/messages';
import { spanishInterviewUrl } from '../../data/interviewUrl';
import MarkdownContent from './MarkdownContent';

interface InteractiveFormProps {
  title: string;
  canonicalTitle?: string;
  metadata: any;
  landingPageURL: string;
  link: string;
  serverUrl: string;
  filename?: string;
  locale?: Locale;
  titleLanguage?: string;
  descriptionLanguage?: string;
}

const InteractiveForm: React.FC<InteractiveFormProps> = ({
  title,
  canonicalTitle = title,
  metadata,
  landingPageURL,
  link,
  serverUrl,
  filename,
  locale = 'en',
  titleLanguage,
  descriptionLanguage,
}) => {
  const fullUrl =
    locale === 'es'
      ? spanishInterviewUrl(serverUrl, filename, link)
      : `${serverUrl}${link}`;

  return (
    <div
      id={toUrlFriendlyString(canonicalTitle)}
      className={styles.Form + ' d-flex border-bottom form pb-4 my-5'}
    >
      <div className={styles.FormTitleContainer + ' flex-grow-1'}>
        <Link className={styles.FormLink} href={landingPageURL} hrefLang="en">
          <h2 className="form-title mb-3" lang={titleLanguage}>
            {title}
          </h2>
        </Link>
        <div className="mb-2">
          <FormStatus
            locale={locale}
            maturity={metadata?.maturity}
            efilingEnabled={metadata?.efiling_enabled}
            integratedEfiling={metadata?.integrated_efiling}
            integratedEmailFiling={metadata?.integrated_email_filing}
          />
        </div>
        <div className="form-description">
          <div lang={descriptionLanguage}>
            <MarkdownContent>{metadata.description}</MarkdownContent>
          </div>
          <Link href={landingPageURL} hrefLang="en">
            {message(locale, 'forms.learn')}
          </Link>
        </div>
      </div>
      <div className={styles.FormButtonContainer + ' d-flex flex-column'}>
        <Button
          className="form-button btn btn-primary text-nowrap"
          href={fullUrl}
        >
          {message(locale, 'forms.start')}
        </Button>
      </div>
    </div>
  );
};

export default InteractiveForm;
