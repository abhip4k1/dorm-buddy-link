import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface QuickAccessCardProps {
  to: string;
  icon: LucideIcon;
  label: string;
  description?: string;
  variant?: "default" | "primary" | "accent" | "warning" | "danger";
  badge?: string;
  index?: number;
}

const iconColorMap = {
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
  badge,
  index = 0
}: QuickAccessCardProps) => {
  const isGradient = variant !== "default";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
    >
      <Link
        to={to}
        className={`relative block p-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.97] group overflow-hidden ${
          isGradient 
            ? variant === "primary" ? "gradient-primary shadow-glow" :
              variant === "accent" ? "gradient-accent shadow-glow-accent" :
              variant === "warning" ? "gradient-warning" :
              "gradient-danger"
            : "bg-card shadow-card hover:shadow-card-hover border border-border/50"
        }`}
      >
        {/* Decorative shimmer */}
        {!isGradient && (
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}

        {badge && (
          <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold rounded-full gradient-accent text-accent-foreground shadow-sm">
            {badge}
          </span>
        )}
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${iconColorMap[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className={`font-bold text-sm tracking-tight ${!isGradient ? "text-foreground" : "text-white"}`}>
          {label}
        </h3>
        {description && (
          <p className={`text-xs mt-0.5 ${!isGradient ? "text-muted-foreground" : "text-white/70"}`}>
            {description}
          </p>
        )}
      </Link>
    </motion.div>
  );
};

export default QuickAccessCard;
