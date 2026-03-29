import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { medicinesAPI } from "@/lib/api";
import { mockMedicines } from "@/data/mockFallback";
import { Pill, ArrowLeft, Loader2, Package, AlertTriangle, CheckCircle, Info, ShoppingCart, MapPin, Phone, FileText } from "lucide-react";

interface Medicine {
  _id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  drugClass: string;
  formula: string;
  form: string;
  price: number;
  description: string;
  uses?: string[];
  dosage?: string;
  warnings?: string[];
  precautions?: string[];
  sideEffects?: string[];
  contraindications?: string[];
  interactions?: string[];
  packaging?: string;
  requiresPrescription: boolean;
}

const sections = [
  { id: "Overview", icon: Info },
  { id: "Uses", icon: CheckCircle },
  { id: "Dosage", icon: FileText },
  { id: "Warnings", icon: AlertTriangle },
  { id: "Precautions", icon: AlertTriangle },
  { id: "Side Effects", icon: AlertTriangle },
  { id: "Packaging", icon: Package },
  { id: "Prescription", icon: FileText },
  { id: "Expert Advice", icon: Info },
  { id: "Disclaimer", icon: Info },
];

const sectionContent: Record<string, (name: string) => string> = {
  Overview: (n) => `${n} is a widely used medication prescribed by healthcare professionals for various conditions. It belongs to its respective drug class and works by targeting specific receptors in the body.`,
  Uses: (n) => `${n} is commonly used to treat conditions related to its drug class. Your doctor may prescribe this medication based on your specific condition and medical history.`,
  Dosage: (n) => `The typical dosage of ${n} varies depending on the condition being treated, patient age, and overall health. Always follow your doctor's prescription. Do not exceed the recommended dose.`,
  Warnings: (n) => `Do not take ${n} if you are allergic to any of its ingredients. Consult your doctor if you have liver or kidney problems. Avoid alcohol while taking this medication.`,
  Precautions: (n) => `Inform your doctor about all medications you are currently taking before starting ${n}. Pregnant or breastfeeding women should consult their doctor before use.`,
  "Side Effects": (n) => `Common side effects may include nausea, headache, dizziness, and stomach upset. Contact your doctor immediately if you experience severe side effects.`,
  Packaging: (n) => `${n} is available in various packaging sizes. Standard packaging includes blister packs of 10 tablets/capsules per strip.`,
  Prescription: (n) => `${n} is a prescription medication. A valid prescription from a licensed medical practitioner is required for purchase.`,
  "Expert Advice": (n) => `Take ${n} exactly as prescribed by your doctor. Do not stop taking the medication without consulting your healthcare provider, even if you feel better.`,
  Disclaimer: () => `This information is for educational purposes only. It is not a substitute for professional medical advice. Always consult your doctor or pharmacist for personalized guidance.`,
};

const MedicineDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("Overview");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (id) {
      fetchMedicine(id);
    }
  }, [id]);

  const fetchMedicine = async (medicineId: string) => {
    try {
      setLoading(true);
      setError(null);

      const isValidObjectId = /^[a-fA-F0-9]{24}$/.test(medicineId);

      if (isValidObjectId) {
        const response = await medicinesAPI.getById(medicineId);
        if (response.data.success) {
          setMedicine(response.data.data);
          return;
        }
      }

      const mockMed = mockMedicines.find(m => m._id === medicineId);
      if (mockMed) {
        setMedicine(mockMed);
      } else {
        setError("Medicine not found");
      }
    } catch {
      const mockMed = mockMedicines.find(m => m._id === medicineId);
      if (mockMed) {
        setMedicine(mockMed);
      } else {
        setError("Failed to load medicine details");
      }
    } finally {
      setLoading(false);
    }
  };

  const scrollTo = (section: string) => {
    setActiveSection(section);
    sectionRefs.current[section]?.scrollIntoView({ behavior: "smooth", block: "start" });
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
            <span className="ml-2 text-muted-foreground">Loading medicine...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !medicine) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-lg mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="glass-card rounded-2xl p-8 text-center">
              <Pill className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Medicine Not Found</h2>
              <p className="text-muted-foreground mb-6">{error || "The medicine you're looking for doesn't exist in our database."}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/medicines" className="px-6 py-3 rounded-xl hero-gradient text-primary-foreground">
                  Browse Medicines
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

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-6 md:p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Medicine Image */}
            <div className="w-full lg:w-56 h-56 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0">
              <div className="w-28 h-28 rounded-full bg-primary/20 flex items-center justify-center">
                <Pill className="w-16 h-16 text-primary" />
              </div>
            </div>

            {/* Medicine Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{medicine.name}</h1>
                  <p className="text-muted-foreground mt-2 text-lg">{medicine.genericName}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">Rs. {medicine.price}</div>
                  <div className="text-sm text-muted-foreground">per {medicine.form.toLowerCase()}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {medicine.requiresPrescription && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-warning/20 text-warning flex items-center gap-1">
                    <FileText className="w-3 h-3" /> Prescription Required
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/20 text-success flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Available
                </span>
              </div>

              <p className="text-muted-foreground mt-4 leading-relaxed">{medicine.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-background/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Manufacturer</p>
                  <p className="font-medium text-foreground">{medicine.manufacturer}</p>
                </div>
                <div className="bg-background/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Drug Class</p>
                  <p className="font-medium text-foreground">{medicine.drugClass}</p>
                </div>
                <div className="bg-background/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Form</p>
                  <p className="font-medium text-foreground">{medicine.form}</p>
                </div>
                <div className="bg-background/50 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Formula</p>
                  <p className="font-medium text-foreground font-mono text-sm">{medicine.formula}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold hero-gradient text-primary-foreground hover:opacity-90 transition-opacity">
                  <ShoppingCart className="w-5 h-5" /> Find Pharmacy
                </button>
                <Link to="/medicines" className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-border text-foreground hover:bg-muted transition-colors">
                  Browse More Medicines
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="sticky top-16 z-30 bg-background/80 backdrop-blur-lg py-3 -mx-4 px-4 mb-8 border-b border-border/30"
        >
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  activeSection === s.id
                    ? "hero-gradient text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                <s.icon className="w-4 h-4" />
                {s.id}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-6">
          {sections.map((s, index) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              ref={(el) => { sectionRefs.current[s.id] = el; }}
              id={s.id}
              className="glass-card rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-heading font-bold text-foreground">{s.id}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">{sectionContent[s.id](medicine.name)}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass-card rounded-2xl p-6 md:p-8"
        >
          <h3 className="text-xl font-heading font-bold text-foreground mb-4">Need Help Finding This Medicine?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-xl">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Visit a Pharmacy</p>
                <p className="text-sm text-muted-foreground">Find nearby pharmacies that stock this medicine</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-xl">
              <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Contact Us</p>
                <p className="text-sm text-muted-foreground">Call 0800-SEHAT for assistance</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default MedicineDetailPage;
