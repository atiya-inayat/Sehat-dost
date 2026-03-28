import express from 'express';
import { 
  createAppointment, 
  getAppointments, 
  getAppointment, 
  updateAppointment,
  cancelAppointment,
  getDoctorAppointments
} from '../controllers/appointmentController.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { appointmentSchema } from '../validators/index.js';

const router = express.Router();

router.post('/', optionalAuth, validate(appointmentSchema), createAppointment);
router.get('/', protect, getAppointments);
router.get('/doctor', protect, authorize('doctor'), getDoctorAppointments);
router.get('/:id', protect, getAppointment);
router.put('/:id', protect, updateAppointment);
router.delete('/:id', protect, cancelAppointment);

export default router;
