import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminEmergency = () => {
  const [alerts, setAlerts] = useState<any[]>([]);

  const fetch_ = async () => {
    const { data } = await supabase.from("emergency_alerts").select("*").order("created_at", { ascending: false });
    setAlerts(data || []);
  };

  useEffect(() => { fetch_(); }, []);

  const resolve = async (id: string) => {
    const { error } = await supabase.from("emergency_alerts").update({ status: "resolved" }).eq("id", id);
    if (error) { toast.error("Failed"); return; }
    toast.success("Alert resolved");
    fetch_();
  };

  return (
    <AdminLayout title="Emergency Alerts">
      <div className="space-y-3">
        {alerts.map((a) => (
          <Card key={a.id} className={`border-border/50 ${a.status === "active" ? "border-l-4 border-l-destructive" : ""}`}>
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={a.status === "active" ? "destructive" : "secondary"}>{a.status}</Badge>
                  <span className="text-xs text-muted-foreground uppercase font-medium">{a.alert_type}</span>
                </div>
                <p className="text-sm text-foreground">{a.message || "No message"}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {a.location && `Location: ${a.location} • `}
                  {new Date(a.created_at).toLocaleString()}
                </p>
              </div>
              {a.status === "active" && (
                <Button size="sm" onClick={() => resolve(a.id)}>Mark Resolved</Button>
              )}
            </CardContent>
          </Card>
        ))}
        {alerts.length === 0 && <p className="text-center text-muted-foreground py-8">No emergency alerts</p>}
      </div>
    </AdminLayout>
  );
};

export default AdminEmergency;
