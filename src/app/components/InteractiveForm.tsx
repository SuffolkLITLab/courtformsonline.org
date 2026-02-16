import React from 'react';
import Button from 'react-bootstrap/Button';
import ReactMarkdown from 'react-markdown';

import Link from 'next/link';

import remarkGfm from 'remark-gfm';

import { toUrlFriendlyString } from '../utils/helpers';
import styles from '../css/InteractiveForm.module.css';
import FormStatus from './FormStatus';

interface InteractiveFormProps {
  title: string;
  metadata: any;
  landingPageURL: string;
  link: string;
  serverUrl: string;
}

const InteractiveForm: React.FC<InteractiveFormProps> = ({
  title,
  metadata,
  landingPageURL,
  link,
  serverUrl,
}) => {
  const fullUrl = `${serverUrl}${link}`;

  return (
    <div
      id={toUrlFriendlyString(title)}
      className={styles.Form + ' d-flex border-bottom form pb-4 my-5'}
    >
      <div className={styles.FormTitleContainer + ' flex-grow-1'}>
        <Link className={styles.FormLink} href={landingPageURL}>
          <h2 className="form-title mb-3">{title}</h2>
        </Link>
        <div className="mb-2">
          <FormStatus
            maturity={metadata?.maturity}
            efilingEnabled={metadata?.efiling_enabled}
            integratedEfiling={metadata?.integrated_efiling}
            integratedEmailFiling={metadata?.integrated_email_filing}
          />
        </div>
        <div className="form-description">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {metadata.description}
          </ReactMarkdown>
          <Link href={landingPageURL}>Learn more about this form</Link>
        </div>
      </div>
      <div className={styles.FormButtonContainer + ' d-flex flex-column'}>
        <Button
          className="form-button btn btn-primary text-nowrap"
          href={fullUrl}
        >
          Start tool
        </Button>
      </div>
    </div>
  );
};

export default InteractiveForm;
