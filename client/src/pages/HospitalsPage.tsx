import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HospitalCardSkeleton } from "@/components/ui/skeleton";
import { Building2, Phone, MapPin, Loader2, RefreshCw } from "lucide-react";
import { hospitalsAPI } from "@/lib/api";
import { mockHospitals } from "@/data/mockFallback";

interface Hospital {
  _id: string;
  name: string;
  address: { street?: string; area?: string; city: string; province: string };
  helpline: string;
  emergency?: string;
  services: string[];
  facilities: string[];
  rating: number;
  type: string;
}

const HospitalsPage = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await hospitalsAPI.getAll({ limit: 20 });
      
      if (response.data.success) {
        if (response.data.data && response.data.data.length > 0) {
          setHospitals(response.data.data);
        } else {
          setHospitals(mockHospitals);
        }
      }
    } catch {
      // Fallback to mock data
      setHospitals(mockHospitals);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Hospitals</h1>
          <p className="text-muted-foreground mb-8">Find the best hospitals near you</p>
        </motion.div>

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <HospitalCardSkeleton key={i} />
            ))}
          </div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-destructive text-lg font-medium">Error</p>
            <p className="text-muted-foreground">{error}</p>
            <button
              onClick={fetchHospitals}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
          </motion.div>
        )}

        {!loading && !error && hospitals.length > 0 && (
          <div className="flex flex-col gap-4 stagger-fade-in">
            {hospitals.map((h) => (
              <motion.div
                key={h._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
              >
                <Link
                  to={`/hospital/${h._id}`}
                  className="glass-card rounded-2xl p-6 block"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                      <Building2 className="w-10 h-10 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-bold text-foreground">{h.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5" />{" "}
                        {h.address.area ? `${h.address.area}, ` : ""}{h.address.city}, {h.address.province}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Phone className="w-3.5 h-3.5" /> {h.helpline || "N/A"}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {h.services?.slice(0, 4).map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && !error && hospitals.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <Building2 className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-lg font-medium text-foreground">No hospitals found</p>
            <button
              onClick={fetchHospitals}
              className="mt-4 px-4 py-2 hero-gradient text-primary-foreground rounded-lg"
            >
              Refresh
            </button>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HospitalsPage;
