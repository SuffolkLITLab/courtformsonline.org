import { pathToServerConfig } from '../../config/formSources.config';

// This is only necessary because there is a bug within next that doesnt allow static params to be passed from page to page properly.  This layout only exists to assist in passing said props

export async function generateStaticParams() {
  return Object.keys(pathToServerConfig).map((key) => ({
    path: key.toLowerCase(),
  }));
}

export default function Layout({ children }) {
  return <>{children}</>;
}
