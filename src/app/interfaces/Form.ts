export interface Form {
  id: string;
  title: string;
  metadata: {
    description: string;
    fees?: { name: string; amount?: number }[];
  };
  landingPageURL: string;
  link: string;
  serverUrl: string;
  serverPath: string;
}
