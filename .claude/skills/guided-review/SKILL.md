---
name: guided-review
description: Build an ordered, locally-served HTML reading order for a large commit, PR or working tree, grouped by theme, with each file's diff inline in an editable Monaco editor, per-line review notes, and a pan/zoom compare viewer for changed images. Use when a commit/PR is too large to read file-by-file in git-log order and the user wants a guided path through it, or to review changed Playwright screenshot baselines / any image diffs visually (the scripted snapshots-only mode needs no authoring at all).
---

# Guided review

Produces a single HTML page, **served locally**: a reading order over every
file in a commit/PR/working tree, grouped by theme (not a strict
topological sort — group similar work together even where that means bending
dependency order), with a short note per file, that file's **diff embedded
inline** — an editable Monaco editor for text, a pan/zoom compare viewer for
images — and a checkbox whose state persists — to the review's own file when
served, so you can read it too. The page is the whole review: nothing has to be
opened elsewhere to read the change.

Serve it (step 8) rather than publishing it. A served page can be edited and
saved back to the working tree and can keep its notes in a file; a published
artifact is sealed behind a CSP that blocks it from reaching any endpoint,
including localhost, so it can only ever be read. Publish only when there is
no way to open a local port — a sandbox, or someone else's machine.

Use when a change is large enough (dozens of files) that reading it in
diff/alphabetical order would lose the thread.

**Almost all of this is scripted.** The only part needing judgement is the one
in the middle:

| file | does |
| --- | --- |
| `resolvePr.sh` | a PR number/branch/url → the local refs to diff, fetched (forks included) |
| `resolveStack.ts` | the same target → the whole PR stack it belongs to, for the page's stack bar |
| `buildStack.ts` | every authored review of a stack (one groups json per PR, from however many agents) → ONE page with an in-place review switcher |
| `changedFiles.sh` | the scope's file list as `STATUS<TAB>PATH`, binaries dropped — except raster images, which get compare viewers |
| *(you)* | author a groups json: the grouping, the order, the per-file notes |
| `snapshotGroups.ts` | *or*, for a snapshots-only review, generates that json mechanically — no authoring step at all |
| `build.ts` | collects every diff *and* each file's whole before/after, strips/truncates/escapes, captures every version of each changed image, computes GitHub anchors, inlines the font and the built ui, writes the finished HTML |
| `src/` | the page itself — a preact app in tsx: palette, layout, contents sidebar, diff rendering, the image compare viewer, notes, checkboxes |
| `buildPage.ts` | bundles `src/` to the one script and one stylesheet `build.ts` inlines |
| `serve.ts` | serves the built page — how a review is normally delivered; its editors become editable and save back to the working tree |
| `awaitNotes.ts` | blocks until the reviewer writes a note, so you come back and act on it while they are still reading |
| `reply.ts` | answers a note in its own thread — what you did, or the one question you need answered |

Read the scripts' own `--help`/header comments rather than re-deriving what
they do. Don't hand-assemble HTML or paste diff text; if the page needs a
change, change `src/` so the next review gets it too.

Everything runs on node, against **this directory's own** `package.json` — not
the reviewed repo's, which may have no node in it at all. The install also
brings `monaco-editor`, which `serve.ts` serves to the page and will not start
without. The first build in a fresh checkout installs it:

```bash
cd .claude/skills/guided-review && pnpm install --ignore-workspace
```

`--ignore-workspace` and the local `pnpm-workspace.yaml` both stop pnpm from
walking up and treating the skill as a package of whatever repo it is sitting
in. `node_modules/` is build state and is gitignored.

## 1. Pick the scope: commit, PR, or working tree

Nothing here is specific to one repo — run it in whichever repo is the working
directory. "Guided review of PR 34", "guided review #23", a PR url, a SHA, "my
branch" and "what I've got uncommitted" are all normal ways to be asked.

Three supported entry points — decide which the user means before doing
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
- **Uncommitted work.** The branch has no commits of its own yet (common
  when reviewing your own in-progress work): `git log origin/main..HEAD` is
  empty and everything lives in `git status`. The diff is
  `git diff <base>` for tracked files plus the whole content of each
  untracked file. There is no GitHub page to link to — see step 3.

Identify which, and resolve it to concrete refs:

```bash
# whole-PR mode - takes a number, a branch, or a pr url; fetches what it needs
.claude/skills/guided-review/resolvePr.sh 34

git log -1 <sha> --format="%H%n%s%n%b"                 # single-commit mode
git status -sb && git log --oneline origin/main..HEAD  # to detect working-tree mode
```

`resolvePr.sh` prints `{number, title, url, base, head}`. The head comes from
`refs/pull/<n>/head`, so a PR from a fork resolves exactly like one from a
branch on the origin. Pass its `base`/`head` to everything downstream, and its
`number` to `build.ts --pr` so the per-file links land on the right page.

For whole-PR mode, every following step's "the diff" means the three-dot
range `<base>...<head>` (merge-base diff — matches what GitHub shows), never
a single commit's SHA even if you found one via `git log`.

Starting from a SHA, it is worth checking whether a PR covers it
(`gh pr list --search "<sha or distinctive title words>" --state all --json number,title,url`):
if one does, review the PR rather than the commit, since that is what a
reviewer is being asked about.

### PR stacks

In whole-PR mode, also check whether the PR sits in a **stack** (a chain of
open PRs each based on the head branch of the one below):

```bash
node .claude/skills/guided-review/resolveStack.ts 34 > stack.json
```

It prints `{current, entries}` in stack order (trunk end first) and says on
stderr whether a stack was found. One entry → forget it, nothing changes. Two
or more → the page can carry the stack, in either of two shapes:

- **Reviewing just your PR**: `build.ts --stack stack.json` as normal. The
  page grows a bar along the top: the whole chain, this PR highlighted,
  unreviewed siblings greyed with a forge ↗ link. (The diff range needs no
  special handling — a mid-stack PR's base *is* the stack-parent's head, so
  `resolvePr.sh` already diffs exactly what GitHub shows.)
- **The whole stack in one page**: make a **stack directory** and build with
  `buildStack.ts`. The directory is the coordination point between however
  many agents contribute, one file per PR so nobody ever writes over anyone:

  ```
  <stackDir>/stack.json             resolveStack.ts output
  <stackDir>/<pr>.groups.json       that PR's authored groups, one author each
  <stackDir>/<pr>.instructions.md   optional: a request for another agent to
                                    author the groups json above
  node .claude/skills/guided-review/buildStack.ts --dir <stackDir> --out review.html [--current <pr>]
  ```

  Put the directory somewhere every contributing agent can find from any
  worktree of the repo — the convention is
  `$(git rev-parse --path-format=absolute --git-common-dir)/guided-review/stack-<trunk-most pr>`.
  `buildStack.ts` fetches each PR from `refs/pull/<n>/head`, diffs each
  mid-stack PR against the fetched head below it, and writes ONE page: every
  authored review switchable from the bar, siblings without a groups json
  shown greyed (marked *awaiting review* when an instructions file exists).
  **Contributing is: write your PR's groups json into the directory and
  re-run the build** — the serving process re-reads the html and creates the
  new review's store without restarting, so the reviewer just reloads.

**Admit what you have not read.** The agent starting a stack review has
usually only studied its own PR. Say so, and offer the two ways to fill the
rest in: dispatch reading agents to author a sibling's groups json now, or
write `<pr>.instructions.md` (scope, refs, where to put the json, how to
rebuild) for the agent that owns that PR — its author will write better notes
than a cold reader. Never silently author a shallow review of a PR you
haven't read.

**One review per page is editable**: the one whose head branch the served
`--repo` checkout has on disk (`serve.ts` matches and tells the page). The
others' Monaco editors are read-only, but their notes, replies and ticks work
in full — each review has its own `notes.json`/`ticks.json` under its own id,
so `awaitNotes.ts`/`reply.ts` point at whichever review's store the note
belongs to.

## 2. Get the exact file list and status

```bash
.claude/skills/guided-review/changedFiles.sh worktree
.claude/skills/guided-review/changedFiles.sh commit <sha>
.claude/skills/guided-review/changedFiles.sh pr origin/<base> origin/<head>
```

It prints `STATUS<TAB>PATH`, uses the three-dot range for PR mode (diffing
against the merge base, matching GitHub's view — two-dot would drag in
unrelated commits that landed on the base branch since the fork), maps
untracked `??` to `A`, and drops binaries with no reviewable diff (fonts,
audio, archives). Raster images (png/jpg/gif/webp/avif) stay in the list:
`build.ts` gives each one a compare viewer instead of a text diff.

Keep the status column per file — it drives the New/Modified/Deleted/Renamed
badge, and tells `build.ts` which files need diffing against `/dev/null`.

## 3. Per-file links to the forge

`build.ts` derives these from the `origin` remote, so there is normally
nothing to do: with `--pr <n>` it links each file into that PR's Files-changed
tab, otherwise `commit/<sha>` or `compare/<base>...<head>`, anchored with
`#diff-<sha256hex(path)>` — GitHub's own scheme (the path exactly as git
prints it, no `a/`/`b/` prefix; renames use the new path, deletions the old).
It prints the base url it settled on.

- `--github <url>` overrides the derivation; `--github none` links nothing.
- Non-GitHub remotes get no links: every forge anchors diffs differently, and
  the page carries the diffs anyway, so no link beats a wrong one.
- Working-tree mode has nothing to link to at all; there the path is a
  copy-to-clipboard button and the page should say so.

The link is a secondary affordance — a small "GitHub ↗" beside the path, for
leaving a review comment — since the diff itself is in the page.

## 4. Diff capture is `build.ts`'s job

It runs the right command per file for the mode (`git show`, three-dot
`git diff`, or `--no-index /dev/null` for untracked files) to count `+`/`−`
and to warn on any file whose diff came back empty (usually a stale path in
your groups json), and prints the file count, line totals and the finished
size — a couple of MB is normal with images; if it balloons, something
belongs in `--max-side-lines`/`--max-images` territory.

What the page renders from is each file's **whole before and after**
(`git show <rev>:<path>` either side, the working copy for the "after" in
working-tree mode) — Monaco computes and folds the diff itself rather than
being handed a patch. Files longer than `--max-side-lines` (default 2000)
are not embedded; their row says so and points at the file in the tree.

**Image files get versions, not sides.** For each raster image in the groups,
`build.ts` captures its bytes at every ref worth comparing — always
**production** (the latest release tag), then per mode: a pr's **base** and
**branch**, a commit's **parent** and **commit**, or a working tree's
**head/stage/working** — dedupes byte-identical versions, and embeds them as
one inert json block per image (so the payload itself never carries image
data). The page's viewer can then compare any pair, not just the pair the
review was built around. `--max-images` (default 100) caps how many images are
embedded; rows past it still appear, marked as left out. All comparison
happens in the page — there is no image tooling dependency here.

Generated files and lockfiles are worth leaving out of the groups json
entirely, or giving a row and a note without reading their body.

## 5. Read the diff — delegate to parallel background agents

For anything beyond a handful of files, reading the full diff yourself
burns context that's better spent on synthesis. Split the file list into
2-4 coherent chunks (e.g. "the core algorithm/data-structure files" vs
"everything that consumes it" — split along the same lines you'd use to
group the reading order, not arbitrarily) and dispatch one background
`Agent` (general-purpose, `run_in_background: true`) per chunk, in a single
message so they run concurrently.

**Leave image files out of every agent's chunk.** Reading pixels is expensive
for an agent and worthless to the reviewer, who sees the diff at a glance in
the viewer; the page also computes each image's %-of-pixels-changed line
itself. Give an image a row (grouped where it belongs) and at most a note on
*why* it changed, never a description of what it looks like.

Skip this step when you already have the change in context — eg you wrote
it in this session. Re-deriving what you already know costs more than it
returns.

Each agent prompt must be self-contained (the agent has no memory of this
conversation) and include:
- the repo path; in single-commit mode the commit SHA and its one-line
  message; in whole-PR mode the PR number/title and the exact
  `origin/<base>...origin/<head>` range; in working-tree mode that the
  change is uncommitted and how to diff it; either way, that this is
  read-only analysis — no edits
- enough architectural background (quote relevant CLAUDE.md sections) that
  the agent doesn't have to rediscover the system from scratch
- the exact file list for its chunk, with the read command matching the
  mode from step 1, and an instruction to also `Read` the current full
  content of the 3-5 meatiest files if the diff hunks alone are confusing
- what to report back: (a) a short paragraph on the overall shift in its
  chunk, (b) a 2-4 sentence note per file covering what changed, why, and
  which other files (in-chunk or in the other agent's chunk, named
  explicitly) it depends on, (c) its own recommended reading order for its
  chunk, grouped into named clusters with a sentence on why each cluster is
  positioned where it is
- an explicit instruction not to compress away the per-file notes — the
  report is consumed by you for synthesis, not shown to the user directly,
  so completeness beats brevity

## 6. Synthesize one macro reading order

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

## 7. Author the groups json and build

Write one json file — the whole of your output:

```json
{
  "meta": {
    "title": "the one-line thesis of the change",
    "headerTitle": "short name for the sticky header",
    "eyebrow": "reading order",
    "lede": "a paragraph on what the change is and why this order; html allowed",
    "facts": ["branch <code>x</code> vs <code>origin/main</code>", "…"],
    "footer": "html; eg where the ticks live, what was left out"
  },
  "groups": [
    {
      "title": "group name",
      "blurb": "one sentence on why this group sits here",
      "items": [{ "path": "src/…", "status": "M", "note": "2-4 sentences" }]
      // blurb and note both take html too - <code> especially
    }
  ]
}
```

The file and line counts are computed — don't put them in `facts`. Then:

```bash
node .claude/skills/guided-review/build.ts \
  --groups <scratchpad>/review.json \
  --out <scratchpad>/review.html \
  --mode worktree
  # a commit:  --mode commit --ref <sha>
  # a pr:      --mode pr --base <base> --head <head> --pr <n>   (refs from resolvePr.sh)
```

### Snapshots-only reviews are fully scripted

When the ask is "review the changed screenshot baselines" rather than a whole
change, skip authoring entirely — `snapshotGroups.ts` writes the groups json
itself (groups = snapshot directories, alphabetical, no notes: the page
computes each image's %-changed line):

```bash
node .claude/skills/guided-review/snapshotGroups.ts --mode worktree --out <scratchpad>/groups.json
# or --mode pr --base <base> --head <head>, --mode commit --ref <sha>
# --glob 'e2e/*-snapshots' bounds what counts as a baseline (that is its default)
node .claude/skills/guided-review/build.ts --groups <scratchpad>/groups.json \
  --out <scratchpad>/snapshots.html --mode <same mode and refs>
```

Then serve as normal. This is the drop-in for "regenerated the baselines — are
the diffs right?", including reading on a phone.

Then serve it (step 8) and hand over that URL. Rebuild and refresh to iterate;
`build.ts` overwrites in place, so the server keeps serving the newest build
without restarting.

### Writing the notes

The per-file notes and group blurbs are for **one reader, reading this change
now** — unlike a code comment, which has to make sense to someone who has
never seen the previous version and will read it years from now. So the
opposite rule applies here: a review note *may* be a historian. "This used to
load the room a second time", "was a bare pair of refs", "the fix that follows
in group 4" are all exactly right in a review and would all be wrong in the
source. Say what changed and why, not just what the code now does — the code
is on screen next to the note, and repeating it wastes the reader's attention.

Image rows mostly need **no authored note at all**: the page adds a mechanical
`WxH — N% of pixels differ` line under each one, and the viewer shows the
change better than words can. Write a note only when the *reason* for the
change isn't obvious from the surrounding groups.

## 8. Deliver it — serve when reachable, send a file when not

**First decide which mode you are in, from the `REACHABLE_FROM_INTERNET`
environment variable** (`echo "${REACHABLE_FROM_INTERNET:-unset}"`):

- **truthy** (`1`/`true`/any non-empty value) — you are on a machine the
  reviewer can open a `127.0.0.1` port on. **Serve**, exactly as this section
  describes: it is the richest form — editable diffs that save back to the
  working tree, and a live notes channel you act on as they are written.
- **unset or falsy** — you are somewhere the reviewer cannot reach a local
  port (the cloud sandbox is the usual case; a served URL there is dead on
  arrival). Do **not** serve. Switch to **non-reachable mode** below: the
  built `review.html` is already a single file that reads
  `window.__reviewServer` and behaves accordingly, so hand it over as-is.

Everything from here to "Publishing" is the **reachable** path. Skip it in
non-reachable mode and jump to "### Non-reachable mode".

```bash
# reachable mode only:
node .claude/skills/guided-review/serve.ts --html <scratchpad>/review.html --repo . --open
```

`--repo` must be a checkout **of the reviewed head** — in pr mode, the branch's
own worktree, not wherever you happen to be running from. It is where saves
and notes-driven edits land, and the live-file poll compares open editors
against its disk. In a stack page, whichever carried review's head branch the
checkout has is the editable one; the server works this out itself and the
others degrade safely to read-only-with-notes.

It prints a `http://127.0.0.1:<port>/` — hand that over as the review. Run it
in the background so the session isn't blocked, and say which port it's on.
Serving buys three things a file (or a published page) can't have:

- **Editable diffs.** The modified side of each Monaco editor becomes writable
  and grows Save and Revert. Every save carries the sha256 the page was built
  from; a file that moved on disk since then is a 409 with "changed on disk —
  reload", never a silent clobber. Localhost only, token-gated, paths confined
  to the repo. Revert restores the content the review was built from *in the
  editor only*, leaving it dirty — nothing reaches disk without a deliberate
  Save, so a mis-click costs nothing.
- **Notes that persist.** `alt-N` (or the editor's context menu) opens a note
  on the current line; served, notes go to `<store>/notes.json` and a markdown
  twin `<store>/notes.md`, so they survive a rebuild. "Copy notes" lifts them
  out for a PR comment.
- **Ticks that are a file, not a browser.** What has been read goes to
  `<store>/ticks.json` — so it survives a rebuild into a different scratchpad
  or onto a different port, two tabs on one review agree, and **you can read
  how far the reading has got** (`cat <store>/ticks.json`) rather than having
  to ask. Unserved, ticks fall back to localStorage keyed by review id.

`<store>` is `<the html's directory>/<review id>/`, and holds all four of
`ticks.json`, `notes.json`, `notes.md` and `token`. `serve.ts` prints it at
startup, and `build.ts` prints the id it derived. The id comes from the repo
and *what* is being reviewed (the commit, the pr number, the branch for a
working tree) rather than from where the html was written, so the same review
rebuilt tomorrow resumes; `--id` overrides it when two reviews of one scope
need to stay apart.

### Act on notes as they are written

A note is a request, not an archive entry. Do not wait to be asked, and do not
batch them up to the end of the review — the reviewer is sitting there, and a
note acted on while they are still on that file is worth ten acted on an hour
later.

When a note arrives, one of two things happens:

- **The ask is clear** ("move this into src/util/preact", "this should be a
  const", "drop this file from the change") — *make the edit now*, then say so
  in the thread:

  ```bash
  node .claude/skills/guided-review/reply.ts --notes <store>/notes.json \
    --path src/ui/useStableValue.ts --line 7 \
    --text "moved to src/util/preact/useStableValue.ts, import sites updated"
  ```

  The page notices within a couple of seconds: the file's diff reloads from
  disk, its `+N −M` updates, a toast says what happened, and your message
  appears in the reviewer's own note box. Don't ask permission for something
  already asked for, and don't wait for the end of the review to do it.

- **It needs discussion** — ask *in the thread*, with `--asking`, and keep it
  to the one question that unblocks you. The reviewer types their answer into
  the same box and it comes back to you through `awaitNotes.ts`. Only after
  that do you edit. Don't stop the review to ask in the terminal: they are
  reading the page, not the chat.

Say what you did in one line, not a paragraph — the note box is small and they
are mid-review.

Three ways notes reach you, in order of usefulness:

```bash
# blocks until a note is written, then prints it and exits - run in the background
node .claude/skills/guided-review/awaitNotes.ts --notes <store>/notes.json
```

- `awaitNotes.ts` finishing is what brings you back into the conversation. Run
  it in the background right after `serve.ts`; when it returns, act on what it
  printed, then run it again. It exits with "no new notes" after `--timeout`
  (default 30 min), so re-arm it then too.
- Every note also prints live in the server's own output:
  `note <path>:<line> <text>`.
- "Send notes to agent" in the header prints the lot between
  `=== N review note(s) handed off ===` markers and rewrites
  `<store>/notes.md` — the reviewer's "I'm done, over to you" signal. Tell
  them it is there.

If a note is ambiguous, ask about that one note rather than stopping the
review; the page keeps working while you talk.

Both are Monaco-only, and **Monaco comes from `serve.ts` itself** — it serves
its own `monaco-editor` install at `/vs` and refuses to start without it, so a
served review works fully offline (the page shows an *offline — notes queue
locally* chip and note threads say an agent will pick them up later, but
nothing stops working). Any static server will serve the page for reading,
but only `serve.ts` answers `/vs`, `/save` and `/notes`.

### Non-reachable mode (sandbox): send the file as-is

When `REACHABLE_FROM_INTERNET` is unset/falsy, the built `review.html` is
already a **single self-contained file** (font and ui runtime inlined, every
before/after and image embedded) that **branches at runtime** on
`window.__reviewServer`: only `serve.ts` injects that, so opened directly the
page is cleanly read-only — the per-line note-authoring UI never wires up (no
gutter `+` glyph, no `alt-N`/context-menu action, no view zones), and
Save/Revert/"Send notes to agent" stay hidden. **Code rows have no diffs
without a server**: Monaco is a dependency served only by `serve.ts`, and an
unserved code row states that plainly rather than degrading. Everything else
works: reading order, groups, blurbs, the contents sidebar and its draggable
split, per-file notes *text*, status chips, path/GitHub links, the image
compare viewers and their %-changed lines, and the ticks, per-file folding +
progress bar. There is nothing to strip and **no second build** — `build.ts`
in step 7 already bundled the page and wrote the finished HTML, and this mode
delivers exactly that file.

Deliver `<scratchpad>/review.html` to the reviewer:

- **`SendUserFile`** (`display: "render"`) is the default — they open it
  locally and tick through read-only (images in full; code rows say to serve
  for diffs). If they want to leave you feedback they paste it into the chat.
- **`Artifact`** instead when they want a **shareable link** for a teammate
  (see Publishing) — a hosted page rather than a file.

### Publishing, only when a port isn't an option

Reach for `Artifact` **only** where a local port can't be opened or reached —
a cloud sandbox, or a reviewer on another machine. Then publish
`review.html` directly (it is already read-only without a server behind it)
with a topic-fitting favicon and a one-sentence `description`; re-publishing
the same path keeps the URL.

Know what is given up: the artifact host's CSP allows same-origin connections
only, so a published page cannot reach `127.0.0.1` (nor any tunnel — the block
is `connect-src`, not the scheme, and Chrome's private-network rules would
refuse it besides). It is read-only by construction: no saving, notes fall
back to that browser's localStorage, and code rows have no diffs (Monaco only
comes from `serve.ts`) — a published review is for its prose, groups and
images.

## 9. Changing the page itself

Only when the page needs to look or behave differently — otherwise skip this
section entirely. Edit `src/` so every future review inherits the change. Load
the `artifact-design` skill before doing so. This is a utilitarian reference
tool, not an editorial page — polished typographic hierarchy and a real (small)
palette, no hero, no flourish.

### It is a preact app, built by vite

`src/` is a normal preact + tsx app on preact 11, bundled by `buildPage.ts`
(vite, library mode, `write: false`) into **one es module and one stylesheet as
strings**, which `build.ts` inlines into the page along with the font and the
payload json. Nothing is fetched at runtime but monaco, which comes only from
`serve.ts`'s own install at `/vs` — no cdn, no fallback renderer: a missing
monaco is reported as the failure it is, and an unserved page's code rows say
to serve the review.

- `pnpm exec tsc --noEmit` in the skill directory typechecks it; the whole
  app is typed, including a hand-written description of the parts of monaco's
  api the page uses (`src/monacoApi.ts`), since monaco arrives as a script
  global rather than a bundled import.
- The page is assembled in `build.ts`'s `page()`: charset, `<style>`, `#app`,
  the `<!--REVIEW_SERVER-->` marker, the payload, the module script. Every `<`
  in the payload is escaped to `\u003c` — a valid json escape the parser undoes
  for free — so a reviewed file quoting that marker, or a closing script tag,
  cannot break out of the block it is sitting in.
- `src/page.css` carries the whole stylesheet, with `FONT_B64` the one
  placeholder `build.ts` fills in.

Two shapes carry state between the parts:

- **`App` owns the reading state** — `ticked`, `collapsed`, `closedGroups`,
  `openDiffs`, `activeId` — and hands one `state` object down to the header,
  the sidebar and the groups. That single object is why a tick in the sidebar
  and a tick on a row are the same tick; don't add a second copy anywhere.
- **`makeStore`/`useStore`** for the things the *imperative* side owns — notes
  (written from monaco view zones and the server poll), toasts, and the
  inline/side-by-side choice (read by every monaco editor, mounted or not).
  Anything rendered from `notesStore` re-renders when a note lands, which is
  how the note counts appear in both the sidebar and the row heads.

Monaco stays imperative — it owns its dom. `createDiffEditor` builds one
editor and reports back through the setters `MonacoDiff` passes it, and note
zones are preact trees `render`ed into the zone's dom node.

### Palette: use the game's own

This project has a palette; use it rather than inventing one. The values
live in `src/_generated/palette/spritesheetPalette.json` (read it — it is
generated, so treat the file as the source of truth over the values quoted
here) and are exposed to the app as `paletteBlockstack`:

| name | hex | use in the review page |
| --- | --- | --- |
| `pureBlack` | `#000000` | dark-theme page ground |
| `shadow` | `#31413B` | dark-theme card ground, rules |
| `midGrey` | `#7C6E6C` | muted body text |
| `lightGrey` | `#C0AFA9` | light-theme rules, dark-theme body text |
| `white` | `#FFFFFF` | light-theme card ground |
| `metallicBlue` | `#1366D0` | light-theme accent: progress, links, step badges |
| `pastelBlue` | `#6CB5FF` | dark-theme accent |
| `moss` | `#AD9E00` | Modified chip; hunk headers |
| `replaceDark` / `replaceLight` | `#2EA17C` / `#3FDB8B` | New chip; added diff lines |
| `redShadow` / `midRed` | `#864E39` / `#E55F44` | Deleted chip; removed diff lines |
| `highlightBeige` | `#FFD097` | reserve for one emphasis, if anything needs it |

Take the light-theme page ground as white or a very slightly warm tint of
`lightGrey`, not a cream. Semantic status colour (New/Modified/Deleted)
stays distinct from the accent hue.

The game's own pixel font is 4KB at
`src/_generated/font/blockstack-head-over-heels.woff2` — inline it as a
`@font-face` data URI (`base64 -i <path>`) and use it for the display role
only (page title, step badges, the progress readout) at integer pixel
sizes. Body text stays in a system stack; paths and diffs in
`ui-monospace`.

### What the page already does — preserve it if you edit

- Sticky header: live progress bar and checked/total count, the Contents
  toggle, open-everything, close-everything, clear-ticks, and a **Diffs
  select** (inline / side by side).
- **A stack bar above the header row**, only when the shell knows a 2+-entry
  stack: every PR of the chain in order, the active review highlighted. A
  sibling the page carries is a button that **switches the whole page to that
  review in place** — `selectReview` reparses its inert payload block and the
  App remounts keyed by review, reloading that review's own notes and ticks
  and restarting the image sweep; a switch away from unsaved editor changes
  asks first. A sibling with no review is greyed with a forge ↗ link, plus an
  *awaiting review* chip when an instructions file was left for its agent.
  The bar lives inside `header.top`, so the measured `--header-height` — and
  everything sticky under it — already accounts for it.
- **A contents sidebar**, sticky beside the reading order: every group and
  every file as a tree, each with its own checkbox and `done/total`, the file
  ticks and the row ticks being the same state. Clicking a file opens its
  group and the file itself and scrolls to it; a scroll-spy keeps the file
  being read highlighted, suppressed for a second after a click so an explicit
  jump isn't overruled by the rows it travelled past. Under 60rem it becomes
  an overlay that starts closed and closes again once used.
- **The split between the two is draggable**, from `react-resizable-panels`
  (a react library, reached through `preact/compat` — `resolve.alias` in
  `buildPage.ts` and matching `paths` in `tsconfig.json` mean one preact
  renders both it and the page; two copies would leave its hooks with no
  renderer). Its three components take `className`, not `class`. The width
  persists under `autoSaveId`, per reader rather than per review.
  - `Layout` renders the `PanelGroup` **only in the docked case**. Overlaid
    (under 60rem) or with the contents closed there is nothing to divide, so
    it renders the plain flex `.layout` instead, and the same 60rem threshold
    drives the markup (`useContentsOverlays`) and the stylesheet.
  - The panels must not become scroll containers or the page would stop
    scrolling as one document: the group is `height: auto`, both panes are
    `overflow: visible`, and the handle is a full-height grab strip drawing
    the rule that used to be the sidebar's `border-right`.
  - Switching between the two layouts **remounts every row**, so the
    scroll-spy observer lives in `rowNodes.ts` and observes rows as they
    register rather than once at app mount.
- Each group opens by default, with a reading-order number (real structure
  here, unlike decorative 01/02/03 markers elsewhere), the blurb, and its file
  rows. Its heading is **sticky** under the page header (which is measured, so
  it survives the controls wrapping), and carries a checkbox that ticks the
  whole group, shows indeterminate when it is part-read, and folds the group
  away when ticked (unticking brings it back). That checkbox has to
  `stopPropagation`, or the heading's own toggle would fight it.
- Each row: a checkbox keyed by path — persisted to `<store>/ticks.json` when
  served and to `localStorage` (keyed by review id) when not, loaded before the
  first render either way, coalesced so ticking a group is one write, and
  re-read from the poll so a second tab agrees — a status chip, the path as a copy-to-clipboard button (plus a "GitHub ↗" link when
  `--github` was passed), its `+N −M`, and a caret. **Ticking a file folds it
  away** (unticking opens it again), so the page collapses towards the bare
  reading order as it is read, and a reload comes back folded exactly where
  the reading got to. The folded part holds the note and a **Show diff / Hide
  diff button** over a panel that starts closed — a real button, because the
  reading order has to stay scannable and the diff is an action taken when the
  reader arrives at that file.
- Diffs render lazily on first open (dozens of them would otherwise all build
  up front) and then **stay mounted, hidden**, when closed or folded away —
  disposing them would throw away unsaved edits every time a file was ticked.
  They render into a **Monaco diff editor**, loaded from jsdelivr: syntax
  highlighting per file extension, and `hideUnchangedRegions` so long files
  collapse to their changed parts — the reason for using an editor rather than
  a static patch. It is read-only, its language services' diagnostics are off
  (nothing here is being fixed, and it saves a multi-megabyte worker), its
  themes carry the page's own palette, and
  `scrollbar.alwaysConsumeMouseWheel: false` keeps the page scrolling when the
  pointer crosses an editor.
- **Image rows open a compare viewer instead of Monaco.** Its toolbar is a
  version chooser (one column per captured version — production/main/branch
  etc — radios above the labels pick the "from" side, below pick "to"; a
  version can't be both sides at once; byte-identical columns are greyed with
  a tooltip), a ⇄ swap, the mode strip **from | to | diff | swipe | flick**,
  an **overlay** checkbox that composites the magenta diff over the single
  version showing (from/to only — diff mode IS the overlay and swipe already
  shows the pair, so it disables there), **zoom diff** (frames the diff's bounding box),
  **fit**, and a px/% readout (the version label currently on screen, in
  flick mode). **Flick** alternates the from/to layers every 600ms instead of
  showing both at once — a real difference reads as motion, easier to catch
  than a static overlay for small or subtle diffs. Diffs are computed in the
  page via canvas — magenta on transparent over the union extent,
  out-of-bounds pixels counted as differing — and memoised per pair.
- **The viewer's stage pans and zooms freely.** Pointer drag pans (in swipe
  mode a drag starting within 24px of the divider moves the divider instead —
  anywhere else still pans); two-finger pinch zooms; double-tap resets to fit;
  ctrl/⌘-wheel zooms at the cursor (macOS trackpad pinch arrives exactly so);
  other wheel input is split by heuristic — line/page deltas or coarse
  single-axis pixel steps read as a mouse wheel and zoom, fine or two-axis
  deltas read as a trackpad and pan, with a 400ms momentum window so a flick's
  tail can't flip to zooming. The wheel listener is non-passive on a
  `touch-action: none` viewport, or none of that could preventDefault.
- **Each image row carries a mechanical summary line** — `WxH — N% of pixels
  differ (Npx)` — computed by a background sweep after first paint, one image
  at a time, its pixel data released as it moves on. Image bytes live in one
  inert `<script type="application/json">` block per image, parsed only when
  that row needs them — the payload and the executable script stay small,
  which is what keeps phone webviews rendering the page at all.
- **Image notes are file-anchored.** No lines to hang a note on, so a served
  image row has an Add note button opening the same thread UI as a line note,
  stored at line 0; `reply.ts --line 0` answers it and the markdown twin shows
  it as `L0`.
- **Inline or side by side** is the header's Diffs select, applied to every
  editor at once — `diffViewStore` is read when an editor is built and
  subscribed to for the ones already on screen, and remembered in
  localStorage per reader. Side by side needs asking for **twice**:
  `renderSideBySide: true` alone does nothing in a pane this narrow, because
  monaco's `useInlineViewWhenSpaceIsLimited` drops back to the inline view
  below ~900px on its own. Both go in `sideBySideOptions`.
- **Monaco is a dependency, not an enhancement.** It is served only from the
  review server's own `monaco-editor` install at `/vs` (which is why served
  reviews work fully offline); `serve.ts` refuses to start without it. There
  is no cdn and no plain-text fallback renderer — a load failure renders as
  an error block in the diff's place, and a page opened without a server says
  its code rows need one. An **offline chip** appears in the header when the
  network goes (with note threads switching to "an agent will pick this up
  later") — notes always persisted server-side, so offline only changes the
  messaging, not the behaviour.
- Both themes via the artifact-design token pattern: `:root`, the
  `prefers-color-scheme` media query, and both `data-theme` overrides. Monaco
  is re-themed from both signals.
- `<meta charset="utf-8">` is the first line the page is assembled from, and
  `build.ts` reads and writes utf-8 explicitly — without both, `file://` opens
  guess windows-1252 and every dash and arrow in the prose turns to mojibake.
- Served, each editor also carries Revert (restore the build-time content into
  the buffer, never straight to disk) and the header carries "Send notes to
  agent"; both are hidden when opened without a server, where there is
  nothing to write to.
- **Two settings make `.tsx` legible**, and without either the file fills with
  `'>' expected`: `jsx: JsxEmit.Preserve` in the typescript defaults' compiler
  options, and model URIs that carry the real path — TypeScript picks its
  script kind from the file extension, so an extensionless `inmemory://` uri
  parses every tag as a type assertion. The two sides need distinct uris.
- Adding a note is a **`+` in the gutter of the hovered line** (a decoration
  set from `onMouseMove`, opened from `onMouseDown` when the target type is
  `GUTTER_GLYPH_MARGIN`), because a keyboard shortcut alone is not
  discoverable. `alt-N` and the context menu still work.
- A note is a **thread**, not a string: `{line, messages: [{from, text}]}`,
  with the original single-`text` shape read as its first message. The zone
  shows the conversation and a Reply box; the agent's side arrives through
  `reply.ts`. Everything that reads notes must tolerate both shapes and a
  half-written file — a note file is written while it is being read.
- A note zone has two states: a textarea while it is being written or replied
  to, then the thread with Reply/Delete. Without that change of state, saving
  looks like it did nothing — the zone is torn down and rebuilt identically.
- Served, the page **polls `/state` every 2s** with the paths of its open
  editors. A file whose sha moved on disk is reloaded through `/file` (unless
  that editor has unsaved edits, which win), its counts update, and a toast
  fires; new agent messages toast too. That is how an edit you make in
  response to a note shows up without anyone reloading anything.
- `serve.ts` answers `/favicon.ico` with a 204: the browser asks unprompted,
  and a 404 would put an error in the console of every review for something
  the page never wanted.
- The write token is **stored beside the review and reused across restarts**.
  It exists only to stop another page in the browser posting to the port behind
  the reviewer's back; minting a fresh one per run would silently break every
  tab left open, and losing notes is far worse than the thing it guards.
- `do_POST` reads the request body **before** deciding anything, including
  auth. Refusing a request without draining it leaves its json in the socket,
  and the next request on that keep-alive connection is parsed starting halfway
  through it — which surfaces as a baffling `400 Bad request syntax` naming
  your own note text.
- Notes live in Monaco view zones. Four things about zones are easy to lose:
  they paint *below* the editor's text layer (so the note needs
  `position: relative; z-index`, or its buttons are unclickable); they need
  `suppressMouseDown: false` or the editor eats the mousedown first; monaco
  writes an inline `display` onto the zone's own dom node, so the note's
  layout has to live on a wrapper *inside* it; and monaco puts that node into
  the document on its own render frame rather than when the zone is added, so
  focusing the new note's box has to be retried across frames until it takes
  (a zone inside a folded unchanged region never will — it is `display: none`,
  and an element that isn't displayed cannot be focused).
  Zone contents also sit inside an `aria-hidden` subtree, so the note UI is
  mouse/keyboard-driven and not reachable by role queries.
- The page adapts to `window.__reviewServer`, which only `serve.ts` injects
  (into the `<!--REVIEW_SERVER-->` marker). It gates the whole
  note-authoring/collaboration surface, not just Save/Revert/handoff: the
  gutter `+` glyph, the `alt-N`/context-menu action, and the view-zone note
  editors only wire up when it is present, so an opened-without-a-server page
  is fully read-only. Keep that marker in the template and keep both branches
  working — the same file serves both the shareable, standalone form and the
  working, served form.
