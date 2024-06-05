import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Button from 'react-bootstrap/Button';

interface InteractiveFormProps {
  title: string;
  metadata: any;
  link: string;
  serverUrl: string;
}

const InteractiveForm: React.FC<InteractiveFormProps> = ({
  title,
  metadata,
  link,
  serverUrl,
}) => {
  const fullUrl = `${serverUrl}${link}`;

  return (
    <div>
      <div className="form-content">
        <div className="form-text-section">
          <h2 className="form-subheading">{title}</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {metadata.before_you_start}
          </ReactMarkdown>
          <br />
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {metadata.description}
          </ReactMarkdown>
          <br />
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {metadata.can_I_use_this_form}
          </ReactMarkdown>
        </div>
        <div className="form-button-section">
          <Button className="form-start-button" href={fullUrl}>
            Start Form
          </Button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default InteractiveForm;
