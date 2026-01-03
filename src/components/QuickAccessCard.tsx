import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface QuickAccessCardProps {
  to: string;
  icon: LucideIcon;
  label: string;
  description?: string;
  variant?: "default" | "primary" | "accent" | "warning" | "danger";
  badge?: string;
}

const variantStyles = {
  default: "bg-card hover:shadow-card-hover",
  primary: "gradient-primary text-primary-foreground hover:shadow-glow",
  accent: "gradient-accent text-accent-foreground hover:shadow-glow-accent",
  warning: "gradient-warning text-warning-foreground",
  danger: "gradient-danger text-destructive-foreground",
};

const iconBgStyles = {
  default: "bg-primary/10 text-primary",
  primary: "bg-primary-foreground/20 text-primary-foreground",
  accent: "bg-accent-foreground/20 text-accent-foreground",
  warning: "bg-warning-foreground/20 text-warning-foreground",
  danger: "bg-destructive-foreground/20 text-destructive-foreground",
};

const QuickAccessCard = ({ 
  to, 
  icon: Icon, 
  label, 
  description,
  variant = "default",
  badge
}: QuickAccessCardProps) => {
  return (
    <Link
      to={to}
      className={`relative block p-4 rounded-xl shadow-card transition-all duration-300 transform hover:-translate-y-1 ${variantStyles[variant]}`}
    >
      {badge && (
        <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-accent text-accent-foreground">
          {badge}
        </span>
      )}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${iconBgStyles[variant]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className={`font-semibold text-sm ${variant === "default" ? "text-foreground" : ""}`}>
        {label}
      </h3>
      {description && (
        <p className={`text-xs mt-1 ${variant === "default" ? "text-muted-foreground" : "opacity-80"}`}>
          {description}
        </p>
      )}
    </Link>
  );
};

export default QuickAccessCard;
