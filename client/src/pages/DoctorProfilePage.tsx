import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { mockDoctors } from "@/data/mockFallback";
import { doctorsAPI, appointmentsAPI } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { User, Shield, GraduationCap, MapPin, Clock, Calendar, Video, Building, ArrowLeft, Loader2, Lock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Doctor {
  _id: string;
  user: { _id: string; name: string; avatar?: string };
  specialty: string;
  degrees: string;
  experience: number;
  fee: number;
  pmcId: string;
  gender: string;
  isOnline: boolean;
  hospital: string;
  hospitalAddress: string;
  availability: Record<string, string>;
  about: string;
}

interface Appointment {
  _id: string;
  doctor: string;
  status: string;
  appointmentDate: string;
}

const DoctorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasActiveAppointment, setHasActiveAppointment] = useState(false);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDoctor(id);
    }
  }, [id]);

  useEffect(() => {
    if (id && isAuthenticated && user) {
      checkActiveAppointment(id);
    }
  }, [id, isAuthenticated, user]);

  const fetchDoctor = async (doctorId: string) => {
    try {
      setLoading(true);
      setError(null);

      // Check if ID is a valid MongoDB ObjectId (24 hex chars)
      const isValidObjectId = /^[a-fA-F0-9]{24}$/.test(doctorId);

      if (isValidObjectId) {
        // Try API first for valid ObjectIds
        const response = await doctorsAPI.getById(doctorId);

        if (response.data.success) {
          setDoctor(response.data.data);
          return;
        }
      }

      // Fallback to mock data for invalid IDs or API failures
      const mockDoc = mockDoctors.find(d => d._id === doctorId);
      if (mockDoc) {
        setDoctor(mockDoc);
      } else {
        setError("Doctor not found");
      }
    } catch {
      // Fallback to mock data on any error
      const mockDoc = mockDoctors.find(d => d._id === doctorId);
      if (mockDoc) {
        setDoctor(mockDoc);
      } else {
        setError("Doctor not found");
      }
    } finally {
      setLoading(false);
    }
  };

  const checkActiveAppointment = async (doctorId: string) => {
    try {
      setAppointmentsLoading(true);
      const response = await appointmentsAPI.getAll({ doctor: doctorId });
      
      if (response.data.success && response.data.data) {
        const activeStatuses = ['Confirmed', 'Pending', 'In Progress'];
        const hasAppointment = response.data.data.some(
          (apt: Appointment) => 
            activeStatuses.includes(apt.status) && 
            new Date(apt.appointmentDate) >= new Date()
        );
        setHasActiveAppointment(hasAppointment);
      }
    } catch {
      // Silent fail - user won't see video call button
    } finally {
      setAppointmentsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          
          <div className="glass-card rounded-2xl p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <Skeleton className="w-28 h-28 rounded-2xl" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl p-8 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-destructive" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Doctor Not Found</h2>
              <p className="text-muted-foreground mb-6">{error || "The doctor you're looking for doesn't exist in our database."}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/doctors"
                  className="px-6 py-3 rounded-xl hero-gradient text-primary-foreground"
                >
                  Find Doctors
                </Link>
                <Link
                  to="/"
                  className="px-6 py-3 rounded-xl border border-border text-foreground hover:bg-muted"
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
  const dayAbbrev = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to listing
          </button>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
              <User className="w-14 h-14 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-heading font-bold text-foreground">{doctor.user?.name || "Doctor"}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Shield className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-success">PMC Verified — {doctor.pmcId}</span>
                    {doctor.isOnline && (
                      <span className="ml-2 inline-flex items-center gap-1 text-xs font-medium text-success">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        Online
                      </span>
                    )}
                  </div>
                  <p className="text-primary font-medium mt-2">{doctor.specialty}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                    <GraduationCap className="w-4 h-4" /> {doctor.degrees}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{doctor.experience} Years Experience</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{doctor.about}</p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <TooltipProvider>
                {isAuthenticated && hasActiveAppointment ? (
                  <Link
                    to={`/doctor/${id}/book-online`}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors"
                  >
                    <Video className="w-4 h-4" /> Start Video Call
                  </Link>
                ) : isAuthenticated ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        disabled
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-muted text-muted-foreground cursor-not-allowed"
                      >
                        <Lock className="w-4 h-4" /> Video Call
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Available after booking an appointment</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={`/doctor/${id}/book-online`}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold hero-gradient text-primary-foreground hover:opacity-90 transition-opacity"
                      >
                        <Video className="w-4 h-4" /> Video Consultation
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Login to access video consultation</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </TooltipProvider>
              <Link
                to={`/doctor/${id}/book-online`}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Building className="w-4 h-4" /> Book Appointment
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Clinic & Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 glass-card rounded-2xl p-6 md:p-8"
        >
          <h2 className="text-xl font-heading font-bold text-foreground mb-4">
            <MapPin className="w-5 h-5 inline mr-2 text-primary" />
            {doctor.hospital}
          </h2>
          <p className="text-sm text-muted-foreground mb-1">{doctor.hospitalAddress}</p>
          <p className="text-lg font-semibold text-foreground mb-4">Consultation Fee: Rs. {doctor.fee}</p>

          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> Availability
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {days.map((day) => (
                    <th key={day} className="py-2 px-3 text-left font-medium text-muted-foreground">
                      {dayAbbrev[days.indexOf(day)]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {days.map((day) => (
                    <td key={day} className="py-3 px-3 text-foreground">
                      {doctor.availability?.[day] === "Off" || !doctor.availability?.[day] ? (
                        <span className="text-muted-foreground opacity-50">Off</span>
                      ) : (
                        <span className="text-sm">{doctor.availability?.[day]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <Link
              to={`/doctor/${id}/book-online`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold hero-gradient text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Calendar className="w-4 h-4" /> Book Appointment Now
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorProfilePage;
