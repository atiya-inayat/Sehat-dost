import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/error.js";
import cookieParser from "cookie-parser";

import {
  authRoutes,
  doctorRoutes,
  appointmentRoutes,
  questionRoutes,
  hospitalRoutes,
  medicineRoutes,
  bloodRoutes,
  partnerRoutes,
  labRoutes,
} from "./routes/index.js";

dotenv.config();

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:8081",
      "http://127.0.0.1:8081",
      process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static folder for Uploads (Important for images)
// This points to the /uploads folder in your root directory
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/blood", bloodRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/labs", labRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 SehatDost Server running on port ${PORT}`);
});

export default app;
