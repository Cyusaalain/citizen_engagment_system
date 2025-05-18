import express from 'express';
import { respondToComplaint } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/login', loginAdmin); 
router.put('/respond/:id', respondToComplaint);
router.get('/complaints', getAssignedComplaints);

export default router;
