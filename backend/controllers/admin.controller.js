import db from '../models/index.js';

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await db.Admin.findOne({ where: { username } });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const respondToComplaint = async (req, res) => {
  const { id } = req.params;
  const { status, response } = req.body;

  const complaint = await db.Complaint.findByPk(id);
  if (!complaint) return res.status(404).json({ error: 'Not found' });

  complaint.status = status || complaint.status;
  complaint.response = response || complaint.response;
  await complaint.save();

  res.send('✅ Updated');
};

export const getAssignedComplaints = async (req, res) => {
  const { username } = req.query;

  try {
    const admin = await db.Admin.findOne({ where: { username } });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const complaints = await db.Complaint.findAll({
      where: { AgencyId: admin.AgencyId },
      include: [db.User, db.Agency],
      order: [['createdAt', 'DESC']],
    });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};