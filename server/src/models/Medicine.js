import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide medicine name'],
    trim: true,
    index: true
  },
  genericName: {
    type: String,
    required: [true, 'Please provide generic name'],
    trim: true
  },
  brandNames: [{
    type: String
  }],
  manufacturer: {
    type: String,
    required: true
  },
  drugClass: {
    type: String,
    required: true,
    enum: [
      'NSAID', 'Antibiotic', 'Antiviral', 'Antifungal', 'Anticonvulsant',
      'Antidiabetic', 'Insulin', 'ACE Inhibitor', 'ARB', 'Beta Blocker',
      'Calcium Channel Blocker', 'Diuretic', 'Statin', 'PPI', 'H2 Blocker',
      'Antihistamine', 'Corticosteroid', 'Analgesic', 'Antipyretic',
      'Sedative', 'Antidepressant', 'Antipsychotic', 'Bronchodilator',
      'Antitussive', 'Expectorant', 'Laxative', 'Antidiarrheal', 'Antiemetic',
      'Anticoagulant', 'Antiplatelet', 'Thyroid Hormone', 'Contraceptive',
      'Immunosuppressant', 'Chemotherapy', 'Vaccine', 'Other'
    ]
  },
  formula: {
    type: String
  },
  form: {
    type: String,
    required: true,
    enum: ['Tablet', 'Capsule', 'Syrup', 'Suspension', 'Injection', 'Cream', 'Ointment', 'Gel', 'Drops', 'Inhaler', 'Patch', 'Suppository', 'Solution', 'Powder', 'Dressing']
  },
  strength: [{
    value: Number,
    unit: String
  }],
  packaging: {
    type: String,
    enum: ['Strip', 'Bottle', 'Box', ' vial', 'Ampoule', 'Tube', 'Pack']
  },
  quantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  mrp: {
    type: Number,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  indications: [{
    type: String
  }],
  contraindications: [{
    type: String
  }],
  sideEffects: [{
    type: String
  }],
  dosage: {
    adult: String,
    pediatric: String,
    renal: String,
    hepatic: String
  },
  interactions: [{
    drug: String,
    effect: String
  }],
  storage: {
    type: String
  },
  requiresPrescription: {
    type: Boolean,
    default: false
  },
  isControlled: {
    type: Boolean,
    default: false
  },
  schedule: {
    type: String,
    enum: ['OTC', 'Schedule', 'Controlled', ''],
    default: 'OTC'
  },
  images: [{
    type: String
  }],
  barcode: {
    type: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    index: true
  },
  tags: [{
    type: String
  }],
  alternatives: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

medicineSchema.index({ name: 'text', genericName: 'text', brandNames: 'text' });
medicineSchema.index({ drugClass: 1, isAvailable: 1 });
medicineSchema.index({ manufacturer: 1, price: 1 });

export default mongoose.model('Medicine', medicineSchema);
