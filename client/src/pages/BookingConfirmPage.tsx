import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, User as UserIcon } from "lucide-react";

const BookingConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor, date, time } = (location.state as any) || {};
  const [patientType, setPatientType] = useState("myself");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!doctor) return <div className="min-h-screen flex items-center justify-center">No booking info</div>;

  const handleConfirm = () => {
    if (name && phone) {
      navigate("/payment", { state: { doctor, date, time, patient: { name, phone, type: patientType } } });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Confirm Booking</h1>

        <div className="bg-card rounded-xl border border-border p-4 mb-6 text-sm">
          <p className="font-medium text-foreground">{doctor.name}</p>
          <p className="text-muted-foreground">{date} • {time}</p>
          <p className="text-primary font-semibold mt-1">Rs. {doctor.fee}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Who is the patient?</label>
            <div className="flex gap-2">
              {["myself", "son", "other"].map((t) => (
                <button
                  key={t}
                  onClick={() => setPatientType(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border capitalize transition-colors ${patientType === t ? "hero-gradient text-primary-foreground border-transparent" : "bg-card border-border text-foreground hover:bg-muted"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Patient Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter patient name"
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Phone Number *</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="03XX-XXXXXXX"
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <p className="text-sm text-muted-foreground">Online Payment: <span className="font-semibold text-foreground">Rs. {doctor.fee}</span></p>

          <button
            onClick={handleConfirm}
            disabled={!name || !phone}
            className="w-full py-3.5 rounded-xl text-base font-semibold hero-gradient text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmPage;
