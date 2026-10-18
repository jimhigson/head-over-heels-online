# Deploys

## Environments

blockstack.ing is the main domain where most play should happen, blockstack.dev is for dev previews of main

| Site                                                               | Serves | Branch                                 | Stored in                            | Vite `--mode`                       | Deployed when                 |
| ------------------------------------------------------------------ | ------ | -------------------------------------- | ------------------------------------ | ----------------------------------- | ----------------------------- |
| https://blockstack.ing                                             | game   | latest release tag (`v*`)              | CF r2 bucket `hoh-game-production`   | `r2-production`                     | release-please PR merged      |
| https://ed.blockstack.ing                                          | editor | latest release tag (`v*`)              | CF r2 bucket `hoh-editor-production` | `r2-production`                     | release-please PR merged      |
| https://blockstack.dev                                             | game   | `main`                                 | CF r2 bucket `hoh-game-main`         | `r2-main`                           | Any merge to `main`           |
| https://ed.blockstack.dev                                          | editor | `main`                                 | CF r2 bucket `hoh-editor-main`       | `r2-main`                           | Any merge to `main`           |
| https://pr(pr_number)-(short_sha).blockstack.dev                   | game   | PR branches                            | CF r2 bucket `hoh-previews`          | `r2-preview`                        | PR branch opened or pushed to |
| https://ed-pr(pr_number)-(short_sha).blockstack.dev                | editor | PR branches                            | CF r2 bucket `hoh-previews`          | `r2-preview`                        | PR branch opened or pushed to |
| http://localhost:5200                                              | game   | local working tree (`pnpm dev:game`)   | n/a                                  | `development`(`vite dev` default)   | `pnpm dev`                    |
| http://localhost:5210/editor/                                      | editor | local working tree (`pnpm dev:editor`) | n/a                                  | `development`(`vite dev` default)   | `pnpm dev`                    |

## Hosting: Cloudflare R2

- R2 is the web host, not just object storage, and Cloudflare is the CDN in front of it
- The game is not hosted as Workers static assets, because Workers double-compresses pre-compressed brotli
- R2 has no index document or SPA fallback, so a URL Rewrite Transform Rule rewrites non-asset paths to `/index.html`, per host
- `blockstack.ing` has a redirect ruleset with no rules in it, so `/editor` is not redirected to `ed.blockstack.ing`

## Serving brotli-11 byte-identical

We don't let Cloudflare compress content on-the-fly because the compression ratio is quite low (optimised for speed). Instead, we compress offline and hack it to pass-through our bytes unchanged.

Github Actions workflow [`deploy-to-r2.yml`](.github/workflows/deploy-to-r2.yml) runs `package.json` `deploy:r2` script, to kick off `scripts/deployToR2.ts`.

The workflow runs deployToR2 twice: for the game and the editor; it also deletes bucket objects that are no longer in the build.

The bytes `scripts/deployToR2.ts` writes are the bytes a browser receives. Each stage:

| Stage          | What happens                                                                                  | Where it's set                        |
| -------------- | --------------------------------------------------------------------------------------------- | ------------------------------------- |
| Build          | `pnpm build:game` / `build:editor` with `--mode r2-<environmentName>`                         | repo                                  |
| Compress       | text assets → brotli quality 11, with a size hint; kept only if smaller                       | `deployToR2.ts`                       |
| Store          | object metadata `Content-Encoding: br`, `Content-Type`, `Cache-Control: …, no-transform`      | `deployToR2.ts`                       |
| Origin         | R2 custom domain serves the object with its stored headers                                    | Cloudflare: R2 bucket → custom domain |
| Edge cache     | Cache Rule: cache everything; edge TTL `bypass_by_default`, so origin `Cache-Control` decides | Cloudflare: Cache Rules               |
| Edge transform | `no-transform` stops the edge decompressing and re-encoding                                   | `deployToR2.ts`                       |
| Browser        | gets the stored bytes with `Content-Encoding: br`, `Vary: accept-encoding`                    |                                       |

For performance, we aggressively cache all assets whose filename contains a hash, at one year retention. This means that if there is no new deploy, user access should be instant

`Cache-Control` by key:

| Key                                        | `Cache-Control`                                  | Edge status seen      |
| ------------------------------------------ | ------------------------------------------------ | --------------------- |
| `assets/*` (content-hashed)                | `public, max-age=31536000, immutable` (one year) | `HIT`                 |
| `*.html`, `sw.js`                          | `no-cache`                                       | `REVALIDATED`         |
| everything else (eg, manifest.webmanifest) | `public, max-age=3600`                           | `HIT` / `REVALIDATED` |

Each gets `, no-transform` appended when it is stored as brotli.

Clients that don't send `Accept-Encoding: br` get the asset decoded (no `Content-Encoding`, no `Content-Length`). Cloudflare never serves gzip for these assets.

Zone settings that could alter bytes are off on both zones: minify, Rocket Loader, Polish, Mirage, email obfuscation. Zone `brotli` is on, but it only applies to responses the edge compresses itself.

### Checking it

To check that the host is not decoding and re-encoding our compressed content.

Fetch with `Accept-Encoding: br`, decode, re-encode at quality 11 with the same size hint, and compare. Node's brotli is deterministic, so a match proves the edge passed the stored bytes through untouched:

```sh
curl -s -H "Accept-Encoding: br" -o test_body.br https://blockstack.ing/sw.js
node -e '
const { readFileSync } = require("node:fs");
const { brotliCompressSync, brotliDecompressSync, constants: z } = require("node:zlib");
const wire = readFileSync("test_body.br");
const plain = brotliDecompressSync(wire);
const re = brotliCompressSync(plain, { params: { [z.BROTLI_PARAM_QUALITY]: 11, [z.BROTLI_PARAM_SIZE_HINT]: plain.length } });
console.log(re.equals(wire) ? "identical" : "differs");
'
rm test_body.br
```

Result on 2026-10-09: every `br` response checked on both sites matched (`index.html`, `sw.js`, the entry js and css, `manifest.webmanifest`), on both `MISS` and `HIT`.

One exception: `blockstack.dev/manifest.webmanifest` was observed served decoded and without `Vary` even to `br` clients, though the object in R2 is the same 169-byte brotli as production's. The cause is unknown; it may be a stale edge cache entry, and a purge has not been tried.

## How a deploy happens

### `.dev` (`main`)

1. Merge a PR to `main`
2. That push triggers:
   - [`deploy-to-r2.yml`](.github/workflows/deploy-to-r2.yml), which builds the game and editor and uploads them
   - [`post-to-discord-on-merge-to-main.yml`](.github/workflows/post-to-discord-on-merge-to-main.yml), which posts a "Dev Preview" message linking to blockstack.dev, only for `feat:` commits
   - [`build-to-native.yml`](.github/workflows/build-to-native.yml), which builds the native apps as workflow artifacts

### Production (`.ing`)

1. Merging to `main` makes [release-please](.github/workflows/release-please.yml) open or update a release PR
2. Merging the release PR publishes a GitHub release and its `v*` tag, which triggers, all built from that tag:
   - [`deploy-to-r2.yml`](.github/workflows/deploy-to-r2.yml), which builds and uploads to the `production` buckets
   - [`db-migrate.yml`](.github/workflows/db-migrate.yml), which runs `supabase db push` (a no-op when there are no new migrations)
   - [`post-to-discord-on-release.yml`](.github/workflows/post-to-discord-on-release.yml), which posts the release changelog to Discord, pinging `@everyone`
   - [`build-to-native.yml`](.github/workflows/build-to-native.yml), which builds the native apps and attaches them to the GitHub release

release-please publishes the release with a personal token (`RELEASE_PLEASE_PAT`), because events made with `GITHUB_TOKEN` don't trigger other workflows.

What is live on blockstack.ing is the latest GitHub release.

### Native apps

[`build-to-native.yml`](.github/workflows/build-to-native.yml) builds Tauri desktop apps for macOS (universal `.dmg`), Windows (`.msi`, `-setup.exe`, including a MinGW build) and Linux on x64 and arm64 (`.deb`, `.rpm`, `.AppImage`).

| Trigger           | Output                               |
| ----------------- | ------------------------------------ |
| PR to `main`      | workflow artifacts                   |
| push to `main`    | workflow artifacts                   |
| release published | files attached to the GitHub release |

### Manual deploys

**These are generally not done** use CI to automate unless there's some unusual reason not to

- From CI, run `deploy-to-r2.yml` from the Actions tab with "Run workflow" and choose `main` or `production`
  - This builds whichever ref you run it from ("Use workflow from"), so a `production` run from `main` puts unreleased code live
  - To roll back or redeploy production, run it from a release tag and choose `production`
- Locally:

  ```sh
  pnpm build:game --mode r2-main
  pnpm build:editor --mode r2-main
  pnpm deploy:r2 game main
  pnpm deploy:r2 editor main
  ```

  Credentials come from `.env.r2-<environmentName>.local` (gitignored)

## Vite config

- `deploy-to-r2.yml` builds with `--mode r2-<environmentName>`
- Vite then loads `.env.r2-<environmentName>` (game) and `src/editor/.env.r2-<environmentName>` (editor), which set the domains each app links to (`VITE_EDITOR_URL`, `VITE_GAME_URL`)
- In `vite.editor.config.ts`, the `r2-*` modes give the editor its own origin

## Environment naming

`environmentName` is `main` or `production`. Used as:

- the Vite mode suffix (`r2-<environmentName>`)
- the env file suffix (`.env.r2-<environmentName>`)
- the bucket suffix (`hoh-<app>-<environmentName>`)

Adding or renaming an environment would require changing all three, plus the `DEPLOY_ENV` mapping in `deploy-to-r2.yml`.

`preview` is the exception: it is a Vite mode and env-file suffix like the others, but all previews share the one `hoh-previews` bucket rather than getting a `hoh-<app>-preview` of their own, because there is one per PR per commit rather than one per environment.

## Secrets

All of these are GitHub Actions repository secrets:

| Secret                                                      | Used for                                                 |
| ----------------------------------------------------------- | -------------------------------------------------------- |
| `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` | uploads to R2; one token covers every bucket, previews included |
| `CLOUDFLARE_API_TOKEN`                                      | `wrangler deploy` of the previews worker (Workers Scripts: Edit) |
| `RELEASE_PLEASE_PAT`                                        | release-please                                           |
| `RELEASES_DISCORD_WEBHOOK`                                  | Discord posts on release and on `feat:` merges to `main` |
| `SUPABASE_ACCESS_TOKEN`, `SUPABASE_DB_PASSWORD`             | db migrations                                            |

## Database

`.dev` and production share one Supabase database, so migrations must be backwards-compatible. See the Database section of [DEVELOPING.md](DEVELOPING.md).

## PR previews

PR previews provide an easy, temporary way to test and share work in progress before merging to main

Every push to a PR gets its own pair of hosts, named after the PR and its head commit:

| Host                                   | Serves | Bucket key prefix        |
| -------------------------------------- | ------ | ------------------------ |
| `pr1234-abc1234.blockstack.dev`        | game   | `pr1234-abc1234/`        |
| `ed-pr1234-abc1234.blockstack.dev`     | editor | `ed-pr1234-abc1234/`     |

- One label deep, because Cloudflare's Universal SSL covers the apex and first-level subdomains only; `ed.pr1234-….blockstack.dev` would need paid Advanced Certificate Manager
- The short sha comes from `github.event.pull_request.head.sha`, not `github.sha`, which on a `pull_request` event is the merge commit and matches nothing in `git log`
- The editor is its own origin, as on the live sites, rather than the `/editor/` subpath
- Previews show the branch and PR number in the game, from `PREVIEW_BRANCH` and `PREVIEW_PR_NUMBER` which [`deploy-preview-to-r2.yml`](.github/workflows/deploy-preview-to-r2.yml) passes to the build (see `src/readBuildInfo.ts`); the checkout is a detached HEAD, so git can't tell us the branch
- `VITE_EDITOR_URL`/`VITE_GAME_URL` are per-PR, so the workflow passes them as env vars rather than `.env.r2-preview` fixing them; Vite prefers an inline `VITE_*` over the env file

### One bucket, a prefix per preview

All previews live in `hoh-previews`, under a key prefix that is exactly the host's first label. R2 custom domains bind a host to a bucket's *root*, so they can't give a host per PR; the [`hoh-previews` worker](workers/previews/previewsWorker.ts) does that mapping instead, and also serves the `index.html` fallback that the live sites get from a rewrite rule.

Its route is `*.blockstack.dev/*`, which also matches `ed.blockstack.dev`. A more specific route on `ed.blockstack.dev/*` **with no worker attached** negates it, so the live editor keeps going straight to its own R2 custom domain. Cloudflare's docs: "A route can be specified without being associated with a Worker. This will act to negate any less specific patterns."

The worker deploys only when its own source changes, via [`deploy-previews-worker.yml`](.github/workflows/deploy-previews-worker.yml).

### Not compressed

Unlike the live sites, previews are stored **uncompressed** and Cloudflare compresses them on the fly. They are fast throwaways, so the brotli-11 pass isn't worth the upload time, and uncompressed objects also sidestep the double-compression that keeps the live sites off Workers.

A preview is therefore not a place to eyeball wire size — `true-site-size` measures that on its own builds.

### Cleanup

| When                    | What goes                                                    |
| ----------------------- | ------------------------------------------------------------ |
| a new push to the PR    | every `pr<number>-*` prefix except the new commit's          |
| the PR merges or closes | every `pr<number>-*` prefix                                  |

Both run [`scripts/deletePreviewsFromR2.ts`](scripts/deletePreviewsFromR2.ts) (`pnpm delete:previews`). So old preview links die on each push, and nothing accumulates except for a PR left open forever.

`pull_request: closed` fires for both merged and closed, so one job covers both.

### Fork PRs

Fork PRs get no repository secrets, so they get no preview.

## Configured elsewhere

These are configured on the service by ape hand and eyeball or via mcp (this repo does not hold the settings)

| What                                                                              | Where                                                                                                    |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Cache rules                                                                       | [Cloudflare: Caching → Cache Rules](https://dash.cloudflare.com/?to=/:account/:zone/caching/cache-rules) |
| SPA rewrite rule                                                                  | [Cloudflare: Rules](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)                      |
| R2 custom-domain bindings (`blockstack.*`, `ed.blockstack.*` → buckets)           | [Cloudflare: R2](https://dash.cloudflare.com/?to=/:account/r2/overview) → bucket → Settings              |
| DNS for `blockstack.dev` and `blockstack.ing`, including ProtonMail email records | [Cloudflare: DNS → Records](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)                 |
| R2 API token scope (all four buckets)                                             | [Cloudflare: R2](https://dash.cloudflare.com/?to=/:account/r2/overview) → API tokens                     |
| `*` DNS record on `blockstack.dev`, proxied, so preview hosts resolve             | [Cloudflare: DNS → Records](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)                 |
| `ed.blockstack.dev/*` route with no worker, negating the previews worker's wildcard | [Cloudflare: Workers Routes](https://dash.cloudflare.com/?to=/:account/workers)                        |

### DNS

|             | `blockstack.ing`                                                   | `blockstack.dev`                                   |
| ----------- | ------------------------------------------------------------------ | -------------------------------------------------- |
| Registrar   | Namecheap                                                          | Namecheap                                          |
| Nameservers | Cloudflare (`elisa.ns.cloudflare.com`, `ernest.ns.cloudflare.com`) | same                                               |
| DNSSEC      | off                                                                | off                                                |
| Site        | apex + `ed.` → `CNAME public.r2.dev`, proxied                      | same                                               |
| Email       | ProtonMail                                                         | Not used, but namecheap email forwarding is set up |
| Other games | `landofgoodplaces` → `AAAA 100::`, proxied                         | none                                               |

### Email hosting

#### `blockstack.ing`: ProtonMail

For, eg jim@blockstack.ing email hosting:

The website (`A`/`CNAME`) and email (`MX`) records are independent, so rebinding the site doesn't affect mail. Keep these ProtonMail records in the Cloudflare zone:

| Type    | Name                          | Value                                                   |
| ------- | ----------------------------- | ------------------------------------------------------- |
| `MX`    | `@`                           | `mail.protonmail.ch` (10), `mailsec.protonmail.ch` (20) |
| `TXT`   | `@`                           | `v=spf1 include:_spf.protonmail.ch ~all`                |
| `TXT`   | `@`                           | `protonmail-verification=…`                             |
| `TXT`   | `_dmarc`                      | `v=DMARC1; p=quarantine`                                |
| `CNAME` | `protonmail{,2,3}._domainkey` | `…domains.proton.ch`                                    |

Set the DKIM `CNAME`s to DNS-only (grey cloud). Cloudflare proxies `CNAME`s by default, and proxying breaks DKIM.

#### `blockstack.dev`: Namecheap forwarding

| Type  | Name | Value                                                              |
| ----- | ---- | ------------------------------------------------------------------ |
| `MX`  | `@`  | `eforward1`–`eforward5.registrar-servers.com` (10, 10, 10, 15, 20) |
| `TXT` | `@`  | `v=spf1 include:spf.efwd.registrar-servers.com ~all`               |

The forwarding rules themselves are set in the Namecheap dashboard.

| Zone             | Zone id                            | Plan |
| ---------------- | ---------------------------------- | ---- |
| `blockstack.dev` | `473f8a16a19e43b1ce36aa48afdca6ba` | Free |
| `blockstack.ing` | `3968f68dfc306cbfb2b23324e9ce0201` | Free |

Both zones use SSL mode "full", minimum TLS 1.0, and have "always use HTTPS" off.

## Historic

### GitHub Pages hosting (from January 2025)

Used to host on github pages, with `blockstack.ing` pointing there. Was retired due to lower compressions and 10 minute cache timeouts.

- [`f499d0f`](https://github.com/jimhigson/head-over-heels-online/commit/f499d0f): the first deploy workflow, [`deploy.yml`](https://github.com/jimhigson/head-over-heels-online/blob/f499d0f/.github/workflows/deploy.yml)
- [`8709404`](https://github.com/jimhigson/head-over-heels-online/tree/8709404): the last commit with GitHub Pages deploys, [`deploy-production-branch-to-gh-pages.yml`](https://github.com/jimhigson/head-over-heels-online/blob/8709404/.github/workflows/deploy-production-branch-to-gh-pages.yml) and the `predeploy`/`deploy` scripts in [`package.json`](https://github.com/jimhigson/head-over-heels-online/blob/8709404/package.json)

### `production` branch deploys (from October 2025)

Production deploys used to go through a `production` branch:

1. Publishing a release triggered `copy-release-tag-to-production-branch.yml`, which force-pushed the release tag to `production`
2. That push used a personal token (`COPY_TAG_TO_PRODUCTION_BRANCH`), so it could trigger other workflows
3. Pushes to `production` triggered the deploy (first `deploy-production-branch-to-gh-pages.yml`, later `deploy-to-r2.yml`), `db-migrate.yml` (only when `supabase/migrations/**` changed) and a native build

The branch was added in [#496](https://github.com/jimhigson/head-over-heels-online/commit/a44f85b) for GitHub Pages, whose deploy ran on pushes to `production`. [#523](https://github.com/jimhigson/head-over-heels-online/commit/0719186) switched the copy to the personal token. The R2 deploy ([#961](https://github.com/jimhigson/head-over-heels-online/commit/d93eddb)) reused the trigger.

[`8709404`](https://github.com/jimhigson/head-over-heels-online/tree/8709404) is the last commit with this flow: [`copy-release-tag-to-production-branch.yml`](https://github.com/jimhigson/head-over-heels-online/blob/8709404/.github/workflows/copy-release-tag-to-production-branch.yml), [`deploy-to-r2.yml`](https://github.com/jimhigson/head-over-heels-online/blob/8709404/.github/workflows/deploy-to-r2.yml), [`db-migrate.yml`](https://github.com/jimhigson/head-over-heels-online/blob/8709404/.github/workflows/db-migrate.yml). Production deploys now trigger directly on the release, so the branch, the copy workflow and its token are no longer used.
