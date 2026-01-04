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
  HelpCircle,
  Upload,
  CheckCircle2,
  X
} from "lucide-react";

import { Zap, Droplets, Volume2 } from "lucide-react";

const categories = [
  { id: "room-maintenance", label: "Room & Maintenance", icon: Wrench, color: "bg-orange-500" },
  { id: "cleanliness", label: "Cleanliness", icon: Sparkles, color: "bg-green-500" },
  { id: "water-electricity", label: "Water / Electricity", icon: Droplets, color: "bg-blue-500" },
  { id: "noise-discipline", label: "Noise / Discipline", icon: Volume2, color: "bg-purple-500" },
  { id: "mess", label: "Mess Related", icon: UtensilsCrossed, color: "bg-yellow-500" },
  { id: "security", label: "Security", icon: ShieldAlert, color: "bg-red-500" },
];

const NewComplaint = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileUpload = () => {
    // Simulate file upload
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
        <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
          <div className="w-20 h-20 rounded-full gradient-success flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-success-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Complaint Registered!</h2>
          <p className="text-muted-foreground text-center mb-6 max-w-xs">
            Your issue has been officially recorded. Track its progress anytime.
          </p>
          <div className="bg-card p-4 rounded-xl shadow-card mb-6 w-full max-w-xs">
            <p className="text-sm text-muted-foreground">Complaint ID</p>
            <p className="text-lg font-bold text-foreground">#PU-HST-2026-0042</p>
            <p className="text-xs text-muted-foreground mt-2">
              Azad Bhavan B • Room 411
            </p>
          </div>
          <div className="bg-primary/5 p-3 rounded-lg border border-primary/20 mb-6 max-w-xs">
            <p className="text-xs text-muted-foreground text-center">
              ✓ Your issue is officially recorded and traceable
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/complaints/status")}>
              Track Status
            </Button>
            <Button onClick={() => navigate("/dashboard")}>
              Back to Home
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="File a Complaint" showBack>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Selection */}
        <div>
          <Label className="text-foreground font-medium mb-3 block">
            Select Category *
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-2`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className={`text-xs font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                    {category.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-foreground font-medium mb-3 block">
            Describe the Issue *
          </Label>
          <Textarea
            id="description"
            placeholder="Please provide detailed information about your complaint..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[120px] bg-secondary border-0 focus:ring-2 focus:ring-primary resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Be specific about the location and nature of the problem
          </p>
        </div>

        {/* File Upload */}
        <div>
          <Label className="text-foreground font-medium mb-3 block">
            Upload Evidence (Optional)
          </Label>
          <button
            type="button"
            onClick={handleFileUpload}
            className="w-full p-6 border-2 border-dashed border-border rounded-xl hover:border-primary/50 transition-colors bg-secondary/50"
          >
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Tap to upload photos or videos
            </p>
          </button>

          {uploadedFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-card p-3 rounded-lg">
                  <span className="text-sm text-foreground">{file}</span>
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
          className="w-full"
          disabled={!selectedCategory || !description.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
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
