import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { diseases, doctors } from "@/data/mockData";
import { AlertTriangle, Activity, Stethoscope, Shield } from "lucide-react";

const DiseaseDetailPage = () => {
  const { id } = useParams();
  let condition: any = null;
  for (const cat of diseases) {
    const found = cat.conditions.find((c) => c.id === id);
    if (found) { condition = found; break; }
  }

  if (!condition) return <div className="min-h-screen flex items-center justify-center">Disease not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">{condition.name}</h1>
        <p className="text-muted-foreground mb-8">{condition.description}</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-heading font-semibold text-foreground flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-warning" /> Symptoms
            </h3>
            <ul className="space-y-1.5">
              {condition.symptoms.map((s: string) => (
                <li key={s} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-heading font-semibold text-foreground flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-destructive" /> Risk Factors
            </h3>
            <ul className="space-y-1.5">
              {condition.riskFactors.map((r: string) => (
                <li key={r} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" /> {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-heading font-semibold text-foreground flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-success" /> Treatment
            </h3>
            <p className="text-sm text-muted-foreground">{condition.treatment}</p>
            <div className="mt-3">
              <p className="text-xs font-medium text-foreground mb-1">Types:</p>
              <div className="flex flex-wrap gap-1">
                {condition.types.map((t: string) => (
                  <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-success/10 text-success font-medium">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-primary" /> Find Doctors for {condition.name}
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {doctors.slice(0, 4).map((d) => (
            <Link key={d.id} to={`/doctor/${d.id}`} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border card-hover">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.specialty} • {d.experience} yrs</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiseaseDetailPage;
