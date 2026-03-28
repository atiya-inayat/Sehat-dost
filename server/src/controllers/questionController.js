import MedicalQuestion from '../models/MedicalQuestion.js';
import Doctor from '../models/Doctor.js';

export const createQuestion = async (req, res, next) => {
  try {
    const questionData = {
      ...req.body
    };

    if (!req.body.isAnonymous && req.user) {
      questionData.patient = req.user.id;
    }

    const question = await MedicalQuestion.create(questionData);

    res.status(201).json({
      success: true,
      data: question
    });
  } catch (error) {
    next(error);
  }
};

export const getQuestions = async (req, res, next) => {
  try {
    const { 
      problemType, 
      status, 
      gender, 
      city,
      page = 1, 
      limit = 10,
      sort = '-createdAt'
    } = req.query;

    const query = { status: { $ne: 'Flagged' } };

    if (problemType) query.problemType = problemType;
    if (status) query.status = status;
    if (gender) query.gender = gender;
    if (city) query['location.city'] = { $regex: city, $options: 'i' };

    const total = await MedicalQuestion.countDocuments(query);
    const questions = await MedicalQuestion.find(query)
      .select('-answers')
      .populate('patient', 'name')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: questions.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      data: questions
    });
  } catch (error) {
    next(error);
  }
};

export const getQuestion = async (req, res, next) => {
  try {
    const question = await MedicalQuestion.findById(req.params.id)
      .populate('patient', 'name')
      .populate({
        path: 'answers.doctor',
        select: 'user specialty degrees hospital',
        populate: {
          path: 'user',
          select: 'name'
        }
      });

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    question.viewCount += 1;
    await question.save();

    res.status(200).json({
      success: true,
      data: question
    });
  } catch (error) {
    next(error);
  }
};

export const answerQuestion = async (req, res, next) => {
  try {
    const question = await MedicalQuestion.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    if (question.status === 'Closed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot answer a closed question'
      });
    }

    const doctor = await Doctor.findOne({ user: req.user.id });
    
    if (!doctor) {
      return res.status(403).json({
        success: false,
        message: 'Only verified doctors can answer questions'
      });
    }

    if (!doctor.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'Your doctor profile is not verified'
      });
    }

    const answer = {
      doctor: doctor._id,
      answer: req.body.answer,
      isVerified: true
    };

    question.answers.push(answer);
    question.answerCount = question.answers.length;
    question.status = 'Answered';

    await question.save();

    res.status(201).json({
      success: true,
      message: 'Answer added successfully',
      data: question
    });
  } catch (error) {
    next(error);
  }
};

export const voteQuestion = async (req, res, next) => {
  try {
    const { voteType } = req.body;

    const question = await MedicalQuestion.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    if (voteType === 'up') {
      question.upvotes += 1;
    } else if (voteType === 'down') {
      question.downvotes += 1;
    }

    await question.save();

    res.status(200).json({
      success: true,
      data: {
        upvotes: question.upvotes,
        downvotes: question.downvotes
      }
    });
  } catch (error) {
    next(error);
  }
};

export const closeQuestion = async (req, res, next) => {
  try {
    const question = await MedicalQuestion.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    if (question.patient && question.patient.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to close this question'
      });
    }

    question.status = 'Closed';
    question.closedAt = new Date();
    question.closedBy = req.user.id;
    question.closedReason = req.body.reason;

    await question.save();

    res.status(200).json({
      success: true,
      message: 'Question closed successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getMyQuestions = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const query = { patient: req.user.id };

    const total = await MedicalQuestion.countDocuments(query);
    const questions = await MedicalQuestion.find(query)
      .select('-answers')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: questions.length,
      total,
      data: questions
    });
  } catch (error) {
    next(error);
  }
};
