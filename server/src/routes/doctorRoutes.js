import express from 'express';
import { 
  getDoctors, 
  getDoctor, 
  getDoctorByPMC, 
  createDoctor, 
  updateDoctor,
  getSpecialties,
  searchDoctors
} from '../controllers/doctorController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { doctorSchema } from '../validators/index.js';

const router = express.Router();

router.get('/specialties', getSpecialties);
router.get('/search', searchDoctors);
router.get('/pmc/:pmcId', getDoctorByPMC);
router.get('/', getDoctors);
router.get('/:id', getDoctor);

router.post('/', protect, authorize('admin', 'doctor'), validate(doctorSchema), createDoctor);
router.put('/:id', protect, authorize('admin', 'doctor'), updateDoctor);

export default router;
