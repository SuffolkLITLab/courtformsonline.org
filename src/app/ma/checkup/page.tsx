import type { Metadata } from 'next';
import { fetchInterviews } from '../../../data/fetchInterviewData';
import LegalCheckup from '../../components/LegalCheckup';

export const metadata: Metadata = {
  title: 'Massachusetts legal checkup | Court Forms Online',
  description:
    'Explore everyday problems and find Massachusetts legal tools that may help. A short, free checkup with no account or documents needed.',
};

export default async function CheckupPage() {
  const { interviewsByTopic, isError, hasFetchErrors } =
    await fetchInterviews('ma');
  const forms = Array.from(
    new Map(
      Object.values(interviewsByTopic)
        .flat()
        .map(({ filename, title }) => [filename, { filename, title }])
    ).values()
  );

  return (
    <LegalCheckup forms={forms} hasFetchErrors={isError || hasFetchErrors} />
  );
}
