import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const meals = ["breakfast", "lunch", "snacks", "dinner"];

const AdminMessMenu = () => {
  const [menu, setMenu] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [day, setDay] = useState("Monday");
  const [meal, setMeal] = useState("breakfast");
  const [items, setItems] = useState("");

  const fetch_ = async () => {
    const { data } = await supabase.from("mess_menu").select("*").order("day_of_week");
    setMenu(data || []);
  };

  useEffect(() => { fetch_(); }, []);

  const save = async () => {
    if (!items) { toast.error("Add items"); return; }
    const itemsArr = items.split(",").map((i) => i.trim()).filter(Boolean);
    const existing = menu.find((m) => m.day_of_week === day && m.meal_type === meal);
    if (existing) {
      const { error } = await supabase.from("mess_menu").update({ items: itemsArr }).eq("id", existing.id);
      if (error) { toast.error("Failed"); return; }
    } else {
      const { error } = await supabase.from("mess_menu").insert({ day_of_week: day, meal_type: meal, items: itemsArr });
      if (error) { toast.error("Failed"); return; }
    }
    toast.success("Menu saved");
    setItems(""); setShowForm(false);
    fetch_();
  };

  const remove = async (id: string) => {
    await supabase.from("mess_menu").delete().eq("id", id);
    toast.success("Deleted");
    fetch_();
  };

  return (
    <AdminLayout title="Manage Mess Menu">
      <Button onClick={() => setShowForm(!showForm)} className="mb-4">
        <Plus className="w-4 h-4 mr-2" /> Add / Update Menu
      </Button>
      {showForm && (
        <Card className="mb-4 border-border/50">
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Select value={day} onValueChange={setDay}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{days.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={meal} onValueChange={setMeal}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{meals.map((m) => <SelectItem key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <Input placeholder="Items (comma-separated)" value={items} onChange={(e) => setItems(e.target.value)} />
            <Button onClick={save}><Save className="w-4 h-4 mr-2" /> Save</Button>
          </CardContent>
        </Card>
      )}
      <div className="space-y-3">
        {days.map((d) => {
          const dayMenu = menu.filter((m) => m.day_of_week === d);
          if (dayMenu.length === 0) return null;
          return (
            <Card key={d} className="border-border/50">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-2">{d}</h3>
                {dayMenu.map((m) => (
                  <div key={m.id} className="flex items-center justify-between py-1">
                    <div>
                      <span className="text-xs font-medium text-primary capitalize">{m.meal_type}: </span>
                      <span className="text-xs text-muted-foreground">{m.items?.join(", ")}</span>
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => remove(m.id)} className="h-6 w-6 text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AdminLayout>
  );
};

export default AdminMessMenu;
