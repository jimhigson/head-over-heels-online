/* the diff editors currently on the page, so the poll can update them: when an
   agent acts on a note the diff catches up on its own rather than going quietly
   out of date */

export type FileFromDisk = {
  after: string;
  sha: string;
  added: number;
  removed: number;
};

export type LiveEditor = {
  sha: () => string;
  refreshNotes: () => void;
  applyFromDisk: (file: FileFromDisk) => void;
};

export const liveEditors = new Map<string, LiveEditor>();
