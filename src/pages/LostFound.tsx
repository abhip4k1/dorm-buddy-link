import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, MapPin, Calendar, Phone, CheckCircle2, X } from "lucide-react";
import { motion } from "framer-motion";

const lostItems = [
  { id: 1, name: "Blue Water Bottle", description: "Milton brand, blue color, 1L capacity with black cap", location: "Common Room, Block A", date: "Jan 2, 2024", contact: "Room 204", type: "lost" },
  { id: 2, name: "Wired Earphones", description: "Black colored wired earphones with microphone", location: "Library", date: "Dec 30, 2023", contact: "Room 108", type: "lost" },
];

const foundItems = [
  { id: 3, name: "ID Card", description: "Student ID card found near canteen", location: "Near Canteen", date: "Jan 3, 2024", contact: "Hostel Office", type: "found" },
  { id: 4, name: "Umbrella", description: "Black folding umbrella found in mess", location: "Mess Hall", date: "Jan 1, 2024", contact: "Mess Counter", type: "found" },
];

const LostFound = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", location: "", date: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.location) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setShowForm(false);
    setFormData({ name: "", description: "", location: "", date: "" });
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const ItemCard = ({ item }: { item: typeof lostItems[0] }) => (
    <div className="bg-card p-4 rounded-2xl shadow-card border border-border/50">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-foreground text-sm">{item.name}</h3>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          item.type === "lost" 
            ? "bg-destructive/10 text-destructive" 
            : "bg-success/10 text-success"
        }`}>
          {item.type === "lost" ? "Lost" : "Found"}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
      <div className="space-y-1.5 text-[11px] text-muted-foreground font-medium">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>{item.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5" />
          <span>Contact: {item.contact}</span>
        </div>
      </div>
    </div>
  );

  return (
    <Layout title="Lost & Found" showBack>
      {isSuccess && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-4 left-4 right-4 z-50">
          <div className="max-w-lg mx-auto gradient-success text-white p-4 rounded-2xl shadow-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold text-sm">Item reported successfully!</span>
          </div>
        </motion.div>
      )}

      <Button 
        onClick={() => setShowForm(!showForm)}
        className={`w-full mb-6 rounded-xl ${!showForm ? 'gradient-primary shadow-glow' : ''}`}
        size="lg"
        variant={showForm ? "outline" : "default"}
      >
        {showForm ? (<><X className="w-5 h-5" />Cancel</>) : (<><Plus className="w-5 h-5" />Report Lost Item</>)}
      </Button>

      {showForm && (
        <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="mb-6 p-5 bg-card rounded-2xl shadow-card border border-border/50 space-y-4">
          <div>
            <Label htmlFor="itemName" className="text-foreground font-semibold text-sm mb-2 block">Item Name *</Label>
            <Input id="itemName" placeholder="What did you lose?" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-12 bg-secondary/60 border border-border/80 rounded-xl" />
          </div>
          <div>
            <Label htmlFor="description" className="text-foreground font-semibold text-sm mb-2 block">Description *</Label>
            <Textarea id="description" placeholder="Describe the item..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="min-h-[80px] bg-secondary/60 border border-border/80 rounded-xl resize-none" />
          </div>
          <div>
            <Label htmlFor="location" className="text-foreground font-semibold text-sm mb-2 block">Last Seen Location *</Label>
            <Input id="location" placeholder="Where did you last have it?" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="h-12 bg-secondary/60 border border-border/80 rounded-xl" />
          </div>
          <div>
            <Label htmlFor="date" className="text-foreground font-semibold text-sm mb-2 block">Date Lost</Label>
            <Input id="date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="h-12 bg-secondary/60 border border-border/80 rounded-xl" />
          </div>
          <Button type="submit" className="w-full rounded-xl gradient-primary" disabled={!formData.name || !formData.description || !formData.location || isSubmitting}>
            {isSubmitting ? (<div className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</div>) : "Submit Report"}
          </Button>
        </motion.form>
      )}

      <Tabs defaultValue="lost" className="w-full">
        <TabsList className="w-full bg-secondary/60 p-1 rounded-2xl mb-4 border border-border/30">
          <TabsTrigger value="lost" className="flex-1 rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-sm font-semibold text-sm">
            <Search className="w-4 h-4 mr-2" />Lost Items
          </TabsTrigger>
          <TabsTrigger value="found" className="flex-1 rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-sm font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4 mr-2" />Found Items
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lost" className="space-y-3">
          {lostItems.map((item, idx) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
              <ItemCard item={item} />
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="found" className="space-y-3">
          {foundItems.map((item, idx) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
              <ItemCard item={item} />
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default LostFound;
