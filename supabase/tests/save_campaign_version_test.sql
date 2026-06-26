-- Behavioural tests for save_campaign_version(p_name, p_data, p_created_by, p_published).
-- It inserts a new row at MAX(version)+1 scoped to (created_by, name) and returns the
-- new version number.
begin;
select plan(10);

-- Test users. auth.users only needs an id; the repeated letter names the user at a
-- glance: aaaa… = alice, bbbb… = bob.
insert into auth.users (id) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),  -- alice
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');  -- bob

-- args are (name, data, created_by, published); the return is the new version number.
-- first save of a (user, name) pair returns version 1
select is(
  save_campaign_version('Alice rooms', '{"x":1}', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', false),
  1,
  'first save of a campaign returns version 1'
);

-- the inserted row carries the supplied data and published flag
select is(
  (select data from campaigns
   where created_by = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' and name = 'Alice rooms' and version = 1),
  '{"x":1}',
  'first save stores the supplied data'
);
select is(
  (select published from campaigns
   where created_by = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' and name = 'Alice rooms' and version = 1),
  false,
  'first save stores the supplied published flag'
);

-- saving again under the same (user, name) increments to 2
select is(
  save_campaign_version('Alice rooms', '{"x":2}', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', true),
  2,
  'second save of the same campaign returns version 2'
);

-- a different name for the same user versions independently
select is(
  save_campaign_version('Alice other rooms', '{}', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', false),
  1,
  'a different campaign name starts again at version 1'
);

-- the same name for a different user versions independently
select is(
  save_campaign_version('Alice rooms', '{}', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', false),
  1,
  'the same name under a different user starts at version 1'
);

-- p_created_by defaults to auth.uid(); p_published defaults to false
select set_config('request.jwt.claims', '{"sub":"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}', true);
select is(
  save_campaign_version('Alice extra rooms', '{}'),
  1,
  'save without created_by/published returns version 1'
);
select is(
  (select created_by from campaigns where name = 'Alice extra rooms'),
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid,
  'created_by defaults to auth.uid()'
);
select is(
  (select published from campaigns where name = 'Alice extra rooms'),
  false,
  'published defaults to false'
);

-- the unique (created_by, name, version) constraint is the concurrency guard the
-- proc relies on: two racing saves computing the same MAX cannot both insert
select throws_ok(
  $$ insert into campaigns (name, data, version, created_by, published)
     values ('Alice rooms', '{}', 1, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', false) $$,
  '23505'
);

select * from finish();
rollback;
