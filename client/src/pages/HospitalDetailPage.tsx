import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorCard from "@/components/DoctorCard";
import { hospitalsAPI } from "@/lib/api";
import { specialties as specialtyList } from "@/data/mockData";
import { Building2, Phone, MapPin, Search, X, Stethoscope, ArrowLeft, Loader2 } from "lucide-react";

interface Hospital {
  _id: string;
  name: string;
  address: { street?: string; area?: string; city: string; province: string };
  helpline: string;
  emergency?: string;
  about: string;
  services: string[];
  facilities: string[];
  rating: number;
  type: string;
  doctors: string[];
}

const HospitalDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);
  const [specialtySearch, setSpecialtySearch] = useState("");

  useEffect(() => {
    if (id) {
      fetchHospital(id);
    }
  }, [id]);

  const fetchHospital = async (hospitalId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await hospitalsAPI.getById(hospitalId);

      if (response.data.success) {
        setHospital(response.data.data);
      } else {
        setError("Hospital not found");
      }
    } catch {
      setError("Failed to load hospital details");
    } finally {
      setLoading(false);
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
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading hospital...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !hospital) {
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
          <div className="text-center py-16">
            <Building2 className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Hospital Not Found</h2>
            <p className="text-muted-foreground mb-6">{error || "The hospital you're looking for doesn't exist"}</p>
            <Link
              to="/hospitals"
              className="px-6 py-3 rounded-xl hero-gradient text-primary-foreground"
            >
              Browse Hospitals
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const filteredSpecialties = specialtyList.filter((s) =>
    s.toLowerCase().includes(specialtySearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to listing
        </button>

        {/* Hospital Card */}
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center shrink-0">
              <Building2 className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-heading font-bold text-foreground">{hospital.name}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="w-4 h-4" /> {hospital.address.area ? `${hospital.address.area}, ` : ""}{hospital.address.city}, {hospital.address.province}</p>
              <p className="mt-3 text-sm text-muted-foreground">{hospital.about}</p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <a href={`tel:${hospital.helpline}`} className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold hero-gradient text-primary-foreground">
                <Phone className="w-4 h-4" /> Call Helpline
              </a>
              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                <MapPin className="w-4 h-4" /> Location
              </button>
            </div>
          </div>
        </div>

        {/* Find Dr by Specialty */}
        <div className="mb-8">
          <h2 className="text-xl font-heading font-bold text-foreground mb-4">Find Doctor by Specialty</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {specialties.slice(0, 12).map((s) => (
              <Link
                key={s}
                to={`/doctors/${encodeURIComponent(s)}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border card-hover text-center"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-foreground">{s}</span>
              </Link>
            ))}
          </div>
          <button
            onClick={() => setShowAllSpecialties(true)}
            className="mt-4 text-sm font-semibold text-primary hover:underline"
          >
            View More Specialties
          </button>
        </div>

        {/* All specialties modal */}
        {showAllSpecialties && (
          <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg text-foreground">All Specialties</h3>
                <button onClick={() => setShowAllSpecialties(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={specialtySearch}
                  onChange={(e) => setSpecialtySearch(e.target.value)}
                  placeholder="Search specialty..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {filteredSpecialties.map((s) => (
                  <Link
                    key={s}
                    to={`/doctors/${encodeURIComponent(s)}`}
                    onClick={() => setShowAllSpecialties(false)}
                    className="px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Doctors */}
        <h2 className="text-xl font-heading font-bold text-foreground mb-4">Most Experienced Doctors</h2>
        <div className="flex flex-col gap-4 mb-8">
          {hospital.doctors && hospital.doctors.length > 0 ? (
            hospital.doctors.map((doctor: any) => (
              <DoctorCard 
                key={doctor._id} 
                id={doctor._id}
                name={doctor.user?.name || "Doctor"}
                specialty={doctor.specialty}
                degrees={doctor.degrees}
                experience={doctor.experience}
                fee={doctor.fee}
                pmdc={doctor.pmcId}
                online={doctor.isOnline}
              />
            ))
          ) : (
            <p className="text-muted-foreground">No doctors information available</p>
          )}
        </div>

        {/* Services & Facilities */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-heading font-bold text-foreground mb-3">Services</h3>
            <div className="flex flex-wrap gap-2">
              {hospital.services.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary font-medium">{s}</span>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-heading font-bold text-foreground mb-3">Facilities</h3>
            <div className="flex flex-wrap gap-2">
              {hospital.facilities.map((f) => (
                <span key={f} className="px-3 py-1.5 rounded-full text-sm bg-muted text-muted-foreground font-medium">{f}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-heading font-bold text-foreground mb-3">Contact & Location</h3>
          <p className="text-sm text-muted-foreground"><MapPin className="w-4 h-4 inline mr-1" />{hospital.address}</p>
          <p className="text-sm text-muted-foreground mt-1"><Phone className="w-4 h-4 inline mr-1" />{hospital.helpline}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HospitalDetailPage;
