export const toUrlFriendlyString = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace special characters with hyphens
    .replace(/(^-|-$)/g, '') // Remove leading and trailing hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
};
