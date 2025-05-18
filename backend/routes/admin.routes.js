import express from 'express';
import {
  respondToComplaint,
  loginAdmin,
  getAssignedComplaints,
} from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/complaints', getAssignedComplaints);
router.put('/respond/:id', respondToComplaint);

export default router;
