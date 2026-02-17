import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2, MessageSquare, ThumbsUp, ThumbsDown, Meh } from "lucide-react";
import { motion } from "framer-motion";

const Feedback = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [satisfaction, setSatisfaction] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const satisfactionOptions = [
    { value: "happy", icon: ThumbsUp, label: "Happy", color: "gradient-success text-white" },
    { value: "neutral", icon: Meh, label: "Neutral", color: "gradient-warning text-white" },
    { value: "unhappy", icon: ThumbsDown, label: "Unhappy", color: "gradient-danger text-white" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <Layout title="Feedback" showBack>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12">
          <div className="w-20 h-20 rounded-full gradient-success flex items-center justify-center mb-6 shadow-lg">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Thank You!</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xs text-sm">
            Your feedback helps us improve the hostel experience for everyone.
          </p>
          <Button onClick={() => navigate("/dashboard")} className="rounded-xl gradient-primary">
            Back to Dashboard
          </Button>
        </motion.div>
      </Layout>
    );
  }

  return (
    <Layout title="Feedback & Suggestions" showBack>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-4">
          <MessageSquare className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-lg font-bold text-foreground mb-1">
          We'd love to hear from you
        </h2>
        <p className="text-sm text-muted-foreground font-medium">
          Your suggestions help us make HostelSphere better
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label className="text-foreground font-semibold text-sm mb-3 block">
            How's your hostel experience?
          </Label>
          <div className="flex gap-3">
            {satisfactionOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = satisfaction === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSatisfaction(option.value)}
                  className={`flex-1 p-4 rounded-2xl border-2 transition-all duration-200 ${
                    isSelected
                      ? `${option.color} border-transparent shadow-md`
                      : "border-border/50 bg-card hover:border-primary/30"
                  }`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? "" : "text-muted-foreground"}`} />
                  <p className={`text-sm font-semibold ${isSelected ? "" : "text-foreground"}`}>
                    {option.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Label htmlFor="feedback" className="text-foreground font-semibold text-sm mb-3 block">
            Share your thoughts *
          </Label>
          <Textarea
            id="feedback"
            placeholder="What would you like us to know?..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[150px] bg-secondary/60 border border-border/80 rounded-xl focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-card rounded-2xl shadow-card border border-border/50">
          <div>
            <Label htmlFor="anonymous" className="text-foreground font-semibold text-sm">
              Submit anonymously
            </Label>
            <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">
              Your identity won't be shared
            </p>
          </div>
          <Switch id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
        </div>

        <Button 
          type="submit" 
          size="xl" 
          className="w-full rounded-xl gradient-primary shadow-glow"
          disabled={!feedback.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </div>
          ) : (
            "Submit Feedback"
          )}
        </Button>
      </form>
    </Layout>
  );
};

export default Feedback;
