---
name: guided-review
description: Build an ordered, HTML reading-order checklist for a large commit or PR, grouped by theme with links to the GitHub diff for each file. Use when a commit/PR is too large to read file-by-file in git-log order and the user wants a guided path through it.
---

# Guided review

Produces a single HTML artifact: a reading order over every non-binary file
in a commit/PR, grouped by theme (not a strict topological sort — group
similar work together even where that means bending dependency order),
with a short note per file and a checkbox that persists via localStorage.
Use when a commit is large enough (dozens of files) that reading it in
diff/alphabetical order would lose the thread.

## 1. Pick the scope: one commit, or a whole PR

Two supported entry points — decide which the user means before doing
anything else, since it changes every git command downstream:

- **A single commit.** You have a SHA (or the user said "commit
  \<sha\>"). The diff is exactly `git show <sha>`.
- **A whole PR.** You have a PR number, a branch name, or the user just
  said "review this PR"/"review my branch". A PR is usually several
  commits — the diff is everything since it diverged from its base, which
  is what GitHub's "Files changed" tab shows and what a reviewer actually
  needs, not any one commit on it (even if the PR happens to currently be
  a single commit, treat it as this mode so the workflow doesn't silently
  drop commits if more land before you finish).

Identify which, and resolve a whole-PR range to concrete refs:

```
git log -1 <sha> --format="%H%n%s%n%b"                                   # single-commit mode
gh pr view <number-or-branch> --json baseRefName,headRefName,commits,state,url   # whole-PR mode
git fetch origin <headRefName> <baseRefName>                             # whole-PR mode, if either isn't local
```

For whole-PR mode, every following step's "the diff" means the three-dot
range `origin/<baseRefName>...origin/<headRefName>` (merge-base diff —
matches what GitHub shows), never a single commit's SHA even if you
found one via `git log`.

Either way, check for a PR covering the work
(`gh pr list --search "<sha or distinctive title words>" --state all --json number,title,url`
if you only started from a SHA). If one exists (open or merged), always
link into `pull/<n>/files` — see step 3. Only fall back to `commit/<sha>`
(single-commit mode) or `compare/<base>...<head>` (whole-PR mode with no
PR raised yet) when there truly is no PR; skip step 3's PR-files fetch in
that case, but still verify the anchor scheme against whichever page you
land on before trusting it.

## 2. Get the exact file list and status

```bash
# single-commit mode
git show <sha> --name-status --format="" | grep -E '\.(ts|tsx|md|...)$' | grep -v '\.png'

# whole-PR mode
git diff --name-status origin/<base>...origin/<head> | grep -E '\.(ts|tsx|md|...)$' | grep -v '\.png'
```

Always use the three-dot range in whole-PR mode, not two-dot: three-dot
diffs against the merge-base, matching GitHub's PR view; two-dot would
also pull in unrelated changes that landed on the base branch after the
PR forked from it.

Exclude binary snapshots (screenshots, images) — they're not readable diffs.
Use `--name-status`, not `--stat`: `--stat` truncates long paths with `...`,
which silently corrupts later steps. Keep the status column (`A`/`M`/`D`/`R###`)
per file — it drives the New/Modified/Deleted/Renamed badge later.

## 3. Compute GitHub diff-anchor links per file

GitHub's PR/commit diff view anchors each file's diff block with
`id="diff-" + sha256hex(path)`, where `path` is the file's repo-relative
path exactly as git prints it (no `a/`/`b/` prefix). This is stable and
can be computed offline — no need to scrape the PR page. Renamed files use
the new path; deleted files use their (only, old) path.

```bash
printf '%s' "path/to/some/changed/file.ts" | shasum -a 256
```

Verify the mechanism once per session before trusting it at scale: fetch
`https://github.com/<owner>/<repo>/pull/<n>/files` with `curl -sL`, grep
for `diff-[a-f0-9]{64}`, and confirm the hash for one or two known short
top-level paths in the diff (e.g. `.gitignore`, `README.md`) matches. GitHub lazy-loads large
diffs via AJAX so the initial HTML won't list every file — that's expected,
the point is only to confirm the hashing scheme, not to scrape the full list.

Build the link as:
`https://github.com/<owner>/<repo>/pull/<n>/files#diff-<hash>`
(or `.../commit/<sha>#diff-<hash>` if there's no PR).

## 4. Read the diff — delegate to parallel background agents

For anything beyond a handful of files, reading the full diff yourself
burns context that's better spent on synthesis. Split the file list into
2-4 coherent chunks (e.g. "the core algorithm/data-structure files" vs
"everything that consumes it" — split along the same lines you'd use to
group the reading order, not arbitrarily) and dispatch one background
`Agent` (general-purpose, `run_in_background: true`) per chunk, in a single
message so they run concurrently.

Each agent prompt must be self-contained (the agent has no memory of this
conversation) and include:
- the repo path; in single-commit mode the commit SHA and its one-line
  message; in whole-PR mode the PR number/title and the exact
  `origin/<base>...origin/<head>` range; either way, that this is
  read-only analysis — no edits
- enough architectural background (quote relevant CLAUDE.md sections) that
  the agent doesn't have to rediscover the system from scratch
- the exact file list for its chunk, with the read command matching the
  mode from step 1 — `git show <sha> -- <path>` (single-commit) or
  `git diff origin/<base>...origin/<head> -- <path>` (whole-PR) — and an
  instruction to also `Read` the current full content of the 3-5 meatiest
  files if the diff hunks alone are confusing
- what to report back: (a) a short paragraph on the overall shift in its
  chunk, (b) a 2-4 sentence note per file covering what changed, why, and
  which other files (in-chunk or in the other agent's chunk, named
  explicitly) it depends on, (c) its own recommended reading order for its
  chunk, grouped into named clusters with a sentence on why each cluster is
  positioned where it is
- an explicit instruction not to compress away the per-file notes — the
  report is consumed by you for synthesis, not shown to the user directly,
  so completeness beats brevity

## 5. Synthesize one macro reading order

Once both/all agents report back, merge their per-chunk orders into a
single sequence. Don't just concatenate chunks — decide where each chunk's
material actually belongs relative to the others (e.g. shared low-level
primitives first, then the core mechanism, then the concrete bugs/tests
that motivated it as the "why", then the integration point that wires it
into the rest of the system, then the periphery, then deep
property/stochastic tests last as an optional appendix). Group by theme
over strict dependency order where a strict topo-sort would fragment
clearly-related work across the document.

Within a group, order files start-to-finish the way a reader should
actually open them: deleted-then-new pairs read together for contrast,
foundational types before the code that consumes them, trivial
import-path-only renames batched and skimmed rather than given equal
weight to substantive logic changes.

## 6. Build the HTML artifact

Load the `artifact-design` skill first. This is a utilitarian reference
tool, not an editorial page — polished typographic hierarchy and a real
(small) palette, no hero, no flourish. A pattern that has worked well:

- Data-driven: a `HASHES` map (path → sha256) and a `GROUPS` array
  (`{title, blurb, items: [{path, status, note}]}`) rendered by a small
  script, rather than hand-writing 100+ repetitive HTML blocks — far less
  error-prone to keep the hash map and the prose in sync.
- Sticky header with a live progress bar/count (checked / total) and a
  reset button.
- Each group as a collapsible `<details>` (open by default) with an index
  badge (a real reading-order number is legitimate structure here, unlike
  decorative 01/02/03 markers elsewhere), a one-sentence blurb on why the
  group sits where it does, and its file rows.
- Each file row: checkbox (state persisted to `localStorage`, keyed by
  path), a status chip (New/Modified/Deleted/Renamed — semantic colour,
  distinct from the page's one accent hue), the path as a monospace link
  to its GitHub diff anchor, and the note in the body typeface below it.
- Both light and dark theme, following the artifact-design token pattern.

Publish with `Artifact`, a topic-fitting favicon, and a one-sentence
`description`.
