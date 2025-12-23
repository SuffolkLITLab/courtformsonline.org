import { fetchInterviews } from './src/data/fetchInterviewData';
import { getFormDetails } from './src/data/getFormDetails';
import { getMassLRFDeepLink } from './src/utils/masslrf';
import { legalTopics } from './src/config/topics.config';

async function testMassLRFLinks() {
  console.log('Testing MassLRF deep links for all Massachusetts forms...\n');

  const { interviewsByTopic, isError } = await fetchInterviews('ma');

  if (isError) {
    console.error('Error fetching interviews');
    return;
  }

  const results: {
    form: string;
    topic: string;
    listTopics: string[];
    deepLink: string | null;
    status: 'success' | 'fallback' | 'no-link';
  }[] = [];

  let formCount = 0;
  let successCount = 0;
  let fallbackCount = 0;
  let noLinkCount = 0;

  for (const topic of Object.keys(interviewsByTopic)) {
    for (const form of interviewsByTopic[topic]) {
      formCount++;
      const listTopics = form.metadata?.LIST_topics || [];

      let deepLink: string | null = null;
      let status: 'success' | 'fallback' | 'no-link' = 'no-link';

      // First, try to use LIST_topics
      if (listTopics.length > 0) {
        try {
          deepLink = await getMassLRFDeepLink(listTopics[0]);
          status = 'success';
          successCount++;
        } catch (err) {
          console.error(`Error for ${form.title}:`, err);
        }
      } else {
        // Fall back to topic code
        const matchingTopic = legalTopics.find(
          (t) => t.name.toLowerCase() === topic.toLowerCase()
        );
        if (matchingTopic && matchingTopic.codes.length > 0) {
          try {
            deepLink = await getMassLRFDeepLink(matchingTopic.codes[0]);
            status = 'fallback';
            fallbackCount++;
          } catch (err) {
            console.error(`Error for ${form.title}:`, err);
          }
        } else {
          noLinkCount++;
        }
      }

      results.push({
        form: form.title,
        topic,
        listTopics,
        deepLink,
        status,
      });
    }
  }

  // Print summary
  console.log(
    `\nSummary: ${successCount} with LIST_topics, ${fallbackCount} using topic fallback, ${noLinkCount} with no link\n`
  );

  // Print forms with issues
  const problemForms = results.filter((r) => r.status !== 'success');
  if (problemForms.length > 0) {
    console.log('Forms without explicit LIST_topics (using topic fallback):');
    problemForms
      .filter((r) => r.status === 'fallback')
      .forEach((r) => {
        console.log(`  - ${r.form} (${r.topic}) -> ${r.deepLink}`);
      });
    console.log('\nForms with no deep link:');
    problemForms
      .filter((r) => r.status === 'no-link')
      .forEach((r) => {
        console.log(`  - ${r.form} (${r.topic})`);
      });
  }

  console.log('\n\nAll forms:');
  results.forEach((r) => {
    const statusIcon =
      r.status === 'success' ? '✓' : r.status === 'fallback' ? '⚠' : '✗';
    console.log(
      `${statusIcon} ${r.form.padEnd(60)} (${r.topic.padEnd(12)}) -> ${
        r.deepLink || 'NO LINK'
      }`
    );
  });
}

testMassLRFLinks().catch(console.error);
