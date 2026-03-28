import express from 'express';
import { 
  createQuestion, 
  getQuestions, 
  getQuestion, 
  answerQuestion,
  voteQuestion,
  closeQuestion,
  getMyQuestions
} from '../controllers/questionController.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { medicalQuestionSchema } from '../validators/index.js';

const router = express.Router();

router.post('/', optionalAuth, validate(medicalQuestionSchema), createQuestion);
router.get('/my-questions', protect, getMyQuestions);
router.get('/', getQuestions);
router.get('/:id', getQuestion);
router.post('/:id/answer', protect, authorize('doctor'), answerQuestion);
router.post('/:id/vote', optionalAuth, voteQuestion);
router.post('/:id/close', protect, closeQuestion);

export default router;
