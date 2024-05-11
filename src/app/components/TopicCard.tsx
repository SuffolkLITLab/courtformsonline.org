'use client';
import Link from 'next/link';
import { useState } from 'react';

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

const FontAwesomeIcon = ({
  iconName,
  className = '',
  style = {},
}: IconProps) => {
  return <i className={`fas fa-${iconName} ${className}`} style={style}></i>;
};

const TopicCard = ({ topic, interviews, index, serverUrl }: TopicCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibilityClass = index > 8 ? 'hidden' : '';

  const displayInterviews = isExpanded
    ? interviews.slice(0, Math.min(10, interviews.length))
    : interviews.slice(0, 3);
  const remainingCount = interviews.length > 10 ? interviews.length - 10 : 0;

  const toggleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const handleNavigation = (url) => {
    window.location.href = url;
  };

  return (
    <div
      className={`col-lg-4 topic-card-parent ${visibilityClass}`}
      key={topic.codes[0]}
    >
      <Link
        href={`/${topic.name.toLowerCase()}`}
        className="text-decoration-none text-dark"
      >
        <div
          className="card topic-card m-1 h-100"
          onClick={(e) => e.preventDefault()}
        >
          <div className="card-header d-flex align-items-center">
            <div
              style={{ minWidth: '40px', minHeight: '40px' }}
              className="icon-container d-inline-flex justify-content-center align-items-center rounded"
            >
              <FontAwesomeIcon iconName={topic.icon} className="fa-icon" />
            </div>
            <h5 className="card-title ms-3">{topic.long_name}</h5>
          </div>
          <div className="card-body">
            <div
              className="tag-container"
              style={{ maxHeight: isExpanded ? '800px' : '200px' }}
            >
              {displayInterviews.map((interview, index) => (
                <span
                  key={index}
                  className="form-tag text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(serverUrl + interview.link);
                  }}
                >
                  {interview.metadata.title}
                </span>
              ))}
            </div>
            {interviews.length > 3 && (
              <div className="show-container">
                <div className="show-more" onClick={toggleExpand}>
                  {isExpanded ? 'Show Less' : 'Show More'}
                  <i
                    className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}
                  ></i>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TopicCard;