import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2, MessageSquare, ThumbsUp, ThumbsDown, Meh } from "lucide-react";

const Feedback = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [satisfaction, setSatisfaction] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const satisfactionOptions = [
    { value: "happy", icon: ThumbsUp, label: "Happy", color: "bg-success text-success-foreground" },
    { value: "neutral", icon: Meh, label: "Neutral", color: "bg-warning text-warning-foreground" },
    { value: "unhappy", icon: ThumbsDown, label: "Unhappy", color: "bg-destructive text-destructive-foreground" },
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
        <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
          <div className="w-20 h-20 rounded-full gradient-success flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-success-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Thank You!</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xs">
            Your feedback helps us improve the hostel experience for everyone.
          </p>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Feedback & Suggestions" showBack>
      <div className="mb-6">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4">
          <MessageSquare className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-1">
          We'd love to hear from you
        </h2>
        <p className="text-sm text-muted-foreground">
          Your suggestions help us make HostelSphere better
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Satisfaction Rating */}
        <div>
          <Label className="text-foreground font-medium mb-3 block">
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
                  className={`flex-1 p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? `${option.color} border-transparent shadow-md`
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? "" : "text-muted-foreground"}`} />
                  <p className={`text-sm font-medium ${isSelected ? "" : "text-foreground"}`}>
                    {option.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Text */}
        <div>
          <Label htmlFor="feedback" className="text-foreground font-medium mb-3 block">
            Share your thoughts *
          </Label>
          <Textarea
            id="feedback"
            placeholder="What would you like us to know? Any suggestions, complaints, or appreciation..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[150px] bg-secondary border-0 focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {/* Anonymous Toggle */}
        <div className="flex items-center justify-between p-4 bg-card rounded-xl shadow-card">
          <div>
            <Label htmlFor="anonymous" className="text-foreground font-medium">
              Submit anonymously
            </Label>
            <p className="text-xs text-muted-foreground mt-1">
              Your identity won't be shared with anyone
            </p>
          </div>
          <Switch
            id="anonymous"
            checked={isAnonymous}
            onCheckedChange={setIsAnonymous}
          />
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          size="xl" 
          className="w-full"
          disabled={!feedback.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
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
