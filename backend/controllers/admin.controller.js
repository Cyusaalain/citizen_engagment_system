import db from '../models/index.js';

export const respondToComplaint = async (req, res) => {
  const { id } = req.params;
  const { status, response } = req.body;

  const complaint = await db.Complaint.findByPk(id);
  if (!complaint) return res.status(404).json({ error: "Not found" });

  complaint.status = status || complaint.status;
  complaint.response = response || complaint.response;
  await complaint.save();

  res.send("✅ Updated");
};