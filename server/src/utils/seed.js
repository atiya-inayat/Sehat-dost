import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Hospital from "../models/Hospital.js";
import Medicine from "../models/Medicine.js";
import Lab from "../models/Lab.js";
import BloodRequest from "../models/BloodRequest.js";
import MedicalQuestion from "../models/MedicalQuestion.js";
import DiseaseCategory from "../models/Disease.js";

dotenv.config();

const specialties = [
  "Cardiologist",
  "Nephrologist",
  "Neurologist",
  "Dermatologist",
  "Orthopedic Surgeon",
  "Gynecologist",
  "Pediatrician",
  "ENT Specialist",
  "Ophthalmologist",
  "Urologist",
  "Pulmonologist",
  "Gastroenterologist",
];

const seedUsers = async () => {
  await User.deleteMany({});

  const users = await User.create([
    {
      name: "Ahmed Khan",
      email: "ahmed@example.com",
      phone: "03001234567",
      password: "password123",
      role: "patient",
      bloodGroup: "O+",
    },
    {
      name: "Dr. Ahmed Khan",
      email: "dr.ahmed@example.com",
      phone: "03011234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "A+",
    },
    {
      name: "Dr. Sara Ali",
      email: "dr.sara@example.com",
      phone: "03021234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "B+",
    },
  ]);

  console.log("Users seeded:", users.length);
  return users;
};

const seedDoctors = async (users) => {
  await Doctor.deleteMany({});

  const doctorUsers = users.filter((u) => u.role === "doctor");

  const doctors = await Doctor.create([
    {
      user: doctorUsers[0]?._id,
      pmcId: "PMC-12345",
      specialty: "Cardiologist",
      degrees: "MBBS, FCPS (Cardiology), FACC",
      experience: 15,
      fee: 3000,
      gender: "Male",
      isOnline: true,
      hospital: "Life Health Care Hospital",
      hospitalAddress: "Main Boulevard, Gulberg III, Lahore",
      availability: {
        Monday: "10:00 AM - 2:00 PM",
        Tuesday: "10:00 AM - 2:00 PM",
        Wednesday: "Off",
        Thursday: "10:00 AM - 2:00 PM",
        Friday: "10:00 AM - 2:00 PM",
        Saturday: "10:00 AM - 12:00 PM",
        Sunday: "Off",
      },
      about:
        "Dr. Ahmed Khan is a highly experienced cardiologist with over 15 years of practice.",
      isVerified: true,
      isFeatured: true,
      rating: 4.8,
      reviewCount: 156,
    },
    {
      user: doctorUsers[1]?._id,
      pmcId: "PMC-22345",
      specialty: "Cardiologist",
      degrees: "MBBS, MD (Cardiology)",
      experience: 10,
      fee: 2500,
      gender: "Female",
      isOnline: true,
      hospital: "Doctors Hospital",
      hospitalAddress: "Canal Road, Lahore",
      availability: {
        Monday: "2:00 PM - 6:00 PM",
        Tuesday: "2:00 PM - 6:00 PM",
        Wednesday: "2:00 PM - 6:00 PM",
        Thursday: "Off",
        Friday: "2:00 PM - 6:00 PM",
        Saturday: "Off",
        Sunday: "Off",
      },
      about:
        "Dr. Sara Ali is a dedicated cardiologist focused on preventive cardiology.",
      isVerified: true,
      rating: 4.6,
      reviewCount: 89,
    },
  ]);

  console.log("Doctors seeded:", doctors.length);
  return doctors;
};

const seedHospitals = async () => {
  await Hospital.deleteMany({});

  const hospitals = await Hospital.create([
    {
      name: "Doctors Hospital",
      type: "Private",
      address: {
        street: "Canal Road",
        city: "Lahore",
        province: "Punjab",
      },
      helpline: "042-35761999",
      emergency: "042-35761000",
      services: [
        "Cardiology",
        "Neurology",
        "Orthopedics",
        "Pediatrics",
        "Gynecology",
        "Dermatology",
      ],
      facilities: [
        "24/7 Emergency",
        "ICU",
        "Pharmacy",
        "Laboratory",
        "Radiology",
        "Cafeteria",
        "Parking",
      ],
      bedCount: 500,
      icuBeds: 50,
      about:
        "Doctors Hospital is one of the leading healthcare institutions in Pakistan.",
      isVerified: true,
      isFeatured: true,
      rating: 4.5,
      reviewCount: 234,
    },
    {
      name: "Shifa International Hospital",
      type: "Private",
      address: {
        street: "H-8/4",
        city: "Islamabad",
        province: "Islamabad",
      },
      helpline: "051-8464646",
      services: [
        "Nephrology",
        "Cardiology",
        "Oncology",
        "Gastroenterology",
        "Pulmonology",
      ],
      facilities: [
        "24/7 Emergency",
        "ICU",
        "NICU",
        "Pharmacy",
        "Blood Bank",
        "MRI",
        "CT Scan",
      ],
      bedCount: 600,
      about: "Shifa International Hospital is a premier healthcare facility.",
      isVerified: true,
      rating: 4.7,
      reviewCount: 312,
    },
  ]);

  console.log("Hospitals seeded:", hospitals.length);
  return hospitals;
};

const seedMedicines = async () => {
  await Medicine.deleteMany({});

  const medicines = await Medicine.create([
    {
      name: "Aspirin",
      genericName: "Acetylsalicylic acid",
      manufacturer: "Bayer",
      drugClass: "NSAID",
      formula: "C9H8O4",
      form: "Tablet",
      price: 50,
      description: "Used to reduce pain, fever, or inflammation.",
      isAvailable: true,
      isFeatured: true,
    },
    {
      name: "Amoxicillin",
      genericName: "Amoxicillin",
      manufacturer: "GSK",
      drugClass: "Antibiotic",
      formula: "C16H19N3O5S",
      form: "Capsule",
      price: 150,
      description: "A penicillin antibiotic that fights bacteria.",
      requiresPrescription: true,
      isAvailable: true,
    },
    {
      name: "Amlodipine",
      genericName: "Amlodipine Besylate",
      manufacturer: "Pfizer",
      drugClass: "Calcium Channel Blocker",
      formula: "C20H25ClN2O5",
      form: "Tablet",
      price: 200,
      description: "Used to treat high blood pressure and chest pain.",
      requiresPrescription: true,
      isAvailable: true,
    },
    {
      name: "Atorvastatin",
      genericName: "Atorvastatin Calcium",
      manufacturer: "Pfizer",
      drugClass: "Statin",
      formula: "C33H35FN2O5",
      form: "Tablet",
      price: 180,
      description:
        "Used to lower cholesterol and reduce risk of heart disease.",
      requiresPrescription: true,
      isAvailable: true,
    },
    {
      name: "Metformin",
      genericName: "Metformin HCl",
      manufacturer: "Bristol-Myers",
      drugClass: "Antidiabetic",
      formula: "C4H11N5",
      form: "Tablet",
      price: 120,
      description: "Used to control blood sugar in type 2 diabetes.",
      requiresPrescription: true,
      isAvailable: true,
    },
    {
      name: "Omeprazole",
      genericName: "Omeprazole",
      manufacturer: "AstraZeneca",
      drugClass: "PPI",
      formula: "C17H19N3O3S",
      form: "Capsule",
      price: 90,
      description: "Used to treat gastric acid-related conditions.",
      isAvailable: true,
    },
    {
      name: "Paracetamol",
      genericName: "Acetaminophen",
      manufacturer: "GSK",
      drugClass: "Analgesic",
      formula: "C8H9NO2",
      form: "Tablet",
      price: 30,
      description: "Used to treat mild to moderate pain and fever.",
      isAvailable: true,
      isFeatured: true,
    },
    {
      name: "Losartan",
      genericName: "Losartan Potassium",
      manufacturer: "Merck",
      drugClass: "ARB",
      formula: "C22H23ClN6O",
      form: "Tablet",
      price: 250,
      description: "Used to treat high blood pressure and protect kidneys.",
      requiresPrescription: true,
      isAvailable: true,
    },
  ]);

  console.log("Medicines seeded:", medicines.length);
  return medicines;
};

const seedLabs = async () => {
  await Lab.deleteMany({});

  const labs = await Lab.create([
    {
      name: "Chughtai Lab",
      type: "Pathology",
      address: { city: "Lahore", province: "Punjab" },
      helpline: "042-111-000-030",
      services: ["Blood Tests", "Urine Tests", "X-Ray", "MRI", "CT Scan"],
      tests: [
        {
          name: "Complete Blood Count (CBC)",
          category: "Blood",
          price: 800,
          description: "Complete blood count test",
        },
        {
          name: "Lipid Profile",
          category: "Blood",
          price: 1500,
          description: "Cholesterol and lipid test",
        },
        {
          name: "Thyroid Function Test",
          category: "Blood",
          price: 2500,
          description: "Thyroid hormones test",
        },
        {
          name: "HbA1c",
          category: "Blood",
          price: 1800,
          description: "Diabetes monitoring test",
        },
        {
          name: "Liver Function Test",
          category: "Blood",
          price: 1200,
          description: "Liver health test",
        },
        {
          name: "Kidney Function Test",
          category: "Blood",
          price: 1000,
          description: "Kidney health test",
        },
      ],
      isVerified: true,
      isFeatured: true,
      rating: 4.4,
      reviewCount: 567,
    },
    {
      name: "Shaukat Khanum Lab",
      type: "Diagnostic",
      address: { city: "Lahore", province: "Punjab" },
      helpline: "042-111-755-755",
      services: ["Blood Tests", "Tumor Markers", "CT Scan", "MRI", "Biopsy"],
      tests: [
        { name: "Complete Blood Count (CBC)", category: "Blood", price: 900 },
        { name: "Tumor Markers", category: "Blood", price: 5000 },
        { name: "CT Scan", category: "CT Scan", price: 15000 },
        { name: "MRI Brain", category: "MRI", price: 20000 },
        { name: "Biopsy", category: "Pathology", price: 8000 },
      ],
      isVerified: true,
      rating: 4.6,
      reviewCount: 892,
    },
  ]);

  console.log("Labs seeded:", labs.length);
  return labs;
};

// const seedBloodRequests = async () => {
//   await BloodRequest.deleteMany({});

//   const requests = await BloodRequest.create([
//     {
//       type: 'Request',
//       bloodGroup: 'A+',
//       units: 2,
//       patientName: 'Ali Hassan',
//       hospital: 'Jinnah Hospital, Lahore',
//       contactPhone: '03001234567',
//       urgency: 'Critical',
//       city: 'Lahore',
//       province: 'Punjab',
//       status: 'Pending'
//     },
//     {
//       type: 'Request',
//       bloodGroup: 'O-',
//       units: 1,
//       patientName: 'Maria Bibi',
//       hospital: 'Services Hospital, Lahore',
//       contactPhone: '03219876543',
//       urgency: 'Immediate',
//       city: 'Lahore',
//       province: 'Punjab',
//       status: 'Pending'
//     },
//     {
//       type: 'Request',
//       bloodGroup: 'B+',
//       units: 3,
//       patientName: 'Kamran Shah',
//       hospital: 'CMH, Rawalpindi',
//       contactPhone: '03334567890',
//       urgency: 'Normal',
//       city: 'Rawalpindi',
//       province: 'Punjab',
//       status: 'Pending'
//     }
//   ]);

//   console.log('Blood requests seeded:', requests.length);
//   return requests;
// };

const seedBloodRequests = async (patientUser) => {
  await BloodRequest.deleteMany({});

  const requests = await BloodRequest.create([
    {
      requester: patientUser._id, // <--- Added the required User ID
      type: "Request",
      bloodGroup: "A+",
      units: 2,
      patientName: "Ali Hassan",
      hospital: "Jinnah Hospital, Lahore",
      contactPhone: "03001234567",
      urgency: "Critical",
      city: "Lahore",
      province: "Punjab",
      status: "Pending",
    },
    {
      requester: patientUser._id, // <--- Added the required User ID
      type: "Request",
      bloodGroup: "O-",
      units: 1,
      patientName: "Maria Bibi",
      hospital: "Services Hospital, Lahore",
      contactPhone: "03219876543",
      urgency: "Immediate",
      city: "Lahore",
      province: "Punjab",
      status: "Pending",
    },
  ]);

  console.log("Blood requests seeded:", requests.length);
  return requests;
};

const seedQuestions = async () => {
  await MedicalQuestion.deleteMany({});

  const questions = await MedicalQuestion.create([
    {
      question:
        "I have been experiencing chest pain for 2 days. What should I do?",
      isAnonymous: true,
      gender: "Male",
      location: { city: "Lahore", province: "Punjab" },
      problemType: "Cardiology",
      symptoms: ["Chest pain", "Shortness of breath"],
      duration: "Few Days",
      severity: "Moderate",
      answerCount: 2,
      viewCount: 145,
      status: "Answered",
    },
    {
      question:
        "My child has a high fever that won't go down. Should I be worried?",
      isAnonymous: true,
      gender: "Female",
      location: { city: "Karachi", province: "Sindh" },
      problemType: "Pediatrics",
      symptoms: ["High fever", "Headache"],
      duration: "1 Week",
      severity: "Severe",
      answerCount: 5,
      viewCount: 234,
      status: "Answered",
    },
  ]);

  console.log("Questions seeded:", questions.length);
  return questions;
};

const seedDiseaseCategories = async () => {
  await DiseaseCategory.deleteMany({});

  const categories = await DiseaseCategory.create([
    {
      category: "Cardiology",
      slug: "cardiology",
      description: "Heart and cardiovascular system diseases",
      icon: "Heart",
      order: 1,
      conditions: [
        {
          name: "Heart Disease",
          description: "Coronary Artery Disease, Heart Attack",
          symptoms: ["Chest pain", "Shortness of breath", "Fatigue"],
          riskFactors: ["High cholesterol", "Hypertension", "Smoking"],
          treatment: "Medication, angioplasty, bypass surgery",
          types: ["Coronary artery disease", "Arrhythmia", "Heart failure"],
        },
        {
          name: "Hypertension",
          description: "High Blood Pressure",
          symptoms: ["Headache", "Dizziness", "Blurred vision"],
          riskFactors: ["Obesity", "High salt diet", "Stress"],
          treatment: "ACE inhibitors, beta-blockers, lifestyle changes",
          types: ["Primary", "Secondary", "Resistant"],
        },
      ],
    },
    {
      category: "Dermatology",
      slug: "dermatology",
      description: "Skin, hair, and nail conditions",
      icon: "Hand",
      order: 2,
      conditions: [
        {
          name: "Vitiligo",
          description: "White Patches / Pigmentation Disorders",
          symptoms: ["White patches on skin", "Premature graying"],
          riskFactors: ["Autoimmune conditions", "Family history"],
          treatment: "Topical corticosteroids, light therapy",
          types: ["Segmental", "Non-segmental"],
        },
      ],
    },
  ]);

  console.log("Disease categories seeded:", categories.length);
};

// const seedAll = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sehat-dost');
//     console.log('Connected to MongoDB');

//     await seedUsers();
//     const users = await User.find({ role: 'doctor' }).limit(2);
//     await seedDoctors(users);
//     await seedHospitals();
//     await seedMedicines();
//     await seedLabs();
//     await seedBloodRequests();
//     await seedQuestions();
//     await seedDiseaseCategories();

//     console.log('All data seeded successfully!');
//     process.exit(0);
//   } catch (error) {
//     console.error('Error seeding data:', error);
//     process.exit(1);
//   }
// };

const seedAll = async () => {
  try {
    const dbURI =
      process.env.MONGODB_URI_CLOUD ||
      process.env.MONGODB_URI ||
      "mongodb://127.0.0.1:27017/sehat-dost";
    await mongoose.connect(dbURI);
    console.log("✅ Connected to MongoDB");

    // 1. Seed Users first
    await seedUsers();

    // 2. Get specific users to link to other data
    const doctors = await User.find({ role: "doctor" }).limit(2);
    const patient = await User.findOne({ role: "patient" });

    // 3. Seed other collections using the linked user IDs
    await seedDoctors(doctors);
    await seedHospitals();
    await seedMedicines();
    await seedLabs();
    await seedBloodRequests(patient); // Pass the patient user here
    await seedQuestions();
    await seedDiseaseCategories();

    console.log("🎉 All data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedAll();
