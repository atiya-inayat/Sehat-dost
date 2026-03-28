import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { hospitals } from "@/data/mockData";
import { Building2, Phone, MapPin } from "lucide-react";

const HospitalsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Hospitals</h1>
        <p className="text-muted-foreground mb-8">Find the best hospitals near you</p>

        <div className="flex flex-col gap-4">
          {hospitals.map((h) => (
            <Link key={h.id} to={`/hospital/${h.id}`} className="bg-card rounded-2xl border border-border p-6 card-hover">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Building2 className="w-10 h-10 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-foreground">{h.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {h.address}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Phone className="w-3.5 h-3.5" /> {h.helpline}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {h.services.slice(0, 4).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HospitalsPage;
