-- Create doctors table
CREATE TABLE public.doctors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  qualification TEXT,
  profile_image TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create time slots table
CREATE TABLE public.doctor_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  slot_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_booked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  appointment_id TEXT NOT NULL UNIQUE,
  student_enrollment TEXT NOT NULL,
  student_name TEXT NOT NULL,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id),
  slot_id UUID NOT NULL REFERENCES public.doctor_slots(id),
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'completed', 'cancelled', 'rescheduled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Public read access for doctors (students can view all doctors)
CREATE POLICY "Anyone can view doctors" ON public.doctors FOR SELECT USING (true);

-- Public read access for slots (students can view all slots)
CREATE POLICY "Anyone can view slots" ON public.doctor_slots FOR SELECT USING (true);

-- Public access for appointments (for prototype - in production would be auth-based)
CREATE POLICY "Anyone can view appointments" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Anyone can create appointments" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update appointments" ON public.appointments FOR UPDATE USING (true);

-- Insert sample doctors for Parul Sevashram Hospital
INSERT INTO public.doctors (name, department, qualification, is_available) VALUES
  ('Dr. Priya Sharma', 'General Medicine', 'MBBS, MD', true),
  ('Dr. Rajesh Patel', 'Orthopedics', 'MBBS, MS Ortho', true),
  ('Dr. Sneha Desai', 'Dermatology', 'MBBS, MD Derma', true),
  ('Dr. Amit Kumar', 'ENT', 'MBBS, MS ENT', false),
  ('Dr. Kavita Mehta', 'Psychiatry', 'MBBS, MD Psych', true);

-- Insert sample time slots for today and tomorrow
INSERT INTO public.doctor_slots (doctor_id, slot_date, start_time, end_time, is_booked)
SELECT 
  d.id,
  CURRENT_DATE,
  t.start_time::TIME,
  t.end_time::TIME,
  false
FROM public.doctors d
CROSS JOIN (
  VALUES 
    ('09:00', '09:30'),
    ('09:30', '10:00'),
    ('10:00', '10:30'),
    ('10:30', '11:00'),
    ('11:00', '11:30'),
    ('14:00', '14:30'),
    ('14:30', '15:00'),
    ('15:00', '15:30')
) AS t(start_time, end_time)
WHERE d.is_available = true;

-- Insert slots for tomorrow
INSERT INTO public.doctor_slots (doctor_id, slot_date, start_time, end_time, is_booked)
SELECT 
  d.id,
  CURRENT_DATE + 1,
  t.start_time::TIME,
  t.end_time::TIME,
  false
FROM public.doctors d
CROSS JOIN (
  VALUES 
    ('09:00', '09:30'),
    ('09:30', '10:00'),
    ('10:00', '10:30'),
    ('10:30', '11:00'),
    ('11:00', '11:30'),
    ('14:00', '14:30'),
    ('14:30', '15:00'),
    ('15:00', '15:30')
) AS t(start_time, end_time)
WHERE d.is_available = true;

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for appointments
CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();