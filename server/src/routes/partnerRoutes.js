import express from 'express';
import { 
  createPartner, 
  getPartners, 
  getPartner, 
  updatePartner,
  getFeaturedPartners,
  getPartnerStats
} from '../controllers/partnerController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { partnerSchema } from '../validators/index.js';

const router = express.Router();

router.get('/featured', getFeaturedPartners);
router.get('/stats', protect, authorize('admin'), getPartnerStats);
router.get('/', getPartners);
router.get('/:id', getPartner);
router.post('/', validate(partnerSchema), createPartner);
router.put('/:id', protect, authorize('admin'), updatePartner);

export default router;
