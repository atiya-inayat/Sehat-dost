import express from 'express';
import { 
  getHospitals, 
  getHospital, 
  createHospital, 
  searchHospitals,
  getCities
} from '../controllers/hospitalController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { hospitalSchema } from '../validators/index.js';

const router = express.Router();

router.get('/cities', getCities);
router.get('/search', searchHospitals);
router.get('/', getHospitals);
router.get('/:id', getHospital);
router.post('/', protect, authorize('admin'), validate(hospitalSchema), createHospital);

export default router;
