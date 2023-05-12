export interface Topic {
  code: string;
  name: string;
  long_name: string;
  icon: string;
}

const legalTopics: Topic[] = [
  {
    code: "BE-00-00-00-00",
    name: "Benefits",
    long_name: "Public Benefits",
    icon: "hand-holding-dollar",
  },
  {
    code: "BU-00-00-00-00",
    name: "Business",
    long_name: "Small Business and IP",
    icon: "user-tie",
  },
  {
    code: "MO-00-00-00-00",
    name: "Consumer",
    long_name: "Money, Debt and Consumer Issues",
    icon: "money-bill-wave",
  },
  {
    code: "CO-00-00-00-00",
    name: "Courts",
    long_name: "Courts and Lawyers",
    icon: "gavel",
  },
  {
    code: "CR-00-00-00-00",
    name: "Criminal",
    long_name: "Criminal",
    icon: "handcuffs",
  },
  {
    code: "DI-00-00-00-00",
    name: "Disaster",
    long_name: "Disaster Relief",
    icon: "house-fire",
  },
  {
    code: "ED-00-00-00-00",
    name: "Education",
    long_name: "Education",
    icon: "user-graduate",
  },
  {
    code: "EN-00-00-00-00",
    name: "Environment",
    long_name: "Environmental Justice",
    icon: "seedling",
  },
  {
    code: "ES-00-00-00-00",
    name: "Wills",
    long_name: "Estates, Wills and Guardianships",
    icon: "file-signature",
  },
  {
    code: "FA-00-00-00-00",
    name: "Family",
    long_name: "Family Law",
    icon: "people-roof",
  },
  {
    code: "GO-00-00-00-00",
    name: "Government",
    long_name: "Government Services",
    icon: "building-columns",
  },
  {
    code: "HE-00-00-00-00",
    name: "Health",
    long_name: "Health",
    icon: "user-doctor",
  },
  {
    code: "HO-00-00-00-00",
    name: "Housing",
    long_name: "Housing",
    icon: "house",
  },
  {
    code: "IM-00-00-00-00",
    name: "Immigration",
    long_name: "Immigration",
    icon: "passport",
  },
  {
    code: "JU-00-00-00-00",
    name: "Juvenile",
    long_name: "Juvenile",
    icon: "children",
  },
  {
    code: "NA-00-00-00-00",
    name: "Native",
    long_name: "Native American and Tribal Law",
    icon: "earth-americas",
  },
  {
    code: "TO-00-00-00-00",
    name: "Torts",
    icon: "person-falling-burst",
    long_name: "Torts and Personal Injury",
  },
  {
    code: "TR-00-00-00-00",
    name: "Traffic",
    long_name: "Traffic and Cars",
    icon: "car-burst",
  },
  {
    code: "VE-00-00-00-00",
    name: "Veterans",
    long_name: "Veterans and Military",
    icon: "flag-usa",
  },
  {
    code: "WO-00-00-00-00",
    name: "Employment",
    long_name: "Employment",
    icon: "briefcase",
  },
  {
    code: "CO-07-02-00-00",
    name: "Appeals",
    long_name: "Appeals",
    icon: "table-list",
  },
  {
    code: "FA-07-00-00-00",
    name: "DV",
    long_name: "Protection from Abuse and Domestic Violence",
    icon: "heart-crack",
  }
];

function findParentTopic(tag: string) {
  // Remove trailing sections of "-00" from the tag
  const cleanedTag = tag.replace(/(-00)+$/, '');

  // Find the first topic that starts with the same characters as the cleaned tag
  const parentTopic = legalTopics.find((topic) => 
    cleanedTag.startsWith(topic.code.replace(/(-00)+$/, ''))
  );

  return parentTopic; // This will be undefined if no matching topic is found
}


module.exports = { legalTopics, findParentTopic };
