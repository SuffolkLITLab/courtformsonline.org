export default function NewsPage() {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-4 order-md-2 order-1">
          <iframe
            className="embed-responsive-item"
            src="https://www.youtube.com/embed/ENLaVTJWYss?rel=0"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '300px' }}
          ></iframe>
        </div>

        <div className="col-md-8 order-md-1 order-2">
          <h1>What We're Up To</h1>
          <p>
            Our{' '}
            <a href="https://suffolklitlab.org/doc-assembly-line/">
              Document Assembly Line Project
            </a>{' '}
            has been running full steam since April. The last 2 months have been
            a whirlwind for our volunteers from around the world and our
            full-time partners from Suffolk University Law School’s{' '}
            <a href="https://suffolklitlab.org/">LIT Lab</a>,{' '}
            <a href="https://www.gbls.org/">Greater Boston Legal Services</a>,
            and{' '}
            <a href="https://www.mlri.org/">
              Massachusetts Law Reform Institute
            </a>
            .
          </p>
          <p>
            We have in total engaged more than 100 volunteers from five
            continents, although many of them are based right here in Boston,
            Massachusetts. Two full-time project managers include a volunteer
            from Code for Boston and a volunteer working 6 hours ahead in
            Capetown, South Africa.
          </p>
          <p>
            Running a project like this is a little like laying train tracks in
            front of you while you’re traveling cross-country at full speed.
          </p>
          <p>We:</p>
          <ol>
            <li>
              Designed a beautiful and user-friendly{' '}
              <a href="https://massaccess.suffolklitlab.org/">front page</a> for
              our forms.
            </li>
            <li>
              Built{' '}
              <a href="https://github.com/SuffolkLITLab">code libraries</a> that
              support each form.
            </li>
            <li>
              Onboarded, organized, and trained volunteers with widely varying
              skill sets.
            </li>
            <li>
              Created training material for our project, the tools we use such
              as Github, Slack and Trello, and for learning to code with our
              platform, <a href="https://docassemble.org/">docassemble</a>:
              including{' '}
              <a href="https://www.youtube.com/playlist?list=PLy6i9GFGw5GxtN0vwsJBVp4BK8pGq_lSL">
                13 training videos
              </a>
              .
            </li>
            <li>
              Built standards for our project, with standard questions,{' '}
              <a href="https://github.com/SuffolkLITLab/doc-assembly-line/blob/master/labeling-pdf-fields.md">
                field names
              </a>
              , and design.
            </li>
            <li>
              Created a tool that automatically creates a “first draft” of a
              guided interview with just a labeled PDF.
            </li>
            <li>
              Engaged volunteer geoengineers to help us implement a
              court-finding tool that works with the byzantine jurisdiction of
              the Boston Municipal Court. (No joke: the answer was a{' '}
              <a href="https://www.appgeo.com/appgeo-data-detectives-the-case-of-boston-courthouse-jurisdiction/">
                detective story
              </a>{' '}
              that lies in finding ward maps from the 1800s up until today and
              turning them into GIS layers).
            </li>
            <li>Created 53 labeled, fillable PDFs with draft interviews.</li>
            <li>
              Pushed our{' '}
              <a href="https://massaccess.suffolklitlab.org/housing/">
                first form
              </a>{' '}
              all the way through to approval by the court: a form that helps
              tenants get help with emergency housing conditions.
            </li>
            <li>
              Released additional forms for use by advocates while court
              approval is pending.
            </li>
            <li>
              Testing, testing, testing and revising for readability, usability,
              errors of law, and bugs in the computer’s logic.
            </li>
          </ol>
          <p>
            Two months of our project have been absorbed in a critical form: the
            Domestic Violence Complaint for Protection from Abuse petition. This
            project is not just one form: it’s 8 forms, with a typical completed
            packet weighing in at 19 pages, and hundreds of individual fields.
            It’s a beast for someone to complete this emergency form on their
            own on paper. Four separate coders worked on the forms in pieces,
            and dozens of volunteers have helped us refine the questions so
            someone can ask for this critical help in a time-saving, easy to
            understand and supportive way.
          </p>
          <p>
            Thanks to existing work and extensive testing with advocates and DV
            survivors by Massachusetts Law Reform Institute, we were able to
            accelerate this project which on its own could easily have taken a
            year or more. The DV petition is currently in a limited beta,
            focusing on the wonderful staff advocates at agencies like{' '}
            <a href="https://www.mass.gov/service-details/safeplan-program">
              SAFEPLAN
            </a>
            . Our hope is to open that up to a wider release soon.
          </p>
          <p>
            Looking ahead this summer, Suffolk has on-boarded 10 new students
            who are accelerating our project by automating some of the remaining
            forms in family law, juvenile court, and housing.
          </p>
          <p>
            <i>Updated: 2020-06-10</i>
          </p>
        </div>
      </div>
    </div>
  );
}
