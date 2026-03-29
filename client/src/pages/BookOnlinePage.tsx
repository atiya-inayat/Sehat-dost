import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doctorsAPI } from "@/lib/api";
import { mockDoctors } from "@/data/mockFallback";
import { User, Shield, GraduationCap, ArrowLeft, Calendar, Clock, Loader2 } from "lucide-react";

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

const dates = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return d;
});

const timeSlots = ["10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM", "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM", "12:00 PM", "2:00 PM", "2:15 PM", "2:30 PM"];

const BookOnlinePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchDoctor(id);
    }
  }, [id]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Doctor Not Found</h2>
          <p className="text-muted-foreground mb-6">{error || "The doctor you're looking for doesn't exist"}</p>
          <Link
            to="/doctors"
            className="px-6 py-3 rounded-xl hero-gradient text-primary-foreground"
          >
            Find Doctors
          </Link>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (selectedTime) {
      navigate("/booking-confirm", { state: { doctor, date: dates[selectedDate].toLocaleDateString(), time: selectedTime } });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Doctor info */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-6">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-foreground">{doctor.user?.name || "Doctor"}</h2>
              <div className="flex items-center gap-1.5 text-xs text-success mt-0.5">
                <Shield className="w-3 h-3" /> PMC Verified — {doctor.pmcId}
              </div>
              <p className="text-sm text-primary mt-1">{doctor.specialty}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{doctor.degrees}</p>
              <p className="text-sm font-medium text-foreground mt-2">Fee: Rs. {doctor.fee}</p>
            </div>
          </div>
        </div>

        {/* Date selection */}
        <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" /> Select Date
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {dates.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDate(i)}
              className={`flex flex-col items-center px-4 py-3 rounded-xl text-sm font-medium shrink-0 transition-colors border ${selectedDate === i ? "hero-gradient text-primary-foreground border-transparent" : "bg-card border-border text-foreground hover:bg-muted"}`}
            >
              <span className="text-xs opacity-80">{d.toLocaleDateString("en", { weekday: "short" })}</span>
              <span className="text-lg font-bold">{d.getDate()}</span>
              <span className="text-xs opacity-80">{d.toLocaleDateString("en", { month: "short" })}</span>
            </button>
          ))}
        </div>

        {/* Time selection */}
        <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" /> Select Time (15 min video call)
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-8">
          {timeSlots.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border ${selectedTime === t ? "hero-gradient text-primary-foreground border-transparent" : "bg-card border-border text-foreground hover:bg-muted"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!selectedTime}
          className="w-full py-3.5 rounded-xl text-base font-semibold hero-gradient text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BookOnlinePage;
