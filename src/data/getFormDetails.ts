import { toUrlFriendlyString } from '../app/utils/helpers';
import { fetchInterviews } from './fetchInterviewData';

export async function getFormDetails(path: string, formSlug: string) {
  const { interviewsByTopic, isError } = await fetchInterviews(path);

  if (isError) {
    return { formDetails: null, formTopic: null };
  }

  let formDetails = null;
  let formTopic: string | null = null;

  Object.keys(interviewsByTopic).forEach((topic) => {
    interviewsByTopic[topic].forEach((interview) => {
      const formattedTitle = toUrlFriendlyString(interview.title);
      if (formattedTitle === formSlug) {
        formDetails = interview;
        if (!formTopic) {
          formTopic = topic;
        }
      }
    });
  });

  return { formDetails, formTopic };
}
