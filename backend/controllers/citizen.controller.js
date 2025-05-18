import db from '../models/index.js';
import { routeComplaint } from '../services/router.service.js';

export const submitComplaint = async (req, res) => {
  const { name, email, category, description } = req.body;

  try {
    const [user] = await db.User.findOrCreate({ where: { email }, defaults: { name } });
    const agencyId = await routeComplaint(category);

    const complaint = await db.Complaint.create({
      category,
      description,
      UserId: user.id,
      AgencyId: agencyId
    });

    res.status(201).json({ ticketId: complaint.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const trackComplaint = async (req, res) => {
  const complaint = await db.Complaint.findByPk(req.params.id, {
    include: [db.Agency, db.User]
  });
  if (!complaint) return res.status(404).json({ error: 'Not found' });
  res.json(complaint);
};
