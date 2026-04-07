import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const AdminGatePasses = () => {
  const [passes, setPasses] = useState<any[]>([]);
  const [filter, setFilter] = useState("pending");

  const fetchPasses = async () => {
    let query = supabase.from("gate_passes").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data } = await query;
    setPasses(data || []);
  };

  useEffect(() => { fetchPasses(); }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("gate_passes").update({ status, approved_by: "Admin" }).eq("id", id);
    if (error) { toast.error("Failed to update"); return; }
    toast.success(`Gate pass ${status}`);
    fetchPasses();
  };

  return (
    <AdminLayout title="Manage Gate Passes">
      <div className="flex gap-2 mb-4 flex-wrap">
        {["all", "pending", "approved", "rejected"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {passes.map((p) => (
          <Card key={p.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{p.pass_id}</span>
                    <Badge className={statusColors[p.status] || ""}>{p.status}</Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground">{p.reason}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Departure: {new Date(p.departure_date).toLocaleDateString()}
                    {p.return_date && ` • Return: ${new Date(p.return_date).toLocaleDateString()}`}
                  </p>
                </div>
                {p.status === "pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => updateStatus(p.id, "approved")} className="bg-green-600 hover:bg-green-700">
                      <Check className="w-4 h-4 mr-1" /> Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => updateStatus(p.id, "rejected")}>
                      <X className="w-4 h-4 mr-1" /> Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {passes.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No gate passes found</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminGatePasses;
