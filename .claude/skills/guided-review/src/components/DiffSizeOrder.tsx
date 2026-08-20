import { sortByDiffSize } from "../diffSizeOrder.ts";
import { notesStore } from "../notes.ts";
import { files } from "../payload.ts";
import { type ReadingState } from "../readingState.ts";
import { useStore } from "../stores.ts";
import { TreeFileRow } from "./TreeFileRow.tsx";

export type DiffSizeOrderProps = { state: ReadingState };

/** every file flattened and sorted by how much changed - biggest first,
    images at the top since they have no line count to sort by */
export const DiffSizeOrder = ({ state }: DiffSizeOrderProps) => {
  const notes = useStore(notesStore);
  const ordered = sortByDiffSize(files);

  return (
    <ul class="tree tree-flat">
      {ordered.map((file) => (
        <TreeFileRow
          key={file.id}
          file={file}
          state={state}
          noted={(notes[file.path] ?? []).length}
          showDir
        />
      ))}
    </ul>
  );
};
