import mongoose from 'mongoose';

const bloodDonationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Request', 'Donor', 'Camp'],
    required: true
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() { return this.type === 'Request'; }
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() { return this.type === 'Donor'; }
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  },
  rhFactor: {
    type: String,
    enum: ['Positive', 'Negative']
  },
  units: {
    type: Number,
    required: function() { return this.type === 'Request'; },
    min: 1,
    max: 10,
    default: 1
  },
  patientName: {
    type: String,
    required: function() { return this.type === 'Request'; }
  },
  hospital: {
    type: String,
    required: function() { return this.type === 'Request'; }
  },
  hospitalAddress: {
    type: String
  },
  ward: {
    type: String
  },
  contactPhone: {
    type: String,
    required: true,
    match: [/^03[0-9]{9}$/, 'Please provide a valid Pakistani phone number']
  },
  alternatePhone: {
    type: String,
    match: [/^03[0-9]{9}$/]
  },
  urgency: {
    type: String,
    enum: ['Critical', 'Immediate', 'Normal'],
    required: function() { return this.type === 'Request'; },
    default: 'Normal'
  },
  purpose: {
    type: String,
    enum: ['Surgery', 'Emergency', 'Treatment', ' Thalassemia', 'Cancer', 'Other']
  },
  city: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  area: {
    type: String
  },
  preferredDate: {
    type: Date
  },
  preferredTime: {
    type: String
  },
  status: {
    type: String,
    enum: ['Pending', 'Contacted', 'Fulfilled', 'Cancelled', 'Expired'],
    default: 'Pending'
  },
  fulfilledBy: [{
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    unitsDonated: Number,
    date: Date,
    bloodBank: String
  }],
  fulfilledUnits: {
    type: Number,
    default: 0
  },
  donorNotes: {
    type: String,
    maxlength: [500]
  },
  lastDonated: {
    type: Date
  },
  isRegularDonor: {
    type: Boolean,
    default: false
  },
  medicalConditions: [{
    type: String
  }],
  medications: [{
    type: String
  }],
  donorAvailability: {
    weekdays: { type: Boolean, default: false },
    weekends: { type: Boolean, default: false },
    morning: { type: Boolean, default: false },
    afternoon: { type: Boolean, default: false },
    evening: { type: Boolean, default: false }
  },
  viewCount: {
    type: Number,
    default: 0
  },
  shareCount: {
    type: Number,
    default: 0
  },
  expiresAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

bloodDonationSchema.index({ bloodGroup: 1, city: 1, status: 1 });
bloodDonationSchema.index({ type: 1, status: 1 });
bloodDonationSchema.index({ urgency: 1, createdAt: -1 });

bloodDonationSchema.pre('save', function(next) {
  if (this.type === 'Request' && !this.expiresAt) {
    const expiryDays = this.urgency === 'Critical' ? 2 : this.urgency === 'Immediate' ? 5 : 14;
    this.expiresAt = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);
  }
  next();
});

export default mongoose.model('BloodRequest', bloodDonationSchema);
