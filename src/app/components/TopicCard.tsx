'use client';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { toUrlFriendlyString } from '../utils/helpers';
import { MASSLRF_LINKS } from '../../config/constants';
import styles from '../css/TopicCard.module.css';

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
  searchQuery?: string;
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
  searchQuery = '',
}: TopicCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibilityClass = index > 8 ? 'hidden' : '';
  const displayInterviews = isExpanded
    ? interviews.slice(0, Math.min(20, interviews.length))
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
      className={`col col-lg-4 ${cardClassName} ${visibilityClass}`}
      key={topic.codes[0]}
    >
      <div className={styles.TopicCard + ' card topic-card h-100'}>
        <Link
          href={`/${path}/${topic.name.toLowerCase()}`}
          className={
            styles.CardTitleLink +
            ' card-header d-flex align-items-center bg-transparent border-0 pt-3'
          }
        >
          <div
            style={{ minWidth: '40px', minHeight: '40px' }}
            className={
              styles.TopicIcon +
              ' icon-container d-flex justify-content-center align-items-center fs-5 p-2 rounded-circle'
            }
          >
            <FontAwesomeIcon iconName={topic.icon} className="fa-icon" />
          </div>
          <h5 className="card-title fs-5 m-0 ms-2">{topic.long_name}</h5>
        </Link>
        <div className="card-body d-flex flex-column justify-content-space-between">
          <div
            className={
              styles.TagContainer +
              ' tag-container d-flex flex-column flex-grow-1 mb-3'
            }
            style={{ maxHeight: isExpanded ? '800px' : '200px' }}
          >
            {displayInterviews.map((interview, index) => {
              if (interview.metadata && interview.metadata.title) {
                return (
                  <Link
                    key={`${toUrlFriendlyString(interview.filename)}-${topic.name}-${index}`}
                    className={
                      styles.FormTag +
                      ' form-tag btn btn-outline-secondary border-2 align-self-start text-start'
                    }
                    href={
                      '/' +
                      path +
                      '/forms/' +
                      toUrlFriendlyString(interview.metadata.title)
                    }
                  >
                    {interview.metadata.title}
                  </Link>
                );
              }
              return null;
            })}
          </div>
          {isSpot && path === 'ma' && (
            <div className="mb-3 pb-2 border-top pt-2">
              <p className="text-muted small mb-2">
                More resources from Massachusetts Legal Resource Finder:
              </p>
              <div className="d-flex flex-column gap-2">
                {MASSLRF_LINKS[topic.name] ? (
                  MASSLRF_LINKS[topic.name].map((link, idx) => {
                    // Extract the category name from the URL
                    const categoryName = link.split('/').pop() || '';
                    const capitalize = (word: string) =>
                      word.charAt(0).toUpperCase() + word.slice(1);
                    const displayName = categoryName
                      .split('_')
                      .map(capitalize)
                      .join(' ');
                    return (
                      <a
                        key={`${topic.name}-masslrf-${idx}`}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary align-self-start"
                      >
                        {displayName}
                        <i
                          className="fas fa-external-link-alt ms-2"
                          style={{ fontSize: '0.75rem' }}
                        ></i>
                      </a>
                    );
                  })
                ) : (
                  <a
                    href={`https://masslrf.org/en/triage/search/${encodeURIComponent(
                      searchQuery
                    )}/1`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary align-self-start"
                  >
                    Search MassLegalResourceFinder
                    <i
                      className="fas fa-external-link-alt ms-2"
                      style={{ fontSize: '0.75rem' }}
                    ></i>
                  </a>
                )}
              </div>
            </div>
          )}
          {interviews.length > 3 && (
            <div className={styles.ShowContainer + ' show-container ms-auto'}>
              <div
                className={
                  styles.ShowMore + ' show-more d-flex align-items-center'
                }
                onClick={toggleExpand}
              >
                {isExpanded ? 'Show less' : 'Show more'}
                <i
                  className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} ms-1`}
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
