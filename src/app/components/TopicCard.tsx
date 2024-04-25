import Link from 'next/link';

interface TopicCardProps {
  topic: {
    name: string;
    long_name: string;
    icon: string;
  };
  interviews: any;
}

const FontAwesomeIcon: React.FC<IconProps> = ({ iconName, className = '' }) => {
  return <i className={`fas fa-${iconName} ${className}`}></i>;
};

const TopicCard = ({ topic, interviews }) => {
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
            {interviews.length > 0 ? (
              interviews.map((interview, index) => (
                <span key={index} className="form-tag">
                  {interview.metadata.title}
                </span>
              ))
            ) : (
              <p>No interviews available.</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TopicCard;
