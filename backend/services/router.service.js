import db from '../models/index.js';

const keywordCategoryMap = {
  road: 'Transport',
  bus: 'Transport',
  traffic: 'Transport',
  electricity: 'Utilities',
  water: 'Utilities',
  theft: 'Security',
  crime: 'Security',
  garbage: 'Sanitation',
  trash: 'Sanitation',
};

function inferCategoryFromText(text) {
  const lower = text.toLowerCase();
  for (const [keyword, category] of Object.entries(keywordCategoryMap)) {
    if (lower.includes(keyword)) return category;
  }
  return null;
}

export const routeComplaint = async (category, description = '') => {
  const agencies = await db.Agency.findAll();

  // 1. Try user-selected category (if provided)
  if (category) {
    for (const agency of agencies) {
      const normalized = agency.categories.map(c => c.toLowerCase().trim());
      if (normalized.includes(category.toLowerCase().trim())) {
        return agency.id;
      }
    }
  }

  // 2. Fallback: auto-infer from text
  const inferredCategory = inferCategoryFromText(description);
  if (!inferredCategory) throw new Error('No category or keywords matched');

  for (const agency of agencies) {
    const normalized = agency.categories.map(c => c.toLowerCase().trim());
    if (normalized.includes(inferredCategory.toLowerCase())) {
      return agency.id;
    }
  }

  throw new Error(`No agency found for inferred category "${inferredCategory}"`);
};
