import React, { useState, ChangeEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Stethoscope, Check, ShieldCheck, Briefcase,
  MapPin, AlertCircle, FileText, Camera, DollarSign
} from "lucide-react";

// 1. Comprehensive Data Structure
interface DoctorOnboarding {
  // Personal & Legal
  fullName: string;
  pmdcNumber: string;
  cnic: string;
  email: string;
  phone: string;
  // Professional
  degree: string;
  specialization: string;
  experienceYears: string;
  bio: string;
  services: string; // e.g., "Root Canal, Teeth Whitening"
  // Practice
  clinicName: string;
  clinicAddress: string;
  physicalFee: string;
  videoFee: string;
}

const JoinDoctorPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof DoctorOnboarding, string>>>({});

  const [form, setForm] = useState<DoctorOnboarding>({
    fullName: "", pmdcNumber: "", cnic: "", email: "", phone: "",
    degree: "", specialization: "", experienceYears: "", bio: "", services: "",
    clinicName: "", clinicAddress: "", physicalFee: "", videoFee: ""
  });

  const validate = (): boolean => {
    let newErrors: Partial<Record<keyof DoctorOnboarding, string>> = {};
    // Check all required fields
    (Object.keys(form) as Array<keyof DoctorOnboarding>).forEach((key) => {
      if (!form[key].trim()) newErrors[key] = "Required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof DoctorOnboarding]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const inputStyle = (fieldName: keyof DoctorOnboarding) => `
    w-full px-4 py-3 rounded-xl border bg-card text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-all
    ${errors[fieldName] ? "border-destructive ring-1 ring-destructive" : "border-border"}
  `;

  const labelStyle = "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 ml-1 flex items-center gap-1";

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-card border border-border p-10 rounded-[2.5rem] text-center shadow-2xl">
            <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
               <Check className="w-12 h-12 text-success" />
            </div>
            <h2 className="text-3xl font-bold mb-3 tracking-tight">Application Filed</h2>
            <p className="text-muted-foreground leading-relaxed">
              Dr. {form.fullName}, your credentials have been sent to our medical verification board.
              Check your email (<strong>{form.email}</strong>) for the next steps.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex-grow py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 mb-6">
              <Stethoscope className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-black tracking-tight mb-3">Join our Provider Network</h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Register your practice and start consulting with patients across the country.
            </p>
          </div>

          {Object.keys(errors).length > 0 && (
            <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-center gap-3 text-destructive font-bold animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={20} />
              <span>Please complete all required professional details.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* 1. Identity & Credentials */}
            <section className="bg-card p-8 rounded-[2rem] border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
                <ShieldCheck className="text-primary" size={24} />
                <h2 className="text-xl font-bold">Identity & Verification</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className={labelStyle}>Full Name (As per License) *</label>
                  <input name="fullName" className={inputStyle("fullName")} value={form.fullName} onChange={handleChange} placeholder="e.g. Dr. Muhammad Ali" />
                </div>
                <div>
                  <label className={labelStyle}>PMDC / PMC Number *</label>
                  <input name="pmdcNumber" className={inputStyle("pmdcNumber")} value={form.pmdcNumber} onChange={handleChange} placeholder="12345-P" />
                </div>
                <div>
                  <label className={labelStyle}>CNIC Number *</label>
                  <input name="cnic" className={inputStyle("cnic")} value={form.cnic} onChange={handleChange} placeholder="42101-XXXXXXX-X" />
                </div>
                <div>
                  <label className={labelStyle}>Email Address *</label>
                  <input name="email" type="email" className={inputStyle("email")} value={form.email} onChange={handleChange} placeholder="doctor@hospital.com" />
                </div>
                <div>
                  <label className={labelStyle}>Contact Number *</label>
                  <input name="phone" className={inputStyle("phone")} value={form.phone} onChange={handleChange} placeholder="03XXXXXXXXX" />
                </div>
              </div>
            </section>

            {/* 2. Professional Profile */}
            <section className="bg-card p-8 rounded-[2rem] border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
                <Briefcase className="text-primary" size={24} />
                <h2 className="text-xl font-bold">Clinical Profile</h2>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyle}>Primary Degree *</label>
                    <input name="degree" className={inputStyle("degree")} value={form.degree} onChange={handleChange} placeholder="MBBS, BDS, etc." />
                  </div>
                  <div>
                    <label className={labelStyle}>Specialization *</label>
                    <input name="specialization" className={inputStyle("specialization")} value={form.specialization} onChange={handleChange} placeholder="e.g. Cardiologist" />
                  </div>
                </div>
                <div>
                  <label className={labelStyle}>Years of Experience *</label>
                  <input name="experienceYears" type="number" className={inputStyle("experienceYears")} value={form.experienceYears} onChange={handleChange} />
                </div>
                <div>
                  <label className={labelStyle}>Professional Bio *</label>
                  <textarea name="bio" className={`${inputStyle("bio")} h-32 resize-none`} value={form.bio} onChange={handleChange} placeholder="Briefly describe your clinical expertise..." />
                </div>
                <div>
                  <label className={labelStyle}>Services Offered *</label>
                  <input name="services" className={inputStyle("services")} value={form.services} onChange={handleChange} placeholder="e.g. Echocardiography, Surgery, Consultations" />
                </div>
              </div>
            </section>

            {/* 3. Practice Details */}
            <section className="bg-card p-8 rounded-[2rem] border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
                <MapPin className="text-primary" size={24} />
                <h2 className="text-xl font-bold">Clinic & Fees</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className={labelStyle}>Clinic / Hospital Name *</label>
                  <input name="clinicName" className={inputStyle("clinicName")} value={form.clinicName} onChange={handleChange} />
                </div>
                <div>
                  <label className={labelStyle}>Physical Address *</label>
                  <input name="clinicAddress" className={inputStyle("clinicAddress")} value={form.clinicAddress} onChange={handleChange} placeholder="Complete Street Address" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyle}><DollarSign size={14} /> Physical Visit Fee *</label>
                    <input name="physicalFee" type="number" className={inputStyle("physicalFee")} value={form.physicalFee} onChange={handleChange} placeholder="PKR" />
                  </div>
                  <div>
                    <label className={labelStyle}><Camera size={14} /> Video Consult Fee *</label>
                    <input name="videoFee" type="number" className={inputStyle("videoFee")} value={form.videoFee} onChange={handleChange} placeholder="PKR" />
                  </div>
                </div>
              </div>
            </section>

            <button
              type="submit"
              className="w-full py-5 rounded-[1.5rem] text-xl font-black hero-gradient text-white shadow-xl hover:scale-[1.01] transition-all active:scale-[0.98]"
            >
              Submit Onboarding Application
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JoinDoctorPage;
