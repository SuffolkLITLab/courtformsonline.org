import ThankYou from '../components/ThankYou';
import Link from 'next/link';

export default function About() {
  return (
    <div>
      <div className="container">
        <section className="about-document-assembly-line mt-4">
          <h1>About Court Forms Online</h1>
          <p>
            Court Forms Online is a free website built by the{' '}
            <a href="https://suffolklitlab.org">
              Suffolk Legal Innovation and Technology (LIT) Lab
            </a>
            . It helps you create court forms and other legal forms. In some
            cases, we can deliver your forms directly to the court. Lawyers, law
            students, designers, and technologists helped turn each form into a
            simple to use and guided process. The Lab reviews forms regularly to
            keep them up to date.
          </p>
          <p>
            While we consulted with and collaborated with both the Trial Court
            and the Appeals Court, Court Forms Online is not a project of the
            Massachusetts Court. The Appeals Court has issued a{' '}
            <a href="https://www.mass.gov/info-details/appeals-court-administrative-order-20-5">
              standing order
            </a>{' '}
            that makes this website an officially approved way to deliver forms
            to the Appeals Court.
          </p>
          <h3>How does it work?</h3>
          <p>
            We use the free and open source tool{' '}
            <a href="https://docassemble.org">Docassemble</a> to ask you simple
            step-by-step questions and to turn them into filing-ready PDF
            documents for your legal case. You can use the interactive forms on
            a desktop computer or a smartphone.
          </p>
          <p>
            Some forms need to be printed and delivered by you. Some forms
            include a button that delivers your form securely by email. We are
            working on integrating our forms with the Appeals Court electronic
            filing system directly. Suffolk LIT Lab delivers forms this way in
            Illinois as a{' '}
            <a href="https://suffolklitlab.org/docassemble-AssemblyLine-documentation/docs/efiling/overview">
              certified third-party filer.
            </a>
          </p>
          <h3>In other states</h3>
          <p>
            You can use our free tools to build your own interactive court
            forms! Check out the{' '}
            <a href="https://suffolklitlab.org/docassemble-AssemblyLine-documentation/">
              Document Assembly Line project documentation page
            </a>{' '}
            to learn how.
          </p>
          <h3>The Document Assembly Line Project</h3>
          <p>
            At the beginning of the COVID-19 pandemic, the{' '}
            <a href="https://suffolklitlab.org">Suffolk LIT Lab</a> was just 2
            people: and one of us had been hired the day the University campus
            shut down. But we were inspired to help the thousands of
            Commonwealth citizens who suddenly were locked out of physical
            access to lawyers.
          </p>
          <p>
            Our idea was to build dozens of interactive forms that included
            guidance and delivered your work directly to the court. Usually
            these projects take many months. We worked with agile experts to
            develop an "assembly line" style development process so that we
            could spread out the work among dozens of volunteers. We called our
            project the Document Assembly Line.
          </p>
          <p>
            The response to our call for volunteers was amazing. More than 200
            volunteers from around the world helped work on the Document
            Assembly Line--representing 11 time zones and 5 continents.
          </p>
          <p>
            We no longer have 200 volunteers, but our lab and Suffolk University
            Law students have continued to help the project grow and thrive. Our
            work has also helped legal aid programs in Illinois, Louisiana,
            Maine, Vermont, Michigan, Minnesota, Texas and other states to build
            their own form libraries.
          </p>
        </section>
      </div>
      <ThankYou />
    </div>
  );
}
