import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Bell, User, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBell from "@/components/NotificationBell";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  showNav?: boolean;
}

const Layout = ({ children, title, showBack = false, showNav = true }: LayoutProps) => {
  const location = useLocation();
  const { profile } = useAuth();

  const userName = profile?.full_name?.split(" ")[0] || "Student";
  
  const navItems = [
    { path: "/dashboard", icon: Home, label: "Home" },
    { path: "/complaints/status", icon: FileText, label: "Complaints" },
    { path: "/announcements", icon: Bell, label: "Updates" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      {(title || showBack) && (
        <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border/50">
          <div className="w-full max-w-7xl mx-auto flex items-center gap-3 px-5 md:px-8 lg:px-12 py-3 md:py-4">
            {showBack && (
              <Link to="/dashboard" className="p-2 -ml-2 rounded-xl hover:bg-secondary/80 transition-all duration-200 active:scale-95">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </Link>
            )}
            {title && (
              <h1 className="text-base md:text-lg lg:text-xl font-bold text-foreground tracking-tight flex-1">{title}</h1>
            )}
            <NotificationBell />
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 pb-24 md:pb-8 ${showNav ? 'md:pt-16' : ''}`}>
        <div className="w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Navigation - mobile only */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
          <div className="bg-card/95 backdrop-blur-lg border-t border-border/50">
            <div className="flex justify-around items-center px-2 py-1.5">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link key={item.path} to={item.path} className="relative flex flex-col items-center gap-0.5 px-5 py-2 rounded-xl transition-all duration-200">
                    {isActive && (
                      <motion.div layoutId="nav-pill" className="absolute inset-0 bg-primary/8 rounded-xl" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                    )}
                    <item.icon className={`w-5 h-5 relative z-10 transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-[10px] font-semibold relative z-10 transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="h-[env(safe-area-inset-bottom)] bg-card/95" />
        </nav>
      )}

      {/* Desktop Top Navigation */}
      {showNav && (
        <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border/50">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-8 lg:px-12 py-3">
            <Link to="/dashboard" className="text-lg font-extrabold text-foreground tracking-tight">
              HostelSphere
            </Link>
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link key={item.path} to={item.path}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 text-sm font-semibold ${
                      isActive ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }`}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <span className="ml-3 text-sm font-semibold text-muted-foreground">
                Hi, {userName}
              </span>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
