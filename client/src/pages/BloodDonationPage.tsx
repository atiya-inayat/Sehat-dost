import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { bloodRequests } from "@/data/mockData";
import { Droplets, MapPin, Calendar, Building2, User, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";

const ITEMS_PER_PAGE = 8;

const BloodDonationPage = () => {
  const [tab, setTab] = useState<"request" | "donate" | "pending" | "donors">("pending");
  const [page, setPage] = useState(1);
  const [requestForm, setRequestForm] = useState({ bloodGroup: "", units: "", hospital: "", contact: "", urgency: "Normal" });
  const [donateForm, setDonateForm] = useState({ name: "", bloodGroup: "", contact: "", lastDonate: "", city: "", district: "" });
  const [submitted, setSubmitted] = useState(false);

  const totalPages = Math.ceil(bloodRequests.length / ITEMS_PER_PAGE);
  const paginatedRequests = bloodRequests.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const urgencyColor = (u: string) => u === "Critical" ? "text-destructive" : u === "Immediate" ? "text-warning" : "text-success";

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 max-w-md text-center">
          <Droplets className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Submitted Successfully!</h2>
          <p className="text-muted-foreground mb-4">Your request has been recorded.</p>
          <button onClick={() => { setSubmitted(false); setTab("pending"); }} className="text-sm font-semibold text-primary hover:underline">View Requests</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Blood Donation</h1>
        <p className="text-muted-foreground mb-6">Request blood or register as a donor</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { key: "pending", label: "Pending Requests" },
            { key: "request", label: "Need Blood" },
            { key: "donate", label: "Donate Blood" },
            { key: "donors", label: "Ready Donors" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${tab === t.key ? "hero-gradient text-primary-foreground border-transparent" : "border-border bg-card text-foreground hover:bg-muted"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "pending" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {paginatedRequests.map((r) => (
                <div key={r.id} className="bg-card rounded-xl border border-border p-4 card-hover">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="font-medium text-sm text-foreground">{r.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Droplets className="w-5 h-5 text-destructive" />
                    <span className="text-2xl font-heading font-bold text-foreground">{r.bloodGroup}</span>
                    <span className="text-xs text-muted-foreground">({r.units} unit{r.units > 1 ? "s" : ""})</span>
                  </div>
                  <hr className="border-border mb-3" />
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {r.city}</p>
                    <p className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {r.date}</p>
                    <p className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {r.hospital}</p>
                  </div>
                  <div className={`mt-3 flex items-center gap-1 text-xs font-semibold ${urgencyColor(r.urgency)}`}>
                    <AlertTriangle className="w-3 h-3" /> {r.urgency}
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="p-2 rounded-lg border border-border disabled:opacity-30">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)} className={`w-8 h-8 rounded-lg text-sm font-medium ${page === i + 1 ? "hero-gradient text-primary-foreground" : "border border-border text-foreground hover:bg-muted"}`}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-2 rounded-lg border border-border disabled:opacity-30">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {tab === "request" && (
          <div className="max-w-md">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Blood Group *</label>
                <select value={requestForm.bloodGroup} onChange={(e) => setRequestForm({ ...requestForm, bloodGroup: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground">
                  <option value="">Select</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Units Needed *</label>
                <input value={requestForm.units} onChange={(e) => setRequestForm({ ...requestForm, units: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground" placeholder="e.g. 2" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Hospital Name *</label>
                <input value={requestForm.hospital} onChange={(e) => setRequestForm({ ...requestForm, hospital: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground" placeholder="Hospital name" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Contact Number *</label>
                <input value={requestForm.contact} onChange={(e) => setRequestForm({ ...requestForm, contact: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground" placeholder="03XX-XXXXXXX" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Urgency Level</label>
                <div className="flex gap-2">
                  {["Critical", "Immediate", "Normal"].map((u) => (
                    <button key={u} onClick={() => setRequestForm({ ...requestForm, urgency: u })} className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${requestForm.urgency === u ? "hero-gradient text-primary-foreground border-transparent" : "border-border text-foreground"}`}>
                      {u}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setSubmitted(true)} className="w-full py-3.5 rounded-xl text-base font-semibold hero-gradient text-primary-foreground">Submit Request</button>
            </div>
          </div>
        )}

        {tab === "donate" && (
          <div className="max-w-md">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Name *</label>
                <input value={donateForm.name} onChange={(e) => setDonateForm({ ...donateForm, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Blood Group *</label>
                <select value={donateForm.bloodGroup} onChange={(e) => setDonateForm({ ...donateForm, bloodGroup: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground">
                  <option value="">Select</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Contact Number *</label>
                <input value={donateForm.contact} onChange={(e) => setDonateForm({ ...donateForm, contact: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground" placeholder="03XX-XXXXXXX" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Last Time Donated</label>
                <input value={donateForm.lastDonate} onChange={(e) => setDonateForm({ ...donateForm, lastDonate: e.target.value })} type="date" className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">City *</label>
                <input value={donateForm.city} onChange={(e) => setDonateForm({ ...donateForm, city: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground" placeholder="City" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">District</label>
                <input value={donateForm.district} onChange={(e) => setDonateForm({ ...donateForm, district: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground" placeholder="District" />
              </div>
              <button onClick={() => setSubmitted(true)} className="w-full py-3.5 rounded-xl text-base font-semibold hero-gradient text-primary-foreground">Register as Donor</button>
            </div>
          </div>
        )}

        {tab === "donors" && (
          <div className="text-center py-16">
            <Droplets className="w-12 h-12 text-primary mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium text-foreground">Ready Donors</p>
            <p className="text-sm text-muted-foreground">Donor profiles will appear here after registration.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BloodDonationPage;
