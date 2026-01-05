// Example: courtformsonline.org/ma/forms/[form-slug]
/*
  Schema.org & Legal Help Dashboard references used for structured data and tagging:
  - Legal Help Dashboard: https://schema.legalhelpdashboard.org/
  - SoftwareApplication (Schema.org): https://schema.org/SoftwareApplication
  - Thing (Schema.org, used for 'about'): https://schema.org/Thing
  - Place (Schema.org, used for 'areaServed'): https://schema.org/Place
  - timeRequired (Schema.org): https://schema.org/timeRequired
  - about (Schema.org): https://schema.org/about
  - areaServed (Schema.org): https://schema.org/areaServed
  - Schema validator: https://validator.schema.org/
*/
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import { fetchInterviews } from '../../../../data/fetchInterviewData';
import { getFormDetails } from '../../../../data/getFormDetails';
import type { Metadata } from 'next';
import { toUrlFriendlyString } from '../../../utils/helpers';
import { getLegalHelpInfo } from '../../../../utils/legalHelpService';
import styles from '../../../css/FormPage.module.css';
import FormStatus from '../../../components/FormStatus';
import SimilarForms from '../../../components/SimilarForms';
import LegalResourceLink from '../../../components/LegalResourceLink';
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
  const _formDetailsResponse = await getFormDetails(path, form);
  const { formDetails, formTopic, formTopics, relatedForms } =
    _formDetailsResponse;

  console.log('DEBUG Form Page:', {
    form,
    path,
    formTopic,
    formTopicsCount: formTopics?.length,
    formTopicsNames: formTopics?.map((t) => t.name),
  });

  if (!formDetails) {
    return <div>Form not found</div>;
  }

  // Get legal help info using centralized service
  const topicToUse =
    formTopic ||
    (formTopics && formTopics.length > 0 ? formTopics[0]?.name : null);

  const { deepLink, DisclaimerComponent } = await getLegalHelpInfo({
    jurisdiction: path,
    topic: topicToUse,
    listTopics: formDetails.metadata?.LIST_topics,
  });

  // Build schema.org structured data for this form page
  // See: https://schema.legalhelpdashboard.org/ for guidance and examples
  // Schema.org docs: https://schema.org/SoftwareApplication, https://schema.org/Thing, https://schema.org/Place
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: formDetails.title,
    description: formDetails.metadata?.description || '',
    applicationCategory: 'LegalApplication',
    url: `${formDetails.serverUrl}${formDetails.link}`,
    isAccessibleForFree: true,
    ...(formDetails.metadata?.LIST_topics &&
      formDetails.metadata.LIST_topics.length > 0 && {
        about: formDetails.metadata.LIST_topics.map((topic) => ({
          '@type': 'Thing',
          name: topic,
        })),
      }),
    ...(formDetails.metadata?.estimated_completion_minutes && {
      timeRequired: `PT${formDetails.metadata.estimated_completion_minutes}M`,
    }),
    ...(formDetails.metadata?.jurisdiction && {
      areaServed: {
        '@type': 'Place',
        name: formDetails.metadata.jurisdiction,
      },
    }),
  };

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

  // Build topics list for SimilarForms: include any matching topics and ensure the main topic is present
  const topicsForSimilar = (formTopics || []).slice();
  if (formTopic) {
    const existingIndex = topicsForSimilar.findIndex(
      (t) => t.name.toLowerCase() === formTopic.toLowerCase()
    );
    if (existingIndex === -1) {
      const ft = legalTopics.find(
        (t) => t.name.toLowerCase() === formTopic.toLowerCase()
      );
      if (ft) {
        topicsForSimilar.unshift({ name: ft.name, long_name: ft.long_name });
      }
    } else {
      // If it's already present, ensure it appears at the front (duplicate allowed)
      const [existing] = topicsForSimilar.splice(existingIndex, 1);
      topicsForSimilar.unshift(existing);
    }
  }

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
      <p className="text-muted small">
        <Link href="/guides/how-interviews-work">
          Learn how interactive interviews work
        </Link>
      </p>
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
      <p className="text-muted small">
        <Link href="/guides/choosing-right-form">
          How to select the right court form
        </Link>
      </p>
      <h2 className="mt-4">Before you start</h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {formDetails.metadata.before_you_start}
      </ReactMarkdown>
      <p className="text-muted small">
        <Link href="/guides/what-information-you-need">
          What information most court forms need
        </Link>
        {' · '}
        <Link href={`/guides/find-your-court/${path}`}>
          Find your {jurisdictionName} courthouse
        </Link>
      </p>
      <h2 className="mt-4">What happens after you finish</h2>
      <p>
        After completing this interview, you&apos;ll receive your completed
        forms ready for filing.{' '}
        <Link href={`/guides/how-to-file/${path}`}>
          Learn how to file in {jurisdictionName}
        </Link>
        .
      </p>
      <Button className="btn btn-primary btn-lg my-3" href={startFormUrl}>
        Start tool
      </Button>
      <SimilarForms
        forms={relatedForms}
        basePath={`/${path}/forms`}
        topics={topicsForSimilar}
        jurisdictionPath={path}
      />
      {deepLink && DisclaimerComponent && (
        <LegalResourceLink
          topic={topicDisplayName}
          jurisdiction={jurisdictionName}
          deepLink={deepLink}
          disclaimerInfo={<DisclaimerComponent />}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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

  /*
    Next.js Metadata generation
    - We set `title` and `description` which will populate <title> and <meta name="description">.
    - OpenGraph tags are included for richer social previews (og:title, og:description, og:type).
    - Adding additional tags in `other` helps include custom metadata like LIST codes.
    For schema.org mapping and best practices, see:
    - https://schema.org/
    - https://schema.org/SoftwareApplication
    - https://schema.org/about
  */

  const description = formDetails.metadata?.description || '';
  const listTopics = formDetails.metadata?.LIST_topics || [];

  const metadata: Metadata = {
    title: `${formDetails.title} - Court Forms Online`,
    description: description,
    openGraph: {
      title: `${formDetails.title} - Court Forms Online`,
      description: description,
      type: 'website',
    },
    other: {
      description: description,
    },
  };

  // Add LIST codes as meta tags for semantic content understanding
  if (listTopics.length > 0) {
    metadata.other = {
      ...metadata.other,
      ...listTopics.reduce(
        (acc, topic) => {
          if (!acc['LIST']) {
            acc['LIST'] = [];
          }
          (acc['LIST'] as string[]).push(topic);
          return acc;
        },
        metadata.other as Record<string, any>
      ),
    };
  }

  return metadata;
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
