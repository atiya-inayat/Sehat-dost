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
    {
      name: "Dr. Usman Raza",
      email: "dr.usman@example.com",
      phone: "03031234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "O+",
    },
    {
      name: "Dr. Fatima Noor",
      email: "dr.fatima@example.com",
      phone: "03041234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "A+",
    },
    {
      name: "Dr. Bilal Hussain",
      email: "dr.bilal@example.com",
      phone: "03051234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "AB+",
    },
    {
      name: "Dr. Ayesha Malik",
      email: "dr.ayesha@example.com",
      phone: "03061234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "O-",
    },
    {
      name: "Dr. Omar Sheikh",
      email: "dr.omar@example.com",
      phone: "03071234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "B+",
    },
    {
      name: "Dr. Zainab Ahmed",
      email: "dr.zainab@example.com",
      phone: "03081234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "A+",
    },
    {
      name: "Dr. Farhan Ali",
      email: "dr.farhan@example.com",
      phone: "03091234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "O+",
    },
    {
      name: "Dr. Hira Saleem",
      email: "dr.hira@example.com",
      phone: "03101234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "B+",
    },
    {
      name: "Dr. Imran Khan",
      email: "dr.imran@example.com",
      phone: "03111234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "AB+",
    },
    {
      name: "Dr. Rabia Bano",
      email: "dr.rabia@example.com",
      phone: "03121234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "A-",
    },
    {
      name: "Dr. Sajid Mahmood",
      email: "dr.sajid@example.com",
      phone: "03131234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "O+",
    },
    {
      name: "Dr. Nadia Khan",
      email: "dr.nadia@example.com",
      phone: "03141234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "B+",
    },
    {
      name: "Dr. Asad Ullah",
      email: "dr.asad@example.com",
      phone: "03151234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "A+",
    },
    {
      name: "Dr. Samina Yousaf",
      email: "dr.samina@example.com",
      phone: "03161234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "O+",
    },
    {
      name: "Dr. Waseem Akram",
      email: "dr.waseem@example.com",
      phone: "03171234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "AB+",
    },
    {
      name: "Dr. Maria Sultana",
      email: "dr.maria@example.com",
      phone: "03181234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "B-",
    },
    {
      name: "Dr. Tariq Mehmood",
      email: "dr.tariq@example.com",
      phone: "03191234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "A+",
    },
    {
      name: "Dr. Ayesha Abid",
      email: "dr.ayeshaabid@example.com",
      phone: "03201234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "O+",
    },
    {
      name: "Dr. Hassan Raza",
      email: "dr.hassan@example.com",
      phone: "03211234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "B+",
    },
    {
      name: "Dr. Saima Nazir",
      email: "dr.saima@example.com",
      phone: "03221234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "A-",
    },
    {
      name: "Dr. Iftikhar Ahmed",
      email: "dr.iftikhar@example.com",
      phone: "03231234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "O+",
    },
    {
      name: "Dr. Komal Fatima",
      email: "dr.komal@example.com",
      phone: "03241234567",
      password: "password123",
      role: "doctor",
      bloodGroup: "AB+",
    },
    {
      name: "Dr. Adil Malik",
      email: "dr.adil@example.com",
      phone: "03251234567",
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
      about: "Dr. Ahmed Khan is a highly experienced cardiologist with over 15 years of practice. He specializes in interventional cardiology and heart failure management.",
      isVerified: true,
      isFeatured: true,
      rating: 4.8,
      reviewCount: 156,
    },
    {
      user: doctorUsers[1]?._id,
      pmcId: "PMC-22345",
      specialty: "Cardiologist",
      degrees: "MBBS, MD (Cardiology), FCPS",
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
      about: "Dr. Sara Ali is a dedicated cardiologist focused on preventive cardiology and echocardiography.",
      isVerified: true,
      isFeatured: true,
      rating: 4.6,
      reviewCount: 89,
    },
    {
      user: doctorUsers[2]?._id,
      pmcId: "PMC-33456",
      specialty: "Nephrologist",
      degrees: "MBBS, FCPS (Nephrology), MD",
      experience: 12,
      fee: 2800,
      gender: "Male",
      isOnline: false,
      hospital: "Shifa International Hospital",
      hospitalAddress: "H-8/4, Islamabad",
      availability: {
        Monday: "9:00 AM - 1:00 PM",
        Tuesday: "9:00 AM - 1:00 PM",
        Wednesday: "9:00 AM - 1:00 PM",
        Thursday: "9:00 AM - 1:00 PM",
        Friday: "Off",
        Saturday: "9:00 AM - 12:00 PM",
        Sunday: "Off",
      },
      about: "Dr. Usman Raza specializes in kidney diseases, dialysis management, and kidney transplant care.",
      isVerified: true,
      rating: 4.7,
      reviewCount: 112,
    },
    {
      user: doctorUsers[3]?._id,
      pmcId: "PMC-44567",
      specialty: "Dermatologist",
      degrees: "MBBS, FCPS (Dermatology), Diploma Cosmetic Dermatology",
      experience: 8,
      fee: 2000,
      gender: "Female",
      isOnline: true,
      hospital: "Hameed Latif Hospital",
      hospitalAddress: "Jail Road, Lahore",
      availability: {
        Monday: "11:00 AM - 3:00 PM",
        Tuesday: "11:00 AM - 3:00 PM",
        Wednesday: "Off",
        Thursday: "11:00 AM - 3:00 PM",
        Friday: "11:00 AM - 3:00 PM",
        Saturday: "11:00 AM - 1:00 PM",
        Sunday: "Off",
      },
      about: "Dr. Fatima Noor is a skilled dermatologist specializing in acne treatment, vitiligo, and cosmetic procedures.",
      isVerified: true,
      isFeatured: true,
      rating: 4.5,
      reviewCount: 78,
    },
    {
      user: doctorUsers[4]?._id,
      pmcId: "PMC-55678",
      specialty: "Neurologist",
      degrees: "MBBS, MRCP (Neurology), PhD",
      experience: 18,
      fee: 3500,
      gender: "Male",
      isOnline: true,
      hospital: "Aga Khan University Hospital",
      hospitalAddress: "Stadium Road, Karachi",
      availability: {
        Monday: "8:00 AM - 12:00 PM",
        Tuesday: "8:00 AM - 12:00 PM",
        Wednesday: "8:00 AM - 12:00 PM",
        Thursday: "8:00 AM - 12:00 PM",
        Friday: "8:00 AM - 12:00 PM",
        Saturday: "Off",
        Sunday: "Off",
      },
      about: "Dr. Bilal Hussain is a renowned neurologist with expertise in stroke management and epilepsy treatment.",
      isVerified: true,
      isFeatured: true,
      rating: 4.9,
      reviewCount: 234,
    },
    {
      user: doctorUsers[5]?._id,
      pmcId: "PMC-66789",
      specialty: "Gynecologist",
      degrees: "MBBS, FCPS (Obstetrics & Gynecology)",
      experience: 14,
      fee: 2500,
      gender: "Female",
      isOnline: true,
      hospital: "National Hospital",
      hospitalAddress: "DHA Phase 6, Lahore",
      availability: {
        Monday: "4:00 PM - 8:00 PM",
        Tuesday: "4:00 PM - 8:00 PM",
        Wednesday: "4:00 PM - 8:00 PM",
        Thursday: "4:00 PM - 8:00 PM",
        Friday: "Off",
        Saturday: "4:00 PM - 6:00 PM",
        Sunday: "Off",
      },
      about: "Dr. Ayesha Malik specializes in high-risk pregnancies, laparoscopic surgery, and infertility treatment.",
      isVerified: true,
      rating: 4.7,
      reviewCount: 189,
    },
    {
      user: doctorUsers[6]?._id,
      pmcId: "PMC-77890",
      specialty: "Psychiatrist",
      degrees: "MBBS, FCPS (Psychiatry), MRCPsych",
      experience: 16,
      fee: 3000,
      gender: "Male",
      isOnline: true,
      hospital: "Punjab Institute of Mental Health",
      hospitalAddress: "Lahore",
      availability: {
        Monday: "9:00 AM - 5:00 PM",
        Tuesday: "9:00 AM - 5:00 PM",
        Wednesday: "9:00 AM - 5:00 PM",
        Thursday: "9:00 AM - 5:00 PM",
        Friday: "9:00 AM - 3:00 PM",
        Saturday: "Off",
        Sunday: "Off",
      },
      about: "Dr. Omar Sheikh is a distinguished psychiatrist specializing in anxiety, depression, and behavioral disorders.",
      isVerified: true,
      rating: 4.6,
      reviewCount: 145,
    },
    {
      user: doctorUsers[7]?._id,
      pmcId: "PMC-88901",
      specialty: "Pediatrician",
      degrees: "MBBS, FCPS (Pediatrics), MD",
      experience: 11,
      fee: 2200,
      gender: "Female",
      isOnline: true,
      hospital: "Children's Hospital",
      hospitalAddress: "Lahore",
      availability: {
        Monday: "10:00 AM - 4:00 PM",
        Tuesday: "10:00 AM - 4:00 PM",
        Wednesday: "10:00 AM - 4:00 PM",
        Thursday: "Off",
        Friday: "10:00 AM - 4:00 PM",
        Saturday: "10:00 AM - 2:00 PM",
        Sunday: "Off",
      },
      about: "Dr. Zainab Ahmed is a compassionate pediatrician providing comprehensive care for infants and children.",
      isVerified: true,
      rating: 4.8,
      reviewCount: 167,
    },
    {
      user: doctorUsers[8]?._id,
      pmcId: "PMC-99012",
      specialty: "Orthopedic Surgeon",
      degrees: "MBBS, FCPS (Orthopedics), AO Fellowship",
      experience: 13,
      fee: 3200,
      gender: "Male",
      isOnline: false,
      hospital: "Saudi German Hospital",
      hospitalAddress: "Dubai, UAE",
      availability: {
        Monday: "8:00 AM - 2:00 PM",
        Tuesday: "8:00 AM - 2:00 PM",
        Wednesday: "8:00 AM - 2:00 PM",
        Thursday: "8:00 AM - 2:00 PM",
        Friday: "8:00 AM - 12:00 PM",
        Saturday: "Off",
        Sunday: "Off",
      },
      about: "Dr. Farhan Ali is an expert orthopedic surgeon specializing in sports injuries and joint replacements.",
      isVerified: true,
      rating: 4.7,
      reviewCount: 134,
    },
    {
      user: doctorUsers[9]?._id,
      pmcId: "PMC-10123",
      specialty: "Ophthalmologist",
      degrees: "MBBS, FCPS (Ophthalmology), ICO",
      experience: 9,
      fee: 2000,
      gender: "Female",
      isOnline: true,
      hospital: "Al-Shifa Trust Eye Hospital",
      hospitalAddress: "Rawalpindi",
      availability: {
        Monday: "9:00 AM - 3:00 PM",
        Tuesday: "9:00 AM - 3:00 PM",
        Wednesday: "9:00 AM - 3:00 PM",
        Thursday: "9:00 AM - 3:00 PM",
        Friday: "9:00 AM - 1:00 PM",
        Saturday: "Off",
        Sunday: "Off",
      },
      about: "Dr. Hira Saleem specializes in cataract surgery, LASIK, and treatment of retinal diseases.",
      isVerified: true,
      rating: 4.6,
      reviewCount: 98,
    },
    {
      user: doctorUsers[10]?._id,
      pmcId: "PMC-11234",
      specialty: "ENT Specialist",
      degrees: "MBBS, FCPS (ENT), DLO",
      experience: 17,
      fee: 2800,
      gender: "Male",
      isOnline: false,
      hospital: "Mayo Hospital",
      hospitalAddress: "Lahore",
      availability: {
        Monday: "10:00 AM - 4:00 PM",
        Tuesday: "10:00 AM - 4:00 PM",
        Wednesday: "Off",
        Thursday: "10:00 AM - 4:00 PM",
        Friday: "10:00 AM - 4:00 PM",
        Saturday: "10:00 AM - 2:00 PM",
        Sunday: "Off",
      },
      about: "Dr. Imran Khan is a senior ENT specialist with expertise in endoscopic sinus surgery and hearing impairment treatment.",
      isVerified: true,
      rating: 4.5,
      reviewCount: 156,
    },
    {
      user: doctorUsers[11]?._id,
      pmcId: "PMC-12345-new",
      specialty: "Gastroenterologist",
      degrees: "MBBS, FCPS (Gastroenterology), MD",
      experience: 12,
      fee: 2700,
      gender: "Female",
      isOnline: true,
      hospital: "Jinnah Hospital",
      hospitalAddress: "Lahore",
      availability: {
        Monday: "11:00 AM - 5:00 PM",
        Tuesday: "11:00 AM - 5:00 PM",
        Wednesday: "11:00 AM - 5:00 PM",
        Thursday: "11:00 AM - 5:00 PM",
        Friday: "11:00 AM - 3:00 PM",
        Saturday: "Off",
        Sunday: "Off",
      },
      about: "Dr. Rabia Bano specializes in treating digestive disorders, liver diseases, and endoscopic procedures.",
      isVerified: true,
      rating: 4.7,
      reviewCount: 123,
    },
    {
      user: doctorUsers[12]?._id,
      pmcId: "PMC-13456",
      specialty: "Pulmonologist",
      degrees: "MBBS, FCPS (Pulmonology), FCCP",
      experience: 14,
      fee: 2600,
      gender: "Male",
      isOnline: true,
      hospital: "Metro Hospital",
      hospitalAddress: "Faisalabad",
      availability: {
        Monday: "9:00 AM - 3:00 PM",
        Tuesday: "9:00 AM - 3:00 PM",
        Wednesday: "9:00 AM - 3:00 PM",
        Thursday: "9:00 AM - 3:00 PM",
        Friday: "9:00 AM - 1:00 PM",
        Saturday: "Off",
        Sunday: "Off",
      },
      about: "Dr. Sajid Mahmood is a pulmonologist specializing in asthma, COPD, and sleep disorders.",
      isVerified: true,
      rating: 4.6,
      reviewCount: 89,
    },
    {
      user: doctorUsers[13]?._id,
      pmcId: "PMC-14567",
      specialty: "Dermatologist",
      degrees: "MBBS, MCPS (Dermatology), COS",
      experience: 7,
      fee: 1800,
      gender: "Female",
      isOnline: true,
      hospital: "CosmoDerm Clinic",
      hospitalAddress: "Karachi",
      availability: {
        Monday: "2:00 PM - 8:00 PM",
        Tuesday: "2:00 PM - 8:00 PM",
        Wednesday: "2:00 PM - 8:00 PM",
        Thursday: "2:00 PM - 8:00 PM",
        Friday: "Off",
        Saturday: "10:00 AM - 4:00 PM",
        Sunday: "Off",
      },
      about: "Dr. Nadia Khan offers advanced cosmetic dermatology treatments including Botox, fillers, and laser therapy.",
      isVerified: true,
      rating: 4.5,
      reviewCount: 67,
    },
    {
      user: doctorUsers[14]?._id,
      pmcId: "PMC-15678",
      specialty: "Urologist",
      degrees: "MBBS, FCPS (Urology), FRCSEd",
      experience: 16,
      fee: 3000,
      gender: "Male",
      isOnline: false,
      hospital: "Kidney Center",
      hospitalAddress: "Peshawar",
      availability: {
        Monday: "10:00 AM - 4:00 PM",
        Tuesday: "10:00 AM - 4:00 PM",
        Wednesday: "10:00 AM - 4:00 PM",
        Thursday: "10:00 AM - 4:00 PM",
        Friday: "10:00 AM - 2:00 PM",
        Saturday: "Off",
        Sunday: "Off",
      },
      about: "Dr. Asad Ullah is a urologist specializing in kidney stones, prostate issues, and male infertility.",
      isVerified: true,
      rating: 4.7,
      reviewCount: 145,
    },
    {
      user: doctorUsers[15]?._id,
      pmcId: "PMC-16789",
      specialty: "Cardiologist",
      degrees: "MBBS, FCPS (Cardiology), FESC",
      experience: 20,
      fee: 4000,
      gender: "Female",
      isOnline: true,
      hospital: "Cardiac Care Center",
      hospitalAddress: "Karachi",
      availability: {
        Monday: "9:00 AM - 1:00 PM",
        Tuesday: "9:00 AM - 1:00 PM",
        Wednesday: "9:00 AM - 1:00 PM",
        Thursday: "9:00 AM - 1:00 PM",
        Friday: "9:00 AM - 12:00 PM",
        Saturday: "Off",
        Sunday: "Off",
      },
      about: "Dr. Samina Yousaf is a senior cardiologist with expertise in complex cardiac interventions and women's heart health.",
      isVerified: true,
      isFeatured: true,
      rating: 4.9,
      reviewCount: 289,
    },
    {
      user: doctorUsers[16]?._id,
      pmcId: "PMC-17890",
      specialty: "Neurologist",
      degrees: "MBBS, MD (Neurology), PhD",
      experience: 19,
      fee: 3800,
      gender: "Male",
      isOnline: true,
      hospital: "Neurology Institute",
      hospitalAddress: "Islamabad",
      availability: {
        Monday: "8:00 AM - 4:00 PM",
        Tuesday: "8:00 AM - 4:00 PM",
        Wednesday: "8:00 AM - 4:00 PM",
        Thursday: "8:00 AM - 4:00 PM",
        Friday: "8:00 AM - 2:00 PM",
        Saturday: "Off",
        Sunday: "Off",
      },
      about: "Dr. Waseem Akram is a leading neurologist specializing in movement disorders and neuro-immunology.",
      isVerified: true,
      rating: 4.8,
      reviewCount: 178,
    },
    {
      user: doctorUsers[17]?._id,
      pmcId: "PMC-18901",
      specialty: "Gynecologist",
      degrees: "MBBS, MCPS (Gynecology), Diploma Reproductive Health",
      experience: 10,
      fee: 2200,
      gender: "Female",
      isOnline: true,
      hospital: "Women's Health Clinic",
      hospitalAddress: "Multan",
      availability: {
        Monday: "3:00 PM - 8:00 PM",
        Tuesday: "3:00 PM - 8:00 PM",
        Wednesday: "3:00 PM - 8:00 PM",
        Thursday: "3:00 PM - 8:00 PM",
        Friday: "Off",
        Saturday: "10:00 AM - 4:00 PM",
        Sunday: "Off",
      },
      about: "Dr. Maria Sultana provides comprehensive women's healthcare including prenatal care and menopause management.",
      isVerified: true,
      rating: 4.6,
      reviewCount: 134,
    },
    {
      user: doctorUsers[18]?._id,
      pmcId: "PMC-19012",
      specialty: "Orthopedic Surgeon",
      degrees: "MBBS, FCPS (Orthopedics), Fellowship Joint Replacement",
      experience: 15,
      fee: 3500,
      gender: "Male",
      isOnline: false,
      hospital: "Bone & Joint Center",
      hospitalAddress: "Lahore",
      availability: {
        Monday: "10:00 AM - 6:00 PM",
        Tuesday: "10:00 AM - 6:00 PM",
        Wednesday: "10:00 AM - 6:00 PM",
        Thursday: "10:00 AM - 6:00 PM",
        Friday: "10:00 AM - 4:00 PM",
        Saturday: "Off",
        Sunday: "Off",
      },
      about: "Dr. Tariq Mehmood is an orthopedic surgeon specializing in hip and knee replacements.",
      isVerified: true,
      rating: 4.7,
      reviewCount: 167,
    },
    {
      user: doctorUsers[19]?._id,
      pmcId: "PMC-20123",
      specialty: "Pediatrician",
      degrees: "MBBS, FCPS (Pediatrics), PGPN",
      experience: 8,
      fee: 1900,
      gender: "Female",
      isOnline: true,
      hospital: "Kids Care Hospital",
      hospitalAddress: "Karachi",
      availability: {
        Monday: "9:00 AM - 5:00 PM",
        Tuesday: "9:00 AM - 5:00 PM",
        Wednesday: "9:00 AM - 5:00 PM",
        Thursday: "Off",
        Friday: "9:00 AM - 5:00 PM",
        Saturday: "9:00 AM - 1:00 PM",
        Sunday: "Off",
      },
      about: "Dr. Ayesha Abid is a pediatrician with special interest in childhood nutrition and developmental pediatrics.",
      isVerified: true,
      rating: 4.5,
      reviewCount: 89,
    },
    {
      user: doctorUsers[20]?._id,
      pmcId: "PMC-21234",
      specialty: "Cardiologist",
      degrees: "MBBS, MRCP (Cardiology), SCT",
      experience: 11,
      fee: 2700,
      gender: "Male",
      isOnline: true,
      hospital: "Heart Care Hospital",
      hospitalAddress: "Rawalpindi",
      availability: {
        Monday: "11:00 AM - 5:00 PM",
        Tuesday: "11:00 AM - 5:00 PM",
        Wednesday: "11:00 AM - 5:00 PM",
        Thursday: "11:00 AM - 5:00 PM",
        Friday: "11:00 AM - 3:00 PM",
        Saturday: "Off",
        Sunday: "Off",
      },
      about: "Dr. Hassan Raza is an interventional cardiologist focusing on coronary angioplasty and stenting.",
      isVerified: true,
      rating: 4.6,
      reviewCount: 112,
    },
    {
      user: doctorUsers[21]?._id,
      pmcId: "PMC-22345-new",
      specialty: "Dermatologist",
      degrees: "MBBS, FCPS (Dermatology), Cosmetic Certification",
      experience: 6,
      fee: 1700,
      gender: "Female",
      isOnline: true,
      hospital: "Skin & Aesthetic Clinic",
      hospitalAddress: "Lahore",
      availability: {
        Monday: "4:00 PM - 9:00 PM",
        Tuesday: "4:00 PM - 9:00 PM",
        Wednesday: "4:00 PM - 9:00 PM",
        Thursday: "4:00 PM - 9:00 PM",
        Friday: "4:00 PM - 9:00 PM",
        Saturday: "Off",
        Sunday: "Off",
      },
      about: "Dr. Saima Nazir offers personalized skin care solutions and anti-aging treatments.",
      isVerified: true,
      rating: 4.4,
      reviewCount: 56,
    },
    {
      user: doctorUsers[22]?._id,
      pmcId: "PMC-23456",
      specialty: "Psychiatrist",
      degrees: "MBBS, FCPS (Psychiatry), Child Psychiatry Fellowship",
      experience: 12,
      fee: 2800,
      gender: "Male",
      isOnline: false,
      hospital: "Mental Health Institute",
      hospitalAddress: "Karachi",
      availability: {
        Monday: "10:00 AM - 6:00 PM",
        Tuesday: "10:00 AM - 6:00 PM",
        Wednesday: "10:00 AM - 6:00 PM",
        Thursday: "10:00 AM - 6:00 PM",
        Friday: "10:00 AM - 4:00 PM",
        Saturday: "Off",
        Sunday: "Off",
      },
      about: "Dr. Iftikhar Ahmed specializes in child and adolescent psychiatry and behavioral therapy.",
      isVerified: true,
      rating: 4.7,
      reviewCount: 134,
    },
    {
      user: doctorUsers[23]?._id,
      pmcId: "PMC-24567",
      specialty: "Neurologist",
      degrees: "MBBS, FCPS (Neurology), Epilepsy Fellowship",
      experience: 9,
      fee: 3100,
      gender: "Female",
      isOnline: true,
      hospital: "Epilepsy Center Pakistan",
      hospitalAddress: "Lahore",
      availability: {
        Monday: "8:00 AM - 2:00 PM",
        Tuesday: "8:00 AM - 2:00 PM",
        Wednesday: "Off",
        Thursday: "8:00 AM - 2:00 PM",
        Friday: "8:00 AM - 2:00 PM",
        Saturday: "8:00 AM - 12:00 PM",
        Sunday: "Off",
      },
      about: "Dr. Komal Fatima is a neurologist with expertise in epilepsy diagnosis and management.",
      isVerified: true,
      rating: 4.6,
      reviewCount: 78,
    },
    {
      user: doctorUsers[24]?._id,
      pmcId: "PMC-25678",
      specialty: "Gastroenterologist",
      degrees: "MBBS, MRCP (Gastroenterology), EUS Training",
      experience: 13,
      fee: 2900,
      gender: "Male",
      isOnline: true,
      hospital: "Digestive Disease Center",
      hospitalAddress: "Islamabad",
      availability: {
        Monday: "9:00 AM - 5:00 PM",
        Tuesday: "9:00 AM - 5:00 PM",
        Wednesday: "9:00 AM - 5:00 PM",
        Thursday: "9:00 AM - 5:00 PM",
        Friday: "9:00 AM - 3:00 PM",
        Saturday: "Off",
        Sunday: "Off",
      },
      about: "Dr. Adil Malik specializes in advanced endoscopic procedures and hepatology.",
      isVerified: true,
      rating: 4.7,
      reviewCount: 145,
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
