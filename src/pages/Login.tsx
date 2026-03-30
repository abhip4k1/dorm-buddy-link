import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Eye, EyeOff, Building2, Wifi, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [enrollmentId, setEnrollmentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollmentId || !password) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: enrollmentId,
      password,
    });

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Top/Left Section with illustration area */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[hsl(230,65%,48%)] pt-12 pb-16 px-6 lg:w-1/2 lg:min-h-screen lg:flex lg:items-center lg:pb-12">
        {/* Decorative shapes */}
        <div className="absolute top-6 right-6 w-20 h-20 lg:w-32 lg:h-32 rounded-full border-2 border-white/10" />
        <div className="absolute top-16 right-16 w-8 h-8 lg:w-14 lg:h-14 rounded-full bg-white/10" />
        <div className="absolute bottom-8 left-6 w-14 h-14 lg:w-24 lg:h-24 rounded-2xl bg-white/5 rotate-12" />
        
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-lg mx-auto lg:max-w-xl"
        >
          <div className="flex items-center gap-3 mb-10 lg:mb-14">
            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-white/15 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl lg:text-3xl font-extrabold text-white tracking-tight">HostelSphere</h1>
              <p className="text-white/50 text-xs lg:text-sm font-semibold">Parul University</p>
            </div>
          </div>
          
          <h2 className="text-white text-3xl lg:text-5xl font-bold leading-tight mb-1 lg:mb-3">
            Welcome Back! 👋
          </h2>
          <p className="text-white/50 text-sm lg:text-lg font-medium">
            Sign in to your hostel account
          </p>

          {/* Feature chips */}
          <div className="flex gap-2 md:gap-3 mt-5 lg:mt-8 flex-wrap">
            {[
              { icon: Shield, text: "Secure" },
              { icon: Wifi, text: "24/7 Access" },
              { icon: Building2, text: "Smart Campus" },
            ].map((chip) => (
              <div key={chip.text} className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 text-white/70 text-[11px] md:text-sm font-semibold">
                <chip.icon className="w-3 h-3 md:w-4 md:h-4" />
                {chip.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Form Section */}
      <div className="flex-1 px-5 -mt-6 lg:mt-0 relative z-10 lg:flex lg:items-center lg:justify-center lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="w-full max-w-lg mx-auto lg:max-w-md"
        >
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 border border-border/60">
            <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="enrollmentId" className="text-foreground font-semibold text-sm md:text-base">
                  Email
                </Label>
                <Input
                  id="enrollmentId"
                  type="email"
                  placeholder="you@example.com"
                  value={enrollmentId}
                  onChange={(e) => setEnrollmentId(e.target.value)}
                  className="h-12 md:h-14 bg-background border border-border rounded-xl text-sm md:text-base px-4"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-foreground font-semibold text-sm md:text-base">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 md:h-14 bg-background border border-border rounded-xl text-sm md:text-base px-4 pr-12"
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
                <button type="button" className="text-xs md:text-sm text-primary font-semibold">
                  Forgot Password?
                </button>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-12 md:h-14 rounded-xl gradient-primary text-base font-bold shadow-glow"
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

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary font-semibold hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>

          {/* Contact footer */}
          <div className="mt-4 flex gap-3">
            <div className="flex-1 bg-card rounded-xl p-3 md:p-4 border border-border/60">
              <p className="text-[10px] md:text-xs text-muted-foreground font-semibold uppercase tracking-wider">Hostel Office</p>
              <p className="text-xs md:text-sm font-bold text-foreground mt-0.5">+91 265 2395555</p>
            </div>
            <div className="flex-1 bg-card rounded-xl p-3 md:p-4 border border-border/60">
              <p className="text-[10px] md:text-xs text-muted-foreground font-semibold uppercase tracking-wider">Email</p>
              <p className="text-xs md:text-sm font-bold text-foreground mt-0.5 truncate">hostel@pu.ac.in</p>
            </div>
          </div>

          <p className="text-center text-[10px] md:text-xs text-muted-foreground mt-5 pb-6">
            Parul University, Vadodara • © 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
