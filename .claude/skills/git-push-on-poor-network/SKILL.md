---
name: git-push-on-poor-network
description: Push to GitHub over restricted/captive wifi (in-flight, hotel) that kills large HTTPS uploads with HTTP 408. Use when git push fails with "RPC failed; HTTP 408 curl 22" / "unexpected disconnect while reading sideband packet" but small transfers and browsing work. Also use if the user tells you they are on a flight or any other kind of degraded network, or you notice a high packet loss and need to push to git
---

## Stacked PRs: check commit ownership before touching ANYTHING

This repo uses stacked PRs (gh-stack). A branch's local history routinely
includes commits that already belong to an **earlier, separately-pushed PR**
in the stack. Such a commit looks "unpushed" (it's not on *this* branch's
remote-tracking ref, and the branch may show as diverged/ahead of
`origin/main`) but is NOT yours to touch — it is already published under a
different branch name, and other people's review/CI may point at it.

**Doing anything at all to a commit owned by another PR in the stack —
amending, rebasing onto a recompressed version, squashing, reordering — is
STRICTLY FORBIDDEN.** This applies even when the rewrite would be lossless
(e.g. recompressing an image inside it): rewriting it still changes its SHA
and abandons the one on origin, orphaning that PR's branch/review.

**Before running anything else in this skill, check every non-tip commit you
are about to touch:**

```sh
git branch -r --contains <sha>
```

- Any branch listed other than the one you're currently working on → that
  commit belongs to another PR in the stack. Leave it, and everything before
  it in history, completely alone. Only recompress/amend/seed blobs that are
  genuinely new in commits *after* it.
- Nothing listed → the commit has never been pushed under any name and is
  safe to amend (per the recompression rules below).

Do not infer "unpushed" from `git log <branch> vs origin/<branch>` alone —
that only tells you the commit isn't on *this* ref, not that it isn't on
*any* ref. Run the `git branch -r --contains` check per-commit, every time,
before starting.

## Failure signature

```
error: RPC failed; HTTP 408 curl 22 The requested URL returned error: 408
send-pack: unexpected disconnect while reading sideband packet
fatal: the remote end hung up unexpectedly
Everything up-to-date
```

The trailing "Everything up-to-date" is a lie — always verify with
`git ls-remote origin <branch>` against `git rev-parse HEAD` before assuming
anything landed.

## What was established (BA in-flight wifi, 2026-08)

- Fetch/ls-remote work; only large push uploads are killed.
- The blocking is on upload size/throughput, not git or GitHub: a near-empty
  push passes, a ~383KB pack fails every time.
- It is not a hard byte cap: identical pushes both failed and passed on retry
  (a 79KB push failed twice then passed; a 116KB push passed first try).
  Failures cluster after several rapid uploads — consistent with rate limiting.
  Batches ≤ ~116KB passed, usually within 3 attempts.
- `http.version=HTTP/1.1` made it worse (hung indefinitely).
- `http.postBuffer` (buffered single POST instead of chunked) did not help.
- SSH over port 443 (`ssh.github.com:443`) connects, so it is a viable
  alternative transport if a key is registered with GitHub. Untested for
  whether the proxy also throttles it.
- Even ~116-120KB batches were seeing enough retries to be worth shrinking
  further; `push-blobs.sh`'s default `BATCH_LIMIT` is now 65000. Lower it
  further (`BATCH_LIMIT=30000` etc.) if retries are still frequent at 65KB.

## Technique: seed big blobs as tags, then push normally

Push negotiation treats objects reachable from **any** advertised remote ref
as present, so pre-seeding objects makes the real push tiny. Lightweight tags
may point directly at blobs (branches may not), so no synthetic commits or
trees are needed, and nothing about the branch is touched until the final
ordinary push. Two scripts in this skill directory do the work — do not
hand-roll the batching loop again.

1. Probe that a tiny push passes at all (also rules out auth problems):

   ```sh
   probe=$(git commit-tree 'origin/main^{tree}' -p origin/main -m "test: push probe")
   git push origin "$probe":refs/heads/push-probe
   ```

2. Get the last-known-good remote commit for the branch (`git ls-remote origin
   <branch>`, or `origin/main` for a brand new branch), then seed:

   ```sh
   ./push-blobs.sh <base-ref>
   ```

   Only pre-compressed/binary files (png/webp/zip/font/etc — see `PATTERN` in
   the script) are worth seeding; text deltas compress down to almost nothing
   in the final pack, so they're left for the normal push. The script is
   resumable: rerun it unmodified after any interruption and it skips
   whatever is already tagged on the remote (queries `refs/tags/seed-*`
   first, continues tag numbering from the highest existing number). See
   "Pitfall" below for why that matters.

3. Once it reports `ALL BATCHES ATTEMPTED`, do the real push:

   ```sh
   git push --force-with-lease
   ```

   The push's own server report (`<old>...<new> branch -> branch`) is the
   authoritative success signal — `ls-remote` may time out on the same wifi.

4. Clean up the seed tags and any probe branch (safe — the blobs are now
   reachable from the branch itself):

   ```sh
   ./cleanup-seed-tags.sh
   git push origin :refs/heads/push-probe
   ```

## Shrinking PNGs before pushing (lossless)

Before seeding/pushing large PNGs at all, check whether they can just be made
smaller — a smaller blob beats any batching workaround for the same content.
`recompress-pngs.sh <file.png> [file2.png ...]` re-encodes each PNG with
`magick -strip` and max-effort DEFLATE settings — pure re-compression, zero
pixel changes, verified per-file with ImageMagick's `compare -metric AE`
(must read exactly `0`) before the original is overwritten. Verified on this
project's e2e/visual-regression PNG baselines (low colour-count pixel art):
consistently **55-75% smaller**, pixel-identical every time. `magick` (from
`iff2png.sh`'s toolset) is enough; no extra tooling needed.

**Always amend, never add a new commit on top, when recompressing files that
are already part of an unpushed commit.** A new commit leaves the old
(large) blob reachable via the parent commit's tree *and* the new (small)
blob reachable via the tip — git has to send both, which is worse than not
recompressing at all. `git reset --soft HEAD~1 && git commit --amend
--no-edit` (or just `commit --amend` directly if the files were already
part of that commit) collapses history back to one blob per file.

This is only safe because the commit being amended was never successfully
pushed **under any ref** — before amending, run the ownership check from
"Stacked PRs" above (`git branch -r --contains <sha>`) on that exact commit.
If it's the branch tip and the check returns nothing, proceed. If the branch
has multiple unpushed-looking commits, check each one individually — do not
assume the whole run of commits ahead of `origin/main` is fair game; in a
stacked-PR branch it usually isn't, and only the newest commit(s) are
actually this PR's own work.

Only recompress files whose current committed content isn't already fully
on the remote. Two things can make that true, check both:

1. **Seeded via tags already** (from a prior/resumed run of this skill):
   ```sh
   git ls-remote origin 'refs/tags/seed-*' | awk '{print $1}' > /tmp/seeded_shas.txt
   git rev-parse HEAD:path/to/file.png   # compare against /tmp/seeded_shas.txt
   ```
2. **Already pushed under a different commit/branch entirely** (the stacked-PR
   case): the file's blob SHA may already be reachable from another remote
   branch even though the commit introducing it here has a different SHA
   (e.g. after a rebase). Diff against that specific remote commit, not just
   the merge-base, to find out what's actually new:
   ```sh
   git diff <known-pushed-sibling-commit> <this-commit> --stat -- '*.png'
   ```
   An empty/no-binary-change result means the content is already on origin
   under the sibling ref — do not recompress or re-touch it here.

## Pitfall: don't silence stderr, don't renumber tags from 0

If you ever bypass `push-blobs.sh` and hand-write a seeding loop: recompute
the starting tag number from the highest `seed-N` already on the remote, not
from 0 — reusing a tag name that already points at a different blob is
rejected by the remote as "already exists", which looks identical to a
network 408 in a retry loop that doesn't print the actual git error. Never
redirect a push's stderr away in a retry loop; capture it and print it on
final failure, so a permanent rejection doesn't masquerade as flaky wifi for
N retries. (`push-blobs.sh` already does both correctly — this is why.)

## Parallel seeding

`push-blobs.sh` accepts `WORKERS=N` to push batches concurrently as
independent tag refs (no ref conflicts between them). In practice, on BA
in-flight wifi, `WORKERS=4` was strictly worse than `WORKERS=1` — every
batch needed 2+ retries where serial mostly passed first try — consistent
with the throttle being per-connection or aggregate-throughput rather than
per-request. Try `WORKERS=1` first; only raise it if serial retries are
frequent, and watch the first handful of batches closely before committing
to it (compare retry counts against a serial baseline, not vibes).

## Progress reporting

Seeding many blobs is slow on this kind of wifi (roughly a minute per batch
including retries), so keep the user informed throughout:

- `push-blobs.sh` prints `progress: N% (done/total batches overall)` after
  every successful batch, counting from whatever was already seeded in a
  prior run — not just the current invocation. Report that percentage to the
  user as-is; do not recompute a percentage against only the current run's
  batch count, which understates real progress after a resume.
- Run it in the background and use a monitor (or poll its output file) to
  surface those `progress:` lines and any `BATCH FAILED` lines to the user
  as they appear, rather than making them ask.
- On completion, report total retries — a rising retry rate is the early
  signal that `BATCH_LIMIT` should be lowered.
