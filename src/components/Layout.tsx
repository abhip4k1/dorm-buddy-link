import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  FileText, 
  Bell,
  User,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  showNav?: boolean;
}

const Layout = ({ children, title, showBack = false, showNav = true }: LayoutProps) => {
  const location = useLocation();
  
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
        <header className="sticky top-0 z-50 glass border-b border-border/50">
          <div className="max-w-lg mx-auto flex items-center gap-3 px-5 py-3.5">
            {showBack && (
              <Link 
                to="/dashboard" 
                className="p-2 -ml-2 rounded-xl hover:bg-secondary/80 transition-all duration-200 active:scale-95"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </Link>
            )}
            {title && (
              <h1 className="text-lg font-bold text-foreground tracking-tight">{title}</h1>
            )}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 pb-24">
        <div className="max-w-lg mx-auto px-5 py-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Navigation */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-50">
          <div className="glass border-t border-border/50">
            <div className="max-w-lg mx-auto flex justify-around items-center px-2 py-2">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative flex flex-col items-center gap-0.5 px-4 py-2 rounded-2xl transition-all duration-300"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 gradient-primary rounded-2xl opacity-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <item.icon 
                      className={`w-5 h-5 transition-all duration-300 ${
                        isActive ? "text-primary scale-110" : "text-muted-foreground"
                      }`} 
                    />
                    <span className={`text-[10px] font-semibold transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-dot"
                        className="w-1 h-1 rounded-full bg-primary mt-0.5"
                        transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
          {/* Safe area spacer for iOS */}
          <div className="h-[env(safe-area-inset-bottom)] bg-card/95" />
        </nav>
      )}
    </div>
  );
};

export default Layout;
