import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Eye, EyeOff, Building2, Wifi, Shield, Sparkles, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [enrollmentId, setEnrollmentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (enrollmentId === "guest" && password === "demo@123") {
      navigate("/dashboard");
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please use enrollment: guest, password: demo@123",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/8 blur-3xl"
        />
        <motion.div 
          animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0], scale: [1, 0.9, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-accent/6 blur-3xl"
        />
        <motion.div 
          animate={{ x: [0, 20, -15, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[hsl(var(--feature-teal)/0.06)] blur-3xl"
        />
      </div>

      {/* Top Section */}
      <div className="relative pt-14 pb-8 px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto"
        >
          {/* Logo */}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-16 h-16 rounded-3xl gradient-primary shadow-glow flex items-center justify-center mb-4 relative">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-3xl gradient-primary"
              />
              <GraduationCap className="w-8 h-8 text-primary-foreground relative z-10" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              Hostel<span className="text-gradient">Sphere</span>
            </h1>
            <p className="text-muted-foreground text-sm font-medium mt-0.5">Parul University</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-foreground text-3xl font-bold leading-tight mb-2">
              Welcome back! 
              <motion.span 
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block ml-2 origin-[70%_70%]"
              >
                👋
              </motion.span>
            </h2>
            <p className="text-muted-foreground text-sm font-medium">
              Sign in to manage your hostel life
            </p>
          </motion.div>

          {/* Animated feature pills */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex gap-2 mt-5 flex-wrap"
          >
            {[
              { icon: Shield, text: "Secure Login", gradient: "gradient-primary" },
              { icon: Wifi, text: "24/7 Access", gradient: "gradient-teal" },
              { icon: Building2, text: "Smart Campus", gradient: "gradient-purple" },
            ].map((chip, i) => (
              <motion.div 
                key={chip.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border/60 shadow-xs"
              >
                <div className={`w-4 h-4 rounded-full ${chip.gradient} flex items-center justify-center`}>
                  <chip.icon className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-[11px] font-semibold text-foreground">{chip.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Form Section */}
      <div className="flex-1 px-5 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-lg mx-auto"
        >
          <div className="bg-card rounded-3xl shadow-lg p-6 border border-border/60 relative overflow-hidden">
            {/* Decorative corner gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
            
            <form onSubmit={handleLogin} className="space-y-5 relative">
              <div className="space-y-1.5">
                <Label htmlFor="enrollmentId" className="text-foreground font-semibold text-sm flex items-center gap-1.5">
                  <span className="text-base">🎓</span> Enrollment ID
                </Label>
                <Input
                  id="enrollmentId"
                  type="text"
                  placeholder="e.g. 2303031240145 or guest"
                  value={enrollmentId}
                  onChange={(e) => setEnrollmentId(e.target.value)}
                  className="h-12 bg-secondary/50 border-0 rounded-xl text-sm px-4 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-foreground font-semibold text-sm flex items-center gap-1.5">
                  <span className="text-base">🔑</span> Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-secondary/50 border-0 rounded-xl text-sm px-4 pr-12 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="button" className="text-xs text-primary font-semibold hover:underline underline-offset-2 transition-all">
                  Forgot Password?
                </button>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-13 rounded-2xl gradient-primary text-base font-bold shadow-glow hover:shadow-xl hover:brightness-110 active:scale-[0.98] transition-all duration-200 group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>

            {/* Demo credentials card */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-5 p-3.5 rounded-2xl bg-primary/5 border border-primary/10"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-primary">Demo Access</span>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">ID</p>
                  <p className="text-sm font-bold text-foreground font-mono">guest</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Password</p>
                  <p className="text-sm font-bold text-foreground font-mono">demo@123</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact cards */}
          <div className="mt-4 flex gap-3">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex-1 bg-card rounded-2xl p-3.5 border border-border/60 shadow-xs"
            >
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">📞 Hostel Office</p>
              <p className="text-xs font-bold text-foreground mt-1">+91 265 2395555</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex-1 bg-card rounded-2xl p-3.5 border border-border/60 shadow-xs"
            >
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">✉️ Email</p>
              <p className="text-xs font-bold text-foreground mt-1 truncate">hostel@pu.ac.in</p>
            </motion.div>
          </div>

          <p className="text-center text-[10px] text-muted-foreground mt-5 pb-6">
            Parul University, Vadodara • © 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
