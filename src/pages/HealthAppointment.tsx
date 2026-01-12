import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Stethoscope, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  XCircle,
  ChevronRight,
  Building2,
  Phone,
  AlertCircle,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { format } from "date-fns";

interface Doctor {
  id: string;
  name: string;
  department: string;
  qualification: string | null;
  is_available: boolean;
}

interface Slot {
  id: string;
  doctor_id: string;
  slot_date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

interface Appointment {
  id: string;
  appointment_id: string;
  doctor_id: string;
  slot_id: string;
  reason: string | null;
  status: string;
  created_at: string;
  doctors?: Doctor;
  doctor_slots?: Slot;
}

const HealthAppointment = () => {
  const { toast } = useToast();
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

  // Fetch doctors on mount
  useEffect(() => {
    fetchDoctors();
    fetchMyAppointments();
  }, []);

  const fetchDoctors = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .order("department");
    
    if (error) {
      toast({
        title: "Error loading doctors",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setDoctors(data || []);
    }
    setIsLoading(false);
  };

  const fetchMyAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select(`
        *,
        doctors (*),
        doctor_slots (*)
      `)
      .eq("student_enrollment", "guest")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching appointments:", error);
    } else {
      setMyAppointments(data || []);
    }
  };

  const fetchSlots = async (doctorId: string) => {
    const { data, error } = await supabase
      .from("doctor_slots")
      .select("*")
      .eq("doctor_id", doctorId)
      .eq("is_booked", false)
      .gte("slot_date", format(new Date(), "yyyy-MM-dd"))
      .order("slot_date")
      .order("start_time");
    
    if (error) {
      toast({
        title: "Error loading slots",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setSlots(data || []);
    }
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedSlot(null);
    fetchSlots(doctor.id);
    setIsBookingDialogOpen(true);
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedSlot) return;

    setIsBooking(true);
    
    // Generate appointment ID
    const appointmentId = `PU-HSP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Insert appointment
    const { error: appointmentError } = await supabase
      .from("appointments")
      .insert({
        appointment_id: appointmentId,
        student_enrollment: "guest",
        student_name: "Abhi",
        doctor_id: selectedDoctor.id,
        slot_id: selectedSlot.id,
        reason: reason || null,
        status: "confirmed"
      });

    if (appointmentError) {
      toast({
        title: "Booking failed",
        description: appointmentError.message,
        variant: "destructive",
      });
      setIsBooking(false);
      return;
    }

    // Update slot to booked
    const { error: slotError } = await supabase
      .from("doctor_slots")
      .update({ is_booked: true })
      .eq("id", selectedSlot.id);

    if (slotError) {
      console.error("Error updating slot:", slotError);
    }

    setIsBooking(false);
    setIsBookingDialogOpen(false);
    setBookedAppointmentId(appointmentId);
    setIsConfirmationDialogOpen(true);
    
    // Refresh appointments
    fetchMyAppointments();
    fetchSlots(selectedDoctor.id);
    
    // Reset form
    setReason("");
    setSelectedSlot(null);
  };

  const handleCancelAppointment = async (appointment: Appointment) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: "cancelled" })
      .eq("id", appointment.id);

    if (error) {
      toast({
        title: "Cancellation failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    // Free up the slot
    await supabase
      .from("doctor_slots")
      .update({ is_booked: false })
      .eq("id", appointment.slot_id);

    toast({
      title: "Appointment cancelled",
      description: "Your appointment has been cancelled successfully.",
    });

    fetchMyAppointments();
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const groupSlotsByDate = (slots: Slot[]) => {
    const grouped: Record<string, Slot[]> = {};
    slots.forEach((slot) => {
      if (!grouped[slot.slot_date]) {
        grouped[slot.slot_date] = [];
      }
      grouped[slot.slot_date].push(slot);
    });
    return grouped;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-primary/10 text-primary border-0">Confirmed</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-700 border-0">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-destructive/10 text-destructive border-0">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Layout title="Health Appointments" showBack>
      {/* Hospital Info Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 mb-6 border border-primary/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Parul Sevashram Hospital</h2>
            <p className="text-xs text-muted-foreground">Campus Medical Center</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
          <Phone className="w-3 h-3" />
          <span>Emergency: 02668-260123</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={activeTab === "book" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("book")}
          className="flex-1"
        >
          <Stethoscope className="w-4 h-4 mr-2" />
          Book Appointment
        </Button>
        <Button
          variant={activeTab === "my-appointments" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("my-appointments")}
          className="flex-1"
        >
          <Calendar className="w-4 h-4 mr-2" />
          My Appointments
        </Button>
      </div>

      {activeTab === "book" && (
        <>
          {/* Doctors List */}
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Available Doctors
          </h3>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-3">
              {doctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className={`p-4 cursor-pointer transition-all ${
                    doctor.is_available 
                      ? "hover:shadow-md hover:border-primary/30" 
                      : "opacity-60 cursor-not-allowed"
                  }`}
                  onClick={() => doctor.is_available && handleDoctorSelect(doctor)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">{doctor.name}</h4>
                        {doctor.is_available ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-sm text-primary">{doctor.department}</p>
                      {doctor.qualification && (
                        <p className="text-xs text-muted-foreground">{doctor.qualification}</p>
                      )}
                    </div>
                    {doctor.is_available && (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  {!doctor.is_available && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <AlertCircle className="w-3 h-3" />
                      <span>Currently unavailable</span>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "my-appointments" && (
        <>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Your Appointments
          </h3>
          
          {myAppointments.length === 0 ? (
            <Card className="p-8 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No appointments yet</p>
              <Button 
                variant="link" 
                onClick={() => setActiveTab("book")}
                className="mt-2"
              >
                Book your first appointment
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {myAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-foreground">
                        {(appointment.doctors as Doctor)?.name}
                      </p>
                      <p className="text-sm text-primary">
                        {(appointment.doctors as Doctor)?.department}
                      </p>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {format(new Date((appointment.doctor_slots as Slot)?.slot_date), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {formatTime((appointment.doctor_slots as Slot)?.start_time)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      ID: {appointment.appointment_id}
                    </p>
                    {appointment.status === "confirmed" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleCancelAppointment(appointment)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              {selectedDoctor?.name} - {selectedDoctor?.department}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Time Slots */}
            <div>
              <h4 className="text-sm font-medium mb-2">Select Time Slot</h4>
              {slots.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No available slots for this doctor
                </p>
              ) : (
                Object.entries(groupSlotsByDate(slots)).map(([date, dateSlots]) => (
                  <div key={date} className="mb-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      {format(new Date(date), "EEEE, MMMM dd")}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {dateSlots.map((slot) => (
                        <Button
                          key={slot.id}
                          variant={selectedSlot?.id === slot.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedSlot(slot)}
                          className="text-xs"
                        >
                          {formatTime(slot.start_time)}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Reason */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Reason for visit (optional)
              </label>
              <Textarea
                placeholder="Brief description of your health concern..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsBookingDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBookAppointment}
              disabled={!selectedSlot || isBooking}
            >
              {isBooking ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
        <DialogContent className="max-w-sm text-center">
          <div className="flex flex-col items-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl mb-2">Appointment Booked!</DialogTitle>
            <DialogDescription className="mb-4">
              Your appointment has been confirmed. Please arrive 10 minutes before your scheduled time.
            </DialogDescription>
            <div className="bg-muted rounded-lg p-3 w-full mb-4">
              <p className="text-xs text-muted-foreground">Appointment ID</p>
              <p className="font-mono font-semibold text-foreground">{bookedAppointmentId}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              📍 Parul Sevashram Hospital, Campus
            </p>
          </div>
          <Button onClick={() => setIsConfirmationDialogOpen(false)} className="w-full">
            Done
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default HealthAppointment;