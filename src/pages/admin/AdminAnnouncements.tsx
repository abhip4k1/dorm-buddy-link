import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [isImportant, setIsImportant] = useState(false);

  const fetch_ = async () => {
    const { data } = await supabase.from("announcements").select("*").order("created_at", { ascending: false });
    setAnnouncements(data || []);
  };

  useEffect(() => { fetch_(); }, []);

  const create = async () => {
    if (!title || !content) { toast.error("Fill all fields"); return; }
    const { error } = await supabase.from("announcements").insert({ title, content, category, is_important: isImportant });
    if (error) { toast.error("Failed to create"); return; }
    toast.success("Announcement created");
    setTitle(""); setContent(""); setCategory("general"); setIsImportant(false); setShowForm(false);
    fetch_();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    toast.success("Deleted");
    fetch_();
  };

  return (
    <AdminLayout title="Manage Announcements">
      <Button onClick={() => setShowForm(!showForm)} className="mb-4">
        <Plus className="w-4 h-4 mr-2" /> New Announcement
      </Button>

      {showForm && (
        <Card className="mb-4 border-border/50">
          <CardContent className="p-4 space-y-3">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
            <div className="flex flex-wrap gap-3 items-center">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Switch checked={isImportant} onCheckedChange={setIsImportant} />
                <Label className="text-sm">Important</Label>
              </div>
              <Button onClick={create}>Publish</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {announcements.map((a) => (
          <Card key={a.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-foreground">{a.title}</h3>
                    {a.is_important && <Badge variant="destructive" className="text-[10px]">Important</Badge>}
                    <Badge variant="secondary" className="text-[10px]">{a.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{a.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(a.created_at).toLocaleDateString()}</p>
                </div>
                <Button size="icon" variant="ghost" onClick={() => remove(a.id)} className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminAnnouncements;
