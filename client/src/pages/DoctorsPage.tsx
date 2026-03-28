import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorCard from "@/components/DoctorCard";
import { doctors, specialties } from "@/data/mockData";
import { Search, X, Filter } from "lucide-react";

const DoctorsPage = () => {
  const { specialty } = useParams();
  const [search, setSearch] = useState("");
  const [feeFilter, setFeeFilter] = useState<number | null>(null);
  const [onlineFilter, setOnlineFilter] = useState(false);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialty ? decodeURIComponent(specialty) : "");

  const filtered = doctors.filter((d) => {
    if (selectedSpecialty && d.specialty !== selectedSpecialty) return false;
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (feeFilter && d.fee > feeFilter) return false;
    if (onlineFilter && !d.online) return false;
    if (genderFilter && d.gender !== genderFilter) return false;
    return true;
  });

  const clearFilters = () => {
    setFeeFilter(null);
    setOnlineFilter(false);
    setGenderFilter(null);
    setSelectedSpecialty("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
          {selectedSpecialty ? `Best ${selectedSpecialty}s` : "Find a Doctor"}
        </h1>
        <p className="text-muted-foreground mb-6">Book appointments with PMC verified doctors</p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doctor by name..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground"
          >
            <option value="">All Specialties</option>
            {specialties.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={() => setFeeFilter(feeFilter === 500 ? null : 500)}
            className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${feeFilter === 500 ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card text-foreground hover:bg-muted"}`}
          >
            Fee upto 500
          </button>
          <button
            onClick={() => setOnlineFilter(!onlineFilter)}
            className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${onlineFilter ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card text-foreground hover:bg-muted"}`}
          >
            Online Now
          </button>
          <select
            value={genderFilter || ""}
            onChange={(e) => setGenderFilter(e.target.value || null)}
            className="px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground"
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button
            onClick={clearFilters}
            className="px-3 py-2 rounded-lg border border-border bg-card text-sm font-medium text-muted-foreground hover:bg-muted flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear Filters
          </button>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-4">
          {filtered.length > 0 ? (
            filtered.map((d) => <DoctorCard key={d.id} {...d} />)
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">No doctors found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorsPage;
