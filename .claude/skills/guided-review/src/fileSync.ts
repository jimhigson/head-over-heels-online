/* keeps every file's payload snapshot (sides, stats) in step with disk -
   independent of whether a panel for it is open. A path with a live editor
   gets reconciled directly against it (loaded content swapped in, or a
   conflict raised); a path with no editor open has no model to reconcile
   into, so its baked-in snapshot is refreshed silently instead - opening it
   later then starts from disk, never from whatever the review was built
   from, and never hits a save conflict against a sha nobody asked about. */

import { notifyDiskConflict } from "./diskConflict.ts";
import { type FileFromDisk, liveEditors } from "./liveEditors.ts";
import { reviewId, server, sides, stats } from "./payload.ts";
import { toastFileUpdated } from "./stores.ts";

/** every path this review carries a text diff for - what the poll asks about */
export const trackedPaths = (): string[] => Object.keys(sides);

export const fetchFileFromDisk = (path: string): Promise<FileFromDisk | undefined> => {
  if (server === undefined) {
    return Promise.resolve(undefined);
  }
  return fetch(`/file?review=${encodeURIComponent(reviewId)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Review-Token": server.token },
    body: JSON.stringify({ path }),
  })
    .then((response) => response.json() as Promise<FileFromDisk>)
    .catch(() => undefined);
};

export const reconcileFiles = async (
  onDisk: Record<string, { sha: string; added: number; removed: number }>,
): Promise<void> => {
  for (const [path, file] of Object.entries(onDisk)) {
    const editor = liveEditors.get(path);
    const knownSha = editor?.sha() ?? sides[path]?.sha;
    if (knownSha === undefined || file.sha === knownSha) {
      continue;
    }
    const fresh = await fetchFileFromDisk(path);
    if (fresh === undefined) {
      continue;
    }

    if (editor === undefined) {
      const side = sides[path];
      if (side !== undefined) {
        sides[path] = { ...side, after: fresh.after, sha: fresh.sha };
        stats[path] = [fresh.added, fresh.removed];
      }
      continue;
    }
    if (editor.isDirty()) {
      notifyDiskConflict(path, fresh, editor);
      continue;
    }
    editor.applyFromDisk(fresh);
    toastFileUpdated(path);
  }
};
