import Joi from 'joi';

export const phoneRegex = /^03[0-9]{9}$/;
export const phoneRegexLoose = /^03[0-9]{9}$|^03[0-9]{2}[-\s]?[0-9]{7}$/;
export const cnicRegex = /^[0-9]{13}$/;
export const pmcIdRegex = /^PMC-[0-9]{5}$/;
export const landlineRegex = /^0[0-9]{2,3}-[0-9]{7}$/;

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().email().lowercase().required(),
  phone: Joi.string().pattern(phoneRegex).required()
    .messages({ 'string.pattern.base': 'Phone must be in format: 03xxxxxxxxx' }),
  cnic: Joi.string().pattern(cnicRegex).optional()
    .messages({ 'string.pattern.base': 'CNIC must be 13 digits without dashes' }),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('patient', 'doctor', 'hospital', 'partner').default('patient'),
  bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-').optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const updateProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50),
  phone: Joi.string().pattern(phoneRegex)
    .messages({ 'string.pattern.base': 'Phone must be in format: 03xxxxxxxxx' }),
  bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'),
  dateOfBirth: Joi.date(),
  address: Joi.object({
    street: Joi.string(),
    city: Joi.string(),
    province: Joi.string(),
    zipCode: Joi.string()
  }),
  emergencyContact: Joi.object({
    name: Joi.string(),
    phone: Joi.string().pattern(phoneRegex),
    relationship: Joi.string()
  })
});

export const doctorSchema = Joi.object({
  userId: Joi.string().required(),
  pmcId: Joi.string().pattern(pmcIdRegex).required()
    .messages({ 'string.pattern.base': 'PMC ID must be in format: PMC-XXXXX' }),
  specialty: Joi.string().valid(
    'Cardiologist', 'Nephrologist', 'Neurologist', 'Dermatologist',
    'Orthopedic Surgeon', 'Gynecologist', 'Pediatrician', 'ENT Specialist',
    'Ophthalmologist', 'Urologist', 'Pulmonologist', 'Gastroenterologist',
    'Psychiatrist', 'Endocrinologist', 'Oncologist', 'General Physician'
  ).required(),
  subSpecialty: Joi.string().optional(),
  degrees: Joi.string().required(),
  experience: Joi.number().integer().min(0).required(),
  fee: Joi.number().integer().min(0).required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  hospital: Joi.string().required(),
  hospitalAddress: Joi.string(),
  about: Joi.string().max(1000),
  languages: Joi.array().items(Joi.string()),
  services: Joi.array().items(Joi.string()),
  availability: Joi.object({
    Monday: Joi.string(),
    Tuesday: Joi.string(),
    Wednesday: Joi.string(),
    Thursday: Joi.string(),
    Friday: Joi.string(),
    Saturday: Joi.string(),
    Sunday: Joi.string()
  })
});

export const appointmentSchema = Joi.object({
  doctorId: Joi.string().required(),
  hospitalId: Joi.string().optional(),
  appointmentType: Joi.string().valid('In-Person', 'Video Consultation', 'Chat').required(),
  scheduledDate: Joi.date().iso().min('now').required(),
  scheduledTime: Joi.string().required(),
  dayOfWeek: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday').required(),
  reason: Joi.string().max(500).required(),
  symptoms: Joi.array().items(Joi.string()),
  isFirstVisit: Joi.boolean().default(true),
  patientHistory: Joi.object({
    allergies: Joi.array().items(Joi.string()),
    currentMedications: Joi.array().items(Joi.string()),
    chronicConditions: Joi.array().items(Joi.string())
  })
});

export const medicalQuestionSchema = Joi.object({
  question: Joi.string().min(10).max(1000).required(),
  isAnonymous: Joi.boolean().default(true),
  gender: Joi.string().valid('Male', 'Female', 'Other').optional(),
  age: Joi.number().integer().min(0).max(150).optional(),
  location: Joi.object({
    city: Joi.string(),
    province: Joi.string()
  }),
  problemType: Joi.string().valid(
    'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics',
    'Gynecology', 'Pediatrics', 'ENT', 'Ophthalmology',
    'Psychiatry', 'Gastroenterology', 'Nephrology', 'Pulmonology',
    'Endocrinology', 'Urology', 'Oncology', 'General Physician',
    'Emergency', 'Other'
  ).required(),
  symptoms: Joi.array().items(Joi.string()),
  duration: Joi.string().valid('Today', 'Few Days', '1 Week', '2 Weeks', '1 Month', 'More than 1 Month', 'Chronic'),
  severity: Joi.string().valid('Mild', 'Moderate', 'Severe'),
  previousTreatment: Joi.string().max(500),
  currentMedications: Joi.array().items(Joi.string()),
  allergies: Joi.array().items(Joi.string()),
  additionalInfo: Joi.string().max(1000)
});

export const bloodRequestSchema = Joi.object({
  type: Joi.string().valid('Request', 'Donor').required(),
  bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-').required(),
  units: Joi.number().integer().min(1).max(10).default(1),
  patientName: Joi.string().when('type', {
    is: 'Request',
    then: Joi.required()
  }),
  hospital: Joi.string().when('type', {
    is: 'Request',
    then: Joi.required()
  }),
  hospitalAddress: Joi.string().allow(''),
  contactPhone: Joi.string().min(11).max(15).required()
    .messages({ 'string.min': 'Phone must be at least 11 digits' }),
  urgency: Joi.string().valid('Critical', 'Immediate', 'Normal').default('Normal'),
  city: Joi.string().default('Lahore'),
  province: Joi.string().default('Punjab'),
  area: Joi.string().allow(''),
  donorNotes: Joi.string().max(500).allow(''),
  medicalConditions: Joi.array().items(Joi.string()),
  medications: Joi.array().items(Joi.string())
});

export const partnerSchema = Joi.object({
  companyName: Joi.string().trim().required(),
  contactPerson: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegex).required()
    .messages({ 'string.pattern.base': 'Phone must be in format: 03xxxxxxxxx' }),
  companyType: Joi.string().valid('Pharmaceutical', 'Hospital', 'Diagnostic Lab', 'Insurance', 'Corporate', 'NGO', 'Government', 'Other').required(),
  companyAddress: Joi.object({
    street: Joi.string(),
    area: Joi.string(),
    city: Joi.string(),
    province: Joi.string(),
    zipCode: Joi.string()
  }),
  website: Joi.string().uri().optional(),
  registrationNumber: Joi.string(),
  ntnnumber: Joi.string(),
  partnershipType: Joi.string().valid('Corporate', 'Employee Benefits', 'Brand', 'Research', 'Distribution', 'Referral', 'Other').required(),
  expectedBenefits: Joi.array().items(Joi.string()),
  employeeCount: Joi.number().integer().min(0),
  currentHealthcareProvider: Joi.string(),
  budgetRange: Joi.string().valid('< 50,000', '50,000 - 100,000', '100,000 - 500,000', '500,000 - 1,000,000', '> 1,000,000', 'To Discuss'),
  message: Joi.string().max(1000)
});

export const hospitalSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid('Public', 'Private', 'Trust', 'NGO'),
  address: Joi.object({
    street: Joi.string(),
    area: Joi.string(),
    city: Joi.string().required(),
    province: Joi.string().required(),
    zipCode: Joi.string()
  }).required(),
  helpline: Joi.string().pattern(landlineRegex)
    .messages({ 'string.pattern.base': 'Helpline must be in format: 042-XXXXXXX' }),
  emergency: Joi.string().pattern(landlineRegex),
  email: Joi.string().email(),
  website: Joi.string().uri(),
  services: Joi.array().items(Joi.string()),
  facilities: Joi.array().items(Joi.string()),
  bedCount: Joi.number().integer().min(0),
  icuBeds: Joi.number().integer().min(0),
  about: Joi.string().max(2000)
});

export const medicineSearchSchema = Joi.object({
  name: Joi.string(),
  genericName: Joi.string(),
  manufacturer: Joi.string(),
  drugClass: Joi.string(),
  form: Joi.string(),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(0),
  requiresPrescription: Joi.boolean(),
  isAvailable: Joi.boolean().default(true)
});

export const labTestBookingSchema = Joi.object({
  labId: Joi.string().required(),
  tests: Joi.array().items(Joi.object({
    testId: Joi.string(),
    name: Joi.string().required()
  })).min(1).required(),
  patientName: Joi.string().required(),
  patientPhone: Joi.string().pattern(phoneRegex).required(),
  patientCNIC: Joi.string().pattern(cnicRegex),
  scheduledDate: Joi.date().iso().required(),
  scheduledTime: Joi.string().required(),
  sampleCollection: Joi.string().valid('home', 'center'),
  address: Joi.object({
    street: Joi.string(),
    area: Joi.string(),
    city: Joi.string(),
    province: Joi.string()
  }).when('sampleCollection', {
    is: 'home',
    then: Joi.required()
  })
});
