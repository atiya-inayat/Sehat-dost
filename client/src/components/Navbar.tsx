import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ChevronDown, Sun, Moon, Stethoscope, 
  HeartPulse, UserCog, LogIn, UserPlus
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import { doctorsAPI, hospitalsAPI, labsAPI } from "@/lib/api";

const navLinks = [
  { label: "Doctors", path: "/doctors", hasDropdown: true },
  { label: "Hospitals", path: "/hospitals", hasDropdown: true },
  { label: "Lab Tests", path: "/lab-tests", hasDropdown: true },
  { label: "Medicines", path: "/medicines", hasDropdown: false },
  { label: "Diseases", path: "/diseases", hasDropdown: false },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [hospitals, setHospitals] = useState<{ _id: string; name: string }[]>([]);
  const [labs, setLabs] = useState<{ _id: string; name: string }[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [specRes, hospRes, labRes] = await Promise.all([
          doctorsAPI.getSpecialties(),
          hospitalsAPI.getAll({ limit: 5 }),
          labsAPI.getAll({ limit: 5 })
        ]);
        
        if (specRes.data.success) setSpecialties(specRes.data.data);
        if (hospRes.data.success) setHospitals(hospRes.data.data);
        if (labRes.data.success) setLabs(labRes.data.data);
      } catch {
        // Silent fail
      }
    };
    fetchDropdowns();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDropdownItems = (label: string) => {
    if (label === "Doctors") return specialties;
    if (label === "Hospitals") return hospitals.map(h => h.name);
    if (label === "Lab Tests") return labs.map(l => l.name);
    return [];
  };

  const handleDropdownClick = (label: string, item: string) => {
    setOpenDropdown(null);
    if (label === "Doctors") navigate(`/doctors/${encodeURIComponent(item)}`);
    else if (label === "Hospitals") {
      const hospital = hospitals.find(h => h.name === item);
      navigate(`/hospital/${hospital?._id || item}`);
    }
    else if (label === "Lab Tests") {
      const lab = labs.find(l => l.name === item);
      navigate(`/lab/${lab?._id || item}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass-nav">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
            <HeartPulse className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-heading font-bold text-foreground">SehatDost</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              {link.hasDropdown ? (
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted/80 transition-all"
                >
                  {link.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  to={link.path}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted/80 transition-all"
                >
                  {link.label}
                </Link>
              )}
              <AnimatePresence>
                {link.hasDropdown && openDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-60 glass-card rounded-xl shadow-xl py-2 z-50 overflow-hidden"
                  >
                    {getDropdownItems(link.label).map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDropdownClick(link.label, item)}
                        className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted/80 transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                    <div className="border-t border-border mt-2 pt-2">
                      <Link
                        to={link.path}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2 text-sm text-primary font-medium hover:bg-muted/80"
                      >
                        View All →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-muted/80 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
              >
                <UserCog className="w-4 h-4" />
                Dashboard
              </Link>
              <span className="text-sm font-medium text-foreground hidden md:block">{user?.name}</span>
              <button
                onClick={logout}
                className="px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link
                to="/partner"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold hero-gradient text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <UserPlus className="w-4 h-4" />
                Join
              </Link>
            </div>
          )}
          
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/50 bg-card/95 backdrop-blur-lg"
          >
            <div className="px-4 pb-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                        className="w-full flex items-center justify-between py-3 text-sm font-medium text-foreground"
                      >
                        {link.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                      </button>
                      {openDropdown === link.label && (
                        <div className="pl-4 pb-2 space-y-1">
                          {getDropdownItems(link.label).map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => { handleDropdownClick(link.label, item); setMobileOpen(false); }}
                              className="block w-full text-left py-2 text-sm text-muted-foreground hover:text-foreground"
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-sm font-medium text-foreground"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              {!isAuthenticated && (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-sm font-medium text-foreground"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
