import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MedicineCardSkeleton } from "@/components/ui/skeleton";
import { Search, Pill, Loader2, RefreshCw } from "lucide-react";
import { medicinesAPI } from "@/lib/api";
import { mockMedicines } from "@/data/mockFallback";

interface Medicine {
  _id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  drugClass: string;
  form: string;
  price: number;
  description: string;
}

const letterRanges = ["All", "A-C", "D-F", "G-I", "J-L", "M-O", "P-R", "S-U", "V-X", "Y-Z"];

const MedicinesPage = () => {
  const [search, setSearch] = useState("");
  const [activeRange, setActiveRange] = useState("All");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await medicinesAPI.getAll({ limit: 50 });
      
      if (response.data.success) {
        if (response.data.data && response.data.data.length > 0) {
          setMedicines(response.data.data);
        } else {
          setMedicines(mockMedicines);
        }
      }
    } catch {
      // Fallback to mock data
      setMedicines(mockMedicines);
    } finally {
      setLoading(false);
    }
  };

  const filtered = medicines.filter((m) => {
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeRange !== "All") {
      const [start, end] = activeRange.split("-");
      const firstChar = m.name[0].toUpperCase();
      if (firstChar < start || firstChar > end) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Medicines</h1>
        <p className="text-muted-foreground mb-6">Browse and learn about medicines</p>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicine..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {letterRanges.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                activeRange === r
                  ? "hero-gradient text-primary-foreground border-transparent"
                  : "border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading medicines...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-destructive text-lg font-medium">Error</p>
            <p className="text-muted-foreground">{error}</p>
            <button
              onClick={fetchMedicines}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((m) => (
              <div
                key={m._id}
                className="bg-card rounded-xl border border-border overflow-hidden card-hover"
              >
                <div className="h-32 bg-muted flex items-center justify-center">
                  <Pill className="w-12 h-12 text-muted-foreground" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-foreground">{m.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {m.description || m.genericName}
                  </p>
                  <p className="text-sm font-medium text-primary mt-2">Rs. {m.price}</p>
                  <Link
                    to={`/medicine/${m._id}`}
                    className="inline-block mt-3 text-sm font-semibold text-primary hover:underline"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Pill className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium">No medicines found</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MedicinesPage;
