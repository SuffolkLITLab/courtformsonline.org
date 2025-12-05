import ThankYou from '../components/ThankYou';
import styles from '../css/AboutPage.module.css';

export default function About() {
  return (
    <div className={styles.AboutPageContainer + ' container'}>
      <h1 className="text-center">About Court Forms Online</h1>
      <p>
        Court Forms Online is part of the nonprofit{' '}
        <a href="https://suffolklitlab.org/">
          Suffolk Legal Innovation &amp; Technology (LIT) Lab
        </a>
        ’s Document Assembly Line project. It helps you complete court forms and
        other legal documents. Each form has been turned into a guided interview
        that helps you through the process of completing the form. In some
        cases, we can deliver (e-file) your forms directly to the court.
      </p>
      <p>
        The online guided interviews on Court Forms Online have been built by
        lawyers, designers, developers, law students, and other professionals.
      </p>
      <p>Legal experts and partners from:</p>
      <ul>
        <li>
          <a href="https://www.mass.gov/orgs/massachusetts-court-system">
            The Massachusetts Trial Court
          </a>
        </li>
        <li>
          <a href="https://www.mass.gov/orgs/court-service-centers">
            The Massachusetts Trial Court's court service centers
          </a>
        </li>
        <li>
          <a href="https://www.suffolklitlab.org/">
            The Suffolk University Law School Legal Innovation &amp; Technology
            Lab
          </a>
        </li>
        <li>
          <a href="https://www.suffolk.edu/law/academics-clinics/clinics-experiential-opportunities/clinics">
            Suffolk Law School's clinical programs
          </a>
        </li>
        <li>
          <a href="https://www.mlri.org">Massachusetts Law Reform Institute</a>
        </li>

        <li>
          <a href="https://www.gbls.org/">Greater Boston Legal Services</a>
        </li>
        <li>
          <a href="https://www.northeastlegalaid.org/">Northeast Legal Aid</a>
        </li>
        <li>
          <a href="https://communitylegal.org/">Community Legal Aid</a>,
        </li>
        <li>and others</li>
      </ul>
      <p>
        reviewed the forms, interviews, and legal information to help make sure
        that the content is right.
      </p>
      <p>
        Court Forms Online started out with input from the Massachusetts Trial
        Court and Appeals Court. In 2020 the Appeals Court issued a{' '}
        <a href="https://www.mass.gov/info-details/appeals-court-administrative-order-20-5">
          standing order
        </a>{' '}
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
        questions as part of an interview that guides you through completing
        official court forms or templates drafted by legal experts. Then we use
        your answers to assemble complete, ready-to-file PDF documents.
      </p>
      <p>
        Your information is kept <a href="/privacy">secure and private</a>, and
        is never used other than to complete your forms. We do not sell or share
        your information with anyone other than the court or other program that
        you choose to send it to.
      </p>
      <p>
        You can use Court Forms Online on a desktop computer or a smartphone.
      </p>
      <p>
        Some forms need to be printed and delivered by you. Some forms include a
        button that delivers your form by email. And other forms are integrated
        directly with the court’s{' '}
        <a href="https://assemblyline.suffolklitlab.org/docs/components/EFSPIntegration/overview/">
          electronic filing system
        </a>
        .
      </p>
      <h2>Get involved with Court Forms Online</h2>
      <h3>Suggest a form</h3>
      <p>
        We welcome suggestions for new forms to add to Court Forms Online,
        especially from nonprofit legal aid organizations and courts. Smaller
        projects (typically 1-2 pages) may be appropriate for our law school
        clinic to build during the academic year. Larger projects may require
        funding.
      </p>
      <p>
        Email us at <a href="mailto:litlab@suffolk.edu">litlab@suffolk.edu</a>{' '}
        with your suggestions.
      </p>

      <h3>Volunteer</h3>
      <p>
        We can periodically accept volunteers to help us test, monitor for
        changes in law, build, and translate our forms into additional
        languages. Volunteers will be trained and offered supervision by members
        of the LIT Lab's staff.
        <br />
        <a
          className="btn btn-primary"
          href="https://assemblyline.suffolklitlab.org/docs/volunteer"
        >
          Learn more about volunteering
        </a>
      </p>
      <h3>Donate</h3>
      <p>
        Court Forms Online is a free service provided by a nonprofit
        organization. If you would like to support our work, please consider
        making a tax-deductible donation.
        <br />
        <a
          className="btn btn-primary"
          href="https://www.givecampus.com/campaigns/70271/donations/new"
        >
          Donate to Suffolk LIT Lab
        </a>
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
