import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Stethoscope } from "lucide-react";
import { specialties } from "@/data/mockData";

const navLinks = [
  { label: "Doctors", path: "/doctors", hasDropdown: true },
  { label: "Hospitals", path: "/hospitals", hasDropdown: true },
  { label: "Lab Tests", path: "/lab-tests", hasDropdown: true },
  { label: "Medicines", path: "/medicines", hasDropdown: false },
  { label: "Diseases", path: "/diseases", hasDropdown: false },
];

const hospitalNames = ["Doctors Hospital", "Shifa International Hospital", "Aga Khan University Hospital"];
const labNames = ["Chughtai Lab", "Shaukat Khanum Lab", "Excel Lab"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
    if (label === "Hospitals") return hospitalNames;
    if (label === "Lab Tests") return labNames;
    return [];
  };

  const handleDropdownClick = (label: string, item: string) => {
    setOpenDropdown(null);
    if (label === "Doctors") navigate(`/doctors/${encodeURIComponent(item)}`);
    else if (label === "Hospitals") navigate(`/hospital/${item === "Doctors Hospital" ? "1" : item === "Shifa International Hospital" ? "2" : "3"}`);
    else if (label === "Lab Tests") navigate(`/lab/${item === "Chughtai Lab" ? "1" : item === "Shaukat Khanum Lab" ? "2" : "3"}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="public/logo.png" className="w-full h-16 " />

        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              {link.hasDropdown ? (
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  to={link.path}
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                </Link>
              )}
              {link.hasDropdown && openDropdown === link.label && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                  {getDropdownItems(link.label).map((item) => (
                    <button
                      key={item}
                      onClick={() => handleDropdownClick(link.label, item)}
                      className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/partner"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold hero-gradient text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Join as a Doctor
          </Link>
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 pb-4">
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
                    <div className="pl-4 pb-2">
                      {getDropdownItems(link.label).map((item) => (
                        <button
                          key={item}
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
          <Link
            to="/partner"
            onClick={() => setMobileOpen(false)}
            className="block mt-2 text-center px-4 py-2 rounded-lg text-sm font-semibold hero-gradient text-primary-foreground"
          >
            Join as a Doctor
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
