'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toUrlFriendlyString } from '../utils/helpers';
import { MASSLRF_LINKS } from '../../config/constants';
import styles from '../css/TopicCard.module.css';
import {
  MAX_VISIBLE_PER_CARD,
  MAX_VISIBLE_CATEGORIES,
} from '../../config/constants';

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
  // Hide when index is at or above the visible count (0-based index)
  const visibilityClass = index >= MAX_VISIBLE_CATEGORIES ? 'hidden' : '';
  const displayInterviews = isExpanded
    ? interviews.slice(0, Math.min(MAX_VISIBLE_PER_CARD, interviews.length))
    : interviews.slice(0, 3);
  const totalInterviews = interviews.length;
  const remainingCount =
    totalInterviews > MAX_VISIBLE_PER_CARD
      ? totalInterviews - MAX_VISIBLE_PER_CARD
      : 0;
  const displayedCount = Math.min(MAX_VISIBLE_PER_CARD, totalInterviews);
  const viewAllLabel = `showing ${displayedCount} of ${totalInterviews} ${totalInterviews === 1 ? 'form' : 'forms'}`;
  const cardClassName = isSpot ? 'spot-topic-card-parent' : 'topic-card-parent';
  // Calculate which row this card is in (3 cards per row)
  const rowIndex = Math.floor(index / 3);

  // Listen for expand/collapse events from other cards in the same row
  useEffect(() => {
    const handleRowToggle = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent?.detail?.rowIndex === rowIndex) {
        setIsExpanded(customEvent.detail.expanded);
      }
    };

    window.addEventListener('topicCardToggle', handleRowToggle);
    return () => {
      window.removeEventListener('topicCardToggle', handleRowToggle);
    };
  }, [rowIndex]);

  const toggleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    // Dispatch event to toggle all cards in the same row
    window.dispatchEvent(
      new CustomEvent('topicCardToggle', {
        detail: { rowIndex, expanded: newExpandedState },
      })
    );
  };

  return (
    <div
      className={`col col-lg-4 ${cardClassName} ${visibilityClass}`}
      key={topic.codes[0]}
    >
      <div className={styles.TopicCard + ' card topic-card h-100'}>
        <Link
          href={`/${path}/${topic.name.toLowerCase()}`}
          title={`View all ${topic.long_name} forms`}
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
            <div
              className={
                styles.ShowContainer +
                ' show-container d-flex align-items-center justify-content-end gap-3'
              }
            >
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
              {isExpanded && interviews.length > MAX_VISIBLE_PER_CARD && (
                <Link
                  href={`/${path}/${topic.name.toLowerCase()}`}
                  className={
                    styles.ViewAll +
                    ' view-all d-flex align-items-center text-decoration-none'
                  }
                >
                  View all
                  <span className={styles.ViewAllCount}>{viewAllLabel}</span>
                  <i className="fas fa-arrow-right ms-1"></i>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
