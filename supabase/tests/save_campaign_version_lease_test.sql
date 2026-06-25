-- TDD (red): force-with-lease behaviour for save_campaign_version - not yet implemented.
--
-- Intended new signature (params appended, all defaulted, so existing callers are
-- unaffected):
--   save_campaign_version(p_name, p_data, p_created_by default auth.uid(),
--     p_published default false, p_base_version integer default null,
--     p_force boolean default false)
--
-- p_base_version is the version the client believes is current (the "lease", like
-- git push --force-with-lease):
--   * null      -> skip the check (old clients / backwards compatibility)
--   * = latest  -> save, returns latest + 1
--   * <> latest -> reject (raise), nothing inserted
--   * p_force true -> save regardless of the lease (like git push --force)
begin;
select plan(8);

insert into auth.users (id) values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');  -- alice

-- get 'Alice rooms' to latest version 2 (these old-style calls pass no lease)
select save_campaign_version('Alice rooms', '{}', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
select save_campaign_version('Alice rooms', '{}', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

-- a base_version matching the current latest saves and returns the next version
select is(
  save_campaign_version(
    p_name => 'Alice rooms', p_data => '{}',
    p_created_by => 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', p_base_version => 2),
  3,
  'a matching base_version saves and returns the next version'
);

-- a stale base_version (someone else has saved since) is rejected
select throws_ok(
  $$ select save_campaign_version(
       p_name => 'Alice rooms', p_data => '{}',
       p_created_by => 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', p_base_version => 1) $$,
  'P0001',
  null,
  'a stale base_version is rejected'
);

-- the rejected save left no new version behind
select is(
  (select max(version) from campaigns
   where created_by = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' and name = 'Alice rooms'),
  3,
  'a rejected save inserts no new version'
);

-- p_force bypasses the lease check even when base_version is stale
select is(
  save_campaign_version(
    p_name => 'Alice rooms', p_data => '{}',
    p_created_by => 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', p_base_version => 1, p_force => true),
  4,
  'p_force saves despite a stale base_version'
);

-- p_force saves even with no base_version supplied
select is(
  save_campaign_version(
    p_name => 'Alice rooms', p_data => '{}',
    p_created_by => 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', p_force => true),
  5,
  'p_force saves with no base_version'
);

-- a null base_version (and no force) still saves - old clients keep working
select is(
  save_campaign_version('Alice rooms', '{}', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  6,
  'a null base_version skips the check (backwards compatibility)'
);

-- first save of a brand-new campaign: latest is 0, so base_version 0 matches
select is(
  save_campaign_version(
    p_name => 'Alice new rooms', p_data => '{}',
    p_created_by => 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', p_base_version => 0),
  1,
  'first save with base_version 0 succeeds (no prior versions)'
);

-- first save with a non-zero base_version is rejected (nothing to match)
select throws_ok(
  $$ select save_campaign_version(
       p_name => 'Alice fresh rooms', p_data => '{}',
       p_created_by => 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', p_base_version => 5) $$,
  'P0001',
  null,
  'first save with a non-zero base_version is rejected'
);

select * from finish();
rollback;
