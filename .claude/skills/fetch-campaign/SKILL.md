---
name: fetch-campaign
description: Fetch a campaign from the Supabase DB and save as local JSON. Use when the user asks to load, download, or fetch a campaign from the database.
---

## Usage

```sh
eval "$(fnm env)" && fnm use && npx tsx scripts/fetchCampaign.ts <campaignName> [userId]
```

The default user ID is `2924c962-99f1-4dd2-9b9c-fef832dc991b` (Jim's account). Pass a different user ID as the second argument if needed.

Output is written to stdout. Redirect to a file if needed.

Sequel campaigns are named `sequel_XX` where `XX` is the release number. To know the number, read src/gameInfo.ts or see where it is loaded from in the
select which game menu to start a new game on the sequel campaign.

## Examples

```sh
# fetch Jim's campaign to a file (replace XX with the next release)
npx tsx scripts/fetchCampaign.ts sequel_XX > /tmp/sequel_XX.json

# fetch another user's campaign
npx tsx scripts/fetchCampaign.ts my_campaign abc123-def456 > /tmp/my_campaign.json

# pipe to jq to inspect a specific room (replace XX with the next release)
npx tsx scripts/fetchCampaign.ts sequel_XX | jq '.rooms["head_homers_jump"].meta.subRooms'
```

## How it works

The script calls the `get_latest_campaign` Supabase RPC, which returns a gzip+base64 encoded blob. It decodes with `js-base64` and `node:zlib` gunzip, then prints the parsed JSON to stdout.
