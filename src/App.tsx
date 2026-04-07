import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
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
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminComplaints from "./pages/admin/AdminComplaints";
import AdminGatePasses from "./pages/admin/AdminGatePasses";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminDoctors from "./pages/admin/AdminDoctors";
import AdminMessMenu from "./pages/admin/AdminMessMenu";
import AdminEmergency from "./pages/admin/AdminEmergency";
import AdminFeedback from "./pages/admin/AdminFeedback";
import AdminStudents from "./pages/admin/AdminStudents";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/complaints/new" element={<ProtectedRoute><NewComplaint /></ProtectedRoute>} />
            <Route path="/complaints/status" element={<ProtectedRoute><ComplaintStatus /></ProtectedRoute>} />
            <Route path="/fee-status" element={<ProtectedRoute><FeeStatus /></ProtectedRoute>} />
            <Route path="/gate-pass" element={<ProtectedRoute><GatePass /></ProtectedRoute>} />
            <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
            <Route path="/mess-menu" element={<ProtectedRoute><MessMenu /></ProtectedRoute>} />
            <Route path="/lost-found" element={<ProtectedRoute><LostFound /></ProtectedRoute>} />
            <Route path="/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
            <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
            <Route path="/faqs" element={<ProtectedRoute><FAQs /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/health" element={<ProtectedRoute><HealthAppointment /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
