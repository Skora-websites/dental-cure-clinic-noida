import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import AboutPage from "@/pages/AboutPage";
import AppointmentPage from "@/pages/AppointmentPage";
import BlogDetailPage from "@/pages/BlogDetailPage";
import BlogPage from "@/pages/BlogPage";
import ContactPage from "@/pages/ContactPage";
import DentistsPage from "@/pages/DentistsPage";
import FaqPage from "@/pages/FaqPage";
import GalleryPage from "@/pages/GalleryPage";
import NotFound from "@/pages/NotFound";
import OffersPage from "@/pages/OffersPage";
import PrivacyPage from "@/pages/PrivacyPage";
import ReviewsPage from "@/pages/ReviewsPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import ServicesPage from "@/pages/ServicesPage";
import TermsPage from "@/pages/TermsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/dentists" element={<DentistsPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/privacy-policy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
