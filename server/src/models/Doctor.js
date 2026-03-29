import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  pmcId: {
    type: String,
    required: [true, 'Please provide PMC registration number'],
    unique: true,
    uppercase: true
  },
  specialty: {
    type: String,
    required: [true, 'Please specify specialty'],
    enum: [
      'Cardiologist', 'Nephrologist', 'Neurologist', 'Dermatologist',
      'Orthopedic Surgeon', 'Gynecologist', 'Pediatrician', 'ENT Specialist',
      'Ophthalmologist', 'Urologist', 'Pulmonologist', 'Gastroenterologist',
      'Psychiatrist', 'Endocrinologist', 'Oncologist', 'General Physician'
    ]
  },
  subSpecialty: {
    type: String,
    trim: true
  },
  degrees: {
    type: String,
    required: [true, 'Please provide degrees/qualifications']
  },
  experience: {
    type: Number,
    required: [true, 'Please specify years of experience'],
    min: 0
  },
  fee: {
    type: Number,
    required: [true, 'Please specify consultation fee'],
    min: 0
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  hospital: {
    type: String,
    required: [true, 'Please specify hospital affiliation']
  },
  hospitalAddress: {
    type: String
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital'
  },
  availability: {
    Monday: { type: String, default: 'Off' },
    Tuesday: { type: String, default: 'Off' },
    Wednesday: { type: String, default: 'Off' },
    Thursday: { type: String, default: 'Off' },
    Friday: { type: String, default: 'Off' },
    Saturday: { type: String, default: 'Off' },
    Sunday: { type: String, default: 'Off' }
  },
  about: {
    type: String,
    maxlength: [1000, 'About cannot exceed 1000 characters']
  },
  languages: [{
    type: String
  }],
  services: [{
    type: String
  }],
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
  consultationMode: {
    inPerson: { type: Boolean, default: true },
    video: { type: Boolean, default: false },
    chat: { type: Boolean, default: false }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

doctorSchema.index({ specialty: 1, fee: 1 });
doctorSchema.index({ city: 1, specialty: 1 });
doctorSchema.index({ isVerified: 1, isFeatured: 1 });

export default mongoose.model('Doctor', doctorSchema);
