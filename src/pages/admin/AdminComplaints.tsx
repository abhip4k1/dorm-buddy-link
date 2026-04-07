import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
};

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  const fetchComplaints = async () => {
    let query = supabase.from("complaints").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data } = await query;
    setComplaints(data || []);
  };

  useEffect(() => { fetchComplaints(); }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("complaints").update({ status }).eq("id", id);
    if (error) { toast.error("Failed to update"); return; }
    toast.success("Status updated");
    fetchComplaints();
  };

  return (
    <AdminLayout title="Manage Complaints">
      <div className="flex gap-2 mb-4 flex-wrap">
        {["all", "pending", "in-progress", "resolved"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            }`}
          >
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {complaints.map((c) => (
          <Card key={c.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{c.complaint_id}</span>
                    <Badge className={statusColors[c.status] || ""}>{c.status}</Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground">{c.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">Category: {c.category} • {new Date(c.created_at).toLocaleDateString()}</p>
                </div>
                <Select value={c.status} onValueChange={(v) => updateStatus(c.id, v)}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
        {complaints.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No complaints found</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminComplaints;
