import { notesStore } from "../notes.ts";
import { filesInGroup, groups } from "../payload.ts";
import { type ReadingState } from "../readingState.ts";
import { useStore } from "../stores.ts";
import { TreeFileRow } from "./TreeFileRow.tsx";

export type GuidedOrderProps = { state: ReadingState };

/** the reading order authored into the review: every group in order, each
    with its files in the order to read them - the default contents view */
export const GuidedOrder = ({ state }: GuidedOrderProps) => {
  const notes = useStore(notesStore);

  return (
    <ol class="tree">
      {groups.map((group, index) => {
        const files = filesInGroup(index);
        const done = files.filter((file) => state.ticked.has(file.path)).length;
        return (
          <li class="tree-group" key={index}>
            <div class="tree-group-head">
              <input
                class="tick small"
                type="checkbox"
                checked={done === files.length}
                indeterminate={done > 0 && done < files.length}
                aria-label={`Tick every file in ${group.title}`}
                onChange={(event) => state.tickGroup(index, event.currentTarget.checked)}
              />
              <button
                type="button"
                class="tree-group-title"
                title={group.title}
                onClick={() => state.goTo(files[0])}
              >
                Chapter {index + 1}: {group.title}
              </button>
              <span class="tree-count">
                {done}/{files.length}
              </span>
            </div>
            <ul class="tree-files">
              {files.map((file) => (
                <TreeFileRow
                  key={file.id}
                  file={file}
                  state={state}
                  noted={(notes[file.path] ?? []).length}
                  showDir
                />
              ))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
};
