
-- Room Listings table
CREATE TABLE public.room_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  location TEXT,
  amenities TEXT[] DEFAULT '{}',
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.room_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view listings" ON public.room_listings
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create own listings" ON public.room_listings
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own listings" ON public.room_listings
  FOR UPDATE TO authenticated USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own listings" ON public.room_listings
  FOR DELETE TO authenticated USING (auth.uid() = owner_id);

-- Booking Requests table
CREATE TABLE public.booking_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  listing_id UUID NOT NULL REFERENCES public.room_listings(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own booking requests" ON public.booking_requests
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Listing owners can view requests for their listings" ON public.booking_requests
  FOR SELECT TO authenticated USING (
    listing_id IN (SELECT id FROM public.room_listings WHERE owner_id = auth.uid())
  );

CREATE POLICY "Users can create booking requests" ON public.booking_requests
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Listing owners can update request status" ON public.booking_requests
  FOR UPDATE TO authenticated USING (
    listing_id IN (SELECT id FROM public.room_listings WHERE owner_id = auth.uid())
  );

-- Triggers for updated_at
CREATE TRIGGER update_room_listings_updated_at
  BEFORE UPDATE ON public.room_listings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_booking_requests_updated_at
  BEFORE UPDATE ON public.booking_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
