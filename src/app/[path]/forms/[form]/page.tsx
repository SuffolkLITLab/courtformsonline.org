// Example: courtformsonline.org/ma/forms/[form-slug]
import { fetchInterviews } from '../../../../data/fetchInterviewData';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Button from 'react-bootstrap/Button';
import { toUrlFriendlyString } from '../../../utils/helpers';

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
    <div className="container my-4">
      <h1>{formDetails.title}</h1>
      <h2>Description</h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {formDetails.metadata.description}
      </ReactMarkdown>
      <h2>Can I use this form?</h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {formDetails.metadata.can_I_use_this_form}
      </ReactMarkdown>
      <h2>Before you start:</h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {formDetails.metadata.before_you_start}
      </ReactMarkdown>
      <Button className="form-start-button" href={startFormUrl}>
        Start Form
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
