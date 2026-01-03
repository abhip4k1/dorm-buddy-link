import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import StatusBadge from "@/components/StatusBadge";
import { Calendar, Plus, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

const existingPasses = [
  {
    id: "GP-2024-015",
    date: "Jan 5, 2024",
    reason: "Family function at home",
    status: "approved" as const,
    approvedBy: "Warden - Dr. Sharma",
  },
  {
    id: "GP-2024-012",
    date: "Dec 28, 2023",
    reason: "Medical checkup in city",
    status: "approved" as const,
    approvedBy: "Warden - Dr. Sharma",
  },
  {
    id: "GP-2024-018",
    date: "Jan 10, 2024",
    reason: "Interview at tech company",
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
        <div className="fixed top-4 left-4 right-4 z-50 animate-fade-in">
          <div className="max-w-lg mx-auto bg-success text-success-foreground p-4 rounded-xl shadow-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">Gate pass request submitted!</span>
          </div>
        </div>
      )}

      {/* New Request Button/Form */}
      <div className="mb-6">
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="w-full"
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
          <form onSubmit={handleSubmit} className="mt-4 p-5 bg-card rounded-xl shadow-card space-y-4 animate-fade-in">
            <div>
              <Label htmlFor="date" className="text-foreground font-medium mb-2 block">
                Select Date *
              </Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-12 bg-secondary border-0 focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="reason" className="text-foreground font-medium mb-2 block">
                Reason for Leave *
              </Label>
              <Textarea
                id="reason"
                placeholder="Explain why you need to leave the hostel..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[100px] bg-secondary border-0 focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={!date || !reason.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Submitting...
                </div>
              ) : (
                "Submit Request"
              )}
            </Button>
          </form>
        )}
      </div>

      {/* Existing Passes */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Your Gate Passes
        </h2>

        <div className="space-y-3">
          {existingPasses.map((pass, index) => (
            <div 
              key={pass.id}
              className="bg-card p-4 rounded-xl shadow-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">{pass.id}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">{pass.date}</span>
                  </div>
                </div>
                <StatusBadge status={pass.status} />
              </div>
              <p className="text-sm text-muted-foreground mb-2">{pass.reason}</p>
              {pass.approvedBy && (
                <p className="text-xs text-success font-medium">
                  ✓ Approved by {pass.approvedBy}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
        <p className="text-sm text-foreground font-medium mb-1">Important Note</p>
        <p className="text-xs text-muted-foreground">
          Gate pass requests should be submitted at least 24 hours in advance. Emergency requests may require warden's direct approval.
        </p>
      </div>
    </Layout>
  );
};

export default GatePass;
