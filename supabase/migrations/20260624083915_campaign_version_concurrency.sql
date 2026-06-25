-- Version-aware campaign procs for the editor's optimistic-concurrency protection:
--   * force-with-lease semantics on save_campaign_version, so a save is refused
--     when the client's base version is no longer the latest (like
--     git push --force-with-lease)
--   * get_latest_campaign_version, a lightweight latest-version lookup used to
--     detect that the db has moved ahead of a loaded campaign
--
-- Both are additive to the baseline schema; the save change keeps existing callers
-- working by appending defaulted params.

-- ---------------------------------------------------------------------------
-- save_campaign_version: force-with-lease
-- ---------------------------------------------------------------------------
-- Two new params are appended (all defaulted, so existing callers are unaffected):
--   p_base_version - the version the client believes is current. When non-null and
--                    not forced, it must equal the current latest version, otherwise
--                    another save has happened since and we refuse the save (like
--                    git push --force-with-lease). Null skips the check (old clients).
--   p_force        - bypass the lease check and save regardless (like git push --force).
--
-- The old 4-arg signature is dropped first: keeping it would make a 4-positional-arg
-- call ambiguous against this 6-arg overload.
drop function if exists public.save_campaign_version(text, text, uuid, boolean);

create or replace function public.save_campaign_version(
  p_name text,
  p_data text,
  p_created_by uuid default auth.uid(),
  p_published boolean default false,
  p_base_version integer default null,
  p_force boolean default false
) returns integer
  language plpgsql security definer
  as $$
declare
  v_latest_version int;
  v_new_version int;
begin
  -- current latest version for this (user, campaign); 0 when none exist yet
  select coalesce(max(version), 0)
  into v_latest_version
  from campaigns
  where name = p_name and created_by = p_created_by;

  -- force-with-lease: unless forced, a supplied base_version must still be the latest
  if not p_force and p_base_version is not null and p_base_version <> v_latest_version then
    raise exception 'stale_base_version: expected latest %, found %', p_base_version, v_latest_version
      using errcode = 'P0001';
  end if;

  v_new_version := v_latest_version + 1;

  insert into campaigns (name, data, version, created_by, published)
  values (p_name, p_data, v_new_version, p_created_by, p_published);

  return v_new_version;
end;
$$;

-- ---------------------------------------------------------------------------
-- get_latest_campaign_version: lightweight latest-version lookup
-- ---------------------------------------------------------------------------
-- Returns just the integer (0 if the campaign has never been saved) - unlike
-- get_latest_campaign it does not return the data blob. Used by the editor to
-- detect that the db has moved ahead of a loaded campaign.
create function public.get_latest_campaign_version(
  p_campaign_name text,
  p_user_id uuid default null
) returns integer
  language plpgsql security definer
  as $$
declare
  v_user_id uuid;
begin
  -- use the provided user, or the current one
  v_user_id := coalesce(p_user_id, auth.uid());

  return (
    select coalesce(max(version), 0)
    from campaigns
    where name = p_campaign_name and created_by = v_user_id
  );
end;
$$;
