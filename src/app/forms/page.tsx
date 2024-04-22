import { Form } from '../interfaces/Form';
import InteractiveForm from '../components/InteractiveForm';
import serverList from '../../../formSources.config.js';

interface LegalFormsPageProps {
  forms: Form[];
}

async function getData() {
  let allData: Form[] = [];

  for (const [serverName, serverUrl] of Object.entries(
    serverList['docassemble servers']
  )) {
    const url = new URL(serverUrl);
    url.pathname = '/list';
    url.search = 'json=1';

    const res = await fetch(url);

    // Recommendation: handle errors
    if (!res.ok) {
      console.error(`Failed to fetch data from ${serverUrl}`);
      continue; // Skip this server and continue with the next one
    }

    const data = await res.json();

    if (!data.hasOwnProperty('interviews')) {
      console.error(`Data from ${serverUrl} does not contain "interviews" key`);
      continue; // Skip this server and continue with the next one
    }

    // If you want to include the server name and server URL in the data:
    const interviews = data['interviews'].map((interview: Form) => ({
      ...interview,
      serverName,
      serverUrl,
    }));

    allData = allData.concat(interviews);
  }

  return allData;
}

export default async function Page() {
  const forms = await getData();

  return (
    <div className="container">
      <div>
        {forms.map((form) => (
          <InteractiveForm {...form} key={form.id} />
        ))}
      </div>
    </div>
  );
}
