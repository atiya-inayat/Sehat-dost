import express from 'express';
import { 
  getLabs, 
  getLab, 
  getLabTests,
  searchLabs,
  getTestCategories
} from '../controllers/labController.js';

const router = express.Router();

router.get('/categories', getTestCategories);
router.get('/search', searchLabs);
router.get('/:id/tests', getLabTests);
router.get('/', getLabs);
router.get('/:id', getLab);

export default router;
