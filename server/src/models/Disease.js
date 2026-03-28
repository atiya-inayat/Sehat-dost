import mongoose from 'mongoose';

const conditionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  symptoms: [String],
  riskFactors: [String],
  treatment: String,
  types: [String],
  prevention: [String],
  whenToSee: [String]
});

const diseaseCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String
  },
  icon: {
    type: String
  },
  conditions: [conditionSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

diseaseCategorySchema.index({ slug: 1 });
diseaseCategorySchema.index({ category: 'text' });

export default mongoose.model('DiseaseCategory', diseaseCategorySchema);
