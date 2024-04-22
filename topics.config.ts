export interface Topic {
  codes: Array<string>;
  name: string;
  long_name: string;
  icon: string;
  always_visible: boolean;
  priority: number;
}

export const legalTopics: Topic[] = [
  {
    codes: ['HO-00-00-00-00'],
    name: 'Housing',
    long_name: 'Housing',
    icon: 'house',
    always_visible: true,
    priority: 100,
  },
  {
    codes: ['FA-00-00-00-00'],
    name: 'Family',
    long_name: 'Family and Safety',
    icon: 'people-roof',
    always_visible: true,
    priority: 90,
  },
  {
    codes: ['MO-00-00-00-00'],
    name: 'Consumer',
    long_name: 'Money, Debt and Consumer Issues',
    icon: 'money-bill-wave',
    always_visible: true,
    priority: 80,
  },
  {
    codes: ['BE-00-00-00-00'],
    name: 'Benefits',
    long_name: 'Public Benefits',
    icon: 'hand-holding-dollar',
    always_visible: true,
    priority: 70,
  },
  {
    codes: ['BU-00-00-00-00'],
    name: 'Business',
    long_name: 'Small Business and IP',
    icon: 'user-tie',
    always_visible: false,
    priority: 1,
  },
  {
    codes: ['CO-00-00-00-00'],
    name: 'Courts',
    long_name: 'Court and Hearings',
    icon: 'gavel',
    always_visible: true,
    priority: 1,
  },
  {
    codes: ['CR-00-00-00-00'],
    name: 'Criminal',
    long_name: 'Criminal',
    icon: 'handcuffs',
    always_visible: false,
    priority: 1,
  },
  {
    codes: ['DI-00-00-00-00'],
    name: 'Disaster',
    long_name: 'Disaster Relief',
    icon: 'house-fire',
    always_visible: false,
    priority: 1,
  },
  {
    codes: ['ED-00-00-00-00'],
    name: 'Education',
    long_name: 'School and Education',
    icon: 'user-graduate',
    always_visible: false,
    priority: 50,
  },
  {
    codes: ['EN-00-00-00-00'],
    name: 'Environment',
    long_name: 'Environmental Justice',
    icon: 'seedling',
    always_visible: false,
    priority: 1,
  },
  {
    codes: ['ES-00-00-00-00'],
    name: 'Wills',
    long_name: 'Estates, Wills and Guardianships',
    icon: 'file-signature',
    always_visible: false,
    priority: 50,
  },
  {
    codes: ['GO-00-00-00-00'],
    name: 'Government',
    long_name: 'Government Services',
    icon: 'building-columns',
    always_visible: false,
    priority: 1,
  },
  {
    codes: ['HE-00-00-00-00'],
    name: 'Health',
    long_name: 'Health',
    icon: 'user-doctor',
    always_visible: true,
    priority: 50,
  },
  {
    codes: ['IM-00-00-00-00'],
    name: 'Immigration',
    long_name: 'Immigration',
    icon: 'passport',
    always_visible: false,
    priority: 50,
  },
  {
    codes: ['JU-00-00-00-00'],
    name: 'Juvenile',
    long_name: 'Juvenile',
    icon: 'children',
    always_visible: false,
    priority: 50,
  },
  {
    codes: ['NA-00-00-00-00'],
    name: 'Native',
    long_name: 'Native American and Tribal Law',
    icon: 'earth-americas',
    always_visible: false,
    priority: 1,
  },
  {
    codes: ['TO-00-00-00-00'],
    name: 'Torts',
    icon: 'person-falling-burst',
    long_name: 'Torts and Personal Injury',
    always_visible: false,
    priority: 1,
  },
  {
    codes: ['TR-00-00-00-00'],
    name: 'Traffic',
    long_name: 'Traffic and Cars',
    icon: 'car-burst',
    always_visible: false,
    priority: 60,
  },
  {
    codes: ['VE-00-00-00-00'],
    name: 'Veterans',
    long_name: 'Veterans and Military',
    icon: 'flag-usa',
    always_visible: false,
    priority: 60,
  },
  {
    codes: ['WO-00-00-00-00'],
    name: 'Employment',
    long_name: 'Employment',
    icon: 'briefcase',
    always_visible: true,
    priority: 60,
  },
  {
    codes: ['CO-07-02-00-00'],
    name: 'Appeals',
    long_name: 'Appeals',
    icon: 'table-list',
    always_visible: true,
    priority: 10,
  },
];

export function findParentTopic(tag: string) {
  // Remove trailing sections of "-00" from the tag
  const cleanedTag = tag.replace(/(-00)+$/, '');

  // Find the first topic that starts with the same characters as the cleaned tag
  const parentTopic = legalTopics.find((topic) =>
    cleanedTag.startsWith(topic.codes[0].replace(/(-00)+$/, ''))
  );

  return parentTopic; // This will be undefined if no matching topic is found
}
