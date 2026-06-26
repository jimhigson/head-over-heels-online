# General


## Cloning

This project uses Playwright for visual regression testing, so the repo history can get large with screenshots. It is recommended to clone shallowly, since historic screenshots will inflate the size of the local repo:

```sh
# Clone with only the latest commit
git clone --depth 1 https://github.com/jimhigson/hohjs.git
```

`pnpm dev:game` - run the game for dev
`pnpm check` - run checks
`pnpm playwright test` - run e2e/visual regression tests

# Artwork
The Sprites file is `gfx/sprites.iff`. It is edited in Amiga IFF format using [PydPainter](https://pydpainter.org),
and converted to modern png for loading into the browser using a script:

```sh
pnpm iff2png
```

`iff2png` requires several dependencies to be installed, such as imagemagick and ffmpeg, and will log an error if these are not available

# Tauri

Tauri builds to native executables for these platforms:

## Building and developing with Tauri

```sh
pnpm tauri dev # - like vite dev
pnpm tauri build # -like vite build
cd src-tauri && cargo build # building rust side
```

## Building a MacOS universal binary

Universal binaries work on both Apple Silicon and Intel Macs

```sh
# Install both rust targets:
rustup target add aarch64-apple-darwin x86_64-apple-darwin
# Build a package for both Apple Silicon (newer) and Intel Macs (older):
pnpm tauri build --target universal-apple-darwin

# universal binary should now be at:
ls src-tauri/target/universal-apple-darwin/release/bundle/dmg/\ Head\ over\ Heels_(version)_universal.dmg

# can check both arch exist like:
file src-tauri/target/universal-apple-darwin/release/bundle/macos/BlockStack\ Head\ over\ Heels.app/Contents/MacOS/app
```

## Updating Tauri

`pnpm tauri info` - gets info on packages and other stuff installed
`pnpm up --latest "@tauri-apps/*` - update node packages for tauri
`cd src-tauri; cargo update` - update rust packages
`fish_add_path ~/.rustup/toolchains/stable-aarch64-apple-darwin/bin` - (with fish) to put rustup instlled stuff on the path - adjust for shell

## Build and dev for ios

On Mac, to install dependencies with `brew`:
```sh
brew install cocoapods - (init couldn't install it)
brew install rustup 
pnpm tauri ios init # set up for ios 

# with rustup installed as above:

rustup target add aarch64-apple-ios-sim # to instal stuff needed to compile for iOS
```

```sh
rustup default stable - to set rust up with default target

pnpm tauri ios dev # launch in dev mode
```

# Releasees

`release-please` manages

# Hosting

## https://blockstack.dev

Hosts latest deploys from main branch

* Cloudflare r2 is the web host (not just object storage) - this allows storing highly compressed pre-built brotli assets
* Cloudflare's is also the CDN in front of R2

See: scripts/deployToR2.ts, .github/workflows/deploy-to-r2.yml

## https://blockstack.ing

Hosts production/released deploys from `production` branch

* currently on github pages, to be moved to r2 plus cf proxy once the pattern is proven

# Database

Campaigns are stored in one hosted Supabase (Postgres) project. The original campaign
is burnt into the build; everything else goes through Supabase.

## Backwards-compatible changes only

Staging and production share one database and staging runs ahead of production, so old
and new front-ends hit the same schema at once. Backwards and forwards compat is ideal,
but breaking PR previews or .dev for a little while is ok if we got to

## Migrations are the source of truth

Schema and stored procedures are SQL in `supabase/migrations/`, applied with
`supabase db push` on merge to `main` (not at prod release — staging shares the DB and
needs the schema when its front-end ships). The web UI is inspect-only; edits there are
untracked. `db/schema.sql` is a `pg_dump` backup (`pnpm dumpDb:schema`).

## Running app against local db

The app's Supabase connection comes from `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
(mandatory — no hardcoded fallback). They default to production via the base `.env`;
the `local-db` mode overrides them with the local stack:

```sh
supabase start                       # start the local db (needs Docker)
pnpm gen:seed                        # generate seed sql with a real campaign + a loginable dev user from the real db
supabase db reset                    # rebuild db from migrations + seed we just generated
pnpm dev:editor --mode local-db      # editor against local supabase
pnpm dev:game --mode local-db        # (or the game)
```

`pnpm gen:seed` copies the campaign named by `sequelCampaignLocator` (`src/gameInfo.ts`)
from production and creates a local login that owns it — it prints the credentials to
sign in with.

# Troubleshooting

Go to [the Discord server](https://discord.gg/Se5Jznc2jm) or raise a github issue.