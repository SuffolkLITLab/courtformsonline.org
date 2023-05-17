import Link from "next/link";
import React from "react";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";

const { legalTopics, findParentTopic } = require("../../topics.config.ts");

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

const fakeFormNames = [
  "Fee waiver",
  "209A Domestic Violence Restraining Order",
  "Enlarge Time to File (Appeals Court)",
  "Appeal or Stay Your Eviction",
  "Eviction Moratorium",
  "Civil Docketing Statement",
  "Massachusetts Defense for Eviction (MADE)",
  "Dismiss your CRA case",
  "Interpreter Notice",
  "Petition to Change Name of Adult",
]

const getRandomItems = (arr: Array<string>, min: number, max: number) => {
  const newArr = [...arr]; // Copy array to avoid mutating the original one.
  let count = Math.floor(min + Math.random() * (max - min + 1));
  let result: Array<string> = [];
  while (count--) {
      result.push(newArr.splice(Math.floor(Math.random() * newArr.length), 1)[0]);
  }
  return result;
}

// const formPill

const TopicCard = ({ topic }: { topic: Topic }) => (
  <div className="col-lg-4">
    <Link
      href={`/${topic.name.toLowerCase()}`}
      className="text-decoration-none text-dark"
    >
      <div className="card m-1 topic-card">
        <div className="card-header d-flex align-items-center">
          <div style={{minWidth: '30px', minHeight: '30px'}} className="icon-container  d-inline-flex justify-content-center align-items-center rounded">
            <FontAwesomeIcon iconName={topic.icon} className="text-white" />
          </div>
          <h5 className="card-title ms-3">{topic.long_name}</h5>
        </div>
        <div className="card-body">
          {getRandomItems(fakeFormNames, 2, 5)
          .map((form:string) => (
            <span className="form-tag">{form}</span>
          ))
          }
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
        <div className="container">
          <h2>Browse court forms by category</h2>
          <div className="row">
            {legalTopics
              .sort((a, b) => (a.priority < b.priority ? 1 : -1))
              .filter((topic) => topic.always_visible)
              .map((topic: Topic) => (
                <TopicCard key={topic.code} topic={topic} />
              ))}
          </div>
          <Link href="#">Show all categories</Link>
        </div>
      </section>

      <HowItWorksSection />
    </div>
  );
}
