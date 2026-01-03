import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, GraduationCap } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For prototype, just redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="gradient-primary px-6 pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary-foreground blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-accent blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">HostelSphere</h1>
              <p className="text-primary-foreground/80 text-sm">Student Hostel Portal</p>
            </div>
          </div>
          
          <h2 className="text-primary-foreground text-lg font-medium mb-2">
            Welcome Back! 👋
          </h2>
          <p className="text-primary-foreground/70 text-sm">
            Sign in to access your hostel services
          </p>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-6 -mt-8 relative z-20">
        <div className="max-w-lg mx-auto">
          <div className="bg-card rounded-2xl shadow-xl p-6 animate-fade-in">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-foreground font-medium">
                  Student ID / Email
                </Label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="Enter your student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="h-12 bg-secondary border-0 focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-secondary border-0 focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end">
                <button type="button" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </button>
              </div>

              <Button 
                type="submit" 
                size="xl" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
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

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-center text-sm text-muted-foreground">
                New student?{" "}
                <button className="text-primary font-medium hover:underline">
                  Contact your hostel office
                </button>
              </p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-card rounded-xl p-4 shadow-card">
              <p className="text-xs text-muted-foreground mb-1">Support</p>
              <p className="text-sm font-medium text-foreground">hostel@university.edu</p>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-card">
              <p className="text-xs text-muted-foreground mb-1">Helpline</p>
              <p className="text-sm font-medium text-foreground">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
