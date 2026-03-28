import { Link } from "react-router-dom";
import { Stethoscope, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="deep-bg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img src="public/logo.png" className=" h-16 mix-blend-multiply mr-auto object-contain
 " />

            </Link>
            <p className="text-sm opacity-80 leading-relaxed">
              Pakistan's trusted healthcare platform connecting patients with verified doctors, hospitals, and medical services.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-deep-foreground">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Find Doctors", to: "/doctors" },
                { label: "Hospitals", to: "/hospitals" },
                { label: "Lab Tests", to: "/lab-tests" },
                { label: "Medicines", to: "/medicines" },
                { label: "Diseases", to: "/diseases" },
              ].map((l) => (
                <Link key={l.label} to={l.to} className="text-sm opacity-80 hover:opacity-100 transition-opacity text-deep-foreground">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-deep-foreground">Services</h4>
            <div className="flex flex-col gap-2">
              {["Blood Donation", "Ask a Doctor", "Partner With Us"].map((s, i) => (
                <Link
                  key={s}
                  to={i === 0 ? "/blood-donation" : i === 1 ? "/ask-question" : "/partner"}
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity text-deep-foreground"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-deep-foreground">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm opacity-80 text-deep-foreground">
                <Phone className="w-4 h-4" /> 0800-SEHAT (73428)
              </div>
              <div className="flex items-center gap-2 text-sm opacity-80 text-deep-foreground">
                <Mail className="w-4 h-4" /> info@sehatdost.pk
              </div>
              <div className="flex items-center gap-2 text-sm opacity-80 text-deep-foreground">
                <MapPin className="w-4 h-4" /> Lahore, Pakistan
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary/30 text-center text-sm opacity-70 text-deep-foreground">
          © 2026 SehatDost. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
