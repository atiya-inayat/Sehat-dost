import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doctors } from "@/data/mockData";
import { User, Shield, GraduationCap, ArrowLeft, Calendar, Clock } from "lucide-react";

const dates = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return d;
});

const timeSlots = ["10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM", "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM", "12:00 PM", "2:00 PM", "2:15 PM", "2:30 PM"];

const BookOnlinePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find((d) => d.id === id);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  if (!doctor) return <div className="min-h-screen flex items-center justify-center">Doctor not found</div>;

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
              <h2 className="font-heading font-bold text-lg text-foreground">{doctor.name}</h2>
              <div className="flex items-center gap-1.5 text-xs text-success mt-0.5">
                <Shield className="w-3 h-3" /> PMC Verified
              </div>
              <p className="text-sm text-primary mt-1">{doctor.specialty}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{doctor.degrees}</p>
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
