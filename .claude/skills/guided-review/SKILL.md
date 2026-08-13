---
name: guided-review
description: Build an ordered, locally-served HTML reading order for a large commit, PR or working tree, grouped by theme, with each file's diff inline in an editable Monaco editor and per-line review notes. Use when a commit/PR is too large to read file-by-file in git-log order and the user wants a guided path through it.
---

# Guided review

Produces a single HTML page, **served locally**: a reading order over every
non-binary file in a commit/PR/working tree, grouped by theme (not a strict
topological sort — group similar work together even where that means bending
dependency order), with a short note per file, that file's **diff embedded
inline**, and a checkbox that persists via localStorage. The page is the whole
review: nothing has to be opened elsewhere to read the change.

Serve it (step 8) rather than publishing it. A served page can be edited and
saved back to the working tree and can keep its notes in a file; a published
artifact is sealed behind a CSP that blocks it from reaching any endpoint,
including localhost, so it can only ever be read. Publish only when there is
no way to open a local port — a sandbox, or someone else's machine.

Use when a change is large enough (dozens of files) that reading it in
diff/alphabetical order would lose the thread.

**Almost all of this is scripted.** The skill ships three files, and the only
part needing judgement is the middle one:

| file | does |
| --- | --- |
| `resolvePr.sh` | a PR number/branch/url → the local refs to diff, fetched (forks included) |
| `changedFiles.sh` | the scope's file list as `STATUS<TAB>PATH`, binaries dropped |
| *(you)* | author a groups json: the grouping, the order, the per-file notes |
| `build.py` | collects every diff *and* each file's whole before/after, strips/truncates/escapes, computes GitHub anchors, inlines the font, writes the finished HTML |
| `template.html` | the page itself — palette, layout, diff rendering, notes, checkboxes |
| `serve.py` | serves the built page — how a review is normally delivered; its editors become editable and save back to the working tree |
| `awaitNotes.py` | blocks until the reviewer writes a note, so you come back and act on it while they are still reading |
| `reply.py` | answers a note in its own thread — what you did, or the one question you need answered |

Read the scripts' own `--help`/header comments rather than re-deriving what
they do. Don't hand-assemble HTML or paste diff text; if the page needs a
change, change `template.html` so the next review gets it too.

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
`number` to `build.py --pr` so the per-file links land on the right page.

For whole-PR mode, every following step's "the diff" means the three-dot
range `<base>...<head>` (merge-base diff — matches what GitHub shows), never
a single commit's SHA even if you found one via `git log`.

Starting from a SHA, it is worth checking whether a PR covers it
(`gh pr list --search "<sha or distinctive title words>" --state all --json number,title,url`):
if one does, review the PR rather than the commit, since that is what a
reviewer is being asked about.

## 2. Get the exact file list and status

```bash
.claude/skills/guided-review/changedFiles.sh worktree
.claude/skills/guided-review/changedFiles.sh commit <sha>
.claude/skills/guided-review/changedFiles.sh pr origin/<base> origin/<head>
```

It prints `STATUS<TAB>PATH`, uses the three-dot range for PR mode (diffing
against the merge base, matching GitHub's view — two-dot would drag in
unrelated commits that landed on the base branch since the fork), maps
untracked `??` to `A`, and drops binaries (images, fonts, audio, archives),
which have no readable diff.

Keep the status column per file — it drives the New/Modified/Deleted/Renamed
badge, and tells `build.py` which files need diffing against `/dev/null`.

## 3. Per-file links to the forge

`build.py` derives these from the `origin` remote, so there is normally
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

## 4. Diff capture is `build.py`'s job

It runs the right command per file for the mode (`git show`, three-dot
`git diff`, or `--no-index /dev/null` for untracked files), strips everything
before the first `@@` hunk, counts `+`/`−`, truncates past
`--max-diff-lines` (default 400) with a note saying how many lines were
dropped, escapes for HTML, and neutralises any literal `</script>` inside a
diff. It prints the file count, line totals and the finished size — a few
hundred KiB is normal; if it runs to megabytes something belongs in
`--max-diff-lines`/`--max-side-lines` territory, and it must stay under 16MB
if it is ever going to be published — and warns on any file whose diff came
back empty (usually a stale path in your groups json).

It also captures each file's **whole before and after** (`git show <rev>:<path>`
either side, the working copy for the "after" in working-tree mode), which is
what the page's Monaco diff editor works from — it computes and folds the diff
itself rather than being handed a patch. Files longer than `--max-side-lines`
(default 2000) keep only their patch, and fall back to the plain renderer.

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
python3 .claude/skills/guided-review/build.py \
  --groups <scratchpad>/review.json \
  --out <scratchpad>/review.html \
  --mode worktree
  # a commit:  --mode commit --ref <sha>
  # a pr:      --mode pr --base <base> --head <head> --pr <n>   (refs from resolvePr.sh)
```

Then serve it (step 8) and hand over that URL. Rebuild and refresh to iterate;
`build.py` overwrites in place, so the server keeps serving the newest build
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
python3 .claude/skills/guided-review/serve.py --html <scratchpad>/review.html --repo . --open
```

It prints a `http://127.0.0.1:<port>/` — hand that over as the review. Run it
in the background so the session isn't blocked, and say which port it's on.
Serving buys two things a file (or a published page) can't have:

- **Editable diffs.** The modified side of each Monaco editor becomes writable
  and grows Save and Revert. Every save carries the sha256 the page was built
  from; a file that moved on disk since then is a 409 with "changed on disk —
  reload", never a silent clobber. Localhost only, token-gated, paths confined
  to the repo. Revert restores the content the review was built from *in the
  editor only*, leaving it dirty — nothing reaches disk without a deliberate
  Save, so a mis-click costs nothing.
- **Notes that persist.** `alt-N` (or the editor's context menu) opens a note
  on the current line; served, notes go to `<review>.notes.json` and a
  markdown twin `<review>.notes.md` beside the html, so they survive a
  rebuild. "Copy notes" lifts them out for a PR comment.

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
  python3 .claude/skills/guided-review/reply.py --notes <review>.notes.json \
    --path src/ui/useStableValue.ts --line 7 \
    --text "moved to src/util/preact/useStableValue.ts, import sites updated"
  ```

  The page notices within a couple of seconds: the file's diff reloads from
  disk, its `+N −M` updates, a toast says what happened, and your message
  appears in the reviewer's own note box. Don't ask permission for something
  already asked for, and don't wait for the end of the review to do it.

- **It needs discussion** — ask *in the thread*, with `--asking`, and keep it
  to the one question that unblocks you. The reviewer types their answer into
  the same box and it comes back to you through `awaitNotes.py`. Only after
  that do you edit. Don't stop the review to ask in the terminal: they are
  reading the page, not the chat.

Say what you did in one line, not a paragraph — the note box is small and they
are mid-review.

Three ways notes reach you, in order of usefulness:

```bash
# blocks until a note is written, then prints it and exits - run in the background
python3 .claude/skills/guided-review/awaitNotes.py --notes <review>.notes.json
```

- `awaitNotes.py` finishing is what brings you back into the conversation. Run
  it in the background right after `serve.py`; when it returns, act on what it
  printed, then run it again. It exits with "no new notes" after `--timeout`
  (default 30 min), so re-arm it then too.
- Every note also prints live in the server's own output:
  `note <path>:<line> <text>`.
- "Send notes to agent" in the header prints the lot between
  `=== N review note(s) handed off ===` markers and rewrites
  `<review>.notes.md` — the reviewer's "I'm done, over to you" signal. Tell
  them it is there.

If a note is ambiguous, ask about that one note rather than stopping the
review; the page keeps working while you talk.

Both are Monaco-only: without the CDN there is no editor to hang them off.
Any static server (`vite preview`, `python3 -m http.server`) will serve the
page for reading, but only `serve.py` answers `/save` and `/notes`.

### Non-reachable mode (sandbox): send the file as-is

When `REACHABLE_FROM_INTERNET` is unset/falsy, the built `review.html` is
already a **single self-contained file** (font inlined, every diff and
before/after embedded, Monaco pulled from the CDN at runtime) that **branches
at runtime** on `window.__reviewServer`: only `serve.py` injects that, so
opened directly the page is cleanly read-only — the per-line note-authoring
UI never wires up (no gutter `+` glyph, no `alt-N`/context-menu action, no
view zones), and Save/Revert/"Send notes to agent" stay hidden. Everything
else works the same as served: reading order, groups, blurbs, per-file notes
*text*, status chips, path/GitHub links, the Monaco diffs (with the plain
fallback for offline/CSP), and the checkboxes + progress bar. There is
nothing to strip and **no separate file to build** — `build.py` in step 7
already produced the finished HTML, and this mode delivers exactly that.
**Do not `vite build` anything** — the page is not a vite/node project.

Deliver `<scratchpad>/review.html` to the reviewer:

- **`SendUserFile`** (`display: "render"`) is the default — they open it
  locally, get the full Monaco editor from the CDN, and tick their way
  through read-only. If they want to leave you feedback they paste it into
  the chat.
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
refuse it besides). It is read-only by construction: no saving, and notes fall
back to that browser's localStorage. It also can't load Monaco from the CDN, so
diffs render through the plain fallback.

## 9. Changing the page itself

Only when the page needs to look or behave differently — otherwise skip this
section entirely. Edit `template.html` (it takes two placeholders,
`FONT_B64` and `PAYLOAD_JSON`, and reads
`{meta, groups, diffs, stats, links}` out of the payload) so every future
review inherits the change. Load the `artifact-design` skill before doing so.
This is a utilitarian reference tool, not an editorial page — polished
typographic hierarchy and a real (small) palette, no hero, no flourish.

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

### What the template already does — preserve it if you edit

- Sticky header: live progress bar and checked/total count, open-all-diffs,
  close-all, clear-ticks.
- Each group a `<details>` open by default, with a reading-order number (real
  structure here, unlike decorative 01/02/03 markers elsewhere), the blurb,
  and its file rows. Its heading is **sticky** under the page header (which is
  measured, so it survives the controls wrapping), and carries a checkbox that
  ticks the whole group, shows indeterminate when it is part-read, and folds
  the group away when ticked (unticking brings it back). That checkbox has to
  `stopPropagation`, or the summary's own toggle would fight it.
- Each row: a checkbox persisted to `localStorage` keyed by path, a status
  chip, the path as a copy-to-clipboard button (plus a "GitHub ↗" link when
  `--github` was passed), the note, and a **Show diff / Hide diff button**
  carrying `+N −M` over a panel that starts closed — a real button, because
  the reading order has to stay scannable and the diff is an action taken when
  the reader arrives at that file.
- Diffs render lazily on first open (dozens of them would otherwise all build
  up front) into a **Monaco diff editor**, loaded from jsdelivr: syntax
  highlighting per file extension, an inline (unified) view, and
  `hideUnchangedRegions` so long files collapse to their changed parts — the
  reason for using an editor rather than a static patch. It is read-only, its
  language services' diagnostics are off (nothing here is being fixed, and it
  saves a multi-megabyte worker), its themes carry the page's own palette, and
  `scrollbar.alwaysConsumeMouseWheel: false` keeps the page scrolling when the
  pointer crosses an editor.
- **The CDN fails gracefully.** Offline, or published (where the host's CSP
  blocks external scripts), Monaco never arrives; the loader rejects on
  `error` or a 6s timeout and every diff renders through the plain fallback
  instead — a `<pre>` in its own `overflow-x: auto` container,
  coloured per line off the first character with a left border *and* a
  low-alpha background so lines stay distinguishable in both themes and for
  colour-blind readers. Locally-opened builds get the full editor. Don't
  "fix" one of these paths by deleting the other.
- Both themes via the artifact-design token pattern: `:root`, the
  `prefers-color-scheme` media query, and both `data-theme` overrides. Monaco
  is re-themed from both signals.
- `<meta charset="utf-8">` is the first line of the template, and `build.py`
  reads and writes utf-8 explicitly — without both, `file://` opens guess
  windows-1252 and every dash and arrow in the prose turns to mojibake.
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
  `reply.py`. Everything that reads notes must tolerate both shapes and a
  half-written file — a note file is written while it is being read.
- A note zone has two states: a textarea while it is being written or replied
  to, then the thread with Reply/Delete. Without that change of state, saving
  looks like it did nothing — the zone is torn down and rebuilt identically.
- Served, the page **polls `/state` every 2s** with the paths of its open
  editors. A file whose sha moved on disk is reloaded through `/file` (unless
  that editor has unsaved edits, which win), its counts update, and a toast
  fires; new agent messages toast too. That is how an edit you make in
  response to a note shows up without anyone reloading anything.
- `serve.py` sets `sys.stdout.reconfigure(line_buffering=True)`: run in the
  background its stdout is a pipe, which python block-buffers, so notes and
  request lines would sit unseen in the buffer until it exited.
- The write token is **stored beside the review and reused across restarts**.
  It exists only to stop another page in the browser posting to the port behind
  the reviewer's back; minting a fresh one per run would silently break every
  tab left open, and losing notes is far worse than the thing it guards.
- `do_POST` reads the request body **before** deciding anything, including
  auth. Refusing a request without draining it leaves its json in the socket,
  and the next request on that keep-alive connection is parsed starting halfway
  through it — which surfaces as a baffling `400 Bad request syntax` naming
  your own note text.
- Notes live in Monaco view zones. Two things about zones are easy to lose:
  they paint *below* the editor's text layer (so the note needs
  `position: relative; z-index`, or its buttons are unclickable), and they
  need `suppressMouseDown: false` or the editor eats the mousedown first.
  Their contents also sit inside an `aria-hidden` subtree, so the note UI is
  mouse/keyboard-driven and not reachable by role queries.
- The page adapts to `window.__reviewServer`, which only `serve.py` injects
  (into the `<!--REVIEW_SERVER-->` marker). It gates the whole
  note-authoring/collaboration surface, not just Save/Revert/handoff: the
  gutter `+` glyph, the `alt-N`/context-menu action, and the view-zone note
  editors only wire up when it is present, so an opened-without-a-server page
  is fully read-only. Keep that marker in the template and keep both branches
  working — the same file serves both the shareable, standalone form and the
  working, served form.
