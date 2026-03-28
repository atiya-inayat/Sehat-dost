import express from 'express';
import { 
  getMedicines, 
  getMedicine, 
  searchMedicines,
  getMedicineByName,
  getDrugClasses,
  getManufacturers
} from '../controllers/medicineController.js';

const router = express.Router();

router.get('/classes', getDrugClasses);
router.get('/manufacturers', getManufacturers);
router.get('/search', searchMedicines);
router.get('/name/:name', getMedicineByName);
router.get('/', getMedicines);
router.get('/:id', getMedicine);

export default router;
