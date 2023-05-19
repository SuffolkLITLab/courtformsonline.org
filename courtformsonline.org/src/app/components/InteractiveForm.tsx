import { Form } from '../interfaces/Form';

interface InteractiveFormProps extends Form {}

const InteractiveForm: React.FC<InteractiveFormProps> = ({ title, description, link, serverUrl }) => {
  const url = new URL(serverUrl);
  url.pathname = link;

  return (
    <div className="interactive-form" key={link}>
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={url.toString()}>Start Form</a>
    </div>
  );
};

export default InteractiveForm;
