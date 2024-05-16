import { formSources } from '../../config/formSources.config';

export async function generateStaticParams() {
  return formSources.docassembleServers.map((jurisdiction) => ({
    jurisdiction: jurisdiction.path.toLowerCase(),
  }));
}

export default function Layout({ children }) {
  return <>{children}</>;
}
