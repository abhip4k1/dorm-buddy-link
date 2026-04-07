import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const satisfactionColors: Record<string, string> = {
  excellent: "bg-green-100 text-green-800",
  good: "bg-blue-100 text-blue-800",
  average: "bg-yellow-100 text-yellow-800",
  poor: "bg-red-100 text-red-800",
};

const AdminFeedback = () => {
  const [feedback, setFeedback] = useState<any[]>([]);

  useEffect(() => {
    const fetch_ = async () => {
      const { data } = await supabase.from("feedback").select("*").order("created_at", { ascending: false });
      setFeedback(data || []);
    };
    fetch_();
  }, []);

  return (
    <AdminLayout title="Student Feedback">
      <div className="space-y-3">
        {feedback.map((f) => (
          <Card key={f.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <Badge className={satisfactionColors[f.satisfaction] || ""}>{f.satisfaction}</Badge>
                {f.is_anonymous && <Badge variant="outline" className="text-[10px]">Anonymous</Badge>}
              </div>
              <p className="text-sm text-foreground">{f.message}</p>
              <p className="text-xs text-muted-foreground mt-2">{new Date(f.created_at).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
        {feedback.length === 0 && <p className="text-center text-muted-foreground py-8">No feedback yet</p>}
      </div>
    </AdminLayout>
  );
};

export default AdminFeedback;
