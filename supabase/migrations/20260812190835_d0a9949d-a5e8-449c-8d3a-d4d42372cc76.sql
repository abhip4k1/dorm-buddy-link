-- 1) doctor_slots: remove blanket update policy, admin-only direct updates
DROP POLICY IF EXISTS "Authenticated users can update slots" ON public.doctor_slots;

CREATE POLICY "Admins can update slots"
ON public.doctor_slots
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Controlled booking flow
CREATE OR REPLACE FUNCTION public.book_appointment_slot(
  _slot_id uuid,
  _appointment_id text,
  _student_enrollment text,
  _student_name text,
  _reason text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _doctor_id uuid;
  _new_id uuid;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  UPDATE public.doctor_slots
  SET is_booked = true
  WHERE id = _slot_id AND is_booked = false
  RETURNING doctor_id INTO _doctor_id;

  IF _doctor_id IS NULL THEN
    RAISE EXCEPTION 'Slot is not available';
  END IF;

  INSERT INTO public.appointments (
    appointment_id, user_id, student_enrollment, student_name,
    doctor_id, slot_id, reason, status
  )
  VALUES (
    _appointment_id, _uid, _student_enrollment, _student_name,
    _doctor_id, _slot_id, NULLIF(btrim(coalesce(_reason, '')), ''), 'confirmed'
  )
  RETURNING id INTO _new_id;

  RETURN _new_id;
END;
$$;

REVOKE ALL ON FUNCTION public.book_appointment_slot(uuid, text, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.book_appointment_slot(uuid, text, text, text, text) TO authenticated;

-- Controlled cancellation flow
CREATE OR REPLACE FUNCTION public.cancel_appointment(_appointment_row_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _slot_id uuid;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  UPDATE public.appointments
  SET status = 'cancelled'
  WHERE id = _appointment_row_id
    AND (user_id = _uid OR public.has_role(_uid, 'admin'))
    AND status <> 'cancelled'
  RETURNING slot_id INTO _slot_id;

  IF _slot_id IS NULL THEN
    RAISE EXCEPTION 'Appointment not found';
  END IF;

  UPDATE public.doctor_slots
  SET is_booked = false
  WHERE id = _slot_id;
END;
$$;

REVOKE ALL ON FUNCTION public.cancel_appointment(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.cancel_appointment(uuid) TO authenticated;

-- 2) feedback: strip identity for anonymous submissions
CREATE OR REPLACE FUNCTION public.anonymize_feedback()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.is_anonymous THEN
    NEW.user_id := NULL;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS anonymize_feedback_before_insert ON public.feedback;
CREATE TRIGGER anonymize_feedback_before_insert
BEFORE INSERT ON public.feedback
FOR EACH ROW EXECUTE FUNCTION public.anonymize_feedback();

-- Allow the insert policy to accept anonymous rows (user_id nulled by trigger runs before check anyway)
DROP POLICY IF EXISTS "Users can create feedback" ON public.feedback;
CREATE POLICY "Users can create feedback"
ON public.feedback
FOR INSERT
TO authenticated
WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

-- 3) lost_found_items: hide contact_info from non-owners
REVOKE SELECT ON public.lost_found_items FROM authenticated;
GRANT SELECT (id, user_id, item_name, description, location, item_type, is_resolved, created_at)
  ON public.lost_found_items TO authenticated;

CREATE OR REPLACE VIEW public.lost_found_items_public AS
SELECT
  i.id,
  i.user_id,
  i.item_name,
  i.description,
  i.location,
  i.item_type,
  i.is_resolved,
  i.created_at,
  CASE
    WHEN auth.uid() = i.user_id OR public.has_role(auth.uid(), 'admin') THEN i.contact_info
    ELSE NULL
  END AS contact_info
FROM public.lost_found_items i;

GRANT SELECT ON public.lost_found_items_public TO authenticated;