import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorCard from "@/components/DoctorCard";
import { DoctorCardSkeleton } from "@/components/ui/skeleton";
import { Search, X, Filter, Loader2, RefreshCw, Stethoscope } from "lucide-react";
import { doctorsAPI } from "@/lib/api";
import { mockDoctors } from "@/data/mockFallback";

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

const defaultSpecialties = [
  "Cardiologist", "Nephrologist", "Neurologist", "Dermatologist",
  "Orthopedic Surgeon", "Gynecologist", "Pediatrician", "ENT Specialist"
];

const DoctorsPage = () => {
  const { specialty } = useParams();
  const [search, setSearch] = useState("");
  const [feeFilter, setFeeFilter] = useState<number | null>(null);
  const [onlineFilter, setOnlineFilter] = useState(false);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [cityFilter, setCityFilter] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialty ? decodeURIComponent(specialty) : "");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<string[]>(defaultSpecialties);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchSpecialties();
  }, []);

  useEffect(() => {
    fetchDoctors(1);
  }, [selectedSpecialty, onlineFilter, genderFilter]);

  const fetchSpecialties = async () => {
    try {
      const response = await doctorsAPI.getSpecialties();
      if (response.data.success && response.data.data.length > 0) {
        setSpecialties(response.data.data);
      }
    } catch {
      // Use default
    }
  };

  const fetchDoctors = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const params: Record<string, string | number | boolean> = {
        page,
        limit: 10,
        sort: "-isFeatured"
      };

      if (selectedSpecialty) params.specialty = selectedSpecialty;
      if (search) params.search = search;
      if (onlineFilter) params.isOnline = true;
      if (genderFilter) params.gender = genderFilter;
      if (feeFilter) params.maxFee = feeFilter;
      if (cityFilter) params.city = cityFilter;

      const response = await doctorsAPI.getAll(params);

      if (response.data.success) {
        // Use API data if available, otherwise fallback to mock data
        let doctorList = [];
        if (response.data.data && response.data.data.length > 0) {
          doctorList = response.data.data;
        } else {
          // Fallback to mock data for demo
          doctorList = mockDoctors;
        }

        // Apply filters to the result
        let filtered = doctorList;
        if (selectedSpecialty) {
          filtered = filtered.filter(d => d.specialty === selectedSpecialty);
        }
        if (search) {
          filtered = filtered.filter(d => 
            d.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
            d.hospital?.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        setDoctors(filtered);
        setPagination({
          page: response.data.currentPage || 1,
          totalPages: Math.ceil(filtered.length / 10) || 1,
          total: filtered.length
        });
      }
    } catch (err: unknown) {
      // Fallback to mock data on error
      let filtered = mockDoctors;
      if (selectedSpecialty) {
        filtered = filtered.filter(d => d.specialty === selectedSpecialty);
      }
      if (search) {
        filtered = filtered.filter(d => 
          d.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
          d.hospital?.toLowerCase().includes(search.toLowerCase())
        );
      }
      setDoctors(filtered);
      setPagination({ page: 1, totalPages: 1, total: filtered.length });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => fetchDoctors(1);

  const clearFilters = () => {
    setFeeFilter(null);
    setOnlineFilter(false);
    setGenderFilter(null);
    setCityFilter("");
    setSelectedSpecialty("");
    setSearch("");
  };

  const handlePageChange = (newPage: number) => fetchDoctors(newPage);

  const hasActiveFilters = selectedSpecialty || search || onlineFilter || genderFilter || feeFilter || cityFilter;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Sticky Search Bar */}
      <div className="sticky top-16 z-40 glass-nav border-b border-border/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search doctors by name, hospital, or specialty..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card/80 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none backdrop-blur-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors flex items-center gap-2 ${
                  showFilters || hasActiveFilters 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "border-border bg-card hover:bg-muted"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button
                onClick={handleSearch}
                className="px-6 py-3 rounded-xl text-sm font-semibold hero-gradient text-primary-foreground"
              >
                Search
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-4">
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-border bg-card/80 text-sm text-foreground backdrop-blur-sm"
                  >
                    <option value="">All Specialties</option>
                    {specialties.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <input
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    placeholder="City..."
                    className="px-3 py-2 rounded-lg border border-border bg-card/80 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-sm w-32"
                  />
                  <button
                    onClick={() => setFeeFilter(feeFilter === 500 ? null : 500)}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      feeFilter === 500 ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card hover:bg-muted"
                    }`}
                  >
                    Fee upto 500
                  </button>
                  <button
                    onClick={() => setOnlineFilter(!onlineFilter)}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      onlineFilter ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card hover:bg-muted"
                    }`}
                  >
                    Online Now
                  </button>
                  <select
                    value={genderFilter || ""}
                    onChange={(e) => setGenderFilter(e.target.value || null)}
                    className="px-3 py-2 rounded-lg border border-border bg-card/80 text-sm text-foreground backdrop-blur-sm"
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="px-3 py-2 rounded-lg border border-border bg-card text-sm font-medium text-muted-foreground hover:bg-muted flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Clear
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Results count */}
        {!loading && !error && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Found <span className="font-semibold text-foreground">{pagination.total}</span> doctors
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <DoctorCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-destructive" />
            </div>
            <p className="text-destructive text-lg font-medium">Oops! Something went wrong</p>
            <p className="text-muted-foreground mb-4">{error}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => fetchDoctors(pagination.page)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Retry
              </button>
              <Link
                to="/doctors"
                className="px-4 py-2 border border-border rounded-lg"
              >
                Back to Listing
              </Link>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && doctors.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No doctors found</h3>
            <p className="text-muted-foreground mb-6">We couldn't find any doctors matching your criteria</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={clearFilters}
                className="px-4 py-2 hero-gradient text-primary-foreground rounded-lg flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Reset Filters
              </button>
              <Link
                to="/doctors"
                className="px-4 py-2 border border-border rounded-lg"
              >
                View All Doctors
              </Link>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {!loading && !error && doctors.length > 0 && (
          <>
            <div className="flex flex-col gap-4 stagger-fade-in">
              {doctors.map((d) => (
                <DoctorCard
                  key={d._id}
                  id={d._id}
                  name={d.user?.name || "Doctor"}
                  specialty={d.specialty}
                  degrees={d.degrees}
                  experience={d.experience}
                  fee={d.fee}
                  pmdc={d.pmcId}
                  gender={d.gender}
                  online={d.isOnline}
                  image={d.user?.avatar || ""}
                  hospital={d.hospital}
                  hospitalAddress={d.hospitalAddress}
                  availability={d.availability}
                  about={d.about}
                />
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 rounded-lg border border-border bg-card disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-4 py-2 rounded-lg border border-border bg-card disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DoctorsPage;
