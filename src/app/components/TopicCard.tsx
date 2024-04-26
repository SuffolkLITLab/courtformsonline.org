import Link from 'next/link';

interface TopicCardProps {
  topic: {
    name: string;
    long_name: string;
    icon: string;
  };
  interviews: any[];
}

interface IconProps {
  iconName: string;
  className?: string;
  style?: React.CSSProperties;
}

const FontAwesomeIcon = ({ iconName, className = '' }: IconProps) => {
  return <i className={`fas fa-${iconName} ${className}`} style={{ minWidth: '40px', minHeight: '40px' }}></i>;
};

const TopicCard = ({ topic, interviews }: TopicCardProps) => {

  // Display the first 3 interviews, and show a final tag with how many remaining interviews are not shown
  const displayInterviews = interviews.slice(0, 3);
  const extraCount = interviews.length > 3 ? interviews.length - 3 : 0;

  return (
    <div className="col-lg-4">
      <Link
        href={`/${topic.name.toLowerCase()}`}
        className="text-decoration-none text-dark"
      >
        <div className="card m-1 topic-card h-100">
          <div className="card-header d-flex align-items-center">
            <FontAwesomeIcon
              iconName={topic.icon}
              className="fa-icon"
              style={{ minWidth: '40px', minHeight: '40px' }}
            />
            <h5 className="card-title ms-3">{topic.long_name}</h5>
          </div>
          <div className="card-body">
            {displayInterviews.map((interview, index) => (
              <span key={index} className="form-tag">
                {interview.metadata.title}
              </span>
            ))}
            {extraCount > 0 && <span className="form-tag">+{extraCount}</span>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TopicCard;
