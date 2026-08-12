DROP VIEW IF EXISTS public.lost_found_items_public;

CREATE OR REPLACE FUNCTION public.get_lost_found_items()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  item_name text,
  description text,
  location text,
  item_type text,
  is_resolved boolean,
  created_at timestamptz,
  contact_info text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
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
  FROM public.lost_found_items i
  WHERE auth.uid() IS NOT NULL
  ORDER BY i.created_at DESC;
$$;

REVOKE ALL ON FUNCTION public.get_lost_found_items() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_lost_found_items() TO authenticated;