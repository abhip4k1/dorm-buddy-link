import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    // Listen for auth state change with recovery event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) {
        setIsValidSession(true);
        setIsCheckingSession(false);
      }
    });

    // Check URL for recovery indicators (hash or query params)
    const hash = window.location.hash;
    const params = new URLSearchParams(window.location.search);
    const hasRecoveryToken = 
      (hash && hash.includes("type=recovery")) ||
      params.get("type") === "recovery" ||
      params.get("token_hash");

    if (hasRecoveryToken) {
      // Give Supabase client time to process the token
      setIsValidSession(true);
      setIsCheckingSession(false);
    } else {
      // Also check if there's already an active session (user may have been redirected)
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setIsValidSession(true);
        }
        setIsCheckingSession(false);
      });
    }

    // Fallback timeout to stop loading after 5 seconds
    const timeout = setTimeout(() => setIsCheckingSession(false), 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setIsSuccess(true);
    }
    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-5">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Password Updated!</h2>
          <p className="text-muted-foreground text-center mb-6 text-sm">Your password has been reset successfully.</p>
          <Button onClick={() => navigate("/")} className="rounded-xl gradient-primary">Go to Login</Button>
        </motion.div>
      </div>
    );
  }

  if (!isValidSession) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-5">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <h2 className="text-lg font-bold text-foreground mb-2">Invalid or Expired Link</h2>
          <p className="text-muted-foreground text-sm mb-6">This password reset link is invalid or has expired.</p>
          <Button onClick={() => navigate("/forgot-password")} className="rounded-xl gradient-primary">Request New Link</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-5">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-foreground">HostelSphere</h1>
            <p className="text-muted-foreground text-xs font-semibold">Parul University</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 border border-border/60">
          <h2 className="text-lg font-bold text-foreground mb-1">Set New Password</h2>
          <p className="text-sm text-muted-foreground font-medium mb-6">Choose a strong password for your account.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-foreground font-semibold text-sm">New Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min 6 characters"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-background border border-border rounded-xl px-4 pr-12" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm" className="text-foreground font-semibold text-sm">Confirm Password</Label>
              <Input id="confirm" type="password" placeholder="Re-enter password"
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 bg-background border border-border rounded-xl px-4" />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl gradient-primary font-bold" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating...
                </div>
              ) : "Update Password"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
