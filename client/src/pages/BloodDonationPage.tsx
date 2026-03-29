import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Droplets, MapPin, Calendar, Building2, User, ChevronLeft, ChevronRight, AlertTriangle, Loader2 } from "lucide-react";
import { bloodAPI } from "@/lib/api";
import { mockBloodRequests } from "@/data/mockFallback";
import { toast } from "sonner";

interface BloodRequest {
  _id: string;
  patientName: string;
  bloodGroup: string;
  units: number;
  hospital: string;
  city: string;
  urgency: string;
  status: string;
  createdAt: string;
}

const ITEMS_PER_PAGE = 8;

const BloodDonationPage = () => {
  const [tab, setTab] = useState<"request" | "donate" | "pending" | "donors">("pending");
  const [page, setPage] = useState(1);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [requestForm, setRequestForm] = useState({
    bloodGroup: "",
    units: "",
    patientName: "",
    hospital: "",
    hospitalAddress: "",
    contactPhone: "",
    city: "",
    province: "Punjab",
    urgency: "Normal"
  });
  const [donateForm, setDonateForm] = useState({
    bloodGroup: "",
    contactPhone: "",
    city: "",
    province: "Punjab"
  });

  useEffect(() => {
    if (tab === "pending") {
      fetchBloodRequests();
    }
  }, [tab]);

  const fetchBloodRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bloodAPI.getRequests({ limit: 50 });
      
      if (response.data.success) {
        if (response.data.data && response.data.data.length > 0) {
          setBloodRequests(response.data.data);
        } else {
          setBloodRequests(mockBloodRequests);
        }
      }
    } catch {
      // Fallback to mock data
      setBloodRequests(mockBloodRequests);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRequest = async () => {
    if (!requestForm.bloodGroup || !requestForm.units || !requestForm.hospital || !requestForm.contactPhone || !requestForm.patientName) {
      toast.error("Please fill in all required fields");
      return;
    }

    const phoneRegex = /^03[0-9]{9}$/;
    const cleanedPhone = requestForm.contactPhone.replace(/[-\s]/g, '');
    if (!phoneRegex.test(cleanedPhone)) {
      toast.error("Please enter a valid Pakistani mobile number (03XX-XXXXXXX)");
      return;
    }

    try {
      setSubmitting(true);
      const response = await bloodAPI.createRequest({
        type: "Request",
        bloodGroup: requestForm.bloodGroup,
        units: parseInt(requestForm.units) || 1,
        patientName: requestForm.patientName,
        hospital: requestForm.hospital,
        hospitalAddress: requestForm.hospitalAddress || "",
        contactPhone: cleanedPhone,
        city: requestForm.city || "Lahore",
        province: requestForm.province || "Punjab",
        urgency: requestForm.urgency || "Normal"
      });
      
      if (response.data.success) {
        toast.success("Blood request submitted successfully!");
        setRequestForm({
          bloodGroup: "",
          units: "",
          patientName: "",
          hospital: "",
          hospitalAddress: "",
          contactPhone: "",
          city: "",
          province: "Punjab",
          urgency: "Normal"
        });
        setTab("pending");
        fetchBloodRequests();
      }
    } catch (error: any) {
      console.error("Blood request error:", error.response?.data);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || JSON.stringify(error.response?.data);
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterDonor = async () => {
    if (!donateForm.bloodGroup || !donateForm.contactPhone || !donateForm.city) {
      toast.error("Please fill in all required fields");
      return;
    }

    const phoneRegex = /^03[0-9]{9}$/;
    const cleanedPhone = donateForm.contactPhone.replace(/[-\s]/g, '');
    if (!phoneRegex.test(cleanedPhone)) {
      toast.error("Please enter a valid Pakistani mobile number (03XX-XXXXXXX)");
      return;
    }

    try {
      setSubmitting(true);
      const response = await bloodAPI.registerDonor({
        ...donateForm,
        contactPhone: cleanedPhone
      });
      
      if (response.data.success) {
        toast.success("Registered as donor successfully!");
        setDonateForm({ bloodGroup: "", contactPhone: "", city: "", province: "Punjab" });
        setTab("donors");
      }
    } catch (error: any) {
      console.error("Donor registration error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to register as donor. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const totalPages = Math.ceil(bloodRequests.length / ITEMS_PER_PAGE);
  const paginatedRequests = bloodRequests.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const urgencyColor = (u: string) => {
    if (u === "Critical") return "text-destructive";
    if (u === "Immediate") return "text-warning";
    return "text-success";
  };

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
              onClick={() => setTab(t.key as typeof tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                tab === t.key
                  ? "hero-gradient text-primary-foreground border-transparent"
                  : "border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "pending" && (
          <>
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading requests...</span>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-destructive text-lg font-medium">Error</p>
                <p className="text-muted-foreground">{error}</p>
                <button onClick={fetchBloodRequests} className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
                  Retry
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {paginatedRequests.map((r) => (
                    <div key={r._id} className="bg-card rounded-xl border border-border p-4 card-hover">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-sm text-foreground">{r.patientName}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Droplets className="w-5 h-5 text-destructive" />
                        <span className="text-2xl font-heading font-bold text-foreground">{r.bloodGroup}</span>
                        <span className="text-xs text-muted-foreground">({r.units} unit{r.units > 1 ? "s" : ""})</span>
                      </div>
                      <hr className="border-border mb-3" />
                      <div className="space-y-1.5 text-xs text-muted-foreground">
                        <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {r.city}</p>
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
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="p-2 rounded-lg border border-border disabled:opacity-30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium ${
                          page === i + 1
                            ? "hero-gradient text-primary-foreground"
                            : "border border-border text-foreground hover:bg-muted"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="p-2 rounded-lg border border-border disabled:opacity-30"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {tab === "request" && (
          <div className="max-w-md">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Patient Name *</label>
                <input
                  value={requestForm.patientName}
                  onChange={(e) => setRequestForm({ ...requestForm, patientName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground"
                  placeholder="Patient name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Blood Group *</label>
                <select
                  value={requestForm.bloodGroup}
                  onChange={(e) => setRequestForm({ ...requestForm, bloodGroup: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground"
                >
                  <option value="">Select</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Units Needed *</label>
                <input
                  value={requestForm.units}
                  onChange={(e) => setRequestForm({ ...requestForm, units: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground"
                  placeholder="e.g. 2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Hospital Name *</label>
                <input
                  value={requestForm.hospital}
                  onChange={(e) => setRequestForm({ ...requestForm, hospital: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground"
                  placeholder="Hospital name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Contact Number *</label>
                <input
                  value={requestForm.contactPhone}
                  onChange={(e) => setRequestForm({ ...requestForm, contactPhone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground"
                  placeholder="03XX-XXXXXXX"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">City *</label>
                <input
                  value={requestForm.city}
                  onChange={(e) => setRequestForm({ ...requestForm, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Urgency Level</label>
                <div className="flex gap-2">
                  {["Critical", "Immediate", "Normal"].map((u) => (
                    <button
                      key={u}
                      onClick={() => setRequestForm({ ...requestForm, urgency: u })}
                      className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        requestForm.urgency === u
                          ? "hero-gradient text-primary-foreground border-transparent"
                          : "border-border text-foreground"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleSubmitRequest}
                disabled={submitting}
                className="w-full py-3.5 rounded-xl text-base font-semibold hero-gradient text-primary-foreground disabled:opacity-50"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Submit Request"}
              </button>
            </div>
          </div>
        )}

        {tab === "donate" && (
          <div className="max-w-md">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Blood Group *</label>
                <select
                  value={donateForm.bloodGroup}
                  onChange={(e) => setDonateForm({ ...donateForm, bloodGroup: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground"
                >
                  <option value="">Select</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Contact Number *</label>
                <input
                  value={donateForm.contactPhone}
                  onChange={(e) => setDonateForm({ ...donateForm, contactPhone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground"
                  placeholder="03XX-XXXXXXX"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">City *</label>
                <input
                  value={donateForm.city}
                  onChange={(e) => setDonateForm({ ...donateForm, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground"
                  placeholder="City"
                />
              </div>
              <button
                onClick={handleRegisterDonor}
                disabled={submitting}
                className="w-full py-3.5 rounded-xl text-base font-semibold hero-gradient text-primary-foreground disabled:opacity-50"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Register as Donor"}
              </button>
            </div>
          </div>
        )}

        {tab === "donors" && (
          <div className="text-center py-16">
            <Droplets className="w-12 h-12 text-primary mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium text-foreground">Ready Donors</p>
            <p className="text-sm text-muted-foreground">Register to become a donor and help save lives.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BloodDonationPage;
