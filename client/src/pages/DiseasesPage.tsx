import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { diseases } from "@/data/mockData";
import { Search, ChevronRight } from "lucide-react";

const DiseasesPage = () => {
  const [search, setSearch] = useState("");

  const filtered = diseases.filter((d) =>
    d.category.toLowerCase().includes(search.toLowerCase()) ||
    d.conditions.some((c) => c.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Diseases</h1>
        <p className="text-muted-foreground mb-6">Find information about diseases and related doctors</p>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search disease..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <div className="space-y-6">
          {filtered.map((cat) => (
            <div key={cat.id}>
              <h2 className="text-lg font-heading font-bold text-foreground mb-3">{cat.category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.conditions.map((c) => (
                  <Link
                    key={c.id}
                    to={`/disease/${c.id}`}
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-card border border-border card-hover"
                  >
                    <div>
                      <p className="font-medium text-foreground text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiseasesPage;
