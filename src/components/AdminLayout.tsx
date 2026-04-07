import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, MessageSquare, DoorOpen, Megaphone, Stethoscope,
  UtensilsCrossed, AlertTriangle, Star, Users, LogOut, ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

const sidebarItems = [
  { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/complaints", icon: MessageSquare, label: "Complaints" },
  { path: "/admin/gate-passes", icon: DoorOpen, label: "Gate Passes" },
  { path: "/admin/announcements", icon: Megaphone, label: "Announcements" },
  { path: "/admin/doctors", icon: Stethoscope, label: "Doctors & Slots" },
  { path: "/admin/mess-menu", icon: UtensilsCrossed, label: "Mess Menu" },
  { path: "/admin/emergency", icon: AlertTriangle, label: "Emergencies" },
  { path: "/admin/feedback", icon: Star, label: "Feedback" },
  { path: "/admin/students", icon: Users, label: "Students" },
];

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const location = useLocation();
  const { signOut, profile } = useAuth();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border/50 fixed inset-y-0 left-0 z-40">
        <div className="p-5 border-b border-border/50">
          <Link to="/admin" className="text-lg font-extrabold text-foreground tracking-tight">
            HostelSphere
          </Link>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border/50 space-y-1">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Student View
          </Link>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/admin" className="text-base font-extrabold text-foreground">
            HostelSphere <span className="text-xs font-medium text-muted-foreground">Admin</span>
          </Link>
          <Link to="/dashboard" className="text-xs font-medium text-primary">Student View</Link>
        </div>
        <div className="flex overflow-x-auto gap-1 px-3 pb-2 scrollbar-hide">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                <item.icon className="w-3 h-3" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 md:ml-64 pt-24 md:pt-0">
        <div className="p-5 md:p-8 lg:p-10 max-w-7xl">
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl font-bold text-foreground mb-6"
            >
              {title}
            </motion.h1>
          )}
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
