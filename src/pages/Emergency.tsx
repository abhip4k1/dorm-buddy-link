import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, CheckCircle2, X, ShieldAlert, Siren } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Emergency = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  const handleSOS = async () => {
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSending(false);
    setShowConfirm(false);
    setAlertSent(true);
  };

  if (alertSent) {
    return (
      <Layout showNav={false}>
        <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
          <div className="w-24 h-24 rounded-full gradient-success flex items-center justify-center mb-6 animate-scale-in">
            <CheckCircle2 className="w-12 h-12 text-success-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Alert Sent!</h1>
          <p className="text-muted-foreground text-center mb-8 max-w-xs">
            Your emergency alert has been sent to hostel authorities. Help is on the way.
          </p>
          
          <div className="w-full max-w-xs space-y-3 mb-8">
            <div className="bg-card p-4 rounded-xl shadow-card">
              <p className="text-sm text-muted-foreground mb-1">Emergency Contact</p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">Warden Office</p>
                <a href="tel:+919876543210" className="text-primary font-medium">
                  Call Now
                </a>
              </div>
            </div>
            <div className="bg-card p-4 rounded-xl shadow-card">
              <p className="text-sm text-muted-foreground mb-1">Security</p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">24/7 Helpline</p>
                <a href="tel:+919876543211" className="text-primary font-medium">
                  Call Now
                </a>
              </div>
            </div>
          </div>

          <Button onClick={() => navigate("/dashboard")} size="lg">
            Back to Dashboard
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showNav={false}>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        {/* Warning Banner */}
        <div className="w-full max-w-sm bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-destructive text-sm">Emergency Use Only</p>
              <p className="text-xs text-destructive/80 mt-1">
                This will immediately alert hostel authorities. Use only in genuine emergencies.
              </p>
            </div>
          </div>
        </div>

        {/* SOS Button */}
        <button
          onClick={() => setShowConfirm(true)}
          className="relative w-48 h-48 rounded-full gradient-danger shadow-xl hover:brightness-110 transition-all duration-200 active:scale-95 group"
        >
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full gradient-danger animate-pulse-ring" />
          <div className="absolute inset-0 rounded-full gradient-danger animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
          
          {/* Button content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <Siren className="w-16 h-16 text-destructive-foreground mb-2" />
            <span className="text-2xl font-bold text-destructive-foreground">SOS</span>
          </div>
        </button>

        <p className="text-muted-foreground text-center mt-6 max-w-xs">
          Tap the SOS button to immediately alert hostel security and warden
        </p>

        {/* Emergency Contacts */}
        <div className="w-full max-w-sm mt-10 space-y-3">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide text-center mb-2">
            Azad Bhavan B - Emergency Contacts
          </p>
          <a 
            href="tel:+912652395501" 
            className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-card hover:bg-secondary transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Warden - Dr. R.K. Patel</p>
              <p className="text-sm text-muted-foreground">+91 265 2395501</p>
            </div>
          </a>
          <a 
            href="tel:+912652395500" 
            className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-card hover:bg-secondary transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">PU Security (24/7)</p>
              <p className="text-sm text-muted-foreground">+91 265 2395500</p>
            </div>
          </a>
          <a 
            href="tel:+912652395555" 
            className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-card hover:bg-secondary transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-warning" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Hostel Admin Office</p>
              <p className="text-sm text-muted-foreground">+91 265 2395555</p>
            </div>
          </a>
        </div>

        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")} 
          className="mt-8"
        >
          Cancel & Go Back
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <div className="w-16 h-16 rounded-full gradient-danger flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-destructive-foreground" />
            </div>
            <AlertDialogTitle className="text-center">Send Emergency Alert?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              This will immediately notify hostel authorities of an emergency situation at your location.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleSOS}
              disabled={isSending}
              className="w-full sm:w-auto gradient-danger text-destructive-foreground hover:brightness-110"
            >
              {isSending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-destructive-foreground/30 border-t-destructive-foreground rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                "Send Alert"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Emergency;
