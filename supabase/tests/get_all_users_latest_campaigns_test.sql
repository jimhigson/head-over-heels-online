-- Behavioural tests for get_all_users_latest_campaigns(p_published_only boolean).
--
-- NB: a zero-arg overload also exists but is unreachable - calling the function with
-- no args is ambiguous against this defaulted overload, so only this one is callable
-- (and it is the only one the app uses). It INNER JOINs campaigns, so only users with
-- at least one (matching) campaign appear. When p_published_only is true, each
-- campaign reports its latest *published* version. The result is a json object keyed
-- by user id, ordered current-user-first, anon-last, then alphabetical by username.
begin;
select plan(14);

-- this proc returns *every* user globally, so isolate from any pre-existing rows
-- (e.g. a locally-seeded campaign from `pnpm gen:seed`); rolled back with the txn.
-- campaigns first to satisfy the created_by foreign key.
delete from campaigns;
delete from user_details;
delete from auth.users;

-- Test users. The repeated letter names the user: aaaa… = alice, bbbb… = bob,
-- cccc… = carol, dddd… = dave. carol and dave give the ordering test more than two
-- names to sort. bob has no user_details row, so resolves to 'anon'.
insert into auth.users (id) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),  -- alice
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),  -- bob
  ('cccccccc-cccc-cccc-cccc-cccccccccccc'),  -- carol
  ('dddddddd-dddd-dddd-dddd-dddddddddddd');  -- dave
insert into user_details (username, "userId") values
  ('alice', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('carol', 'cccccccc-cccc-cccc-cccc-cccccccccccc'),
  ('dave',  'dddddddd-dddd-dddd-dddd-dddddddddddd');

-- save_campaign_version(name, data, created_by, published):
-- alice has two campaigns:
--   'Alice rooms': two published versions (latest published = 2)
select save_campaign_version('Alice rooms', '{}', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', true);
select save_campaign_version('Alice rooms', '{}', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', true);
--   'Alice other rooms': v1 published, v2 unpublished (latest = 2, latest published = 1)
select save_campaign_version('Alice other rooms', '{}', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', true);
select save_campaign_version('Alice other rooms', '{}', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', false);
-- bob has 'Bob rooms': a single unpublished version
select save_campaign_version('Bob rooms', '{}', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', false);
-- dave has 'Dave rooms': a single published version
select save_campaign_version('Dave rooms', '{}', 'dddddddd-dddd-dddd-dddd-dddddddddddd', true);

-- false: latest version of each campaign, unpublished included
select is(
  (get_all_users_latest_campaigns(false) -> 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' -> 'campaigns' -> 'Alice rooms' ->> 'version')::int,
  2,
  'reports the latest version of a campaign'
);
select is(
  (get_all_users_latest_campaigns(false) -> 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' -> 'campaigns' -> 'Alice other rooms' ->> 'version')::int,
  2,
  'latest version includes unpublished versions'
);

-- usernames: from user_details, defaulting to 'anon'
select is(
  get_all_users_latest_campaigns(false) -> 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' -> 'user' ->> 'username',
  'anon',
  'username defaults to anon when there is no user_details row'
);
select is(
  get_all_users_latest_campaigns(false) -> 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' -> 'user' ->> 'username',
  'alice',
  'username comes from user_details'
);

-- INNER JOIN: a user with no campaigns never appears, even without a publish filter
select ok(
  (get_all_users_latest_campaigns(false) -> 'cccccccc-cccc-cccc-cccc-cccccccccccc') is null,
  'a campaign-less user is excluded (INNER JOIN)'
);

-- isCurrentUser reflects auth.uid()
select set_config('request.jwt.claims', '{"sub":"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}', true);
select is(
  get_all_users_latest_campaigns(false) -> 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' -> 'user' ->> 'isCurrentUser',
  'true',
  'isCurrentUser is true for the authenticated user'
);
select is(
  get_all_users_latest_campaigns(false) -> 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' -> 'user' ->> 'isCurrentUser',
  'false',
  'isCurrentUser is false for other users'
);

-- true: latest *published* version, so 'Alice other rooms' drops back to v1
select is(
  (get_all_users_latest_campaigns(true) -> 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' -> 'campaigns' -> 'Alice other rooms' ->> 'version')::int,
  1,
  'published-only: reports the latest published version, skipping a newer draft'
);
select is(
  (get_all_users_latest_campaigns(true) -> 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' -> 'campaigns' -> 'Alice rooms' ->> 'version')::int,
  2,
  'published-only: a fully-published campaign keeps its latest version'
);
select is(
  (get_all_users_latest_campaigns(true) -> 'dddddddd-dddd-dddd-dddd-dddddddddddd' -> 'campaigns' -> 'Dave rooms' ->> 'version')::int,
  1,
  'published-only: a published campaign is reported'
);
select ok(
  (get_all_users_latest_campaigns(true) -> 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb') is null,
  'published-only: a user with no published campaigns is excluded'
);

-- false includes a user with only unpublished campaigns
select ok(
  (get_all_users_latest_campaigns(false) -> 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb') is not null,
  'published=false: a user with only unpublished campaigns is included'
);

-- ordering: current user first
select set_config('request.jwt.claims', '{"sub":"bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"}', true);
select is(
  (select k from json_object_keys(get_all_users_latest_campaigns(false))
     with ordinality as t(k, ord) order by ord limit 1),
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'ordering: the current user is listed first'
);

-- ordering: current user first, then alphabetical by username, anon last
select set_config('request.jwt.claims', '{"sub":"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}', true);
select is(
  (select array_agg(k order by ord) from json_object_keys(get_all_users_latest_campaigns(false))
     with ordinality as t(k, ord)),
  array[
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
  ],
  'ordering: current user, then alphabetical, with anon last'
);

select * from finish();
rollback;
