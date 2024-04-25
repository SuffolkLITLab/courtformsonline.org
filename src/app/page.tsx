'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import { useInterviews } from '../data/fetchInterviewData';
import TopicCard from './components/TopicCard';
import { legalTopics } from '../config/topics.config';

export default function TopicsPage() {
  const { interviewsByTopic, isLoading, isError } = useInterviews();

  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <section id="topics">
        <div className="container">
          <h2>Browse court forms by category</h2>
          <div className="row row-cols-1 row-cols-md-3 g-5">
            {isLoading ? (
              <div>Loading interviews...</div>
            ) : isError ? (
              <div>Error loading interviews.</div>
            ) : (
              // Only display topics who either are marked always_visible or have interviews
              legalTopics
                .sort((a, b) => b.priority - a.priority)
                .filter(
                  (topic) =>
                    topic.always_visible ||
                    (interviewsByTopic[topic.name] &&
                      interviewsByTopic[topic.name].length > 0)
                )
                .map((topic) => (
                  <TopicCard
                    key={topic.codes[0]}
                    topic={topic}
                    interviews={interviewsByTopic[topic.name] || []}
                  />
                ))
            )}
          </div>
          <Link href="#">Show all categories</Link>
        </div>
      </section>
    </div>
  );
}
