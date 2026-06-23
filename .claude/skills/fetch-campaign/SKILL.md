---
name: fetch-campaign
description: Fetch a campaign from the Supabase DB and save as local JSON. Use when the user asks to load, download, or fetch a campaign from the database.
---

## Usage

```sh
eval "$(fnm env)" && fnm use && pnpm --silent exec tsx scripts/fetchCampaign.ts <campaignName> [userId]
```

The default user ID is `2924c962-99f1-4dd2-9b9c-fef832dc991b` (Jim's account). Pass a different user ID as the second argument if needed.

Output is pure JSON on stdout — redirect to a file or pipe to `jq`. The `--silent` is required: without it, pnpm's cold-start reporter prints a banner to stdout that corrupts the JSON. It must come before `exec` (`pnpm exec --silent` is parsed as a command and fails).

## Examples

```sh
# fetch Jim's campaign to a file
pnpm --silent exec tsx scripts/fetchCampaign.ts sequel_23 > /tmp/sequel_23.json

# fetch another user's campaign
pnpm --silent exec tsx scripts/fetchCampaign.ts my_campaign abc123-def456 > /tmp/my_campaign.json

# pipe to jq to inspect a specific room
pnpm --silent exec tsx scripts/fetchCampaign.ts sequel_23 | jq '.rooms["head_homers_jump"].meta.subRooms'
```

## How it works

The script calls the `get_latest_campaign` Supabase RPC, which returns a gzip+base64 encoded blob. It decodes with `js-base64` and `node:zlib` gunzip, then prints the parsed JSON to stdout.
