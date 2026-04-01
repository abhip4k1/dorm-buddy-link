import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, CheckCircle2, ShieldAlert, Siren } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Emergency = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  const handleSOS = async () => {
    setIsSending(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error("Please login"); return; }

      const { error } = await supabase.from("emergency_alerts").insert({
        user_id: user.id,
        alert_type: "sos",
        message: "Emergency SOS triggered",
      });

      if (error) throw error;
      setShowConfirm(false);
      setAlertSent(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to send alert");
    } finally {
      setIsSending(false);
    }
  };

  if (alertSent) {
    return (
      <Layout showNav={false}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-24 h-24 rounded-full gradient-success flex items-center justify-center mb-6 shadow-lg">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Alert Sent!</h1>
          <p className="text-muted-foreground text-center mb-8 max-w-xs text-sm">Your emergency alert has been sent to hostel authorities. Help is on the way.</p>
          <div className="w-full max-w-xs space-y-3 mb-8">
            <div className="bg-card p-4 rounded-2xl shadow-card border border-border/50">
              <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mb-1">Emergency Contact</p>
              <div className="flex items-center justify-between">
                <p className="font-bold text-foreground">Warden Office</p>
                <a href="tel:+919876543210" className="text-primary font-semibold text-sm">Call Now</a>
              </div>
            </div>
            <div className="bg-card p-4 rounded-2xl shadow-card border border-border/50">
              <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mb-1">Security</p>
              <div className="flex items-center justify-between">
                <p className="font-bold text-foreground">24/7 Helpline</p>
                <a href="tel:+919876543211" className="text-primary font-semibold text-sm">Call Now</a>
              </div>
            </div>
          </div>
          <Button onClick={() => navigate("/dashboard")} size="lg" className="rounded-xl gradient-primary">Back to Dashboard</Button>
        </motion.div>
      </Layout>
    );
  }

  return (
    <Layout showNav={false}>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm bg-destructive/8 border border-destructive/20 rounded-2xl p-4 mb-10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-destructive text-sm">Emergency Use Only</p>
              <p className="text-xs text-destructive/70 mt-1 font-medium">This will immediately alert hostel authorities. Use only in genuine emergencies.</p>
            </div>
          </div>
        </motion.div>

        <motion.button initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: "spring" }}
          onClick={() => setShowConfirm(true)} className="relative w-44 h-44 rounded-full gradient-danger shadow-xl hover:brightness-110 transition-all duration-200 active:scale-95">
          <div className="absolute inset-0 rounded-full gradient-danger animate-pulse-ring" />
          <div className="absolute inset-0 rounded-full gradient-danger animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <Siren className="w-14 h-14 text-white mb-2" />
            <span className="text-2xl font-extrabold text-white tracking-tight">SOS</span>
          </div>
        </motion.button>

        <p className="text-muted-foreground text-center mt-6 max-w-xs text-sm font-medium">Tap the SOS button to immediately alert hostel security and warden</p>

        <div className="w-full max-w-sm mt-10 space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest text-center mb-2">Emergency Contacts</p>
          {[
            { icon: Phone, color: "bg-primary/8", iconColor: "text-primary", name: "Warden – Dr. R.K. Patel", phone: "+91 265 2395501", href: "tel:+912652395501" },
            { icon: ShieldAlert, color: "bg-destructive/8", iconColor: "text-destructive", name: "PU Campus Security (24/7)", phone: "+91 265 2395500", href: "tel:+912652395500" },
            { icon: Phone, color: "bg-warning/8", iconColor: "text-warning", name: "PU Hostel Admin Office", phone: "+91 265 2395555", href: "tel:+912652395555" },
          ].map((contact, idx) => (
            <a key={idx} href={contact.href} className="flex items-center gap-3 bg-card p-4 rounded-2xl shadow-card border border-border/50 hover:bg-secondary/50 transition-colors">
              <div className={`w-10 h-10 rounded-xl ${contact.color} flex items-center justify-center`}>
                <contact.icon className={`w-5 h-5 ${contact.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">{contact.name}</p>
                <p className="text-xs text-muted-foreground font-medium">{contact.phone}</p>
              </div>
            </a>
          ))}
        </div>

        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mt-8 text-muted-foreground">Cancel & Go Back</Button>
      </div>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="max-w-sm rounded-2xl">
          <AlertDialogHeader>
            <div className="w-16 h-16 rounded-full gradient-danger flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <AlertDialogTitle className="text-center">Send Emergency Alert?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">This will immediately notify hostel authorities of an emergency situation at your location.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSOS} disabled={isSending} className="w-full sm:w-auto gradient-danger text-white hover:brightness-110 rounded-xl">
              {isSending ? (<div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</div>) : "Send Alert"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Emergency;
