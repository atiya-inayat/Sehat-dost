import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { labs } from "@/data/mockData";
import { TestTube, Calendar, Eye } from "lucide-react";

const LabTestsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Lab Tests</h1>
        <p className="text-muted-foreground mb-8">Choose a lab and book your tests</p>

        <div className="flex flex-col gap-4">
          {labs.map((lab) => (
            <div key={lab.id} className="bg-card rounded-2xl border border-border p-6 card-hover w-full">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <TestTube className="w-10 h-10 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-foreground">{lab.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{lab.tests.length} tests available</p>
                </div>
                <div className="flex sm:flex-col gap-2 shrink-0">
                  <Link
                    to={`/lab/${lab.id}`}
                    state={{ mode: "appointment" }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold hero-gradient text-primary-foreground"
                  >
                    <Calendar className="w-4 h-4" /> Get Appointment
                  </Link>
                  <Link
                    to={`/lab/${lab.id}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Eye className="w-4 h-4" /> View Test Prices
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LabTestsPage;
