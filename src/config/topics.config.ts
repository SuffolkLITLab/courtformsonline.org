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
    name: 'housing',
    long_name: 'Housing',
    icon: 'house',
    always_visible: false,
    priority: 100,
  },
  {
    codes: ['FA-00-00-00-00'],
    name: 'family',
    long_name: 'Family and safety',
    icon: 'people-roof',
    always_visible: false,
    priority: 90,
  },
  {
    codes: ['MO-00-00-00-00'],
    name: 'consumer',
    long_name: 'Money, debt, and consumer issues',
    icon: 'money-bill-wave',
    always_visible: false,
    priority: 80,
  },
  {
    codes: ['BE-00-00-00-00'],
    name: 'benefits',
    long_name: 'Public benefits',
    icon: 'hand-holding-dollar',
    always_visible: false,
    priority: 70,
  },
  {
    codes: ['BU-00-00-00-00'],
    name: 'business',
    long_name: 'Small business and IP',
    icon: 'user-tie',
    always_visible: false,
    priority: 1,
  },
  {
    codes: ['CO-00-00-00-00'],
    name: 'courts',
    long_name: 'Court and hearings',
    icon: 'gavel',
    always_visible: false,
    priority: 1,
  },
  {
    codes: ['CR-00-00-00-00'],
    name: 'criminal',
    long_name: 'Criminal',
    icon: 'handcuffs',
    always_visible: false,
    priority: 1,
  },
  {
    codes: ['DI-00-00-00-00'],
    name: 'disaster',
    long_name: 'Disaster relief',
    icon: 'house-fire',
    always_visible: false,
    priority: 1,
  },
  {
    codes: ['ED-00-00-00-00'],
    name: 'education',
    long_name: 'School and education',
    icon: 'user-graduate',
    always_visible: false,
    priority: 50,
  },
  {
    codes: ['EN-00-00-00-00'],
    name: 'environment',
    long_name: 'Environmental justice',
    icon: 'seedling',
    always_visible: false,
    priority: 1,
  },
  {
    codes: ['ES-00-00-00-00'],
    name: 'wills',
    long_name: 'Estates, wills, and guardianships',
    icon: 'file-signature',
    always_visible: false,
    priority: 50,
  },
  {
    codes: ['GO-00-00-00-00'],
    name: 'government',
    long_name: 'Government Services',
    icon: 'building-columns',
    always_visible: false,
    priority: 1,
  },
  {
    codes: ['HE-00-00-00-00'],
    name: 'health',
    long_name: 'Health',
    icon: 'user-doctor',
    always_visible: false,
    priority: 50,
  },
  {
    codes: ['IM-00-00-00-00'],
    name: 'immigration',
    long_name: 'Immigration',
    icon: 'passport',
    always_visible: false,
    priority: 50,
  },
  {
    codes: ['JU-00-00-00-00'],
    name: 'juvenile',
    long_name: 'Juvenile',
    icon: 'children',
    always_visible: false,
    priority: 50,
  },
  {
    codes: ['NA-00-00-00-00'],
    name: 'native',
    long_name: 'Native American and tribal law',
    icon: 'earth-americas',
    always_visible: false,
    priority: 1,
  },
  {
    codes: ['TO-00-00-00-00'],
    name: 'torts',
    icon: 'person-falling-burst',
    long_name: 'Torts and personal injury',
    always_visible: false,
    priority: 1,
  },
  {
    codes: ['TR-00-00-00-00'],
    name: 'traffic',
    long_name: 'Traffic and cars',
    icon: 'car-burst',
    always_visible: false,
    priority: 60,
  },
  {
    codes: ['VE-00-00-00-00'],
    name: 'veterans',
    long_name: 'Veterans and military',
    icon: 'flag-usa',
    always_visible: false,
    priority: 60,
  },
  {
    codes: ['WO-00-00-00-00'],
    name: 'employment',
    long_name: 'Employment',
    icon: 'briefcase',
    always_visible: false,
    priority: 60,
  },
  {
    codes: ['CO-07-02-00-00'],
    name: 'appeals',
    long_name: 'Appeals',
    icon: 'table-list',
    always_visible: false,
    priority: 10,
  },
  {
    codes: ['OT-00-00-00-00'],
    name: 'other',
    long_name: 'Other topics',
    icon: 'folder-open',
    always_visible: false,
    priority: 0,
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
