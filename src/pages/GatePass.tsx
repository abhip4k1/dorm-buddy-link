import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import StatusBadge from "@/components/StatusBadge";
import { Calendar, Plus, ChevronUp, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const existingPasses = [
  {
    id: "GP-PU-2026-015",
    date: "Jan 5, 2026",
    reason: "Family function - Going to hometown",
    status: "approved" as const,
    approvedBy: "Warden - Dr. R.K. Patel",
  },
  {
    id: "GP-PU-2025-012",
    date: "Dec 28, 2025",
    reason: "Medical checkup at Vadodara hospital",
    status: "approved" as const,
    approvedBy: "Warden - Dr. R.K. Patel",
  },
  {
    id: "GP-PU-2026-018",
    date: "Jan 10, 2026",
    reason: "Interview at TCS Gandhinagar",
    status: "pending" as const,
  },
];

const GatePass = () => {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !reason.trim()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setShowForm(false);
    setDate("");
    setReason("");

    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <Layout title="Gate Pass" showBack>
      {/* Success Toast */}
      {isSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-4 left-4 right-4 z-50"
        >
          <div className="max-w-lg mx-auto gradient-success text-white p-4 rounded-2xl shadow-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold text-sm">Gate pass request submitted!</span>
          </div>
        </motion.div>
      )}

      {/* New Request Button/Form */}
      <div className="mb-6">
        <Button 
          onClick={() => setShowForm(!showForm)}
          className={`w-full rounded-xl ${!showForm ? 'gradient-primary shadow-glow' : ''}`}
          size="lg"
          variant={showForm ? "outline" : "default"}
        >
          {showForm ? (
            <>
              <ChevronUp className="w-5 h-5" />
              Cancel Request
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Request Gate Pass
            </>
          )}
        </Button>

        {showForm && (
          <motion.form 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit} 
            className="mt-4 p-5 bg-card rounded-2xl shadow-card border border-border/50 space-y-4"
          >
            <div>
              <Label htmlFor="date" className="text-foreground font-semibold text-sm mb-2 block">
                Select Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-12 bg-secondary/60 border border-border/80 rounded-xl focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <Label htmlFor="reason" className="text-foreground font-semibold text-sm mb-2 block">
                Reason for Leave *
              </Label>
              <Textarea
                id="reason"
                placeholder="Explain why you need to leave the hostel..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[100px] bg-secondary/60 border border-border/80 rounded-xl focus:ring-2 focus:ring-primary/30 resize-none"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full rounded-xl gradient-primary"
              disabled={!date || !reason.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </div>
              ) : (
                "Submit Request"
              )}
            </Button>
          </motion.form>
        )}
      </div>

      {/* Existing Passes */}
      <div>
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
          Your Gate Passes
        </h2>

        <div className="space-y-3">
          {existingPasses.map((pass, index) => (
            <motion.div 
              key={pass.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-card p-4 rounded-2xl shadow-card border border-border/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">{pass.id}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-bold text-foreground text-sm">{pass.date}</span>
                  </div>
                </div>
                <StatusBadge status={pass.status} />
              </div>
              <p className="text-sm text-muted-foreground mb-2">{pass.reason}</p>
              {pass.approvedBy && (
                <p className="text-xs text-success font-semibold">
                  ✓ Approved by {pass.approvedBy}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/15">
        <p className="text-sm text-foreground font-bold mb-1">Gate Pass Guidelines</p>
        <ul className="text-xs text-muted-foreground space-y-1 leading-relaxed">
          <li>• Submit requests at least 24 hours in advance</li>
          <li>• Parents receive SMS upon approval</li>
          <li>• Emergency leaves require warden's direct approval</li>
          <li>• Gate closes at 11 PM - late entry needs prior permission</li>
        </ul>
      </div>
    </Layout>
  );
};

export default GatePass;
