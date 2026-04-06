import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Stethoscope, Calendar, Clock, User, CheckCircle2, XCircle,
  ChevronRight, Building2, Phone, AlertCircle, Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface Doctor {
  id: string; name: string; department: string; qualification: string | null; is_available: boolean;
}
interface Slot {
  id: string; doctor_id: string; slot_date: string; start_time: string; end_time: string; is_booked: boolean;
}
interface Appointment {
  id: string; appointment_id: string; doctor_id: string; slot_id: string; reason: string | null; status: string; created_at: string;
  doctors?: Doctor; doctor_slots?: Slot;
}

const HealthAppointment = () => {
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [reason, setReason] = useState("");
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);
  const [bookedAppointmentId, setBookedAppointmentId] = useState("");
  const [activeTab, setActiveTab] = useState<"book" | "my-appointments">("book");

  useEffect(() => { fetchDoctors(); fetchMyAppointments(); }, []);

  const fetchDoctors = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("doctors").select("*").order("department");
    if (error) { toast({ title: "Error loading doctors", description: error.message, variant: "destructive" }); }
    else { setDoctors(data || []); }
    setIsLoading(false);
  };

  const fetchMyAppointments = async () => {
    const enrollment = profile?.enrollment_id || user?.email || "";
    const { data, error } = await supabase.from("appointments").select(`*, doctors (*), doctor_slots (*)`).eq("student_enrollment", enrollment).order("created_at", { ascending: false });
    if (!error) setMyAppointments(data || []);
  };

  const fetchSlots = async (doctorId: string) => {
    const { data, error } = await supabase.from("doctor_slots").select("*").eq("doctor_id", doctorId).eq("is_booked", false).gte("slot_date", format(new Date(), "yyyy-MM-dd")).order("slot_date").order("start_time");
    if (!error) setSlots(data || []);
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor); setSelectedSlot(null); fetchSlots(doctor.id); setIsBookingDialogOpen(true);
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedSlot) return;
    setIsBooking(true);
    const appointmentId = `PU-HSP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const enrollment = profile?.enrollment_id || user?.email || "";
    const studentName = profile?.full_name || "Student";
    const { error: appointmentError } = await supabase.from("appointments").insert({ appointment_id: appointmentId, student_enrollment: enrollment, student_name: studentName, doctor_id: selectedDoctor.id, slot_id: selectedSlot.id, reason: reason || null, status: "confirmed" });
    if (appointmentError) { toast({ title: "Booking failed", description: appointmentError.message, variant: "destructive" }); setIsBooking(false); return; }
    await supabase.from("doctor_slots").update({ is_booked: true }).eq("id", selectedSlot.id);
    setIsBooking(false); setIsBookingDialogOpen(false); setBookedAppointmentId(appointmentId); setIsConfirmationDialogOpen(true);
    fetchMyAppointments(); fetchSlots(selectedDoctor.id); setReason(""); setSelectedSlot(null);
  };

  const handleCancelAppointment = async (appointment: Appointment) => {
    const { error } = await supabase.from("appointments").update({ status: "cancelled" }).eq("id", appointment.id);
    if (error) { toast({ title: "Cancellation failed", description: error.message, variant: "destructive" }); return; }
    await supabase.from("doctor_slots").update({ is_booked: false }).eq("id", appointment.slot_id);
    toast({ title: "Appointment cancelled", description: "Your appointment has been cancelled successfully." });
    fetchMyAppointments();
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":"); const hour = parseInt(hours); const ampm = hour >= 12 ? "PM" : "AM"; const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const groupSlotsByDate = (slots: Slot[]) => {
    const grouped: Record<string, Slot[]> = {};
    slots.forEach((slot) => { if (!grouped[slot.slot_date]) grouped[slot.slot_date] = []; grouped[slot.slot_date].push(slot); });
    return grouped;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed": return <Badge className="bg-primary/10 text-primary border-0 font-bold text-[10px]">Confirmed</Badge>;
      case "completed": return <Badge className="bg-success/10 text-success border-0 font-bold text-[10px]">Completed</Badge>;
      case "cancelled": return <Badge className="bg-destructive/10 text-destructive border-0 font-bold text-[10px]">Cancelled</Badge>;
      default: return <Badge variant="secondary" className="font-bold text-[10px]">{status}</Badge>;
    }
  };

  return (
    <Layout title="Health Appointments" showBack>
      {/* Hospital Info */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="gradient-hero rounded-2xl p-4 mb-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -mr-6 -mt-6" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white">Parul Sevashram Hospital</h2>
              <p className="text-xs text-white/60 font-medium">Campus Medical Center</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50 mt-2 font-medium">
            <Phone className="w-3 h-3" />
            <span>Emergency: 02668-260123</span>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        <Button
          variant={activeTab === "book" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("book")}
          className={`flex-1 rounded-xl font-semibold ${activeTab === "book" ? "gradient-primary shadow-glow" : ""}`}
        >
          <Stethoscope className="w-4 h-4 mr-2" />Book
        </Button>
        <Button
          variant={activeTab === "my-appointments" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("my-appointments")}
          className={`flex-1 rounded-xl font-semibold ${activeTab === "my-appointments" ? "gradient-primary shadow-glow" : ""}`}
        >
          <Calendar className="w-4 h-4 mr-2" />My Appointments
        </Button>
      </div>

      {activeTab === "book" && (
        <>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Available Doctors</h3>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-3">
              {doctors.map((doctor, idx) => (
                <motion.div key={doctor.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}>
                  <Card
                    className={`p-4 cursor-pointer transition-all duration-300 rounded-2xl border border-border/50 ${
                      doctor.is_available ? "hover:shadow-card-hover hover:border-primary/30 active:scale-[0.98]" : "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => doctor.is_available && handleDoctorSelect(doctor)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-foreground text-sm">{doctor.name}</h4>
                          {doctor.is_available ? <CheckCircle2 className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-muted-foreground" />}
                        </div>
                        <p className="text-sm text-primary font-medium">{doctor.department}</p>
                        {doctor.qualification && <p className="text-[11px] text-muted-foreground font-medium">{doctor.qualification}</p>}
                      </div>
                      {doctor.is_available && <ChevronRight className="w-5 h-5 text-muted-foreground/50" />}
                    </div>
                    {!doctor.is_available && (
                      <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
                        <AlertCircle className="w-3 h-3" /><span>Currently unavailable</span>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "my-appointments" && (
        <>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Your Appointments</h3>
          {myAppointments.length === 0 ? (
            <Card className="p-8 text-center rounded-2xl border border-border/50">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No appointments yet</p>
              <Button variant="link" onClick={() => setActiveTab("book")} className="mt-2 font-semibold">Book your first appointment</Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {myAppointments.map((appointment, idx) => (
                <motion.div key={appointment.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}>
                  <Card className="p-4 rounded-2xl border border-border/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-foreground text-sm">{(appointment.doctors as Doctor)?.name}</p>
                        <p className="text-sm text-primary font-medium">{(appointment.doctors as Doctor)?.department}</p>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 font-medium">
                      <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /><span>{format(new Date((appointment.doctor_slots as Slot)?.slot_date), "MMM dd, yyyy")}</span></div>
                      <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{formatTime((appointment.doctor_slots as Slot)?.start_time)}</span></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] text-muted-foreground font-medium">ID: {appointment.appointment_id}</p>
                      {appointment.status === "confirmed" && (
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive font-semibold" onClick={() => handleCancelAppointment(appointment)}>Cancel</Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold">Book Appointment</DialogTitle>
            <DialogDescription className="font-medium">{selectedDoctor?.name} - {selectedDoctor?.department}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold mb-2">Select Time Slot</h4>
              {slots.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center font-medium">No available slots</p>
              ) : (
                Object.entries(groupSlotsByDate(slots)).map(([date, dateSlots]) => (
                  <div key={date} className="mb-4">
                    <p className="text-xs font-bold text-muted-foreground mb-2">{format(new Date(date), "EEEE, MMMM dd")}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {dateSlots.map((slot) => (
                        <Button key={slot.id} variant={selectedSlot?.id === slot.id ? "default" : "outline"} size="sm" onClick={() => setSelectedSlot(slot)}
                          className={`text-xs rounded-xl font-semibold ${selectedSlot?.id === slot.id ? "gradient-primary" : ""}`}>
                          {formatTime(slot.start_time)}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div>
              <label className="text-sm font-bold mb-2 block">Reason for visit (optional)</label>
              <Textarea placeholder="Brief description..." value={reason} onChange={(e) => setReason(e.target.value)} rows={3} className="rounded-xl bg-secondary/60 border border-border/80" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)} className="rounded-xl">Cancel</Button>
            <Button onClick={handleBookAppointment} disabled={!selectedSlot || isBooking} className="rounded-xl gradient-primary">
              {isBooking ? (<><Loader2 className="w-4 h-4 animate-spin" />Booking...</>) : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
        <DialogContent className="max-w-sm rounded-2xl">
          <div className="flex flex-col items-center py-4">
            <div className="w-16 h-16 rounded-full gradient-success flex items-center justify-center mb-4 shadow-lg">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-center mb-2 font-bold">Appointment Booked!</DialogTitle>
            <DialogDescription className="text-center font-medium">
              Your appointment has been confirmed.
            </DialogDescription>
            <div className="bg-secondary/60 p-4 rounded-2xl mt-4 w-full border border-border/50">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Appointment ID</p>
              <p className="text-lg font-extrabold text-foreground mt-1">{bookedAppointmentId}</p>
            </div>
            <Button className="mt-6 rounded-xl gradient-primary w-full" onClick={() => { setIsConfirmationDialogOpen(false); setActiveTab("my-appointments"); }}>
              View My Appointments
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default HealthAppointment;
