import { formSources } from '../../config/formSources.config';

interface PageProps {
  params: {
    source: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { source } = params;
  return <div>LIST OF STUFF FOR {source}:</div>;
};

export default Page;

// export async function generateStaticParams() {
//   return formSources.docassembleServers.map((source) => ({
//     source: source.path.toLowerCase(),
//   }));
// }

export async function generateStaticParams() {
  return formSources.docassembleServers.map((source) => {
    console.log(source.path);
    return {
      source: source.path.toLowerCase(),
    };
  });
}
