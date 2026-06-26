---
name: docker-in-sandbox
description: Run Docker — and tools that need it, like `act` (local GitHub Actions) — inside the Claude Code web sandbox, where image pulls and in-container networking collide with the egress proxy. Use when `docker pull` returns 403 on image layers, when a container can't reach the network, or when running `act`/CI-in-docker locally (e.g. the `act-true-site-size.sh` script).
---

# Docker in the Claude Code web sandbox

The sandbox routes the host's outbound HTTPS through a TLS-re-terminating egress
proxy at `127.0.0.1:37799` (`$HTTPS_PROXY`). Docker and containers interact with
that proxy in non-obvious ways. This is the playbook that got `act` to build and
run a real browser journey in here.

## 1. Start the docker daemon

The daemon often isn't running and there's no socket:

```bash
docker info >/dev/null 2>&1 || { (sudo dockerd >/tmp/dockerd.log 2>&1 &); sleep 6; }
```

## 2. `docker pull` fails with 403 on image layers — use `crane`

Symptom:

```
failed to copy: ... GET https://production.cloudfront.docker.com/.../data?...: 403 Forbidden
```

The manifest downloads fine; the **layer blobs** 403. The cause is **not** the
proxy blocking the CDN — it's that **Docker forwards the registry bearer token
to the layer CDN on the redirect**, and CloudFront/Azure reject a signed URL that
also carries an `Authorization` header. Proof: `curl -L` fetches the same layer
with `http_code=200`, because curl strips auth on a cross-host redirect.

So pull with a tool that handles the redirect like curl does — `crane`
(go-containerregistry) — then hand the image to Docker:

```bash
VER=$(curl -s https://api.github.com/repos/google/go-containerregistry/releases/latest | python3 -c "import sys,json;print(json.load(sys.stdin)['tag_name'])")
curl -sSL "https://github.com/google/go-containerregistry/releases/download/$VER/go-containerregistry_Linux_x86_64.tar.gz" -o /tmp/crane.tgz
tar xzf /tmp/crane.tgz -C /tmp crane

/tmp/crane pull catthehacker/ubuntu:act-latest /tmp/runner.tar   # works through the proxy
docker load -i /tmp/runner.tar
```

This works for any registry (Docker Hub, ghcr, …). `docker build` from a
*locally-loaded* base image then works offline.

## 3. CA trust inside containers

The proxy MITMs TLS, so in-container tools must trust its CA
(`/root/.ccr/ca-bundle.crt`). Bake it into the image's **system** store:

```dockerfile
FROM <base>
COPY ca-bundle.crt /usr/local/share/ca-certificates/ccr-proxy.crt
RUN update-ca-certificates
```

That covers `curl`, `git`, `apt`. **Node does NOT use the system store** — it has
its own bundle — so node-based tools (pnpm, npm) still fail with
`self-signed certificate in certificate chain` until you also pass:

```
--env NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt
--env NODE_OPTIONS=--use-openssl-ca
```

## 4. In-container networking: direct, not the proxy

Counter-intuitive but important:

- **The host proxy (`127.0.0.1:37799`) is NOT reachable from a container** — even
  with `--network=host`. Containers live in a separate netns from the proxy.
- **Containers have their own direct egress**, transparently filtered to an
  allowlist and TLS-MITM'd with the proxy CA. So **do not set `HTTPS_PROXY` in
  the container** — let tools connect directly.
- The container allowlist is a **subset** of the host's. Confirmed reachable
  direct: `github.com`, `nodejs.org`, `registry.npmjs.org`, `archive.ubuntu.com`.
  Confirmed 403 direct: `api.github.com`, `dl.google.com`. Anything only reachable
  via the host proxy can't be reached from a container — **bake those deps into
  the image instead** (see Chrome below).

## 5. Recipe: running `act` (GitHub Actions locally)

`scripts/act-true-site-size.sh` is Mac-tuned; on Linux use explicit `mktemp`
templates (`"$tmp/name.XXXXXX"`, not `mktemp -t name`). The working invocation:

```bash
act pull_request -W .github/workflows/<wf>.yml \
  --container-architecture linux/amd64 \
  -P ubuntu-latest=<your-prepared-image> --pull=false \
  -s GITHUB_TOKEN="$GITHUB_TOKEN" \
  --env NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt \
  --env NODE_OPTIONS=--use-openssl-ca \
  --container-options "-v $(git rev-parse --git-common-dir):$(git rev-parse --git-common-dir) -v <outdir>:<outdir>" \
  -e <pr-event.json>
```

Notes:
- `--pull=false` so act uses the locally-loaded image instead of pulling.
- Provide `GITHUB_TOKEN` via `-s` from `$GITHUB_TOKEN` (no `gh` CLI here; if a
  script calls `gh auth token`, shim it: a `gh` that echoes `$GITHUB_TOKEN`).
- **No `HTTPS_PROXY`** env — direct egress (§4).
- Browser steps: Chrome refuses to run as root without `--no-sandbox`
  (`Running as root without --no-sandbox is not supported`). Bake Chrome into the
  image (download the `.deb` on the host where the proxy works, `apt install` it —
  deps come from `archive.ubuntu.com`, reachable direct), then **wrap the binary**:

  ```dockerfile
  RUN mv /opt/google/chrome/chrome /opt/google/chrome/chrome.real && \
      printf '#!/bin/bash\nexec /opt/google/chrome/chrome.real --no-sandbox --disable-gpu --disable-dev-shm-usage "$@"\n' \
        > /opt/google/chrome/chrome && chmod +x /opt/google/chrome/chrome
  ```

## Limitations

If a workflow step needs a host that's only reachable via the host proxy (not in
the container's direct allowlist) and can't be baked into the image, it can't run
in-sandbox — run it on a real machine instead. For pure build/measure workflows
(install + build + headless-browser journey against `localhost`) the recipe above
completes end to end.
