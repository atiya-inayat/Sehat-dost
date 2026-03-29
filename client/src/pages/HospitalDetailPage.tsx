import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorCard from "@/components/DoctorCard";
import { hospitalsAPI } from "@/lib/api";
import { mockHospitals } from "@/data/mockFallback";
import { specialties as specialtyList } from "@/data/mockData";
import { Building2, Phone, MapPin, Search, X, Stethoscope, ArrowLeft, Loader2, Star, Clock, Shield, CheckCircle, AlertCircle } from "lucide-react";

interface Hospital {
  _id: string;
  name: string;
  address: { street?: string; area?: string; city: string; province: string };
  helpline?: string;
  emergency?: string;
  about?: string;
  services?: string[];
  facilities?: string[];
  rating?: number;
  type?: string;
  doctors?: string[];
  bedCount?: number;
  icuBeds?: number;
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

      const isValidObjectId = /^[a-fA-F0-9]{24}$/.test(hospitalId);

      if (isValidObjectId) {
        try {
          const response = await hospitalsAPI.getById(hospitalId);
          if (response.data.success && response.data.data) {
            setHospital(response.data.data);
            return;
          }
        } catch {
          // API call failed, continue to mock data
        }
      }

      // Fallback to mock data
      const mockHosp = mockHospitals.find(h => h._id === hospitalId);
      if (mockHosp) {
        setHospital(mockHosp);
      } else {
        // Show first mock hospital as demo
        setHospital(mockHospitals[0]);
      }
    } catch {
      // Ultimate fallback
      setHospital(mockHospitals[0]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
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

  if (!hospital) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-lg mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="glass-card rounded-2xl p-8 text-center">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Hospital Not Found</h2>
              <p className="text-muted-foreground mb-6">Showing demo hospital instead.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/hospitals" className="px-6 py-3 rounded-xl hero-gradient text-primary-foreground">
                  Browse Hospitals
                </Link>
                <Link to="/" className="px-6 py-3 rounded-xl border border-border text-foreground hover:bg-muted">
                  Back to Home
                </Link>
              </div>
            </div>
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
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to listing
        </motion.button>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-6 md:p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Hospital Image/Icon */}
            <div className="w-full lg:w-40 h-40 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
              <Building2 className="w-20 h-20 text-primary" />
            </div>

            {/* Hospital Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{hospital.name}</h1>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {hospital.type || "Private Hospital"}
                    </span>
                    {hospital.rating && (
                      <span className="flex items-center gap-1 text-sm font-medium">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-foreground">{hospital.rating}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-sm text-success">
                      <Shield className="w-4 h-4" /> Verified
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{hospital.address?.area ? `${hospital.address.area}, ` : ""}{hospital.address?.city}, {hospital.address?.province}</span>
                </div>
              </div>

              {hospital.about && (
                <p className="text-muted-foreground mt-4 leading-relaxed">{hospital.about}</p>
              )}

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                {hospital.helpline && (
                  <div className="bg-background/50 rounded-xl p-3 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Helpline</p>
                      <p className="font-medium text-foreground text-sm">{hospital.helpline}</p>
                    </div>
                  </div>
                )}
                {hospital.emergency && (
                  <div className="bg-destructive/10 rounded-xl p-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    <div>
                      <p className="text-xs text-destructive">Emergency</p>
                      <p className="font-medium text-foreground text-sm">{hospital.emergency}</p>
                    </div>
                  </div>
                )}
                {hospital.bedCount && (
                  <div className="bg-background/50 rounded-xl p-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Beds</p>
                      <p className="font-medium text-foreground text-sm">{hospital.bedCount}+</p>
                    </div>
                  </div>
                )}
                {hospital.icuBeds && (
                  <div className="bg-background/50 rounded-xl p-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">ICU Beds</p>
                      <p className="font-medium text-foreground text-sm">{hospital.icuBeds}+</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Services */}
              {hospital.services && hospital.services.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-foreground mb-2">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {hospital.services.map((service) => (
                      <span key={service} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Facilities */}
              {hospital.facilities && hospital.facilities.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-foreground mb-2">Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {hospital.facilities.map((facility) => (
                      <span key={facility} className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> {facility}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Find Doctors Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-primary" />
                Find Doctors
              </h2>
              <p className="text-muted-foreground mt-1">Search for specialists at this hospital</p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search specialties..."
                value={specialtySearch}
                onChange={(e) => setSpecialtySearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setShowAllSpecialties(!showAllSpecialties)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-card text-foreground hover:bg-muted transition-colors"
            >
              {showAllSpecialties ? "Show Less" : "Show All"}
            </button>
            {(showAllSpecialties ? filteredSpecialties : filteredSpecialties.slice(0, 8)).map((specialty) => (
              <Link
                key={specialty}
                to={`/doctors?specialty=${encodeURIComponent(specialty)}`}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {specialty}
              </Link>
            ))}
          </div>

          <div className="text-center py-8 text-muted-foreground">
            <Stethoscope className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Book an appointment with our verified doctors</p>
            <Link to="/doctors" className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg text-sm font-medium hero-gradient text-primary-foreground">
              Browse All Doctors
            </Link>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 glass-card rounded-2xl p-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/doctors" className="flex items-center gap-3 p-4 bg-background/50 rounded-xl hover:bg-muted transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Find a Doctor</p>
                <p className="text-sm text-muted-foreground">Search by specialty</p>
              </div>
            </Link>
            <Link to="/emergency" className="flex items-center gap-3 p-4 bg-destructive/10 rounded-xl hover:bg-destructive/20 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="font-medium text-foreground">Emergency</p>
                <p className="text-sm text-muted-foreground">Call for emergencies</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default HospitalDetailPage;
