// Example: courtformsonline.org/forms
import { Form } from '../interfaces/Form';
import InteractiveForm from '../components/InteractiveForm';
import {
  pathToServerConfig,
  formSources,
} from '../../config/formSources.config';
import { toUrlFriendlyString } from '../utils/helpers';

const serverProps = pathToServerConfig;

async function getData() {
  let allData: Form[] = [];

  // Iterating over an array of server objects
  for (const server of formSources.docassembleServers) {
    const url = new URL(server.url); // Access the URL directly from the server object
    url.pathname = '/list';
    url.search = 'json=1';

    const res = await fetch(url.toString());

    // Handle errors
    if (!res.ok) {
      console.error(`Failed to fetch data from ${server.url}`);
      continue; // Skip this server and continue with the next one
    }

    const data = await res.json();

    if (!data.hasOwnProperty('interviews')) {
      console.error(
        `Data from ${server.url} does not contain "interviews" key`
      );
      continue; // Skip this server and continue with the next one
    }

    let path = '';
    for (let key in serverProps) {
      if (serverProps[key].servers.indexOf(server.name) > -1) path = '/' + key;
    }

    // Include the server name and server URL in the data
    const interviews = data['interviews'].map((interview: Form) => ({
      ...interview,
      serverName: server.name,
      serverUrl: server.url,
      serverPath: path ? path : '',
    }));

    allData = allData.concat(interviews);
  }

  return allData;
}

export default async function Page(path) {
  const forms = await getData();

  return (
    <div className="container">
      <h1 className="form-heading">All Forms</h1>
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
  );
}
