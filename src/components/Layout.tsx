import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  FileText, 
  Bell, 
  User,
  ArrowLeft
} from "lucide-react";

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
        <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3">
          <div className="max-w-lg mx-auto flex items-center gap-3">
            {showBack && (
              <Link 
                to="/dashboard" 
                className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </Link>
            )}
            {title && (
              <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            )}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 pb-20">
        <div className="max-w-lg mx-auto px-4 py-4">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
          <div className="max-w-lg mx-auto flex justify-around items-center py-2">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "scale-110" : ""} transition-transform`} />
                  <span className="text-xs font-medium">{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 w-12 h-0.5 gradient-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
