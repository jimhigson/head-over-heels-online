-- Behavioural tests for get_username(p_user_id): the editor's display-name lookup.
begin;
select plan(3);

insert into auth.users (id) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),  -- alice (has a profile)
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');  -- bob (no profile)
insert into user_details (username, "userId") values
  ('alice', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

select is(
  get_username('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  'alice',
  'returns the username for a user with a profile'
);

select is(
  get_username('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
  null::text,
  'returns null for a user with no profile'
);

select is(
  get_username('cccccccc-cccc-cccc-cccc-cccccccccccc'),
  null::text,
  'returns null for an unknown user'
);

select * from finish();
rollback;
