import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, MessageCircle } from "lucide-react";

const AskQuestionPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ askFor: "myself", gender: "Male", location: "", problemType: "", description: "" });

  const handleSubmit = () => {
    if (form.location && form.problemType && form.description) {
      alert("Your question has been submitted! A PMC verified doctor will reply soon.");
      navigate("/all-questions");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-6 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-primary" /> Ask a Question
        </h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Ask for</label>
            <div className="flex gap-2">
              {["myself", "someone else"].map((o) => (
                <button key={o} onClick={() => setForm({ ...form, askFor: o })} className={`px-4 py-2 rounded-lg text-sm font-medium border capitalize transition-colors ${form.askFor === o ? "hero-gradient text-primary-foreground border-transparent" : "border-border text-foreground"}`}>
                  {o}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Gender</label>
            <div className="flex gap-2">
              {["Male", "Female"].map((g) => (
                <button key={g} onClick={() => setForm({ ...form, gender: g })} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${form.gender === g ? "hero-gradient text-primary-foreground border-transparent" : "border-border text-foreground"}`}>
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Location *</label>
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Your city" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Problem Type *</label>
            <input value={form.problemType} onChange={(e) => setForm({ ...form, problemType: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:outline-none" placeholder="e.g. Cardiology, Dermatology" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Problem Description *</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Describe your problem..." />
          </div>
          <button onClick={handleSubmit} className="w-full py-3.5 rounded-xl text-base font-semibold hero-gradient text-primary-foreground hover:opacity-90 transition-opacity">
            Continue
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AskQuestionPage;
