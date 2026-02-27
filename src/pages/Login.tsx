import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Eye, EyeOff, Building2, Wifi, Shield } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Section with illustration area */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[hsl(230,65%,48%)] pt-12 pb-16 px-6">
        {/* Decorative shapes */}
        <div className="absolute top-6 right-6 w-20 h-20 rounded-full border-2 border-white/10" />
        <div className="absolute top-16 right-16 w-8 h-8 rounded-full bg-white/10" />
        <div className="absolute bottom-8 left-6 w-14 h-14 rounded-2xl bg-white/5 rotate-12" />
        
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-lg mx-auto"
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">HostelSphere</h1>
              <p className="text-white/50 text-xs font-semibold">Parul University</p>
            </div>
          </div>
          
          <h2 className="text-white text-3xl font-bold leading-tight mb-1">
            Welcome Back! 👋
          </h2>
          <p className="text-white/50 text-sm font-medium">
            Sign in to your hostel account
          </p>

          {/* Feature chips */}
          <div className="flex gap-2 mt-5 flex-wrap">
            {[
              { icon: Shield, text: "Secure" },
              { icon: Wifi, text: "24/7 Access" },
              { icon: Building2, text: "Smart Campus" },
            ].map((chip) => (
              <div key={chip.text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/70 text-[11px] font-semibold">
                <chip.icon className="w-3 h-3" />
                {chip.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Form Section - pulled up over the hero */}
      <div className="flex-1 px-5 -mt-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="max-w-lg mx-auto"
        >
          <div className="bg-card rounded-2xl shadow-lg p-6 border border-border/60">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="enrollmentId" className="text-foreground font-semibold text-sm">
                  Enrollment ID
                </Label>
                <Input
                  id="enrollmentId"
                  type="text"
                  placeholder="e.g. 2303031240145 or guest"
                  value={enrollmentId}
                  onChange={(e) => setEnrollmentId(e.target.value)}
                  className="h-12 bg-background border border-border rounded-xl text-sm px-4"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-foreground font-semibold text-sm">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-background border border-border rounded-xl text-sm px-4 pr-12"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="button" className="text-xs text-primary font-semibold">
                  Forgot Password?
                </button>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-12 rounded-xl gradient-primary text-base font-bold shadow-glow"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-5 pt-4 border-t border-border/50">
              <p className="text-center text-xs text-muted-foreground">
                Demo: <span className="font-bold text-foreground">guest</span> / <span className="font-bold text-foreground">demo@123</span>
              </p>
            </div>
          </div>

          {/* Contact footer */}
          <div className="mt-4 flex gap-3">
            <div className="flex-1 bg-card rounded-xl p-3 border border-border/60">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Hostel Office</p>
              <p className="text-xs font-bold text-foreground mt-0.5">+91 265 2395555</p>
            </div>
            <div className="flex-1 bg-card rounded-xl p-3 border border-border/60">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Email</p>
              <p className="text-xs font-bold text-foreground mt-0.5 truncate">hostel@pu.ac.in</p>
            </div>
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
