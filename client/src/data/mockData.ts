// Mock data for the entire SehatDost application

export const specialties = [
  "Cardiologist", "Nephrologist", "Neurologist", "Dermatologist", 
  "Orthopedic Surgeon", "Gynecologist", "Pediatrician", "ENT Specialist",
  "Ophthalmologist", "Urologist", "Pulmonologist", "Gastroenterologist"
];

export const doctors = [
  {
    id: "1",
    name: "Dr. Ahmed Khan",
    specialty: "Cardiologist",
    degrees: "MBBS, FCPS (Cardiology), FACC",
    experience: 15,
    fee: 3000,
    pmdc: "PMC-12345",
    gender: "Male",
    online: true,
    image: "",
    hospital: "Life Health Care Hospital",
    hospitalAddress: "Main Boulevard, Gulberg III, Lahore",
    availability: {
      Mon: "10:00 AM - 2:00 PM",
      Tue: "10:00 AM - 2:00 PM",
      Wed: "Off",
      Thu: "10:00 AM - 2:00 PM",
      Fri: "10:00 AM - 2:00 PM",
      Sat: "10:00 AM - 12:00 PM",
      Sun: "Off",
    },
    about: "Dr. Ahmed Khan is a highly experienced cardiologist with over 15 years of practice. He specializes in interventional cardiology and heart failure management."
  },
  {
    id: "2",
    name: "Dr. Sara Ali",
    specialty: "Cardiologist",
    degrees: "MBBS, MD (Cardiology)",
    experience: 10,
    fee: 2500,
    pmdc: "PMC-22345",
    gender: "Female",
    online: true,
    image: "",
    hospital: "Doctors Hospital",
    hospitalAddress: "Canal Road, Lahore",
    availability: {
      Mon: "2:00 PM - 6:00 PM",
      Tue: "2:00 PM - 6:00 PM",
      Wed: "2:00 PM - 6:00 PM",
      Thu: "Off",
      Fri: "2:00 PM - 6:00 PM",
      Sat: "Off",
      Sun: "Off",
    },
    about: "Dr. Sara Ali is a dedicated cardiologist focused on preventive cardiology and echocardiography."
  },
  {
    id: "3",
    name: "Dr. Usman Raza",
    specialty: "Nephrologist",
    degrees: "MBBS, FCPS (Nephrology)",
    experience: 12,
    fee: 2800,
    pmdc: "PMC-33456",
    gender: "Male",
    online: false,
    image: "",
    hospital: "Shifa International Hospital",
    hospitalAddress: "H-8/4, Islamabad",
    availability: {
      Mon: "9:00 AM - 1:00 PM",
      Tue: "9:00 AM - 1:00 PM",
      Wed: "9:00 AM - 1:00 PM",
      Thu: "9:00 AM - 1:00 PM",
      Fri: "Off",
      Sat: "9:00 AM - 12:00 PM",
      Sun: "Off",
    },
    about: "Dr. Usman Raza specializes in kidney diseases, dialysis management, and kidney transplant care."
  },
  {
    id: "4",
    name: "Dr. Fatima Noor",
    specialty: "Dermatologist",
    degrees: "MBBS, FCPS (Dermatology), Diploma Cosmetic Dermatology",
    experience: 8,
    fee: 2000,
    pmdc: "PMC-44567",
    gender: "Female",
    online: true,
    image: "",
    hospital: "Hameed Latif Hospital",
    hospitalAddress: "Jail Road, Lahore",
    availability: {
      Mon: "11:00 AM - 3:00 PM",
      Tue: "11:00 AM - 3:00 PM",
      Wed: "Off",
      Thu: "11:00 AM - 3:00 PM",
      Fri: "11:00 AM - 3:00 PM",
      Sat: "11:00 AM - 1:00 PM",
      Sun: "Off",
    },
    about: "Dr. Fatima Noor is a skilled dermatologist specializing in acne treatment, vitiligo, and cosmetic procedures."
  },
  {
    id: "5",
    name: "Dr. Bilal Hussain",
    specialty: "Neurologist",
    degrees: "MBBS, MRCP (Neurology)",
    experience: 18,
    fee: 3500,
    pmdc: "PMC-55678",
    gender: "Male",
    online: true,
    image: "",
    hospital: "Aga Khan University Hospital",
    hospitalAddress: "Stadium Road, Karachi",
    availability: {
      Mon: "8:00 AM - 12:00 PM",
      Tue: "8:00 AM - 12:00 PM",
      Wed: "8:00 AM - 12:00 PM",
      Thu: "8:00 AM - 12:00 PM",
      Fri: "8:00 AM - 12:00 PM",
      Sat: "Off",
      Sun: "Off",
    },
    about: "Dr. Bilal Hussain is a renowned neurologist with expertise in stroke management and epilepsy treatment."
  },
  {
    id: "6",
    name: "Dr. Ayesha Malik",
    specialty: "Gynecologist",
    degrees: "MBBS, FCPS (Obstetrics & Gynecology)",
    experience: 14,
    fee: 2500,
    pmdc: "PMC-66789",
    gender: "Female",
    online: true,
    image: "",
    hospital: "National Hospital",
    hospitalAddress: "DHA Phase 6, Lahore",
    availability: {
      Mon: "4:00 PM - 8:00 PM",
      Tue: "4:00 PM - 8:00 PM",
      Wed: "4:00 PM - 8:00 PM",
      Thu: "4:00 PM - 8:00 PM",
      Fri: "Off",
      Sat: "4:00 PM - 6:00 PM",
      Sun: "Off",
    },
    about: "Dr. Ayesha Malik specializes in high-risk pregnancies, laparoscopic surgery, and infertility treatment."
  },
];

export const hospitals = [
  {
    id: "1",
    name: "Doctors Hospital",
    address: "Canal Road, Lahore",
    helpline: "042-35761999",
    image: "",
    services: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Gynecology", "Dermatology"],
    facilities: ["24/7 Emergency", "ICU", "Pharmacy", "Laboratory", "Radiology", "Cafeteria", "Parking"],
    about: "Doctors Hospital is one of the leading healthcare institutions in Pakistan providing world-class medical services since 1986.",
    doctors: ["1", "2"],
  },
  {
    id: "2",
    name: "Shifa International Hospital",
    address: "H-8/4, Islamabad",
    helpline: "051-8464646",
    image: "",
    services: ["Nephrology", "Cardiology", "Oncology", "Gastroenterology", "Pulmonology"],
    facilities: ["24/7 Emergency", "ICU", "NICU", "Pharmacy", "Blood Bank", "MRI", "CT Scan"],
    about: "Shifa International Hospital is a premier healthcare facility committed to clinical excellence and compassionate care.",
    doctors: ["3"],
  },
  {
    id: "3",
    name: "Aga Khan University Hospital",
    address: "Stadium Road, Karachi",
    helpline: "021-111911911",
    image: "",
    services: ["Neurology", "Cardiology", "Ophthalmology", "ENT", "Urology", "Psychiatry"],
    facilities: ["24/7 Emergency", "Trauma Center", "ICU", "Pharmacy", "Rehabilitation", "Research Center"],
    about: "Aga Khan University Hospital is an internationally recognized institution providing quality healthcare and medical education.",
    doctors: ["5"],
  },
];

export const labs = [
  {
    id: "1",
    name: "Chughtai Lab",
    image: "",
    tests: [
      { name: "Complete Blood Count (CBC)", price: 800 },
      { name: "Lipid Profile", price: 1500 },
      { name: "Thyroid Function Test", price: 2500 },
      { name: "HbA1c", price: 1800 },
      { name: "Liver Function Test", price: 1200 },
      { name: "Kidney Function Test", price: 1000 },
      { name: "Urine DR", price: 400 },
      { name: "Blood Sugar Fasting", price: 300 },
    ],
  },
  {
    id: "2",
    name: "Shaukat Khanum Lab",
    image: "",
    tests: [
      { name: "Complete Blood Count (CBC)", price: 900 },
      { name: "Tumor Markers", price: 5000 },
      { name: "CT Scan", price: 15000 },
      { name: "MRI Brain", price: 20000 },
      { name: "Biopsy", price: 8000 },
      { name: "Liver Function Test", price: 1400 },
    ],
  },
  {
    id: "3",
    name: "Excel Lab",
    image: "",
    tests: [
      { name: "Complete Blood Count (CBC)", price: 700 },
      { name: "Lipid Profile", price: 1300 },
      { name: "Vitamin D", price: 3000 },
      { name: "Vitamin B12", price: 2500 },
      { name: "Iron Studies", price: 2000 },
      { name: "Blood Sugar Random", price: 250 },
    ],
  },
];

export const medicines = [
  { id: "1", name: "Aspirin", genericName: "Acetylsalicylic acid", manufacturer: "Bayer", drugClass: "NSAID", formula: "C9H8O4", form: "Tablet", description: "Used to reduce pain, fever, or inflammation.", image: "" },
  { id: "2", name: "Amoxicillin", genericName: "Amoxicillin", manufacturer: "GSK", drugClass: "Antibiotic", formula: "C16H19N3O5S", form: "Capsule", description: "A penicillin antibiotic that fights bacteria.", image: "" },
  { id: "3", name: "Amlodipine", genericName: "Amlodipine Besylate", manufacturer: "Pfizer", drugClass: "Calcium Channel Blocker", formula: "C20H25ClN2O5", form: "Tablet", description: "Used to treat high blood pressure and chest pain.", image: "" },
  { id: "4", name: "Atorvastatin", genericName: "Atorvastatin Calcium", manufacturer: "Pfizer", drugClass: "Statin", formula: "C33H35FN2O5", form: "Tablet", description: "Used to lower cholesterol and reduce risk of heart disease.", image: "" },
  { id: "5", name: "Azithromycin", genericName: "Azithromycin", manufacturer: "Pfizer", drugClass: "Antibiotic", formula: "C38H72N2O12", form: "Tablet", description: "An antibiotic used for various bacterial infections.", image: "" },
  { id: "6", name: "Bisoprolol", genericName: "Bisoprolol Fumarate", manufacturer: "Merck", drugClass: "Beta Blocker", formula: "C18H31NO4", form: "Tablet", description: "Used to treat high blood pressure and heart failure.", image: "" },
  { id: "7", name: "Ciprofloxacin", genericName: "Ciprofloxacin HCl", manufacturer: "Bayer", drugClass: "Antibiotic", formula: "C17H18FN3O3", form: "Tablet", description: "A fluoroquinolone antibiotic for bacterial infections.", image: "" },
  { id: "8", name: "Diclofenac", genericName: "Diclofenac Sodium", manufacturer: "Novartis", drugClass: "NSAID", formula: "C14H11Cl2NO2", form: "Tablet", description: "Used to treat pain, swelling, and inflammation.", image: "" },
  { id: "9", name: "Enalapril", genericName: "Enalapril Maleate", manufacturer: "Merck", drugClass: "ACE Inhibitor", formula: "C20H28N2O5", form: "Tablet", description: "Used to treat high blood pressure and heart failure.", image: "" },
  { id: "10", name: "Furosemide", genericName: "Furosemide", manufacturer: "Sanofi", drugClass: "Diuretic", formula: "C12H11ClN2O5S", form: "Tablet", description: "A loop diuretic used to treat fluid retention.", image: "" },
  { id: "11", name: "Gabapentin", genericName: "Gabapentin", manufacturer: "Pfizer", drugClass: "Anticonvulsant", formula: "C9H17NO2", form: "Capsule", description: "Used to treat seizures and nerve pain.", image: "" },
  { id: "12", name: "Hydrochlorothiazide", genericName: "Hydrochlorothiazide", manufacturer: "Novartis", drugClass: "Diuretic", formula: "C7H8ClN3O4S2", form: "Tablet", description: "A diuretic used to treat high blood pressure.", image: "" },
  { id: "13", name: "Ibuprofen", genericName: "Ibuprofen", manufacturer: "Abbott", drugClass: "NSAID", formula: "C13H18O2", form: "Tablet", description: "Used to reduce fever and treat pain or inflammation.", image: "" },
  { id: "14", name: "Losartan", genericName: "Losartan Potassium", manufacturer: "Merck", drugClass: "ARB", formula: "C22H23ClN6O", form: "Tablet", description: "Used to treat high blood pressure and protect kidneys.", image: "" },
  { id: "15", name: "Metformin", genericName: "Metformin HCl", manufacturer: "Bristol-Myers", drugClass: "Antidiabetic", formula: "C4H11N5", form: "Tablet", description: "Used to control blood sugar in type 2 diabetes.", image: "" },
  { id: "16", name: "Omeprazole", genericName: "Omeprazole", manufacturer: "AstraZeneca", drugClass: "PPI", formula: "C17H19N3O3S", form: "Capsule", description: "Used to treat gastric acid-related conditions.", image: "" },
  { id: "17", name: "Paracetamol", genericName: "Acetaminophen", manufacturer: "GSK", drugClass: "Analgesic", formula: "C8H9NO2", form: "Tablet", description: "Used to treat mild to moderate pain and fever.", image: "" },
  { id: "18", name: "Ranitidine", genericName: "Ranitidine HCl", manufacturer: "GSK", drugClass: "H2 Blocker", formula: "C13H22N4O3S", form: "Tablet", description: "Used to reduce stomach acid production.", image: "" },
];

export const diseases = [
  {
    id: "dental-care",
    category: "Dental Care (Stomatology)",
    conditions: [
      { id: "dentist", name: "Dentist", description: "General Checkup & Oral Hygiene", symptoms: ["Toothache", "Bad breath", "Bleeding gums"], riskFactors: ["Poor oral hygiene", "Sugary diet", "Smoking"], treatment: "Regular dental checkups, professional cleaning, fluoride treatment", types: ["Preventive", "Restorative", "Cosmetic"] },
      { id: "tooth-sensitivity", name: "Tooth Sensitivity", description: "Pain with Hot/Cold, Enamel Wear", symptoms: ["Sharp pain with hot/cold foods", "Pain while brushing", "Discomfort with sweet foods"], riskFactors: ["Enamel erosion", "Gum recession", "Teeth grinding"], treatment: "Desensitizing toothpaste, fluoride gel, dental bonding", types: ["Dentin hypersensitivity", "Pulpal sensitivity"] },
      { id: "teeth-problem", name: "Teeth Problem", description: "Alignment, Crowding, Chipped Teeth", symptoms: ["Misaligned teeth", "Difficulty chewing", "Jaw pain"], riskFactors: ["Genetics", "Thumb sucking", "Early tooth loss"], treatment: "Braces, aligners, dental veneers, crowns", types: ["Malocclusion", "Overcrowding", "Fractures"] },
      { id: "tooth-decay", name: "Tooth Decay", description: "Cavities, Fillings, Pulpitis", symptoms: ["Visible holes in teeth", "Toothache", "Brown/black staining"], riskFactors: ["Poor hygiene", "Frequent snacking", "Dry mouth"], treatment: "Fillings, crowns, root canal, extraction", types: ["Enamel decay", "Dentin decay", "Pulp decay"] },
      { id: "gingivitis", name: "Gingivitis", description: "Bleeding Gums, Gum Inflammation, Periodontitis", symptoms: ["Red swollen gums", "Bleeding while brushing", "Bad breath"], riskFactors: ["Poor oral hygiene", "Smoking", "Diabetes"], treatment: "Professional cleaning, antibiotics, improved oral hygiene", types: ["Acute", "Chronic", "Periodontitis"] },
    ]
  },
  {
    id: "dermatology",
    category: "Dermatology & Cosmetic Surgery",
    conditions: [
      { id: "cosmetic-surgeon", name: "Cosmetic Surgeon", description: "Facial Recontouring, Scars, Aesthetic Surgery", symptoms: ["Scarring", "Skin irregularities", "Aging signs"], riskFactors: ["Sun exposure", "Genetics", "Injury"], treatment: "Laser treatment, chemical peels, surgical procedures", types: ["Rhinoplasty", "Facelift", "Liposuction"] },
      { id: "vitiligo", name: "Vitiligo", description: "White Patches / Pigmentation Disorders", symptoms: ["White patches on skin", "Premature graying", "Color loss in mouth"], riskFactors: ["Autoimmune conditions", "Family history", "Stress"], treatment: "Topical corticosteroids, light therapy, skin grafting", types: ["Segmental", "Non-segmental", "Universal"] },
      { id: "fungal-skin", name: "Fungal Skin Problem", description: "Ringworm, Athlete's Foot, Yeast Infections", symptoms: ["Itchy rash", "Red circular patches", "Peeling skin"], riskFactors: ["Warm moist environments", "Weakened immunity", "Close contact"], treatment: "Antifungal creams, oral antifungals, keeping skin dry", types: ["Ringworm", "Athlete's foot", "Candidiasis"] },
      { id: "plantar-wart", name: "Plantar Wart", description: "Foot Warts / Skin Growths", symptoms: ["Hard growths on soles", "Pain while walking", "Black dots in lesion"], riskFactors: ["Walking barefoot", "Weakened immunity", "Skin cuts"], treatment: "Cryotherapy, salicylic acid, laser treatment", types: ["Common wart", "Mosaic wart", "Flat wart"] },
    ]
  },
  {
    id: "cardiology",
    category: "Cardiology",
    conditions: [
      { id: "heart-disease", name: "Heart Disease", description: "Coronary Artery Disease, Heart Attack", symptoms: ["Chest pain", "Shortness of breath", "Fatigue"], riskFactors: ["High cholesterol", "Hypertension", "Smoking", "Diabetes"], treatment: "Medication, angioplasty, bypass surgery, lifestyle changes", types: ["Coronary artery disease", "Arrhythmia", "Heart failure"] },
      { id: "hypertension", name: "Hypertension", description: "High Blood Pressure", symptoms: ["Headache", "Dizziness", "Blurred vision", "Often no symptoms"], riskFactors: ["Obesity", "High salt diet", "Stress", "Family history"], treatment: "ACE inhibitors, beta-blockers, lifestyle modification", types: ["Primary", "Secondary", "Resistant"] },
    ]
  },
  {
    id: "neurology",
    category: "Neurology",
    conditions: [
      { id: "migraine", name: "Migraine", description: "Severe Headaches, Aura", symptoms: ["Throbbing headache", "Nausea", "Light sensitivity", "Visual disturbances"], riskFactors: ["Family history", "Stress", "Hormonal changes", "Sleep irregularity"], treatment: "Triptans, preventive medications, lifestyle changes", types: ["With aura", "Without aura", "Chronic"] },
      { id: "epilepsy", name: "Epilepsy", description: "Seizure Disorders", symptoms: ["Seizures", "Loss of consciousness", "Muscle jerking", "Confusion"], riskFactors: ["Brain injury", "Genetics", "Stroke", "Infections"], treatment: "Anti-epileptic drugs, surgery, vagus nerve stimulation", types: ["Focal", "Generalized", "Unknown onset"] },
    ]
  },
  {
    id: "orthopedics",
    category: "Orthopedics",
    conditions: [
      { id: "arthritis", name: "Arthritis", description: "Joint Pain & Inflammation", symptoms: ["Joint pain", "Stiffness", "Swelling", "Reduced range of motion"], riskFactors: ["Age", "Obesity", "Joint injuries", "Family history"], treatment: "Pain relievers, physical therapy, joint replacement", types: ["Osteoarthritis", "Rheumatoid", "Psoriatic"] },
    ]
  },
  {
    id: "gastroenterology",
    category: "Gastroenterology",
    conditions: [
      { id: "gastritis", name: "Gastritis", description: "Stomach Inflammation", symptoms: ["Stomach pain", "Nausea", "Bloating", "Loss of appetite"], riskFactors: ["H. pylori infection", "NSAIDs", "Alcohol", "Stress"], treatment: "Antacids, PPIs, antibiotics, dietary changes", types: ["Acute", "Chronic", "Erosive"] },
    ]
  },
];

export const bloodRequests = [
  { id: "1", name: "Ali Hassan", bloodGroup: "A+", units: 2, hospital: "Jinnah Hospital, Lahore", contact: "0300-1234567", urgency: "Critical", date: "2026-02-08", city: "Lahore" },
  { id: "2", name: "Maria Bibi", bloodGroup: "O-", units: 1, hospital: "Services Hospital, Lahore", contact: "0321-9876543", urgency: "Immediate", date: "2026-02-09", city: "Lahore" },
  { id: "3", name: "Kamran Shah", bloodGroup: "B+", units: 3, hospital: "CMH, Rawalpindi", contact: "0333-4567890", urgency: "Normal", date: "2026-02-10", city: "Rawalpindi" },
  { id: "4", name: "Nadia Parveen", bloodGroup: "AB+", units: 1, hospital: "Shifa Hospital, Islamabad", contact: "0345-6789012", urgency: "Critical", date: "2026-02-07", city: "Islamabad" },
  { id: "5", name: "Farhan Ahmed", bloodGroup: "O+", units: 2, hospital: "Aga Khan, Karachi", contact: "0312-3456789", urgency: "Immediate", date: "2026-02-09", city: "Karachi" },
  { id: "6", name: "Sana Khalid", bloodGroup: "A-", units: 1, hospital: "Doctors Hospital, Lahore", contact: "0301-2345678", urgency: "Normal", date: "2026-02-10", city: "Lahore" },
  { id: "7", name: "Tariq Mehmood", bloodGroup: "B-", units: 2, hospital: "Punjab Institute, Lahore", contact: "0322-8765432", urgency: "Critical", date: "2026-02-08", city: "Lahore" },
  { id: "8", name: "Zainab Fatima", bloodGroup: "AB-", units: 1, hospital: "Lady Reading Hospital, Peshawar", contact: "0334-5678901", urgency: "Immediate", date: "2026-02-09", city: "Peshawar" },
];

export const questions = [
  { id: "1", question: "I have been experiencing chest pain for 2 days. What should I do?", gender: "Male", location: "Lahore", problemType: "Cardiology", date: "2026-02-08", answers: 3 },
  { id: "2", question: "My child has a high fever that won't go down. Should I be worried?", gender: "Female", location: "Karachi", problemType: "Pediatrics", date: "2026-02-09", answers: 5 },
  { id: "3", question: "I have white patches appearing on my skin. Is it vitiligo?", gender: "Male", location: "Islamabad", problemType: "Dermatology", date: "2026-02-07", answers: 2 },
  { id: "4", question: "What are the early signs of diabetes I should watch for?", gender: "Female", location: "Rawalpindi", problemType: "Endocrinology", date: "2026-02-10", answers: 7 },
];
