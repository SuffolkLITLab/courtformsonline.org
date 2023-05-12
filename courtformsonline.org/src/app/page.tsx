import Link from 'next/link';
import React from 'react';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';

const { legalTopics, findParentTopic } = require('../../topics.config.ts');

interface Topic {
  code: string;
  name: string;
  long_name: string;
  icon: string;
}

interface IconProps {
    iconName: string;
    className: string;
  }
  
  const FontAwesomeIcon: React.FC<IconProps> = ({ iconName, className }) => {
    return <i className={`fas fa-${iconName} ${className}`}></i>;
  }; 
  

const TopicCard = ({ topic }: { topic: Topic }) => (
  <div className="col-lg-3">
    <Link href={`/${topic.name.toLowerCase()}`} className='text-decoration-none text-dark'>
        <div className="card m-1 topic-card">
          <div className="card-body d-flex align-items-center">
            <div className="icon-container bg-primary rounded">
              <FontAwesomeIcon iconName={topic.icon} className="text-white"/>
            </div>
            <h5 className="card-title ms-3">{topic.long_name}</h5>
          </div>
        </div>
    </Link>
  </div>
);

export default function TopicsPage() {
  return (
    <div>
      <HeroSection />
    <section id="topics">
      
    <div className="container mt-5">
    <h2>Browse court forms by category</h2>
      <div className="row">
        {legalTopics.map((topic: Topic) => (
          <TopicCard key={topic.code} topic={topic} />
        ))}
      </div>
    </div>
    </section>
    
    <HowItWorksSection />
  </div>    
  );
}