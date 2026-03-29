import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import BookOnlinePage from "./pages/BookOnlinePage";
import BookingConfirmPage from "./pages/BookingConfirmPage";
import PaymentPage from "./pages/PaymentPage";
import HospitalsPage from "./pages/HospitalsPage";
import HospitalDetailPage from "./pages/HospitalDetailPage";
import LabTestsPage from "./pages/LabTestsPage";
import LabDetailPage from "./pages/LabDetailPage";
import MedicinesPage from "./pages/MedicinesPage";
import MedicineDetailPage from "./pages/MedicineDetailPage";
import DiseasesPage from "./pages/DiseasesPage";
import DiseaseDetailPage from "./pages/DiseaseDetailPage";
import BloodDonationPage from "./pages/BloodDonationPage";
import AskQuestionPage from "./pages/AskQuestionPage";
import AllQuestionsPage from "./pages/AllQuestionsPage";
import PartnerPage from "./pages/PartnerPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><RegisterPage /></PageWrapper>} />
        <Route path="/dashboard" element={<PageWrapper><DashboardPage /></PageWrapper>} />
        <Route path="/doctors/:specialty?" element={<PageWrapper><DoctorsPage /></PageWrapper>} />
        <Route path="/doctor/:id" element={<PageWrapper><DoctorProfilePage /></PageWrapper>} />
        <Route path="/doctor/:id/book-online" element={<PageWrapper><BookOnlinePage /></PageWrapper>} />
        <Route path="/booking-confirm" element={<PageWrapper><BookingConfirmPage /></PageWrapper>} />
        <Route path="/payment" element={<PageWrapper><PaymentPage /></PageWrapper>} />
        <Route path="/hospitals" element={<PageWrapper><HospitalsPage /></PageWrapper>} />
        <Route path="/hospital/:id" element={<PageWrapper><HospitalDetailPage /></PageWrapper>} />
        <Route path="/lab-tests" element={<PageWrapper><LabTestsPage /></PageWrapper>} />
        <Route path="/lab/:id" element={<PageWrapper><LabDetailPage /></PageWrapper>} />
        <Route path="/medicines" element={<PageWrapper><MedicinesPage /></PageWrapper>} />
        <Route path="/medicine/:id" element={<PageWrapper><MedicineDetailPage /></PageWrapper>} />
        <Route path="/diseases" element={<PageWrapper><DiseasesPage /></PageWrapper>} />
        <Route path="/disease/:id" element={<PageWrapper><DiseaseDetailPage /></PageWrapper>} />
        <Route path="/blood-donation" element={<PageWrapper><BloodDonationPage /></PageWrapper>} />
        <Route path="/ask-question" element={<PageWrapper><AskQuestionPage /></PageWrapper>} />
        <Route path="/all-questions" element={<PageWrapper><AllQuestionsPage /></PageWrapper>} />
        <Route path="/partner" element={<PageWrapper><PartnerPage /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="sehat-dost-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
