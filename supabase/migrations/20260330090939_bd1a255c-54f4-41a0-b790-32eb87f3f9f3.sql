
-- Complaints table
CREATE TABLE public.complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  complaint_id text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  image_url text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own complaints" ON public.complaints
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can create own complaints" ON public.complaints
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Gate passes table
CREATE TABLE public.gate_passes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  pass_id text NOT NULL,
  reason text NOT NULL,
  departure_date date NOT NULL,
  return_date date,
  status text NOT NULL DEFAULT 'pending',
  approved_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.gate_passes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own gate passes" ON public.gate_passes
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can create own gate passes" ON public.gate_passes
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Lost & Found items table
CREATE TABLE public.lost_found_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  item_name text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  item_type text NOT NULL DEFAULT 'lost',
  contact_info text,
  is_resolved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.lost_found_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view lost found items" ON public.lost_found_items
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can create items" ON public.lost_found_items
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Announcements table
CREATE TABLE public.announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  is_important boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view announcements" ON public.announcements
  FOR SELECT TO authenticated USING (true);

-- Fee records table
CREATE TABLE public.fee_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  semester text NOT NULL,
  amount numeric NOT NULL,
  due_date date,
  paid_date date,
  status text NOT NULL DEFAULT 'pending',
  transaction_id text,
  breakdown jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.fee_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own fee records" ON public.fee_records
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Feedback table
CREATE TABLE public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  satisfaction text NOT NULL,
  message text NOT NULL,
  is_anonymous boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create feedback" ON public.feedback
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own feedback" ON public.feedback
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Mess menu table
CREATE TABLE public.mess_menu (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week text NOT NULL,
  meal_type text NOT NULL,
  items text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.mess_menu ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view mess menu" ON public.mess_menu
  FOR SELECT TO authenticated USING (true);

-- Emergency alerts table
CREATE TABLE public.emergency_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  alert_type text NOT NULL DEFAULT 'sos',
  message text,
  location text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.emergency_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create emergency alerts" ON public.emergency_alerts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own alerts" ON public.emergency_alerts
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Add updated_at triggers
CREATE TRIGGER update_complaints_updated_at BEFORE UPDATE ON public.complaints
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gate_passes_updated_at BEFORE UPDATE ON public.gate_passes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mess_menu_updated_at BEFORE UPDATE ON public.mess_menu
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
