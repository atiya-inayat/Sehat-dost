import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TestTube, Calendar, Eye, Loader2, RefreshCw } from "lucide-react";
import { labsAPI } from "@/lib/api";
import { mockLabs } from "@/data/mockFallback";

interface Lab {
  _id: string;
  name: string;
  address: { city: string; province: string };
  helpline: string;
  tests: { name: string }[];
  rating: number;
}

const LabTestsPage = () => {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await labsAPI.getAll({ limit: 20 });
      
      if (response.data.success) {
        if (response.data.data && response.data.data.length > 0) {
          setLabs(response.data.data);
        } else {
          setLabs(mockLabs);
        }
      }
    } catch {
      // Fallback to mock data
      setLabs(mockLabs);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Lab Tests</h1>
        <p className="text-muted-foreground mb-8">Choose a lab and book your tests</p>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading labs...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-destructive text-lg font-medium">Error</p>
            <p className="text-muted-foreground">{error}</p>
            <button
              onClick={fetchLabs}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && labs.length > 0 && (
          <div className="flex flex-col gap-4">
            {labs.map((lab) => (
              <div
                key={lab._id}
                className="bg-card rounded-2xl border border-border p-6 card-hover w-full"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <TestTube className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold text-foreground">{lab.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {lab.address?.city}, {lab.address?.province}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {lab.tests?.length || 0} tests available
                    </p>
                  </div>
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <Link
                      to={`/lab/${lab._id}`}
                      state={{ mode: "appointment" }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold hero-gradient text-primary-foreground"
                    >
                      <Calendar className="w-4 h-4" /> Get Appointment
                    </Link>
                    <Link
                      to={`/lab/${lab._id}`}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Eye className="w-4 h-4" /> View Test Prices
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && labs.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <TestTube className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium">No labs found</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LabTestsPage;
