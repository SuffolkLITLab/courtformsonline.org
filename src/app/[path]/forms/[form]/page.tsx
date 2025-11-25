// Example: courtformsonline.org/ma/forms/[form-slug]
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { fetchInterviews } from '../../../../data/fetchInterviewData';
import { toUrlFriendlyString } from '../../../utils/helpers';
import styles from '../../../css/FormPage.module.css';
import FormStatus from '../../../components/FormStatus';

interface PageProps {
  params: {
    form: string;
  };
}

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const Page = async ({ params }: PageProps) => {
  const { form } = params;
  const { interviewsByTopic, isError } = await fetchInterviews('ma');

  if (isError) {
    return <div>Error loading form details</div>;
  }

  // Find the form details based on the title converted to the format
  let formDetails = null;
  Object.keys(interviewsByTopic).forEach((topic) => {
    interviewsByTopic[topic].forEach((interview) => {
      const formattedTitle = toUrlFriendlyString(interview.title);
      if (formattedTitle === form) {
        formDetails = interview;
      }
    });
  });

  if (!formDetails) {
    return <div>Form not found</div>;
  }

  const startFormUrl = `${formDetails.serverUrl}${formDetails.link}`;

  return (
    <div className={styles.FormPage + ' container'}>
      <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
        <div>
          <p className="badge text-bg-secondary fs-6 fw-normal">Form</p>
          <h1 className="display-5 mb-0">{formDetails.title}</h1>
          {formDetails.metadata.review_date && (
            <div className="mt-2">
              <span className="text-muted" style={{ fontSize: '0.875rem' }}>
                Last reviewed:{' '}
                <time dateTime={formDetails.metadata.review_date}>
                  {new Date(
                    formDetails.metadata.review_date
                  ).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </span>
            </div>
          )}
        </div>
        <div>
          <FormStatus maturity={formDetails.metadata.maturity} />
        </div>
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {formDetails.metadata.description}
      </ReactMarkdown>
      {/* Documents this tool helps make - only show if form_titles is defined and non-empty */}
      {Array.isArray(formDetails.metadata.form_titles) &&
        formDetails.metadata.form_titles.length > 0 && (
          <div className={styles.DocumentsList + ' mt-4 mb-4'}>
            <h3>This tool helps you make the following documents</h3>
            <ul>
              {formDetails.metadata.form_titles.map((title, idx) => (
                <li key={idx}>{title}</li>
              ))}
            </ul>
          </div>
        )}
      {/* Filing fee information - only show if there's a fee */}
      {Array.isArray(formDetails.metadata.fees) &&
        formDetails.metadata.fees.some(
          (fee) => fee.amount && fee.amount > 0
        ) && (
          <div className={styles.FeeInfo + ' mt-3 mb-3'}>
            <strong>Filing fee:</strong>{' '}
            {formDetails.metadata.fees.map((fee, idx) =>
              fee.amount && fee.amount > 0 ? (
                <span key={idx}>
                  {fee.name ? `${fee.name}: $${fee.amount}` : `$${fee.amount}`}
                  {idx < formDetails.metadata.fees.length - 1 ? ', ' : ''}
                </span>
              ) : null
            )}
            <br />
            <span>
              If you have a low income, you may qualify for a fee waiver.
            </span>
            <br />
            <span>
              Completing forms with CourtFormsOnline.org is always free, but a
              court may require a payment to file a completed document.
            </span>
          </div>
        )}
      {(formDetails.metadata.help_page_url ||
        (formDetails.metadata.original_form &&
          isValidUrl(formDetails.metadata.original_form))) && (
        <>
          <p>
            <strong>More information:</strong>
          </p>
          <ul>
            {formDetails.metadata.help_page_url && (
              <li>
                <Link href={formDetails.metadata.help_page_url} target="_blank">
                  {formDetails.metadata.help_page_title}
                </Link>
              </li>
            )}
            {formDetails.metadata.original_form &&
              isValidUrl(formDetails.metadata.original_form) && (
                <li>
                  <Link
                    href={formDetails.metadata.original_form}
                    target="_blank"
                  >
                    Original form
                  </Link>
                </li>
              )}
          </ul>
        </>
      )}
      <h2 className="mt-4">Can I use this interview?</h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {formDetails.metadata.can_I_use_this_form}
      </ReactMarkdown>
      <h2 className="mt-4">Before you start</h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {formDetails.metadata.before_you_start}
      </ReactMarkdown>
      <Button className="btn btn-primary btn-lg my-3" href={startFormUrl}>
        Start interview
      </Button>
    </div>
  );
};

export default Page;

export async function generateStaticParams() {
  const { interviewsByTopic } = await fetchInterviews('ma');

  const params = [];
  Object.keys(interviewsByTopic).forEach((topic) => {
    interviewsByTopic[topic].forEach((interview) => {
      const formattedTitle = toUrlFriendlyString(interview.title);
      params.push({ form: formattedTitle });
    });
  });

  return params;
}
