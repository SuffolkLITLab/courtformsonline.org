// Example: courtformsonline.org/forms
import dynamic from 'next/dynamic';
import { Form } from '../interfaces/Form';
import InteractiveForm from '../components/InteractiveForm';
import { pathToServerConfig } from '../../config/formSources.config';
import { toUrlFriendlyString } from '../utils/helpers';
import styles from '../css/AllFormsContainer.module.css';
import { fetchInterviews } from '../../data/fetchInterviewData';

const SearchSection = dynamic(() => import('../components/SearchSection'), {
  ssr: false,
});

async function getData() {
  const formsByPathAndTitle = new Map<string, Form>();

  await Promise.all(
    Object.keys(pathToServerConfig).map(async (path) => {
      const { interviewsByTopic } = await fetchInterviews(path);

      Object.values(interviewsByTopic).forEach((interviews) => {
        interviews.forEach((interview: any) => {
          const key = `${path}:${interview.title}`;
          if (!formsByPathAndTitle.has(key)) {
            formsByPathAndTitle.set(key, {
              ...interview,
              serverPath: `/${path}`,
            });
          }
        });
      });
    })
  );

  return Array.from(formsByPathAndTitle.values());
}

export default async function Page(path) {
  const forms = await getData();

  return (
    <div className={styles.AllFormsContainer + ' container'}>
      <h1 className="text-center">All Forms</h1>
      <SearchSection serverName={''} />
      <div className="forms">
        {forms.map((form, index) => (
          <InteractiveForm
            key={index}
            title={form.title}
            metadata={form.metadata}
            landingPageURL={
              form.serverPath + '/forms/' + toUrlFriendlyString(form.title)
            }
            link={form.link}
            serverUrl={form.serverUrl}
          />
        ))}
      </div>
    </div>
  );
}
