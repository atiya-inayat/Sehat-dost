# SehatDost - Your Healthcare Companion

SehatDost is a healthcare platform built to make finding doctors, hospitals, and medical services easier for people in Pakistan. Think of it as your digital health assistant - quick, reliable, and always there when you need it.

## What We Built

A full-featured healthcare platform that lets you:
- **Find Doctors** - Search by specialty (Cardiology, Dermatology, Neurology, and more)
- **Book Appointments** - Schedule visits with just a few clicks
- **Emergency Blood Requests** - Post urgent blood needs or register as a donor
- **Browse Medicines** - Check prices and prescription requirements
- **Find Labs & Hospitals** - Locate trusted medical facilities near you

## The Tech Behind It

- **Frontend**: React + Vite (running on port 8080)
- **Backend**: Node.js + Express (running on port 5000/5001)
- **Database**: MongoDB
- **Auth**: JWT tokens
- **Extras**: Email notifications, file uploads

## Getting Started

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file with your MongoDB connection string and SMTP settings.

Seed some demo data:
```bash
npm run seed
```

Start the backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Open your browser to http://localhost:8080

## Project Structure

```
sehat-dost/
├── client/       # React frontend
└── server/      # Express backend
    ├── src/
    │   ├── config/       # Database setup
    │   ├── middleware/  # Auth & file handling
    │   ├── models/       # Database schemas
    │   ├── routes/       # API endpoints
    │   └── utils/        # Seed scripts & helpers
    └── uploads/          # File storage
```

## Built By

Atiya Inayat and Muhammad Sudais
