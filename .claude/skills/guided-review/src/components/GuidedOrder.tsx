import { useState } from "preact/hooks";

import { notesStore } from "../notes.ts";
import { runsByPath } from "../pathRuns.ts";
import { filesInGroup, groups } from "../payload.ts";
import { type ReadingState } from "../readingState.ts";
import { useStore } from "../stores.ts";
import { TreeFileRow } from "./TreeFileRow.tsx";

export type GuidedOrderProps = { state: ReadingState };

/** the reading order authored into the review: every group in order, each
    with its files in the order to read them - the default contents view */
export const GuidedOrder = ({ state }: GuidedOrderProps) => {
  const notes = useStore(notesStore);
  // a chapter's file list defaults to open, then closed the moment every file
  // in it is ticked - but only until the reader overrides it with the caret,
  // which then sticks regardless of what ticking does afterward
  const [openOverride, setOpenOverride] = useState<Map<number, boolean>>(new Map());

  return (
    <ol class="tree">
      {groups.map((group, index) => {
        const files = filesInGroup(index);
        const done = files.filter((file) => state.ticked.has(file.path)).length;
        const fullyTicked = done === files.length;
        const open = openOverride.get(index) ?? !fullyTicked;
        return (
          <li class="tree-group" key={index}>
            <div class="tree-group-head">
              <input
                class="tick small"
                type="checkbox"
                checked={fullyTicked}
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
              <button
                type="button"
                class="caret"
                aria-expanded={open}
                aria-label={open ? "Collapse this chapter" : "Expand this chapter"}
                onClick={() =>
                  setOpenOverride((previous) => new Map(previous).set(index, !open))
                }
              >
                {open ? "▾" : "▸"}
              </button>
            </div>
            {open && (
              <ul class="tree-files">
                {runsByPath(files).flatMap((run, runIndex) => [
                  run.path === "" ? null : (
                    <li class="tree-path-heading" title={run.path} key={`path-${runIndex}`}>
                      <span>{run.path}/</span>
                    </li>
                  ),
                  ...run.files.map((file) => (
                    <TreeFileRow
                      key={file.id}
                      file={file}
                      state={state}
                      noted={(notes[file.path] ?? []).length}
                      showDir={false}
                    />
                  )),
                ])}
              </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
};
