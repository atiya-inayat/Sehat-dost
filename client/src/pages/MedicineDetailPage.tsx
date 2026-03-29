import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { medicinesAPI } from "@/lib/api";
import { Pill, ArrowLeft, Loader2 } from "lucide-react";

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

const sections = ["About", "Uses", "Dosage", "Warnings", "Precautions", "Side Effects", "Packaging", "Prescription Requirement", "Expert Advice", "Disclaimer"];

const sectionContent: Record<string, (name: string) => string> = {
  About: (n) => `${n} is a widely used medication prescribed by healthcare professionals for various conditions. It belongs to its respective drug class and works by targeting specific receptors in the body.`,
  Uses: (n) => `${n} is commonly used to treat conditions related to its drug class. Your doctor may prescribe this medication based on your specific condition and medical history.`,
  Dosage: (n) => `The typical dosage of ${n} varies depending on the condition being treated, patient age, and overall health. Always follow your doctor's prescription. Do not exceed the recommended dose.`,
  Warnings: (n) => `Do not take ${n} if you are allergic to any of its ingredients. Consult your doctor if you have liver or kidney problems. Avoid alcohol while taking this medication.`,
  Precautions: (n) => `Inform your doctor about all medications you are currently taking before starting ${n}. Pregnant or breastfeeding women should consult their doctor before use.`,
  "Side Effects": (n) => `Common side effects may include nausea, headache, dizziness, and stomach upset. Contact your doctor immediately if you experience severe side effects.`,
  Packaging: (n) => `${n} is available in various packaging sizes. Standard packaging includes blister packs of 10 tablets/capsules per strip.`,
  "Prescription Requirement": (n) => `${n} is a prescription medication. A valid prescription from a licensed medical practitioner is required for purchase.`,
  "Expert Advice": (n) => `Take ${n} exactly as prescribed by your doctor. Do not stop taking the medication without consulting your healthcare provider, even if you feel better.`,
  Disclaimer: () => `This information is for educational purposes only. It is not a substitute for professional medical advice. Always consult your doctor or pharmacist for personalized guidance.`,
};

const MedicineDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      const response = await medicinesAPI.getById(medicineId);

      if (response.data.success) {
        setMedicine(response.data.data);
      } else {
        setError("Medicine not found");
      }
    } catch {
      setError("Failed to load medicine details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
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
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-center py-16">
            <Pill className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Medicine Not Found</h2>
            <p className="text-muted-foreground mb-6">{error || "The medicine you're looking for doesn't exist"}</p>
            <Link
              to="/medicines"
              className="px-6 py-3 rounded-xl hero-gradient text-primary-foreground"
            >
              Browse Medicines
            </Link>
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
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to listing
        </button>

        {/* Nav tabs */}
        <div className="flex flex-wrap gap-2 mb-8 sticky top-16 bg-background py-3 z-10">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Hero */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="w-full md:w-64 h-64 rounded-2xl bg-muted flex items-center justify-center shrink-0">
            <Pill className="w-20 h-20 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-heading font-bold text-foreground">{medicine.name}</h1>
            <p className="text-muted-foreground mt-2">{medicine.description}</p>
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div><span className="text-muted-foreground">Manufacturer:</span> <span className="font-medium text-foreground">{medicine.manufacturer}</span></div>
              <div><span className="text-muted-foreground">Generic Name:</span> <span className="font-medium text-foreground">{medicine.genericName}</span></div>
              <div><span className="text-muted-foreground">Formula:</span> <span className="font-medium text-foreground">{medicine.formula}</span></div>
              <div><span className="text-muted-foreground">Drug Class:</span> <span className="font-medium text-foreground">{medicine.drugClass}</span></div>
              <div><span className="text-muted-foreground">Form:</span> <span className="font-medium text-foreground">{medicine.form}</span></div>
            </div>
          </div>
        </div>

        {/* Sections */}
        {sections.map((s) => (
          <div key={s} ref={(el) => { sectionRefs.current[s] = el; }} className="mb-8 scroll-mt-32">
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">{s}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{sectionContent[s](medicine.name)}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MedicineDetailPage;
