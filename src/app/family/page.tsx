import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../css/FamilyEmergency.module.css';
import FamilyPlanningTools from '../components/FamilyPlanningTools';
import { fetchFamilyEmergencyForms } from '../../data/familyEmergencyForms';

export const metadata: Metadata = {
  alternates: { canonical: 'https://courtformsonline.org/family' },
  title: 'Family emergency planning | Court Forms Online',
  description:
    'Free guided forms to plan for child caregiving, school and medical decisions, and guardianship in an emergency.',
};

export default async function FamilyEmergencyPlanning() {
  const forms = await fetchFamilyEmergencyForms();
  return (
    <main>
      <section className={styles.heroSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-primary mb-2">
                Family Emergency Planning
              </span>
              <h1 className="display-4 fw-bold mb-3">
                Plan for your family in an emergency
              </h1>
              <p className="lead mb-4">
                Prepare documents about who can care for your child if you are
                detained, hospitalized, or otherwise unavailable. Find free,
                step-by-step tools for the states listed below.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#tools" className="btn btn-primary btn-lg">
                  Find your form
                </a>
                <Link href="/" className="btn btn-outline-secondary btn-lg">
                  Back to Court Forms Online
                </Link>
              </div>
            </div>
            <div
              className="col-lg-4 d-none d-lg-block text-center"
              aria-hidden="true"
            >
              <i
                className="fa-solid fa-shield-heart text-primary"
                style={{ fontSize: '8rem', opacity: 0.8 }}
              />
            </div>
          </div>
        </div>
      </section>
      <FamilyPlanningTools forms={forms} />
      <section className="py-5 bg-light">
        <div className="container">
          <h2>More help with planning</h2>
          <div className="list-group">
            <Link
              href="/guides/find-a-lawyer"
              className="list-group-item list-group-item-action p-4"
            >
              <h3 className="h5">Find legal help</h3>
              <p className="mb-0">
                Find legal aid organizations and lawyer referral services.
              </p>
            </Link>
            <Link
              href="/guides/how-interviews-work"
              className="list-group-item list-group-item-action p-4"
            >
              <h3 className="h5">How guided forms work</h3>
              <p className="mb-0">
                Learn about answering interview questions and preparing your
                documents.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
