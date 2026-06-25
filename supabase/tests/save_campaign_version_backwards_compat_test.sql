-- Backwards-compatibility: the new 6-arg save_campaign_version must keep serving the
-- *old* client's call shapes (no p_base_version / p_force), so a still-deployed old
-- front-end keeps working while the new proc is already live on the shared db.
begin;
select plan(4);

insert into auth.users (id) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');  -- alice

-- act as alice: the old client relied on auth.uid() for created_by
select set_config(
  'request.jwt.claims',
  '{"sub":"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}',
  true
);

-- the old client's exact named call - only p_name, p_data, p_published, no lease args
select is(
  save_campaign_version(
    p_name => 'Alice rooms',
    p_data => '{}',
    p_published => false
  ),
  1,
  'old named call (no lease args) saves v1'
);

-- created_by defaulted to auth.uid()
select is(
  (
    select created_by
    from campaigns
    where name = 'Alice rooms' and version = 1
  ),
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid,
  'old named call attributes the row to auth.uid()'
);

-- a newer version already exists, but the old client (absent p_base_version) skips
-- the lease entirely, so it is never blocked
select save_campaign_version(
  p_name => 'Alice rooms',
  p_data => '{}',
  p_published => false
);
select is(
  save_campaign_version(
    p_name => 'Alice rooms',
    p_data => '{}',
    p_published => false
  ),
  3,
  'old client is never blocked by the lease (absent p_base_version skips the check)'
);

-- the old positional 3-arg call (p_name, p_data, p_created_by) still resolves too
select is(
  save_campaign_version(
    'Bob rooms',
    '{}',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
  ),
  1,
  'old positional call (name, data, created_by) still resolves against the new proc'
);

select * from finish();
rollback;
