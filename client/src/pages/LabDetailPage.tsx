import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { labs } from "@/data/mockData";
import { TestTube, Check, ShoppingCart } from "lucide-react";

const LabDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const lab = labs.find((l) => l.id === id);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [showAppointment, setShowAppointment] = useState(location.state?.mode === "appointment");
  const [formData, setFormData] = useState({ name: "", mobile: "", prescription: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!lab) return <div className="min-h-screen flex items-center justify-center">Lab not found</div>;

  const toggleTest = (name: string) => {
    setSelectedTests((prev) => prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]);
  };

  const total = lab.tests.filter((t) => selectedTests.includes(t.name)).reduce((sum, t) => sum + t.price, 0);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Appointment Confirmed!</h2>
          <div className="bg-card rounded-xl border border-border p-4 mt-4 text-sm text-left">
            <p><span className="text-muted-foreground">Name:</span> <span className="text-foreground font-medium">{formData.name}</span></p>
            <p className="mt-1"><span className="text-muted-foreground">Phone:</span> <span className="text-foreground font-medium">{formData.mobile}</span></p>
            <p className="mt-1"><span className="text-muted-foreground">Lab:</span> <span className="text-foreground font-medium">{lab.name}</span></p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (showAppointment) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-md">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Book Appointment — {lab.name}</h1>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Name *</label>
              <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Mobile Number *</label>
              <input value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:outline-none" placeholder="03XX-XXXXXXX" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Prescription (optional)</label>
              <textarea value={formData.prescription} onChange={(e) => setFormData({ ...formData, prescription: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:outline-none" rows={3} placeholder="Upload or describe prescription" />
            </div>
            <button
              onClick={() => formData.name && formData.mobile && setSubmitted(true)}
              disabled={!formData.name || !formData.mobile}
              className="w-full py-3.5 rounded-xl text-base font-semibold hero-gradient text-primary-foreground disabled:opacity-50"
            >
              Confirm Appointment
            </button>
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
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
            <TestTube className="w-6 h-6 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground">{lab.name} — Test Prices</h1>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          {lab.tests.map((t) => (
            <button
              key={t.name}
              onClick={() => toggleTest(t.name)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${selectedTests.includes(t.name) ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted"}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedTests.includes(t.name) ? "bg-primary border-primary" : "border-border"}`}>
                  {selectedTests.includes(t.name) && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <span className="text-sm font-medium text-foreground">{t.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">Rs. {t.price}</span>
            </button>
          ))}
        </div>

        {selectedTests.length > 0 && (
          <div className="sticky bottom-4 bg-card rounded-2xl border border-primary shadow-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{selectedTests.length} test(s) selected</p>
              <p className="text-xl font-heading font-bold text-foreground">Rs. {total}</p>
            </div>
            <button
              onClick={() => setShowAppointment(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold hero-gradient text-primary-foreground"
            >
              <ShoppingCart className="w-4 h-4" /> Book
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LabDetailPage;
