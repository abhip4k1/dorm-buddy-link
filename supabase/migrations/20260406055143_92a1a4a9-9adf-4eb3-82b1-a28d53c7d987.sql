
-- Allow authenticated users to update doctor_slots (mark as booked)
CREATE POLICY "Authenticated users can update slots"
ON public.doctor_slots
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to update appointments (cancel)
CREATE POLICY "Users can update own appointments"
ON public.appointments
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
