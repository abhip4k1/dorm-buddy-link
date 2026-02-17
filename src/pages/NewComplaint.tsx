import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Wrench, 
  Sparkles, 
  UtensilsCrossed, 
  ShieldAlert,
  Upload,
  CheckCircle2,
  X,
  Zap,
  Droplets,
  Volume2
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { id: "room-maintenance", label: "Room & Maintenance", icon: Wrench, color: "bg-orange-500" },
  { id: "cleanliness", label: "Cleanliness", icon: Sparkles, color: "bg-emerald-500" },
  { id: "water-electricity", label: "Water / Electricity", icon: Droplets, color: "bg-blue-500" },
  { id: "noise-discipline", label: "Noise / Discipline", icon: Volume2, color: "bg-violet-500" },
  { id: "mess", label: "Mess Related", icon: UtensilsCrossed, color: "bg-amber-500" },
  { id: "security", label: "Security", icon: ShieldAlert, color: "bg-rose-500" },
];

const NewComplaint = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileUpload = () => {
    setUploadedFiles([...uploadedFiles, `evidence_${uploadedFiles.length + 1}.jpg`]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !description.trim()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <Layout title="Complaint Filed" showBack>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-12"
        >
          <div className="w-20 h-20 rounded-full gradient-success flex items-center justify-center mb-6 shadow-lg">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Complaint Registered!</h2>
          <p className="text-muted-foreground text-center mb-6 max-w-xs text-sm">
            Your issue has been officially recorded. Track its progress anytime.
          </p>
          <div className="bg-card p-5 rounded-2xl shadow-card border border-border/50 mb-6 w-full max-w-xs">
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Complaint ID</p>
            <p className="text-lg font-bold text-foreground mt-1">#PU-HST-2026-0042</p>
            <p className="text-xs text-muted-foreground mt-2">Azad Bhavan B • Room 411</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl" onClick={() => navigate("/complaints/status")}>
              Track Status
            </Button>
            <Button className="rounded-xl gradient-primary" onClick={() => navigate("/dashboard")}>
              Back to Home
            </Button>
          </div>
        </motion.div>
      </Layout>
    );
  }

  return (
    <Layout title="File a Complaint" showBack>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Selection */}
        <div>
          <Label className="text-foreground font-semibold text-sm mb-3 block">
            Select Category *
          </Label>
          <div className="grid grid-cols-3 gap-2.5">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                      : "border-border/50 bg-card hover:border-primary/30"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-2`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className={`text-xs font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
                    {category.label}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-foreground font-semibold text-sm mb-3 block">
            Describe the Issue *
          </Label>
          <Textarea
            id="description"
            placeholder="Please provide detailed information about your complaint..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[120px] bg-secondary/60 border border-border/80 rounded-xl focus:ring-2 focus:ring-primary/30 resize-none"
          />
          <p className="text-[11px] text-muted-foreground mt-2 font-medium">
            Be specific about the location and nature of the problem
          </p>
        </div>

        {/* File Upload */}
        <div>
          <Label className="text-foreground font-semibold text-sm mb-3 block">
            Upload Evidence (Optional)
          </Label>
          <button
            type="button"
            onClick={handleFileUpload}
            className="w-full p-6 border-2 border-dashed border-border/60 rounded-2xl hover:border-primary/40 transition-colors bg-secondary/30"
          >
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground font-medium">
              Tap to upload photos or videos
            </p>
          </button>

          {uploadedFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-card p-3 rounded-xl border border-border/50">
                  <span className="text-sm text-foreground font-medium">{file}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-destructive/10 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          size="xl" 
          className="w-full rounded-xl gradient-primary shadow-glow"
          disabled={!selectedCategory || !description.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </div>
          ) : (
            "Submit Complaint"
          )}
        </Button>
      </form>
    </Layout>
  );
};

export default NewComplaint;
