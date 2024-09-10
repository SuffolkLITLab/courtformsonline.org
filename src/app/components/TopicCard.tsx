'use client';
import Link from 'next/link';
import { useState } from 'react';
import { toUrlFriendlyString } from '../utils/helpers';

interface TopicCardProps {
  topic: {
    name: string;
    long_name: string;
    icon: string;
    codes: any[];
  };
  interviews: any[];
  index: number;
  serverUrl: string;
  path: string;
  isSpot?: boolean;
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

const TopicCard = ({
  topic,
  interviews,
  index,
  serverUrl,
  path,
  isSpot = false,
}: TopicCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibilityClass = index > 8 ? 'hidden' : '';
  const displayInterviews = isExpanded
    ? interviews.slice(0, Math.min(10, interviews.length))
    : interviews.slice(0, 3);
  const remainingCount = interviews.length > 10 ? interviews.length - 10 : 0;
  const cardClassName = isSpot ? 'spot-topic-card-parent' : 'topic-card-parent';
  const toggleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`col-lg-4 ${cardClassName} ${visibilityClass}`}
      key={topic.codes[0]}
    >
      <div className="card topic-card m-1 h-100">
        <Link
          href={`/${path}/${topic.name.toLowerCase()}`}
          className="card-header d-flex align-items-center text-decoration-none text-dark"
        >
          <div
            style={{ minWidth: '40px', minHeight: '40px' }}
            className="icon-container d-inline-flex justify-content-center align-items-center rounded"
          >
            <FontAwesomeIcon iconName={topic.icon} className="fa-icon" />
          </div>
          <h5 className="card-title ms-3">{topic.long_name}</h5>
        </Link>
        <div className="card-body">
          <div
            className="tag-container"
            style={{ maxHeight: isExpanded ? '800px' : '200px' }}
          >
            {displayInterviews.map((interview, index) => {
              if (interview.metadata && interview.metadata.title) {
                return (
                  <Link
                    key={
                      toUrlFriendlyString(interview.metadata.title) +
                      '-' +
                      index
                    }
                    className="form-tag text-decoration-none"
                    href={`/forms/${toUrlFriendlyString(interview.metadata.title)}`}
                  >
                    {interview.metadata.title}
                  </Link>
                );
              }
              return null;
            })}
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
    </div>
  );
};

export default TopicCard;
