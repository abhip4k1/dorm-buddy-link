import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, DoorOpen, Stethoscope, AlertTriangle, Users, Star } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    complaints: 0, pendingComplaints: 0,
    gatePasses: 0, pendingGatePasses: 0,
    appointments: 0, emergencies: 0,
    students: 0, feedback: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [complaints, pendingComplaints, gatePasses, pendingGatePasses, appointments, emergencies, students, feedback] = await Promise.all([
        supabase.from("complaints").select("id", { count: "exact", head: true }),
        supabase.from("complaints").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("gate_passes").select("id", { count: "exact", head: true }),
        supabase.from("gate_passes").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("appointments").select("id", { count: "exact", head: true }),
        supabase.from("emergency_alerts").select("id", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("feedback").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        complaints: complaints.count || 0,
        pendingComplaints: pendingComplaints.count || 0,
        gatePasses: gatePasses.count || 0,
        pendingGatePasses: pendingGatePasses.count || 0,
        appointments: appointments.count || 0,
        emergencies: emergencies.count || 0,
        students: students.count || 0,
        feedback: feedback.count || 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "Total Complaints", value: stats.complaints, sub: `${stats.pendingComplaints} pending`, icon: MessageSquare, color: "text-orange-500" },
    { title: "Gate Passes", value: stats.gatePasses, sub: `${stats.pendingGatePasses} pending`, icon: DoorOpen, color: "text-blue-500" },
    { title: "Appointments", value: stats.appointments, sub: "Total booked", icon: Stethoscope, color: "text-green-500" },
    { title: "Active Emergencies", value: stats.emergencies, sub: "Needs attention", icon: AlertTriangle, color: "text-red-500" },
    { title: "Registered Students", value: stats.students, sub: "Total profiles", icon: Users, color: "text-purple-500" },
    { title: "Feedback", value: stats.feedback, sub: "Submissions", icon: Star, color: "text-yellow-500" },
  ];

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Card key={card.title} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
