---
name: act-true-site-size-sandbox
description: Run the true-site-size GitHub Action locally via `act` inside the Claude Code web sandbox, to measure the game/editor cold-load journey byte cost without a CI round-trip. Use when asked to measure or verify build/wire size, or to check a byte-saving change, in the sandbox.
---

# Running true-site-size under `act` in the Claude Code web sandbox

The sandbox's egress proxy blocks most of what `act` normally needs. This is the
proven end-to-end recipe that gets the `true-site-size.yml` workflow running and
producing its size report locally. It turns CI's ~15-min round-trip into a local
edit → `act` → read-delta loop.

Complements the general `docker-in-sandbox` skill; this is the true-site-size-specific
version with the exact blockers and fixes.

## The blockers and their fixes (all discovered empirically)

1. **`act` / `crane` release tarballs 403** — GitHub release-asset downloads are
   gated by the org egress policy (only the in-scope repo is allowed; the proxy
   returns `"GitHub access to this repository is not enabled for this session"`).
   Do NOT retry or route around policy denials.
   - **Fix:** install `act` via the allowlisted Go module proxy (`proxy.golang.org`
     is in the proxy's noProxy list): `GOBIN=/usr/local/bin go install github.com/nektos/act@latest`.
   - **`docker pull` works directly** in this sandbox (Docker Hub reachable), so
     `crane` is NOT needed — just `docker pull catthehacker/ubuntu:act-latest`.

2. **In-container HTTPS fails (`000`/cert errors)** — containers get direct,
   TLS-MITM'd egress but don't trust the proxy CA. Plain HTTP (archive.ubuntu.com)
   works; HTTPS doesn't.
   - **Fix:** bake `/root/.ccr/ca-bundle.crt` into the runner image's system store
     (`update-ca-certificates`), and pass `NODE_EXTRA_CA_CERTS` + `NODE_OPTIONS=--use-openssl-ca`
     to `act` (Node has its own bundle). With the CA trusted, `dl.google.com`,
     `codeload.github.com`, and npm are all reachable **inside** the container —
     including `codeload`, so `pnpm install --frozen-lockfile` installs the
     `dougmencken_HeadOverHeels` git dep that is blocked on the host.

3. **act can't clone the workflow's actions** — act uses go-git with the
   (invalid, 14-char) `$GITHUB_TOKEN`, so cloning `actions/checkout`, `pnpm/action-setup`,
   `actions/setup-node`, `jimhigson/true-site-size` fails auth. Note git-clone
   traffic reaches github.com (auth error, not a proxy 403) — it is NOT repo-scoped.
   - **Fix:** pre-clone the four actions with the **system git** (its `insteadOf`
     rewrite → the authenticated host git proxy handles them), then hand them to
     act with `--local-repository owner/repo@ref=/path` + `--action-offline-mode`.

4. **Chrome install step fails on `apt-get update`** — a `packagecloud.io/github/git-lfs`
   apt source baked into `catthehacker/ubuntu:act-latest` 403s under egress policy,
   failing the whole `apt-get update`.
   - **Fix:** bake Chrome into the runner image (remove the git-lfs apt source
     first; `dl.google.com` is reachable in-container once the CA is trusted)
     and wrap the binary with `--no-sandbox` (act runs as root). This makes the
     workflow's runtime Chrome step a no-op.
   - **Do NOT pass `CHROME_PATH` to act.** With Chrome baked, true-site-size
     auto-detects the browser and the game journeys measure. Forcing
     `--env CHROME_PATH=/usr/bin/google-chrome-stable` changes the launch path
     enough that Web Audio decoding breaks in the container - and the game's
     menu is gated on sound loading (`Dialogs.tsx` only mounts
     `MainMenuDialog`, which fires the `menu-ready` mark, after the menu
     sounds decode). Result: every game journey fails with
     `mark "menu-ready" not seen within 60s` for BOTH head and base, while
     the editor journey (no audio gate) keeps measuring fine. That signature
     looks exactly like "environment broke" - it is not; remove `CHROME_PATH`.
   - **Simplest robust alternative:** skip the baked Google Chrome entirely and
     use the sandbox's playwright chromium - bind-mount it into the container
     (`--container-options "-v /opt/pw-browsers:/opt/pw-browsers"`) and give
     true-site-size a small wrapper that execs
     `/opt/pw-browsers/chromium --no-sandbox`. A current chromium works at
     least as well as the pinned .deb and needs no dl.google.com fetch.

5. **Base-ref comparison / `gh` steps need a real token** — the repo is **public**,
   so base-ref (`main`) fetch works anonymously in-container. The `production` /
   prev-tag comparison points use `gh release list` (needs a real token) — drop
   them. Use a trimmed local workflow that compares vs `main` only (also ~halves
   runtime: two builds instead of four). Add a step to point `origin` at
   `https://github.com/<owner>/<repo>` so the in-container base fetch is reachable.

## Procedure

```bash
# 0. deps
docker info >/dev/null 2>&1 || { (sudo dockerd >/tmp/dockerd.log 2>&1 &); sleep 6; }
GOBIN=/usr/local/bin go install github.com/nektos/act@latest      # via proxy.golang.org
docker pull catthehacker/ubuntu:act-latest

# 1. runner image: CA + Chrome baked (see Dockerfile below)
docker build -t hoh-act-runner /tmp/hoh-act

# 2. pre-clone the workflow's actions with system git (proxy rewrite authenticates)
#    actions/checkout@v6, pnpm/action-setup@v5, actions/setup-node@v6, jimhigson/true-site-size@main
git clone --depth 1 --branch <ref> https://github.com/<owner>/<repo> /tmp/act-actions/<name>

# 3. trimmed workflow (base-refs '["main"]', drop gh steps, add `git remote set-url origin`)
#    -> /tmp/tss-local.yml

# 4. run
act pull_request -W /tmp/tss-local.yml \
  --container-architecture linux/amd64 \
  -P ubuntu-latest=hoh-act-runner --pull=false --action-offline-mode \
  --local-repository actions/checkout@v6=/tmp/act-actions/checkout \
  --local-repository pnpm/action-setup@v5=/tmp/act-actions/action-setup \
  --local-repository actions/setup-node@v6=/tmp/act-actions/setup-node \
  --local-repository jimhigson/true-site-size@main=/tmp/act-actions/true-site-size \
  -s GITHUB_TOKEN="$GITHUB_TOKEN" \
  --env TRUE_SITE_SIZE_OUTPUT_FILE=/tmp/tss-out/comment.md \
  --env NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt \
  --env NODE_OPTIONS=--use-openssl-ca \
  --container-options "-v /tmp/tss-out:/tmp/tss-out" \
  -e /tmp/tss-event.json          # {"pull_request":{"base":{"ref":"main"}}}
```

The report is written to `TRUE_SITE_SIZE_OUTPUT_FILE` even though the job's final
"post comment to PR" step exits non-zero (no real PR/token locally) — that exit=1
is expected; the measurement in `comment.md` is complete. It builds the current
**working tree** (act skips `actions/checkout`), so uncommitted edits are measured
— ideal for an edit → measure loop. The `vs main` link in the report is cosmetically
mangled (origin is the proxy URL) but the comparison commit is correct.

## Runner image Dockerfile (`/tmp/hoh-act/Dockerfile`)

```dockerfile
FROM catthehacker/ubuntu:act-latest
COPY ca-bundle.crt /usr/local/share/ca-certificates/ccr-proxy.crt
RUN update-ca-certificates
RUN rm -f /etc/apt/sources.list.d/*git-lfs* /etc/apt/sources.list.d/*github* 2>/dev/null || true
RUN deb="$(mktemp --suffix=.deb)" && \
    curl -fsSL -o "$deb" https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get update && apt-get install -y "$deb" && rm -f "$deb" && \
    mv /opt/google/chrome/chrome /opt/google/chrome/chrome.real && \
    printf '#!/bin/bash\nexec /opt/google/chrome/chrome.real --no-sandbox --disable-gpu --disable-dev-shm-usage "$@"\n' > /opt/google/chrome/chrome && \
    chmod +x /opt/google/chrome/chrome
```
(`ca-bundle.crt` is `cp /root/.ccr/ca-bundle.crt` into the build context.)
```

## Troubleshooting hard-won lessons

- **Game rows fail (`menu-ready not seen`) but editor row measures** - for
  BOTH head and base: this is the harness, not the code. First suspect any
  `CHROME_PATH` env (see above). The game journey is audio-gated; the editor
  journey is not - that asymmetry is the tell.
- **A single-side failure** (head fails, base measures) IS a real breakage in
  the working tree - e.g. a chunk-init cycle from `advancedChunks` grouping
  vendor/runtime modules crashes boot with `<mangled> is not a function`.
  Verify quickly with a headless boot check against `vite preview`:
  playwright chromium at `/opt/pw-browsers/chromium`, load `/?track=0`, then
  assert `performance.getEntriesByName("menu-ready").length` and
  `[data-dialog-id="mainMenu"]`.
- **dockerd dies between runs** (`Cannot connect to the Docker daemon`):
  just restart it (`sudo dockerd &`, wait ~8s) and rerun; disk is usually NOT
  the cause (check `df` before assuming).
- **Keep the act log alive across shell restarts**: launch via
  `setsid bash -c '/tmp/run-act.sh >/tmp/act.log 2>&1' </dev/null &` - the
  harness recycles shells (exit 144), and a redirect owned by a killed shell
  loses the log while act keeps running. The report file
  (`TRUE_SITE_SIZE_OUTPUT_FILE`, bind-mounted) survives regardless - poll that.
- **act builds the working tree** - don't edit source, switch branches, or
  `git reset` mid-run; commits/ref moves can also confuse the in-container
  base-ref fetch. Wait for the report, then edit.

