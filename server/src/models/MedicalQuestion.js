import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  answer: {
    type: String,
    required: true,
    maxlength: [2000, 'Answer cannot exceed 2000 characters']
  },
  isVerified: {
    type: Boolean,
    default: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  isAccepted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const medicalQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please provide your question'],
    maxlength: [1000, 'Question cannot exceed 1000 characters']
  },
  isAnonymous: {
    type: Boolean,
    default: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', ''],
    default: ''
  },
  age: {
    type: Number,
    min: 0,
    max: 150
  },
  location: {
    city: String,
    province: String
  },
  problemType: {
    type: String,
    required: true,
    enum: [
      'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics',
      'Gynecology', 'Pediatrics', 'ENT', 'Ophthalmology',
      'Psychiatry', 'Gastroenterology', 'Nephrology', 'Pulmonology',
      'Endocrinology', 'Urology', 'Oncology', 'General Physician',
      'Emergency', 'Other'
    ]
  },
  symptoms: [{
    type: String
  }],
  duration: {
    type: String,
    enum: ['Today', 'Few Days', '1 Week', '2 Weeks', '1 Month', 'More than 1 Month', 'Chronic']
  },
  severity: {
    type: String,
    enum: ['Mild', 'Moderate', 'Severe', '']
  },
  previousTreatment: {
    type: String,
    maxlength: [500]
  },
  currentMedications: [{
    type: String
  }],
  allergies: [{
    type: String
  }],
  additionalInfo: {
    type: String,
    maxlength: [1000]
  },
  images: [{
    type: String
  }],
  answers: [answerSchema],
  answerCount: {
    type: Number,
    default: 0
  },
  viewCount: {
    type: Number,
    default: 0
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Open', 'Answered', 'Closed', 'Flagged'],
    default: 'Open'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String
  }],
  closedAt: {
    type: Date
  },
  closedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  closedReason: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

medicalQuestionSchema.index({ problemType: 1, status: 1 });
medicalQuestionSchema.index({ createdAt: -1 });
medicalQuestionSchema.index({ question: 'text', additionalInfo: 'text' });

export default mongoose.model('MedicalQuestion', medicalQuestionSchema);
