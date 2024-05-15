import { formSources } from '../../config/formSources.config';

interface PageProps {
  params: {
    jurisdiction: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { jurisdiction } = params;

  return <div>LIST OF STUFF FOR {jurisdiction}:</div>;
};

export default Page;

export async function generateStaticParams() {
  return formSources.docassembleServers.map((jurisdiction) => ({
    jurisdiction: jurisdiction.path.toLowerCase(),
  }));
}
