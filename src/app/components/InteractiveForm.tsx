import React from 'react';
import Link from 'next/link';
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
  const formPageUrl = `/forms/${title.toLowerCase().replace(/ /g, '-')}`;

  return (
    <div>
      <div className="form-content">
        <div className="form-text-section">
          <Link className="form-link" href={formPageUrl} passHref>
            <h2 className="form-subheading">{title}</h2>
          </Link>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {metadata.description}
          </ReactMarkdown>
          <br />
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
