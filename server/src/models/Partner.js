import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true
  },
  contactPerson: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    match: [/^03[0-9]{9}$/, 'Please provide a valid Pakistani phone number']
  },
  companyType: {
    type: String,
    required: true,
    enum: ['Pharmaceutical', 'Hospital', 'Diagnostic Lab', 'Insurance', 'Corporate', 'NGO', 'Government', 'Other']
  },
  companyAddress: {
    street: String,
    area: String,
    city: String,
    province: String,
    zipCode: String
  },
  website: {
    type: String
  },
  registrationNumber: {
    type: String
  },
  ntnnumber: {
    type: String
  },
  partnershipType: {
    type: String,
    required: true,
    enum: ['Corporate', 'Employee Benefits', 'Brand', 'Research', 'Distribution', 'Referral', 'Other']
  },
  expectedBenefits: [{
    type: String,
    enum: ['Employee Health Cards', 'Discounts', 'Brand Visibility', 'Data Access', 'Exclusive Deals', 'Priority Support', 'Other']
  }],
  employeeCount: {
    type: Number,
    min: 0
  },
  currentHealthcareProvider: {
    type: String
  },
  budgetRange: {
    type: String,
    enum: ['< 50,000', '50,000 - 100,000', '100,000 - 500,000', '500,000 - 1,000,000', '> 1,000,000', 'To Discuss']
  },
  message: {
    type: String,
    maxlength: [1000]
  },
  documents: [{
    name: String,
    url: String,
    uploadedAt: Date
  }],
  status: {
    type: String,
    enum: ['New', 'Contacted', 'In Discussion', 'Approved', 'Rejected', 'Active'],
    default: 'New'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  followUpDate: {
    type: Date
  },
  notes: [{
    note: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  contractStartDate: {
    type: Date
  },
  contractEndDate: {
    type: Date
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100
  },
  isFeatured: {
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

partnerSchema.index({ companyType: 1, status: 1 });
partnerSchema.index({ city: 1, partnershipType: 1 });

export default mongoose.model('Partner', partnerSchema);
