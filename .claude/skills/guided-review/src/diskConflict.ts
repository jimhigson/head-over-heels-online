/* the one flow for "the file being edited here changed on disk too" - reached
   either when the poll notices it, or when a save collides with it. Reload
   local discards the edit in favour of what's on disk; overwrite on disk
   keeps the edit and adopts disk's sha, so the next save lands cleanly.
   Deduped per path so an unresolved conflict is stated once, not on every
   poll tick until it's dealt with. */

import { type FileFromDisk } from "./liveEditors.ts";
import { toast } from "./stores.ts";

export type ConflictResolver = {
  applyFromDisk: (file: FileFromDisk) => void;
  overwriteDiskWith: (file: FileFromDisk) => void;
};

const warnedAboutSha = new Map<string, string>();

export const notifyDiskConflict = (
  path: string,
  fresh: FileFromDisk,
  editor: ConflictResolver,
): void => {
  if (warnedAboutSha.get(path) === fresh.sha) {
    return;
  }
  warnedAboutSha.set(path, fresh.sha);

  const resolved = () => warnedAboutSha.delete(path);

  toast(`${path} edited locally, changed on disk`, "warn", [
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
};
