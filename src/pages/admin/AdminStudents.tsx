import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";

const AdminStudents = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch_ = async () => {
      const { data } = await supabase.from("profiles").select("*").order("full_name");
      setProfiles(data || []);
    };
    fetch_();
  }, []);

  const filtered = profiles.filter(
    (p) =>
      p.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      p.enrollment_id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Students">
      <Input
        placeholder="Search by name or enrollment ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-md"
      />
      <div className="space-y-2">
        {filtered.map((p) => (
          <Card key={p.id} className="border-border/50">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{p.full_name || "—"}</p>
                <p className="text-xs text-muted-foreground">
                  {p.enrollment_id} {p.hostel_block && `• Block ${p.hostel_block}`} {p.room_number && `• Room ${p.room_number}`}
                </p>
              </div>
              {p.phone && <span className="text-xs text-muted-foreground">{p.phone}</span>}
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No students found</p>}
      </div>
    </AdminLayout>
  );
};

export default AdminStudents;
