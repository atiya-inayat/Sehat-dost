// import mongoose from 'mongoose';

// const hospitalSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Please provide hospital name'],
//     trim: true
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   type: {
//     type: String,
//     enum: ['Public', 'Private', 'Trust', 'NGO'],
//     default: 'Private'
//   },
//   registrationNumber: {
//     type: String,
//     unique: true,
//     sparse: true
//   },
//   address: {
//     street: String,
//     area: String,
//     city: {
//       type: String,
//       required: true
//     },
//     province: {
//       type: String,
//       required: true
//     },
//     zipCode: String,
//     coordinates: {
//       lat: Number,
//       lng: Number
//     }
//   },
//   helpline: {
//     type: String,
//     match: [/^0[0-9]{2,3}-[0-9]{7}$/, 'Please provide a valid phone number (e.g., 042-35761999)']
//   },
//   emergency: {
//     type: String,
//     match: [/^0[0-9]{2,3}-[0-9]{7}$/]
//   },
//   email: {
//     type: String,
//     lowercase: true
//   },
//   website: {
//     type: String
//   },
//   services: [{
//     type: String
//   }],
//   facilities: [{
//     type: String
//   }],
//   departments: [{
//     name: String,
//     head: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Doctor'
//     },
//     contact: String
//   }],
//   doctors: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Doctor'
//   }],
//   bedCount: {
//     type: Number,
//     default: 0
//   },
//   icuBeds: {
//     type: Number,
//     default: 0
//   },
//   ambulanceCount: {
//     type: Number,
//     default: 0
//   },
//   about: {
//     type: String,
//     maxlength: [2000, 'About cannot exceed 2000 characters']
//   },
//   images: [{
//     type: String
//   }],
//   logo: {
//     type: String
//   },
//   isVerified: {
//     type: Boolean,
//     default: false
//   },
//   isFeatured: {
//     type: Boolean,
//     default: false
//   },
//   rating: {
//     type: Number,
//     default: 0,
//     min: 0,
//     max: 5
//   },
//   reviewCount: {
//     type: Number,
//     default: 0
//   },
//   workingHours: {
//     monday: { open: String, close: String, is24Hours: Boolean },
//     tuesday: { open: String, close: String, is24Hours: Boolean },
//     wednesday: { open: String, close: String, is24Hours: Boolean },
//     thursday: { open: String, close: String, is24Hours: Boolean },
//     friday: { open: String, close: String, is24Hours: Boolean },
//     saturday: { open: String, close: String, is24Hours: Boolean },
//     sunday: { open: String, close: String, is24Hours: Boolean }
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// }, {
//   timestamps: true
// });

// hospitalSchema.index({ city: 1, type: 1 });
// hospitalSchema.index({ 'address.province': 1, isVerified: 1 });

// export default mongoose.model('Hospital', hospitalSchema);
//******************* */

import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide hospital name"],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["Public", "Private", "Trust", "NGO"],
      default: "Private",
    },
    registrationNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    address: {
      street: String,
      area: String,
      city: {
        type: String,
        required: true,
      },
      province: {
        type: String,
        required: true,
      },
      zipCode: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    helpline: {
      type: String,
      // UPDATED REGEX: Allows for 0xx or 0xxx prefix, optional dash, and 7-8 digits
      match: [
        /^0[0-9]{2,3}-?[0-9]{7,8}$/,
        "Please provide a valid phone number (e.g., 042-35761999)",
      ],
    },
    emergency: {
      type: String,
      // UPDATED REGEX: Matches the helpline logic
      match: [
        /^0[0-9]{2,3}-?[0-9]{7,8}$/,
        "Please provide a valid emergency number",
      ],
    },
    email: {
      type: String,
      lowercase: true,
    },
    website: {
      type: String,
    },
    services: [
      {
        type: String,
      },
    ],
    facilities: [
      {
        type: String,
      },
    ],
    departments: [
      {
        name: String,
        head: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Doctor",
        },
        contact: String,
      },
    ],
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
    bedCount: {
      type: Number,
      default: 0,
    },
    icuBeds: {
      type: Number,
      default: 0,
    },
    ambulanceCount: {
      type: Number,
      default: 0,
    },
    about: {
      type: String,
      maxlength: [2000, "About cannot exceed 2000 characters"],
    },
    images: [
      {
        type: String,
      },
    ],
    logo: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    workingHours: {
      monday: { open: String, close: String, is24Hours: Boolean },
      tuesday: { open: String, close: String, is24Hours: Boolean },
      wednesday: { open: String, close: String, is24Hours: Boolean },
      thursday: { open: String, close: String, is24Hours: Boolean },
      friday: { open: String, close: String, is24Hours: Boolean },
      saturday: { open: String, close: String, is24Hours: Boolean },
      sunday: { open: String, close: String, is24Hours: Boolean },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Indices for performance
hospitalSchema.index({ city: 1, type: 1 });
hospitalSchema.index({ "address.province": 1, isVerified: 1 });

export default mongoose.model("Hospital", hospitalSchema);
