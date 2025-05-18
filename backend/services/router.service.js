import db from '../models/index.js';

export const routeComplaint = async (category) => {
  const agencies = await db.Agency.findAll();
  for (const agency of agencies) {
    if (agency.categories.includes(category)) {
      return agency.id;
    }
  }
  throw new Error("No agency found for this category");
};
