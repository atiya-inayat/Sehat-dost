import mongoose from 'mongoose';

const labTestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Blood', 'Urine', 'Stool', 'X-Ray', 'MRI', 'CT Scan', 'Ultrasound', 'ECG', 'EEG', 'Biopsy', 'Pathology', 'Radiology', 'Cardiology', 'Neurology', 'Other']
  },
  description: {
    type: String
  },
  preparation: {
    type: String
  },
  turnaroundTime: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  homeSample: {
    type: Boolean,
    default: false
  },
  fasting: {
    type: Boolean,
    default: false
  },
  parameters: [{
    name: String,
    normalRange: String,
    unit: String
  }]
});

const labSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide lab name'],
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: ['Diagnostic', 'Imaging', 'Pathology', 'Research'],
    default: 'Diagnostic'
  },
  address: {
    street: String,
    area: String,
    city: {
      type: String,
      required: true
    },
    province: {
      type: String,
      required: true
    },
    zipCode: String
  },
  helpline: {
    type: String
  },
  email: {
    type: String,
    lowercase: true
  },
  website: String,
  services: [{
    type: String
  }],
  tests: [labTestSchema],
  sampleCollection: {
    home: { type: Boolean, default: false },
    pickup: { type: Boolean, default: false },
    center: { type: Boolean, default: true }
  },
  accreditations: [{
    type: String
  }],
  workingHours: {
    monday: { open: String, close: String, is24Hours: Boolean },
    tuesday: { open: String, close: String, is24Hours: Boolean },
    wednesday: { open: String, close: String, is24Hours: Boolean },
    thursday: { open: String, close: String, is24Hours: Boolean },
    friday: { open: String, close: String, is24Hours: Boolean },
    saturday: { open: String, close: String, is24Hours: Boolean },
    sunday: { open: String, close: String, is24Hours: Boolean }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  about: {
    type: String,
    maxlength: [1000, 'About cannot exceed 1000 characters']
  },
  logo: {
    type: String
  },
  images: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

labSchema.index({ city: 1, isVerified: 1 });
labSchema.index({ 'tests.category': 1 });

export default mongoose.model('Lab', labSchema);
