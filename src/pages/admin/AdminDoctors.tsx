import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [showSlotForm, setShowSlotForm] = useState(false);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [qualification, setQualification] = useState("");
  const [slotDoctorId, setSlotDoctorId] = useState("");
  const [slotDate, setSlotDate] = useState("");
  const [slotStart, setSlotStart] = useState("");
  const [slotEnd, setSlotEnd] = useState("");

  const fetchDoctors = async () => {
    const { data } = await supabase.from("doctors").select("*").order("name");
    setDoctors(data || []);
  };

  const fetchSlots = async () => {
    const { data } = await supabase.from("doctor_slots").select("*, doctors(name)").order("slot_date", { ascending: true });
    setSlots(data || []);
  };

  useEffect(() => { fetchDoctors(); fetchSlots(); }, []);

  const addDoctor = async () => {
    if (!name || !department) { toast.error("Fill required fields"); return; }
    const { error } = await supabase.from("doctors").insert({ name, department, qualification: qualification || null });
    if (error) { toast.error("Failed"); return; }
    toast.success("Doctor added");
    setName(""); setDepartment(""); setQualification(""); setShowDoctorForm(false);
    fetchDoctors();
  };

  const removeDoctor = async (id: string) => {
    const { error } = await supabase.from("doctors").delete().eq("id", id);
    if (error) { toast.error("Failed"); return; }
    toast.success("Removed");
    fetchDoctors();
  };

  const addSlot = async () => {
    if (!slotDoctorId || !slotDate || !slotStart || !slotEnd) { toast.error("Fill all fields"); return; }
    const { error } = await supabase.from("doctor_slots").insert({
      doctor_id: slotDoctorId, slot_date: slotDate, start_time: slotStart, end_time: slotEnd,
    });
    if (error) { toast.error("Failed"); return; }
    toast.success("Slot added");
    setSlotDate(""); setSlotStart(""); setSlotEnd(""); setShowSlotForm(false);
    fetchSlots();
  };

  return (
    <AdminLayout title="Manage Doctors & Slots">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doctors */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Doctors</h2>
            <Button size="sm" onClick={() => setShowDoctorForm(!showDoctorForm)}>
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>
          {showDoctorForm && (
            <Card className="mb-3 border-border/50">
              <CardContent className="p-4 space-y-2">
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                <Input placeholder="Qualification (optional)" value={qualification} onChange={(e) => setQualification(e.target.value)} />
                <Button onClick={addDoctor} className="w-full">Add Doctor</Button>
              </CardContent>
            </Card>
          )}
          <div className="space-y-2">
            {doctors.map((d) => (
              <Card key={d.id} className="border-border/50">
                <CardContent className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.department} {d.qualification && `• ${d.qualification}`}</p>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => removeDoctor(d.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Slots */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Appointment Slots</h2>
            <Button size="sm" onClick={() => setShowSlotForm(!showSlotForm)}>
              <Plus className="w-4 h-4 mr-1" /> Add Slot
            </Button>
          </div>
          {showSlotForm && (
            <Card className="mb-3 border-border/50">
              <CardContent className="p-4 space-y-2">
                <Select value={slotDoctorId} onValueChange={setSlotDoctorId}>
                  <SelectTrigger><SelectValue placeholder="Select Doctor" /></SelectTrigger>
                  <SelectContent>
                    {doctors.map((d) => (
                      <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input type="date" value={slotDate} onChange={(e) => setSlotDate(e.target.value)} />
                <div className="grid grid-cols-2 gap-2">
                  <Input type="time" value={slotStart} onChange={(e) => setSlotStart(e.target.value)} placeholder="Start" />
                  <Input type="time" value={slotEnd} onChange={(e) => setSlotEnd(e.target.value)} placeholder="End" />
                </div>
                <Button onClick={addSlot} className="w-full">Add Slot</Button>
              </CardContent>
            </Card>
          )}
          <div className="space-y-2">
            {slots.slice(0, 20).map((s) => (
              <Card key={s.id} className="border-border/50">
                <CardContent className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{(s as any).doctors?.name || "Unknown"}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.slot_date} • {s.start_time} - {s.end_time}
                    </p>
                  </div>
                  <Badge variant={s.is_booked ? "destructive" : "secondary"}>
                    {s.is_booked ? "Booked" : "Available"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDoctors;
