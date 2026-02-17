import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Eye, EyeOff, Sparkles } from "lucide-react";
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
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-8 w-32 h-32 rounded-full bg-white/5 blur-2xl animate-float" />
      <div className="absolute top-40 right-4 w-48 h-48 rounded-full bg-accent/10 blur-3xl animate-float-delayed" />
      <div className="absolute bottom-40 left-12 w-24 h-24 rounded-full bg-white/5 blur-xl animate-float" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-6 pt-16 pb-12"
        >
          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white tracking-tight">HostelSphere</h1>
                <p className="text-white/60 text-sm font-medium">Parul University</p>
              </div>
            </div>
            
            <h2 className="text-white text-3xl font-bold leading-tight mb-2">
              Welcome<br/>Back! 👋
            </h2>
            <p className="text-white/50 text-sm font-medium">
              Sign in to manage your hostel experience
            </p>
          </div>
        </motion.div>

        {/* Login Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 px-5 relative"
        >
          <div className="max-w-lg mx-auto">
            <div className="bg-card rounded-3xl shadow-xl p-7 border border-border/50">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="enrollmentId" className="text-foreground font-semibold text-sm">
                    Enrollment ID
                  </Label>
                  <Input
                    id="enrollmentId"
                    type="text"
                    placeholder="e.g. 2303031240145@paruluniversity.ac.in"
                    value={enrollmentId}
                    onChange={(e) => setEnrollmentId(e.target.value)}
                    className="h-13 bg-secondary/60 border border-border/80 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm px-4"
                  />
                  <p className="text-[11px] text-muted-foreground font-medium">
                    Your PU enrollment email or use "guest"
                  </p>
                </div>

                <div className="space-y-2">
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
                      className="h-13 bg-secondary/60 border border-border/80 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm px-4 pr-12"
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
                  <button type="button" className="text-xs text-primary font-semibold hover:text-primary/80 transition-colors">
                    Forgot Password?
                  </button>
                </div>

                <Button 
                  type="submit" 
                  size="xl" 
                  className="w-full rounded-xl gradient-primary hover:brightness-110 transition-all shadow-glow"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    <>
                      <GraduationCap className="w-5 h-5" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-5 border-t border-border/50">
                <p className="text-center text-xs text-muted-foreground">
                  New to PU Hostel?{" "}
                  <button className="text-primary font-semibold hover:underline">
                    Contact Admin
                  </button>
                </p>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
              >
                <p className="text-[10px] text-white/50 font-semibold uppercase tracking-wider mb-1">Office</p>
                <p className="text-xs font-semibold text-white/90">hostel@paruluniversity.ac.in</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
              >
                <p className="text-[10px] text-white/50 font-semibold uppercase tracking-wider mb-1">Helpline</p>
                <p className="text-xs font-semibold text-white/90">+91 265 2395555</p>
              </motion.div>
            </div>

            <p className="text-center text-[10px] text-white/30 mt-6 pb-8 font-medium">
              Parul University, Vadodara • A Student-Centric Initiative
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
