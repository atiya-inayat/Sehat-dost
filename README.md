🏥 SehatDost - Healthcare Revolution (Hackathon Version)
SehatDost is a comprehensive MERN stack platform designed to digitize healthcare in Pakistan. Built for speed, reliability, and user-centric care, it connects patients to vital medical services in seconds.

🚀 Hackathon Highlights
Quick Search: Find Doctors by specialty (Dermatologist, Cardiologist) across 12+ categories.

Smart Booking: Real-time appointment scheduling with automated email confirmations.

Emergency Blood: A dedicated blood bank portal for critical O-, A+, and B+ requests.

Digital Pharmacy: Browse 8+ essential medicines with pricing and prescription requirements.

Hospital & Lab Finder: Verified directory for major institutions like Chughtai Lab and Doctors Hospital.

🛠️ Tech Stack
Layer,Technology
Frontend,React.js + Vite (Port 8080)
Backend,Node.js + Express.js (Port 5000/5001)
Database,MongoDB (Local/Atlas)
Authentication,JWT + Cookie-parser
Utilities,"Nodemailer (Emails), Multer (Image Uploads)"

⚙️ Quick Start Guide

1. Project Initialization

# Clone and enter the root directory

cd sehat-dost

2. Backend Setup
   cd server
   npm install

# Create a .env file and add your MONGODB_URI and SMTP_PASS

# Populate the database with hackathon data:

npm run seed

# Start the engine:

npm run dev

3. Frontend Setup
   cd ../client
   npm install
   npm run dev

Access the app at: http://localhost:8080

📂 Architecture
sehet-dost/
├── client/ # React Frontend (Vite)
└── server/ # Express Backend
├── uploads/ # Local Storage (Prescriptions)
└── src/
├── config/ # Database logic
├── middleware/ # Auth & File Gatekeepers
├── models/ # Mongoose Schemas (User, Doctor, etc.)
├── routes/ # API Endpoints
└── utils/ # Seed & Email Helpers

        👨‍💻 Developed By
        Atiya Inayat - Lead Developer
