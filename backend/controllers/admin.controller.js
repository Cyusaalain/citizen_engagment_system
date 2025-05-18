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