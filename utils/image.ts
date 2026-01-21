/**
 * Generate image path for abomination display images
 * @param slug - The abomination slug identifier
 * @returns Full path to the abomination image
 */
export const getAbominationImage = (slug: string) => {
  return `/images/abominations/${slug}.png`;
};

/**
 * Generate image path for abomination icon/avatar images
 * @param slug - The abomination slug identifier
 * @returns Full path to the abomination icon
 */
export const getAbominationIcon = (slug: string) => {
  return `/images/icons/${slug}.png`;
};

