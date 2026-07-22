---
name: run-e2e
description: "Read BEFORE invoking `playwright test` in any form, for any reason — running e2e, visual regression, room snapshots, or verifying a change 'via e2e'. Covers required project scoping (chromium-desktop, matching CI), the sandbox browser-build bridge, and the pnpm webServer failure. Also load on these failure signatures: every test failing at browserType.launch, 'Executable doesn't exist at /opt/pw-browsers/...', or 'Process from config.webServer was not able to start'."
---

# Running e2e / visual regression

`webServer` in `playwright.config.ts` serves a build via `pnpm preview:game`, so
build before running (it serves `dist/`, not live source), in visual-regression
mode:

```bash
pnpm build:game --mode visual-regression
```

**Never run the bare multi-project suite in the sandbox without installing
the browsers first** — `playwright test` without `--project` fails every test
whose browser is missing, and the run tells you nothing. Start with
`--project=chromium-desktop --project=mobile-chrome` (the E2E Gate pair);
webkit also works here after
the setup in the WebKit section below (`playwright install webkit` + apt
libs), so add `--project=webkit-desktop` when a change affects rendering and
deserves second-engine coverage. Firefox is untested in the sandbox.

Reuse `dist/` if nothing in the game changed since the last build.

What CI actually runs (do not trust folklore - read the workflows):
- **E2E Gate** (`e2e.yml`): `--project chromium-desktop --project mobile-chrome`
- **Visual Regression Gate** (`visual-regression.yml`): a matrix of
  chromium-desktop + mobile-chrome (linux), webkit-desktop + mobile-safari
  (macOS), chromium-desktop (windows), mobile-safari-portrait.

So local gate-parity for the functional e2e specs means BOTH
`chromium-desktop` and `mobile-chrome`. For snapshot coverage add
webkit-desktop (works in the sandbox - see below).

## Visual regression only

The snapshot specs are those in `e2e/` with a committed `-snapshots/` baseline
dir (`roomSnapshots` is the big one). Run one, eg:

```bash
pnpm playwright test roomSnapshots.spec.ts --project=chromium-desktop
```

Baselines: `e2e/<spec>.spec.ts-snapshots/<projectName>/<name>.png`.

## Sandboxed environment (browser download blocked)

A fresh sandbox has no browser binaries, and the Playwright CDN / apt PPAs may
be blocked. First try the plain download (drop `--with-deps` — the system libs
are usually already present):

```bash
pnpm exec playwright install chromium chromium-headless-shell
```

If that's blocked, tests fail at launch with
`Executable doesn't exist at /opt/pw-browsers/chromium_headless_shell-<WANT>/...`.
Bridge the build number `@playwright/test` pins (`WANT`, from the error) to the
one pre-provisioned in `$PLAYWRIGHT_BROWSERS_PATH` (`PROV`, from `ls`); any
nearby Chromium build works:

```bash
ls /opt/pw-browsers              # find PROV, e.g. chromium-1194
PROV=1194; WANT=1200

cd /opt/pw-browsers
# older builds: chrome-linux/headless_shell;
# newer expect: chrome-headless-shell-linux64/chrome-headless-shell
ln -sf headless_shell \
  chromium_headless_shell-$PROV/chrome-linux/chrome-headless-shell
mkdir -p chromium_headless_shell-$WANT chromium-$WANT
ln -sfn ../chromium_headless_shell-$PROV/chrome-linux \
  chromium_headless_shell-$WANT/chrome-headless-shell-linux64
ln -sfn ../chromium-$PROV/chrome-linux chromium-$WANT/chrome-linux
for d in chromium_headless_shell-$WANT chromium-$WANT; do
  touch "$d/INSTALLATION_COMPLETE" "$d/DEPENDENCIES_VALIDATED"
done
```

Headless WebGL runs on the bundled SwiftShader, so no GPU is needed. Room
snapshots matched the committed baselines exactly on a bridged browser — but a
*red* on a bridged build could be version noise, so inspect the `*-diff.png`
before trusting it.

## WebKit in the sandbox

Real webkit (`--project=webkit-desktop`) runs in the Linux sandbox. The
Playwright CDN is usually reachable, so download it plainly:

```bash
pnpm exec playwright install webkit
```

The sandbox image is missing webkit's system libraries. `apt-get update`
first (the baked package lists 404), then install:

```bash
apt-get update
apt-get install -y --no-install-recommends \
  libgtk-4-1 libgraphene-1.0-0 libevent-2.1-7 libopus0 gstreamer1.0-gl \
  libgstreamer-plugins-bad1.0-0 flite libwebpdemux2 libavif16 \
  libharfbuzz-icu0 libenchant-2-2 libsecret-1-0 libhyphen0 \
  libmanette-0.2-0 libx264-164 libwebpmux3 libwayland-server0 libwoff-dev
```

If launch still complains about specific `.so` files, install whatever
package provides them and re-run — the list only needs to be complete
enough for launch (`playwright install-deps` also wants ~150 gstreamer
codec packages which are NOT needed; see below).

**Symptom of missing audio codecs**: the app loads (store present, no JS
errors) but no dialog ever mounts — `assetsLoading.count` stays at 1
because webkit's `decodeAudioData` never settles without gstreamer codecs,
and the menu dialogs gate on menu sounds (`Dialogs.tsx`). Visual-regression
builds stub out audio decoding entirely (`loadAndDecode.ts`), so a current
build is immune; if hitting this on an older build, either rebuild or
`apt-get install gstreamer1.0-{libav,plugins-base,plugins-good,plugins-bad}`.

Webkit renders matched CI's macOS webkit renders to within ~350px (the
animated chevron/leader sprites), well inside the menu snapshots'
`maxDiffPixelRatio: 0.03` (~5,900px) — so sandbox webkit is good enough to
regenerate `webkit-desktop` baselines with `--update-snapshots`.

## Supabase / DB-backed specs in the sandbox

`roomSnapshots` uses the burnt-in original campaign and needs no network, but
some visual specs load a community campaign from supabase and **cannot run in
the sandbox as-is**: `cameraRotationSweep` loads the `rotate-camera-test`
campaign (`userId 2924c962-99f1-4dd2-9b9c-fef832dc991b`) and fails at
`loadCampaignFromDb` with "could not get campaign".

Why: the egress proxy re-terminates TLS (MITM). CLI tools trust its CA bundle,
but Playwright's bundled browser does not, and the browser's tunnelled TLS to
supabase is **reset** (`net::ERR_CONNECTION_RESET`); `--ignore-certificate-errors`,
`--disable-http2`, `--disable-quic` and disabling ECH do NOT fix it. The host is
allowed (a denied host gives `ERR_TUNNEL_CONNECTION_FAILED` instead), so it is
the interception, not egress policy.

**CLI supabase access DOES work** through the proxy with the anon key baked into
the build (`grep -oE 'eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+' dist/assets/postgrestDb.js`).
The campaign load is a POST RPC:

```bash
KEY=<anon key from dist>
curl -sS -X POST \
  https://pkswdnpftrundnewgnya.supabase.co/rest/v1/rpc/get_latest_campaign \
  -H "apikey: $KEY" -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -d '{"p_campaign_name":"rotate-camera-test","p_user_id":"2924c962-99f1-4dd2-9b9c-fef832dc991b"}'
# -> 200, {"name":"rotate-camera-test","data":"H4sI...", ...}
```

**Working solution in-repo**: `e2e/testUtils/relaySupabase.ts` intercepts the
browser's supabase requests with `page.route` and re-issues them from the node
test process (which CAN reach supabase), relaying the live response back - no
fixture to go stale. It is opt-in behind `E2E_RELAY_SUPABASE`, so CI (where the
browser reaches the db directly) is untouched. `cameraRotationSweep` calls it
before the rotate-camera-test `page.goto`. Node's fetch only uses the proxy with
`NODE_USE_ENV_PROXY=1` (the CA is already trusted via `NODE_EXTRA_CA_CERTS`), so
regenerate that spec's baselines locally with:

```bash
E2E_RELAY_SUPABASE=1 NODE_USE_ENV_PROXY=1 pnpm playwright test \
  cameraRotationSweep.spec.ts --project=chromium-desktop --update-snapshots
```

(only `chromium-desktop` matches CI's Linux runner - `webkit-desktop`/`CamRot Mac`
render on macOS and won't match here, see the WebKit note above). Alternative if
the browser ever needs to reach supabase directly: ask the admin to make
`*.supabase.co` a TLS-passthrough (no-MITM) host in the egress policy.

## Scope

Visual regression is a regression guard for steady-state rendering; it does
**not** exercise first-load/startup races (screenshots are taken after the room
settles). Ignore `Audio decode failed` warnings (no headless audio codec).

GitHub CI jobs — e2e and the native Tauri builds especially — sometimes fail
randomly; re-run before assuming a real break.

## pnpm webServer failure in the sandbox

`playwright test` dying immediately with
`Process from config.webServer was not able to start. Exit code: 1` is usually
NOT the server: the webServer command is `pnpm preview:game`, and pnpm's
verify-deps pre-check fails when `package.json` lists the
`dougmencken_HeadOverHeels` git dep but `node_modules` was installed with it
disabled (the sandbox install workaround). Fix for the session: temporarily
remove that devDependency line from package.json (leave `pnpm-lock.yaml`
untouched) so pnpm's check passes; **restore the line before committing**.

## Node version in the sandbox

The sandbox's provisioned node is likely to be out of date vs `.node-version`
(`engines`), and `fnm` is not installed. Tests (unit and e2e fixture helpers)
use recent node APIs (eg `Uint8Array.prototype.toBase64`) - the failure
signature on an outdated node is `bytes.toBase64 is not a function` in
`compressObject.ts` across the saves/persistence/errorDialog specs. Do not
classify these as flakes or "environmental" and move on: get the right node
first via the SessionStart hook (resolves `.node-version` and installs it):

```bash
CLAUDE_CODE_REMOTE=true CLAUDE_ENV_FILE=/tmp/node-env CLAUDE_PROJECT_DIR=$PWD \
  ./.claude/hooks/session-start.sh && source /tmp/node-env
```

(vite builds may happen to work on the outdated node, and the in-container
act/TSS runs use `.node-version` via setup-node regardless - only host-side
test runs are affected.)

