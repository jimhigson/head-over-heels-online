/* the one flow for "the file being edited here changed on disk too" - reached
   either when the poll notices it, or when a save collides with it. Reload
   local discards the edit in favour of what's on disk; overwrite on disk
   keeps the edit and adopts disk's sha, so the next save lands cleanly.
   At most one toast per path: the same sha seen again is a no-op, but a
   disk that has moved on again (eg the file is being edited outside this
   page too) replaces the still-unresolved toast rather than stacking
   another one beside it. */

import { type FileFromDisk } from "./liveEditors.ts";
import { dismissToast, toast } from "./stores.ts";

export type ConflictResolver = {
  applyFromDisk: (file: FileFromDisk) => void;
  overwriteDiskWith: (file: FileFromDisk) => void;
};

const activeConflicts = new Map<string, { sha: string; toastId: number }>();

export const notifyDiskConflict = (
  path: string,
  fresh: FileFromDisk,
  editor: ConflictResolver,
): void => {
  const existing = activeConflicts.get(path);
  if (existing?.sha === fresh.sha) {
    return;
  }
  if (existing !== undefined) {
    dismissToast(existing.toastId);
  }

  const resolved = () => activeConflicts.delete(path);

  const toastId = toast(`${path} edited locally, changed on disk`, "warn", [
    {
      label: "Reload local",
      onClick() {
        editor.applyFromDisk(fresh);
        resolved();
      },
    },
    {
      label: "Overwrite on disk",
      onClick() {
        editor.overwriteDiskWith(fresh);
        resolved();
      },
    },
  ]);
  activeConflicts.set(path, { sha: fresh.sha, toastId });
};
