-- Behavioural tests for get_latest_campaign_version(p_campaign_name, p_user_id):
-- the lightweight latest-version lookup used by the editor's staleness check.
begin;
select plan(4);

insert into auth.users (id) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),  -- alice
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');  -- bob

-- a campaign that has never been saved returns 0
select is(
  get_latest_campaign_version('Alice rooms', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  0,
  'an unsaved campaign returns 0'
);

-- alice saves three versions; bob has a same-named campaign at v1
select save_campaign_version('Alice rooms', '{}', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
select save_campaign_version('Alice rooms', '{}', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
select save_campaign_version('Alice rooms', '{}', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
select save_campaign_version('Alice rooms', '{}', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');

select is(
  get_latest_campaign_version('Alice rooms', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  3,
  'returns the latest version for the user'
);

-- scoped to the requested user
select is(
  get_latest_campaign_version('Alice rooms', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
  1,
  'is scoped to the requested user'
);

-- p_user_id defaults to auth.uid()
select set_config('request.jwt.claims', '{"sub":"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}', true);
select is(
  get_latest_campaign_version('Alice rooms'),
  3,
  'user defaults to auth.uid() when omitted'
);

select * from finish();
rollback;
