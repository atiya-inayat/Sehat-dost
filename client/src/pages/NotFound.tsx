import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="glass-card rounded-3xl p-12 max-w-lg mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-8"
          >
            <span className="text-6xl font-bold text-primary">404</span>
          </motion.div>

          <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          
          <p className="text-muted-foreground mb-8 text-lg">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold hero-gradient text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              to="/doctors"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Search className="w-5 h-5" />
              Find Doctors
            </Link>
          </div>

          <button
            onClick={() => window.history.back()}
            className="mt-6 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
