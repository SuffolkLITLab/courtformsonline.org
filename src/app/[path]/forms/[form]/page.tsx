// Example: courtformsonline.org/ma/forms/[form-slug]
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import { fetchInterviews } from '../../../../data/fetchInterviewData';
import { getFormDetails } from '../../../../data/getFormDetails';
import type { Metadata } from 'next';
import { toUrlFriendlyString } from '../../../utils/helpers';
import styles from '../../../css/FormPage.module.css';
import FormStatus from '../../../components/FormStatus';
import Breadcrumbs, { BreadcrumbItem } from '../../../components/Breadcrumbs';
import { pathToServerConfig } from '../../../../config/formSources.config';
import { legalTopics } from '../../../../config/topics.config';

interface PageProps {
  params: {
    form: string;
    path: string;
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
  const { form, path } = params;
  const { formDetails, formTopic } = await getFormDetails(path, form);

  if (!formDetails) {
    notFound();
  }

  // Get jurisdiction name from path config
  const jurisdictionConfig = pathToServerConfig[path];
  const jurisdictionName = jurisdictionConfig?.name || path.toUpperCase();

  // Get topic display name
  const topicDetails = formTopic
    ? legalTopics.find((t) => t.name.toLowerCase() === formTopic.toLowerCase())
    : null;
  const topicDisplayName = topicDetails?.long_name || formTopic || 'Forms';

  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: jurisdictionName, href: `/${path}` },
  ];

  if (formTopic && topicDetails) {
    breadcrumbItems.push({
      label: topicDisplayName,
      href: `/${path}/${formTopic.toLowerCase()}`,
    });
  }

  breadcrumbItems.push({ label: formDetails.title });

  const startFormUrl = `${formDetails.serverUrl}${formDetails.link}`;

  // Remove the form title from breadcrumbs
  const displayBreadcrumbs = breadcrumbItems.slice(0, -1);

  return (
    <div className={styles.FormPage + ' container'}>
      <Breadcrumbs items={displayBreadcrumbs} large />
      <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
        <div>
          {/* Removed Form badge */}
          <h1 className="display-5 mb-0">{formDetails.title}</h1>
          {formDetails.metadata.review_date && (
            <div className="mt-2">
              <span className="text-muted" style={{ fontSize: '0.875rem' }}>
                <span>Last reviewed </span>
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
          <FormStatus
            maturity={formDetails.metadata.maturity}
            efilingEnabled={formDetails.metadata.efiling_enabled}
          />
        </div>
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {formDetails.metadata.description}
      </ReactMarkdown>
      {/* Documents this tool helps make - only show if form_titles is defined and non-empty */}
      {Array.isArray(formDetails.metadata.form_titles) &&
        formDetails.metadata.form_titles.length > 0 && (
          <div className={styles.DocumentsList + ' mt-4 mb-4'}>
            <h3>This tool helps you make the following documents:</h3>
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
            <strong>Fees:</strong>
            <ul>
              {formDetails.metadata.fees.map((fee, idx) =>
                fee.amount && fee.amount > 0 ? (
                  <li key={idx}>
                    {fee.name
                      ? `${fee.name}: $${fee.amount}`
                      : `$${fee.amount}`}
                  </li>
                ) : null
              )}
            </ul>
            <span>
              CourtFormsOnline.org is free, but a court may require a payment to
              file a completed document.
            </span>
            <br />
            <span>
              If you have a low income, you may qualify for a fee waiver.
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
      <h2 className="mt-4">Can I use this tool?</h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {formDetails.metadata.can_I_use_this_form}
      </ReactMarkdown>
      <h2 className="mt-4">Before you start</h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {formDetails.metadata.before_you_start}
      </ReactMarkdown>
      <Button className="btn btn-primary btn-lg my-3" href={startFormUrl}>
        Start tool
      </Button>
    </div>
  );
};

export default Page;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { form, path } = params;
  const { formDetails } = await getFormDetails(path, form);

  if (!formDetails) {
    return { title: 'Court Forms Online' };
  }

  return {
    title: `${formDetails.title} - Court Forms Online`,
    description: formDetails.metadata?.description,
  };
}

export async function generateStaticParams({
  params,
}: {
  params: { path: string };
}) {
  const { path } = params;
  const { interviewsByTopic } = await fetchInterviews(path);

  const params_list: Array<{ path: string; form: string }> = [];
  Object.keys(interviewsByTopic).forEach((topic) => {
    interviewsByTopic[topic].forEach((interview) => {
      const formattedTitle = toUrlFriendlyString(interview.title);
      params_list.push({ path, form: formattedTitle });
    });
  });

  return params_list;
}
