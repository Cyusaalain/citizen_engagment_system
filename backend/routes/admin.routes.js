import express from 'express';
import { respondToComplaint } from '../controllers/admin.controller.js';

const router = express.Router();
router.put('/respond/:id', respondToComplaint);

export default router;
