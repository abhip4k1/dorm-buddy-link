import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, MapPin, Calendar, CheckCircle2, X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LostFoundItem {
  id: string;
  item_name: string;
  description: string;
  location: string;
  item_type: string;
  contact_info: string | null;
  created_at: string;
}

const LostFound = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", location: "", contact: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("lost_found_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.location) return;
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error("Please login"); return; }

      const { error } = await supabase.from("lost_found_items").insert({
        user_id: user.id,
        item_name: formData.name,
        description: formData.description,
        location: formData.location,
        item_type: "lost",
        contact_info: formData.contact || null,
      });

      if (error) throw error;
      toast.success("Item reported successfully!");
      setShowForm(false);
      setFormData({ name: "", description: "", location: "", contact: "" });
      fetchItems();
    } catch (err: any) {
      toast.error(err.message || "Failed to report item");
    } finally {
      setIsSubmitting(false);
    }
  };

  const lostItems = items.filter(i => i.item_type === "lost");
  const foundItems = items.filter(i => i.item_type === "found");

  const ItemCard = ({ item }: { item: LostFoundItem }) => (
    <div className="bg-card p-4 rounded-2xl shadow-card border border-border/50">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-foreground text-sm">{item.item_name}</h3>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.item_type === "lost" ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"}`}>
          {item.item_type === "lost" ? "Lost" : "Found"}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
      <div className="space-y-1.5 text-[11px] text-muted-foreground font-medium">
        <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /><span>{item.location}</span></div>
        <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /><span>{new Date(item.created_at).toLocaleDateString()}</span></div>
        {item.contact_info && <div className="flex items-center gap-2"><Search className="w-3.5 h-3.5" /><span>Contact: {item.contact_info}</span></div>}
      </div>
    </div>
  );

  return (
    <Layout title="Lost & Found" showBack>
      <Button onClick={() => setShowForm(!showForm)} className={`w-full mb-6 rounded-xl ${!showForm ? 'gradient-primary shadow-glow' : ''}`} size="lg" variant={showForm ? "outline" : "default"}>
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
            <Label htmlFor="contact" className="text-foreground font-semibold text-sm mb-2 block">Contact Info</Label>
            <Input id="contact" placeholder="Room number or phone" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} className="h-12 bg-secondary/60 border border-border/80 rounded-xl" />
          </div>
          <Button type="submit" className="w-full rounded-xl gradient-primary" disabled={!formData.name || !formData.description || !formData.location || isSubmitting}>
            {isSubmitting ? (<div className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</div>) : "Submit Report"}
          </Button>
        </motion.form>
      )}

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <Tabs defaultValue="lost" className="w-full">
          <TabsList className="w-full bg-secondary/60 p-1 rounded-2xl mb-4 border border-border/30">
            <TabsTrigger value="lost" className="flex-1 rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-sm font-semibold text-sm">
              <Search className="w-4 h-4 mr-2" />Lost ({lostItems.length})
            </TabsTrigger>
            <TabsTrigger value="found" className="flex-1 rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-sm font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4 mr-2" />Found ({foundItems.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="lost" className="space-y-3">
            {lostItems.map((item, idx) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
                <ItemCard item={item} />
              </motion.div>
            ))}
            {lostItems.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">No lost items reported</p>}
          </TabsContent>
          <TabsContent value="found" className="space-y-3">
            {foundItems.map((item, idx) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
                <ItemCard item={item} />
              </motion.div>
            ))}
            {foundItems.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">No found items reported</p>}
          </TabsContent>
        </Tabs>
      )}
    </Layout>
  );
};

export default LostFound;
