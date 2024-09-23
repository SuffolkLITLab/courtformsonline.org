// Example: courtformsonline.org/ma/forms/[form-slug]
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { fetchInterviews } from '../../../../data/fetchInterviewData';
import { toUrlFriendlyString } from '../../../utils/helpers';
import styles from '../../../css/FormPage.module.css';

interface PageProps {
  params: {
    form: string;
  };
}

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
      <p className="badge text-bg-secondary fs-6 fw-normal">Form</p>
      <h1 className="display-5 mb-4">{formDetails.title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {formDetails.metadata.description}
      </ReactMarkdown>
      {(formDetails.metadata.help_page_url ||
        formDetails.metadata.original_form) && (
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
            {formDetails.metadata.original_form && (
              <li>
                <Link href={formDetails.metadata.original_form} target="_blank">
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
