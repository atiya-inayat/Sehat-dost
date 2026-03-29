import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Droplets, Search, Heart, MessageCircle, Eye, ArrowRight, Handshake, Stethoscope, Activity, Brain, Bone, Baby, Microscope, Pill, TestTube, Loader2 } from "lucide-react";
import { doctorsAPI, partnersAPI } from "@/lib/api";

const diseaseIcons = [Stethoscope, Activity, Brain, Bone, Baby, Microscope, Pill, TestTube];

const defaultPartners = ["PharmEvo", "Getz Pharma", "Martin Dow", "Searle Pakistan", "Hilton Pharma", "AGP Limited"];

const defaultCategories = [
  { id: "cardiology", category: "Cardiology" },
  { id: "dermatology", category: "Dermatology" },
  { id: "neurology", category: "Neurology" },
  { id: "orthopedics", category: "Orthopedics" },
  { id: "gastroenterology", category: "Gastroenterology" },
  { id: "pediatrics", category: "Pediatrics" },
  { id: "gynecology", category: "Gynecology" },
  { id: "ent", category: "ENT" }
];

const Index = () => {
  const [featuredDoctors, setFeaturedDoctors] = useState<number>(0);
  const [partners, setPartners] = useState<string[]>(defaultPartners);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsRes, partnersRes] = await Promise.all([
          doctorsAPI.getAll({ limit: 1 }),
          partnersAPI.getFeatured()
        ]);
        
        if (doctorsRes.data.success) {
          setFeaturedDoctors(doctorsRes.data.total || 0);
        }
        if (partnersRes.data.success && partnersRes.data.data.length > 0) {
          setPartners(partnersRes.data.data.map((p: { companyName: string }) => p.companyName));
        }
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground mb-6 animate-fade-in-up">
              Your Health, Our Priority
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10">
              Find verified doctors, book appointments, order medicines and get medical advice — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/blood-donation"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold bg-card text-destructive hover:bg-card/90 transition-colors shadow-lg"
              >
                <Droplets className="w-5 h-5" /> Need Blood Now
              </Link>
              <Link
                to="/doctors"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold bg-deep text-deep-foreground hover:opacity-90 transition-opacity shadow-lg"
              >
                <Search className="w-5 h-5" /> Find a Doctor
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="bg-muted rounded-2xl p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
              Get Free Medical Advice by Asking a Doctor
            </h2>
            <div className="flex flex-col gap-2 text-muted-foreground mb-6">
              <p className="flex items-center justify-center gap-2"><MessageCircle className="w-4 h-4 text-primary" /> Ask a question anonymously</p>
              <p className="flex items-center justify-center gap-2"><Heart className="w-4 h-4 text-primary" /> Get a reply from PMC verified doctors</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/ask-question"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold hero-gradient text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Ask a Question <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/all-questions"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-border text-foreground hover:bg-muted transition-colors"
              >
                <Eye className="w-4 h-4" /> View All Questions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-8">
            Browse by Disease
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {defaultCategories.map((d, i) => {
              const Icon = diseaseIcons[i % diseaseIcons.length];
              return (
                <Link
                  key={d.id}
                  to={`/diseases`}
                  className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border card-hover text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground leading-tight">{d.category}</span>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-6">
            <Link
              to="/diseases"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              View All Diseases <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
            Avail Exclusive Partnership Benefits
          </h2>
          <p className="text-muted-foreground mb-6">For your brand, clients and employees</p>
          <Link
            to="/partner"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-base font-semibold hero-gradient text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Handshake className="w-5 h-5" /> Partner with SehatDost
          </Link>

          <div className="mt-10 overflow-hidden">
            <div className="flex animate-slide-left" style={{ width: "200%" }}>
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 mx-6 px-6 py-3 rounded-lg bg-card border border-border text-sm font-medium text-muted-foreground"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
