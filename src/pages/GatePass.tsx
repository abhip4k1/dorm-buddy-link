import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import StatusBadge from "@/components/StatusBadge";
import { Calendar, Plus, ChevronUp, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GatePassRecord {
  id: string;
  pass_id: string;
  reason: string;
  departure_date: string;
  status: string;
  approved_by: string | null;
  created_at: string;
}

const GatePass = () => {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passes, setPasses] = useState<GatePassRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPasses = async () => {
    const { data, error } = await supabase
      .from("gate_passes")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setPasses(data);
    setLoading(false);
  };

  useEffect(() => { fetchPasses(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !reason.trim()) return;

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error("Please login"); return; }

      const passId = `GP-PU-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`;

      const { error } = await supabase.from("gate_passes").insert({
        user_id: user.id,
        pass_id: passId,
        reason: reason.trim(),
        departure_date: date,
      });

      if (error) throw error;
      toast.success("Gate pass request submitted!");
      setShowForm(false);
      setDate("");
      setReason("");
      fetchPasses();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusType = (status: string) => {
    if (status === "approved") return "approved" as const;
    if (status === "rejected") return "rejected" as const;
    return "pending" as const;
  };

  return (
    <Layout title="Gate Pass" showBack>
      <div className="mb-6">
        <Button 
          onClick={() => setShowForm(!showForm)}
          className={`w-full rounded-xl ${!showForm ? 'gradient-primary shadow-glow' : ''}`}
          size="lg"
          variant={showForm ? "outline" : "default"}
        >
          {showForm ? (<><ChevronUp className="w-5 h-5" />Cancel Request</>) : (<><Plus className="w-5 h-5" />Request Gate Pass</>)}
        </Button>

        {showForm && (
          <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="mt-4 p-5 bg-card rounded-2xl shadow-card border border-border/50 space-y-4">
            <div>
              <Label htmlFor="date" className="text-foreground font-semibold text-sm mb-2 block">Select Date *</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-12 bg-secondary/60 border border-border/80 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="reason" className="text-foreground font-semibold text-sm mb-2 block">Reason for Leave *</Label>
              <Textarea id="reason" placeholder="Explain why you need to leave the hostel..." value={reason} onChange={(e) => setReason(e.target.value)} className="min-h-[100px] bg-secondary/60 border border-border/80 rounded-xl resize-none" />
            </div>
            <Button type="submit" className="w-full rounded-xl gradient-primary" disabled={!date || !reason.trim() || isSubmitting}>
              {isSubmitting ? (<div className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</div>) : "Submit Request"}
            </Button>
          </motion.form>
        )}
      </div>

      <div>
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Your Gate Passes</h2>
        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-3">
            {passes.map((pass, index) => (
              <motion.div key={pass.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="bg-card p-4 rounded-2xl shadow-card border border-border/50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium">{pass.pass_id}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-bold text-foreground text-sm">{new Date(pass.departure_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <StatusBadge status={getStatusType(pass.status)} />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{pass.reason}</p>
                {pass.approved_by && <p className="text-xs text-success font-semibold">✓ Approved by {pass.approved_by}</p>}
              </motion.div>
            ))}
            {passes.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">No gate passes yet</p>}
          </div>
        )}
      </div>

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
