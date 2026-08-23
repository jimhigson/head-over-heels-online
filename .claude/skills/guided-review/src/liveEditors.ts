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
  /** loads disk content into the editor unconditionally - the caller decides
      whether discarding any unsaved edit is the right call first */
  applyFromDisk: (file: FileFromDisk) => void;
  /** writes the editor's current (possibly unsaved) content to disk, adopting
      the given file's sha as the base - how the reader's edit wins over a
      conflicting change made elsewhere */
  overwriteDiskWith: (file: FileFromDisk) => void;
  /** unsaved edits - a review switch would lose them, so it asks first */
  isDirty: () => boolean;
};

export const liveEditors = new Map<string, LiveEditor>();
