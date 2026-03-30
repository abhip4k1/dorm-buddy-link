import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NewComplaint from "./pages/NewComplaint";
import ComplaintStatus from "./pages/ComplaintStatus";
import FeeStatus from "./pages/FeeStatus";
import GatePass from "./pages/GatePass";
import Announcements from "./pages/Announcements";
import MessMenu from "./pages/MessMenu";
import LostFound from "./pages/LostFound";
import Emergency from "./pages/Emergency";
import Feedback from "./pages/Feedback";
import FAQs from "./pages/FAQs";
import Profile from "./pages/Profile";
import HealthAppointment from "./pages/HealthAppointment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/complaints/new" element={<NewComplaint />} />
          <Route path="/complaints/status" element={<ComplaintStatus />} />
          <Route path="/fee-status" element={<FeeStatus />} />
          <Route path="/gate-pass" element={<GatePass />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/mess-menu" element={<MessMenu />} />
          <Route path="/lost-found" element={<LostFound />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/health" element={<HealthAppointment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
