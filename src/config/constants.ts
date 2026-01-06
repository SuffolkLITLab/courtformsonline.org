// Application-wide constants

// Maximum number of interviews to show in an expanded card
export const MAX_VISIBLE_PER_CARD = 10;
// Number of categories visible by default (e.g., with 3 columns, 9 items = 3 rows)
export const MAX_VISIBLE_CATEGORIES = 12;
// Maximum number of related forms to show on form landing page
export const MAX_RELATED_FORMS = 5;

// Syndicated blog feeds configuration
export const SYNDICATED_FEEDS = {
  suffolkLitLab: {
    name: 'Suffolk LIT Lab',
    url: 'https://suffolklitlab.org/category/document-assembly-line/feed/',
    blogUrl: 'https://suffolklitlab.org/blog/',
  },
} as const;
