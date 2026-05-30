---
name: run-e2e
description: "Run the Playwright e2e / visual-regression suite. Use when asked to run e2e tests, visual regression, or room snapshots — especially for the chromium-desktop project or in a sandbox where the browser download is blocked."
---

# Running e2e / visual regression

`webServer` in `playwright.config.ts` serves a build via `pnpm preview:game`, so
build before running (it serves `dist/`, not live source), in visual-regression
mode:

```bash
pnpm build:game --mode visual-regression
```

Reuse `dist/` if nothing in the game changed since the last build. CI runs
**only** `--project=chromium-desktop`; match that locally.

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

## Scope

Visual regression is a regression guard for steady-state rendering; it does
**not** exercise first-load/startup races (screenshots are taken after the room
settles). Ignore `Audio decode failed` warnings (no headless audio codec).

GitHub CI jobs — e2e and the native Tauri builds especially — sometimes fail
randomly; re-run before assuming a real break.
