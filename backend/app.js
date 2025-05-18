import express from 'express';
import db from './models/index.js';
import citizenRoutes from './routes/citizen.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();
app.use(express.json());
app.use('/api/citizen', citizenRoutes);
app.use('/api/admin', adminRoutes);

db.sequelize.sync().then(() => console.log("✅ DB Synced"));

app.listen(3000, () => console.log("🚀 Server running at http://localhost:3000"));
