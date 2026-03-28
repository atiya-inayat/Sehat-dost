import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { doctors } from "@/data/mockData";
import { User, Shield, GraduationCap, MapPin, Clock, Calendar, Video, Building } from "lucide-react";

const DoctorProfilePage = () => {
  const { id } = useParams();
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) return <div className="min-h-screen flex items-center justify-center">Doctor not found</div>;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 card-hover">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-28 h-28 rounded-2xl bg-muted flex items-center justify-center shrink-0">
              <User className="w-14 h-14 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-heading font-bold text-foreground">{doctor.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Shield className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">PMC Verified — {doctor.pmdc}</span>
              </div>
              <p className="text-primary font-medium mt-2">{doctor.specialty}</p>
              <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                <GraduationCap className="w-4 h-4" /> {doctor.degrees}
              </div>
              <p className="text-sm text-muted-foreground mt-2">{doctor.experience} Years Experience</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{doctor.about}</p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link
                to={`/doctor/${id}/book-online`}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold hero-gradient text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Video className="w-4 h-4" /> Consult Online
              </Link>
              <Link
                to={`/doctor/${id}/book-online`}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Building className="w-4 h-4" /> Visit in Clinic
              </Link>
            </div>
          </div>
        </div>

        {/* Clinic Availability */}
        <div className="mt-8 bg-card rounded-2xl border border-border p-6 md:p-8">
          <h2 className="text-xl font-heading font-bold text-foreground mb-4">
            <MapPin className="w-5 h-5 inline mr-2 text-primary" />
            Available at {doctor.hospital}
          </h2>
          <p className="text-sm text-muted-foreground mb-1">{doctor.hospitalAddress}</p>
          <p className="text-sm font-medium text-foreground mb-4">Fee: Rs. {doctor.fee}</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {days.map((day) => (
                    <th key={day} className="py-2 px-3 text-left font-medium text-muted-foreground">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {days.map((day) => (
                    <td key={day} className="py-3 px-3 text-foreground">
                      {doctor.availability[day] === "Off" ? (
                        <span className="text-muted-foreground opacity-50">Off</span>
                      ) : (
                        <span className="text-sm">{doctor.availability[day]}</span>
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
              <Calendar className="w-4 h-4" /> Book Appointment
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorProfilePage;
