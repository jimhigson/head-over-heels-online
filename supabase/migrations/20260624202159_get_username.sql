-- Lightweight display-name lookup: the username for a user id, or null if they
-- have no profile row. SECURITY DEFINER so it can read user_details (which has no
-- public select policy). Used by the editor to show "by <name>" for a campaign
-- owned by someone other than the current user, without pulling the whole
-- all-users directory.
create function public.get_username(p_user_id uuid) returns text
  language sql security definer stable
  as $$
  select username from user_details where "userId" = p_user_id;
$$;
