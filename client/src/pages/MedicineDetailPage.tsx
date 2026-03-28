import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { medicines } from "@/data/mockData";
import { Pill } from "lucide-react";
import { useRef } from "react";

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
  const medicine = medicines.find((m) => m.id === id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  if (!medicine) return <div className="min-h-screen flex items-center justify-center">Medicine not found</div>;

  const scrollTo = (section: string) => {
    sectionRefs.current[section]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
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
