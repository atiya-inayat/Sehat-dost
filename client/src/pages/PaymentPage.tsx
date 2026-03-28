import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Smartphone, Building2, CreditCard } from "lucide-react";
import { useState } from "react";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor, date, time, patient } = (location.state as any) || {};
  const [method, setMethod] = useState("");

  if (!doctor) return <div className="min-h-screen flex items-center justify-center">No payment info</div>;

  const methods = [
    { id: "easypaisa", label: "Easypaisa", icon: Smartphone },
    { id: "jazzcash", label: "JazzCash", icon: Smartphone },
    { id: "bank", label: "Bank Transfer", icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Payment</h1>

        <div className="bg-card rounded-xl border border-border p-4 mb-6 text-sm">
          <p className="font-medium text-foreground">{doctor.name}</p>
          <p className="text-muted-foreground">{date} • {time}</p>
          <p className="text-muted-foreground">Patient: {patient?.name}</p>
        </div>

        <h3 className="font-heading font-semibold text-foreground mb-3">Select Payment Method</h3>
        <div className="flex flex-col gap-3 mb-8">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`flex items-center gap-3 px-4 py-4 rounded-xl border text-left transition-colors ${method === m.id ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted"}`}
            >
              <m.icon className={`w-5 h-5 ${method === m.id ? "text-primary" : "text-muted-foreground"}`} />
              <span className="font-medium text-foreground">{m.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-muted rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-muted-foreground">Amount to Pay</p>
          <p className="text-3xl font-heading font-bold text-foreground">Rs. {doctor.fee}</p>
        </div>

        <button
          disabled={!method}
          onClick={() => alert("Payment successful! Your appointment is confirmed.")}
          className="w-full py-3.5 rounded-xl text-base font-semibold hero-gradient text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Pay Now — Rs. {doctor.fee}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
