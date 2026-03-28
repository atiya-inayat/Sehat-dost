import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/doctors/:specialty?" element={<DoctorsPage />} />
          <Route path="/doctor/:id" element={<DoctorProfilePage />} />
          <Route path="/doctor/:id/book-online" element={<BookOnlinePage />} />
          <Route path="/booking-confirm" element={<BookingConfirmPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/hospitals" element={<HospitalsPage />} />
          <Route path="/hospital/:id" element={<HospitalDetailPage />} />
          <Route path="/lab-tests" element={<LabTestsPage />} />
          <Route path="/lab/:id" element={<LabDetailPage />} />
          <Route path="/medicines" element={<MedicinesPage />} />
          <Route path="/medicine/:id" element={<MedicineDetailPage />} />
          <Route path="/diseases" element={<DiseasesPage />} />
          <Route path="/disease/:id" element={<DiseaseDetailPage />} />
          <Route path="/blood-donation" element={<BloodDonationPage />} />
          <Route path="/ask-question" element={<AskQuestionPage />} />
          <Route path="/all-questions" element={<AllQuestionsPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
