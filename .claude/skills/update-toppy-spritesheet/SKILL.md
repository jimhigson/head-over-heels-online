---
name: update-toppy-spritesheet
description: Update the Toppy spritesheet from a downloaded PNG. Use when the user has downloaded a new spritesToppy.png to ~/Downloads and wants to integrate it into the codebase.
---

Update the Toppy spritesheet from a new PNG that the artist has provided (usually downloaded from Discord to ~/Downloads).

## Steps

### 0. Freshness check

Verify the downloaded file is newer than what's already committed:

```bash
# get modification time of the download
stat -f %m ~/Downloads/spritesToppy.png

# get the commit date of the current webp in epoch seconds
git log -1 --format="%ct" -- gfx/spritesToppy.webp
```

Compare the two epoch timestamps. If the download is older than or equal to the last commit, stop and tell the user — they may have an outdated file.

### 1. Create a branch

Ask the user whether to work in a new worktree or a new branch in the current directory. Name the branch `toppy-spritesheet-DDMMYYYY` using today's date.

**Worktree:**
```bash
git fetch
git worktree add /Users/jim/dev/hohjs.worktrees/toppy-spritesheet-DDMMYYYY -b toppy-spritesheet-DDMMYYYY origin/main
```
Then `cd` into the worktree and install dependencies:
```bash
pnpm i
```

**Branch in current directory:**
```bash
git fetch
git switch -c toppy-spritesheet-DDMMYYYY origin/main
```

### 2. Copy PNG into the repo

The user will typically have already copied the file to `gfx/spritesToppy.png`. Verify it's there:

```bash
ls -la gfx/spritesToppy.png
```

If not, ask the user to copy it (the sandbox can't read ~/Downloads):
```
! cp ~/Downloads/spritesToppy.png gfx/spritesToppy.png
```

### 3. Convert PNG to WebP

```bash
pnpm toppySpritesheet toFinal --from png
```

Verify the output:

```bash
ls -la gfx/spritesToppy.webp
```

### 4. Optimise and clean up

Run the optimiser, then delete the temporary PNG (it's not committed):

```bash
pnpm toppySpritesheet optimise
rm gfx/spritesToppy.png
```

### 5. Check file size delta vs git

Compare the new WebP against the committed version:

```bash
git show HEAD:gfx/spritesToppy.webp | wc -c   # old size
wc -c < gfx/spritesToppy.webp                  # new size
```

If the new file is more than 1% larger, report this to the user before continuing — something may have changed in the palette or encoding.

### 6. Build and update visual regression snapshots

First build the game in visual-regression mode, then run only the sprite-related snapshot tests with toppy-only filtering:

```bash
pnpm build:game --mode visual-regression

NO_BLOCKSTACK=1 NO_UNCOLOURISED=1 pnpm playwright test --update-snapshots all \
  e2e/roomSnapshots.spec.ts \
  e2e/menuSnapshotsDialogs.spec.ts \
  e2e/menuSnapshotsInGame.spec.ts \
  e2e/menuSnapshotsMainMenu.spec.ts \
  e2e/settingsReflectInGame.spec.ts
```

The env vars `NO_BLOCKSTACK=1 NO_UNCOLOURISED=1` filter to toppy-only snapshots. The 5 test files listed are the only ones that produce sprite-variant screenshots — this avoids re-running unrelated e2e tests.

After the run, count changed files and report to the user:

```bash
git diff --name-only -- '*.png' | wc -l
```

### 7. Report pixel diffs to the user

Use ImageMagick to compare each changed snapshot against its git version, then present a deduplicated summary (one row per unique snapshot, not per browser):

```bash
git diff --name-only -- '*.png' | while read -r f; do
  ae=$(magick compare -metric AE <(git show "HEAD:$f") "$f" /dev/null 2>&1 | awk '{print $1}')
  echo "$ae $f"
done > /tmp/toppy-diff-pixels.txt
```

Then generate a markdown summary and table:

```bash
awk '{
  pixels = $1; n = split($2, p, "/"); fname = p[n]
  if (!(fname in seen)) { seen[fname] = pixels; total++ }
}
END {
  for (f in seen) { n++; px[n] = seen[f]; fn[n] = f }
  for (i = 1; i <= n; i++)
    for (j = i+1; j <= n; j++)
      if (px[j] > px[i]) { t=px[i]; px[i]=px[j]; px[j]=t; t=fn[i]; fn[i]=fn[j]; fn[j]=t }
  printf "| Pixels changed | Snapshot |\n"
  printf "|---------------:|:---------|\n"
  for (i = 1; i <= n; i++)
    printf "| %d | %s |\n", px[i], fn[i]
}' /tmp/toppy-diff-pixels.txt
```

Present the table to the user with a short description: how many unique snapshots changed, total file count, largest diff, and whether the diffs look consistent with minor sprite tweaks or suggest something unexpected. Ask if they'd like to review before proceeding.

### 8. Commit and raise PR

Stage the webp and all toppy snapshot PNGs:

```bash
git add gfx/spritesToppy.webp
git add e2e/**/*-toppy.png
```

Commit with today's date:

```bash
git commit -m "sprite: updated toppy spritesheet DD/MM/YYYY"
```

Push and create a PR:

```bash
git push -u origin <branch-name>
gh pr create -f
```
