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

const FontAwesomeIcon: React.FC<IconProps> = ({ iconName, className = "" }) => {
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
      <div className="card m-1 topic-card h-100">
        <div className="card-header d-flex align-items-center">
          <div style={{minWidth: '30px', minHeight: '30px'}} className="icon-container  d-inline-flex justify-content-center align-items-center rounded">
            <FontAwesomeIcon iconName={topic.icon} className="fa-icon" />
          </div>
          <h5 className="card-title ms-3">{topic.long_name}</h5>
        </div>
        <div className="card-body">
          {getRandomItems(fakeFormNames, 2, 5)
          .map((form:string) => (
            <span key={form} className="form-tag">{form}</span>
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
      <HowItWorksSection />
      <section id="topics">
        <div className="container">
          <h2>Browse court forms by category</h2>
          <div className="row row-cols-1 row-cols-md-3 g-5">
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
      <div className="container">
      <div className="row mt-4">
            <div className="col">
              <h2>About</h2>
                <p>
                Court Forms Online is operated by Suffolk University Law School's Legal Innovation and Technology Lab.
                It began as a volunteer project in cooperation with the Massachusetts Access to Justice Commission's COVID-19 task force and volunteers
                from around the world. {" "}
                <Link href="/about">
                    Learn more...
                </Link>
                </p>
            </div>
        </div>
        </div>
    </div>
  );
}
