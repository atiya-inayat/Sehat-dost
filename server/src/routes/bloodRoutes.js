import express from 'express';
import { 
  createBloodRequest, 
  registerAsDonor,
  getBloodRequests, 
  getBloodRequest, 
  fulfillBloodRequest,
  getDonors,
  getBloodGroups
} from '../controllers/bloodController.js';
import { protect, optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { bloodRequestSchema } from '../validators/index.js';

const router = express.Router();

router.get('/groups', getBloodGroups);
router.get('/donors', getDonors);
router.get('/requests', getBloodRequests);
router.get('/requests/:id', getBloodRequest);
router.post('/requests', optionalAuth, validate(bloodRequestSchema), createBloodRequest);
router.post('/donors', protect, registerAsDonor);
router.post('/requests/:id/fulfill', protect, fulfillBloodRequest);

export default router;
