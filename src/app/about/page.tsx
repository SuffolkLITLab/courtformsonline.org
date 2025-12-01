import ThankYou from '../components/ThankYou';
import styles from '../css/AboutPage.module.css';

export default function About() {
  return (
    <div className={styles.AboutPageContainer + ' container'}>
      <h1 className="text-center">About Court Forms Online</h1>
      <p>
        Court Forms Online is part of the{' '}
        <a href="https://suffolklitlab.org/">
          Suffolk Legal Innovation &amp; Technology (LIT) Lab
        </a>
        ’s Document Assembly Line project. It helps you complete court forms
        other legal documents. Each form has been turned into an interview that
        that guides you through the process of completing the form. In some
        cases, we can deliver (e-file) your forms directly to the court.
      </p>
      <p>
        The online guided interviews on Court Forms Online have been built by
        lawyers, designers, developers, law students, and others. Some are
        maintained by the LIT Lab, while others are built and maintained by
        other organizations.
      </p>
      <p>
        Court Forms Online started out with input from the Massachusetts Trial
        Court and Appeals Court. In 2020 the Appeals Court issued a{' '}
        <a href="https://www.mass.gov/info-details/appeals-court-administrative-order-20-5">
          standing order
        </a>
        officially approving Court Forms Online for completing and Document
        Assembly Line community includes courts and legal legal aid
        organizations in Illinois, Louisiana, Maine, Michigan, Minnesota, Texas,
        Vermont, and more.{' '}
        <a href="https://assemblyline.suffolklitlab.org/">
          Learn more about the Document Assembly Line project.
        </a>
      </p>
      <h2>How does it work?</h2>
      <p>
        We use a free and open source tool,{' '}
        <a href="https://docassemble.org/">Docassemble</a>, to ask step-by-step
        questions as part of an interview that guides you through completing the
        form. Then we use your answers to assemble complete, ready-to-file PDF
        documents.
      </p>
      <p>
        You can use the Court Forms Online on a desktop computer or a
        smartphone.
      </p>
      <p>
        Some forms need to be printed and delivered by you. Some forms include
        button that delivers your form by email. And other works are integrated
        directly with the court’s{' '}
        <a href="https://assemblyline.suffolklitlab.org/docs/components/EFSPIntegration/overview/">
          electronic filing system
        </a>
        .
      </p>
      <ThankYou />
      <h2>Accessibility</h2>
      <p>
        The font family used on Court Forms Online is{' '}
        <a href="https://www.brailleinstitute.org/freefont/">
          Atkinson Hyperlegible
        </a>
        , developed by the Braille Institute to improve legibility, and
        readability—especially for low-vision readers—through clear, distinctive
        letters and numbers.
      </p>
    </div>
  );
}
