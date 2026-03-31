import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { motion } from "framer-motion";

const AddListing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [amenities, setAmenities] = useState("");
  const [availability, setAvailability] = useState("available");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !price) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.from("room_listings").insert({
      owner_id: user.id,
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price),
      location: location.trim() || null,
      amenities: amenities ? amenities.split(",").map((a) => a.trim()).filter(Boolean) : [],
      is_available: availability === "available",
    });

    if (error) {
      toast.error("Failed to create listing: " + error.message);
    } else {
      toast.success("Listing created successfully!");
      navigate("/listings");
    }
    setIsLoading(false);
  };

  return (
    <Layout title="Add Room Listing" showBack>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <div className="bg-card rounded-2xl border border-border/60 shadow-card p-5 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label className="font-semibold">Title *</Label>
              <Input placeholder="e.g. Spacious single room in Block A" value={title} onChange={(e) => setTitle(e.target.value)} className="h-12 rounded-xl" />
            </div>

            <div className="space-y-1.5">
              <Label className="font-semibold">Description *</Label>
              <Textarea placeholder="Describe the room, facilities, rules..." value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[100px] rounded-xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="font-semibold">Price (₹/month) *</Label>
                <Input type="number" placeholder="e.g. 5000" value={price} onChange={(e) => setPrice(e.target.value)} className="h-12 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="font-semibold">Location</Label>
                <Input placeholder="e.g. Block A, Floor 2" value={location} onChange={(e) => setLocation(e.target.value)} className="h-12 rounded-xl" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="font-semibold">Amenities (comma separated)</Label>
              <Input placeholder="e.g. WiFi, AC, Attached Bathroom" value={amenities} onChange={(e) => setAmenities(e.target.value)} className="h-12 rounded-xl" />
            </div>

            <div className="space-y-1.5">
              <Label className="font-semibold">Availability</Label>
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Not Available</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" size="lg" className="w-full h-12 rounded-xl gradient-primary font-bold shadow-glow" disabled={isLoading}>
              {isLoading ? <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Creating...</> : <><Plus className="w-5 h-5 mr-2" /> Create Listing</>}
            </Button>
          </form>
        </div>
      </motion.div>
    </Layout>
  );
};

export default AddListing;
