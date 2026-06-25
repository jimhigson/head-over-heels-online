-- Behavioural tests for get_latest_campaign(p_campaign_name, p_user_id, p_version).
-- With p_version NULL it returns the highest-version row for (name, user); with a
-- version it returns that exact row; a miss returns an all-NULL record. p_user_id
-- defaults to auth.uid().
begin;
select plan(8);

-- Test users. The repeated letter names the user: aaaa… = alice, bbbb… = bob.
insert into auth.users (id) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),  -- alice
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');  -- bob

-- alice has three versions, bob has one (same name) to prove per-user scoping.
-- save_campaign_version(name, data, created_by, published):
select save_campaign_version('Alice rooms', 'v1data', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', false);
select save_campaign_version('Alice rooms', 'v2data', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', false);
select save_campaign_version('Alice rooms', 'v3data', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', false);
-- same name, different user
select save_campaign_version('Alice rooms', 'bobdata', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', false);

-- args are (name, user, version); NULL version returns the latest version
select is(
  (get_latest_campaign('Alice rooms', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', null)).version,
  3,
  'null version returns the latest version'
);
select is(
  (get_latest_campaign('Alice rooms', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', null)).data,
  'v3data',
  'null version returns the latest version''s data'
);

-- an explicit version returns exactly that version
select is(
  (get_latest_campaign('Alice rooms', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2)).version,
  2,
  'an explicit version returns that version'
);
select is(
  (get_latest_campaign('Alice rooms', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2)).data,
  'v2data',
  'an explicit version returns that version''s data'
);

-- a version that does not exist returns an all-NULL record
select is(
  (get_latest_campaign('Alice rooms', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 99)).id,
  null::integer,
  'a non-existent version returns a null record'
);

-- a name that does not exist returns an all-NULL record
select is(
  (get_latest_campaign('Alice unsaved rooms', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', null)).id,
  null::integer,
  'a non-existent campaign name returns a null record'
);

-- results are scoped to the given user
select is(
  (get_latest_campaign('Alice rooms', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', null)).version,
  1,
  'results are scoped to the requested user'
);

-- p_user_id defaults to auth.uid()
select set_config('request.jwt.claims', '{"sub":"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}', true);
select is(
  (get_latest_campaign('Alice rooms')).version,
  3,
  'user defaults to auth.uid() when omitted'
);

select * from finish();
rollback;
