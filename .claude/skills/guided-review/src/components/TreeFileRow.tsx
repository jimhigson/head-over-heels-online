import { isImagePath } from "../imagePaths.ts";
import { basename, dirname } from "../paths.ts";
import { type ReadingState } from "../readingState.ts";
import { type ReviewFile } from "../ReviewPayload.ts";
import { FileStatusChip } from "./FileStatusChip.tsx";

export type TreeFileRowProps = {
  file: ReviewFile;
  state: ReadingState;
  noted: number;
  /** the fs tree already shows a file's directory in its nesting, so it hides this */
  showDir: boolean;
};

/** one file in a contents list: its tick, status/size chip, and a link that
    scrolls the reading order to it - shared by every contents view */
export const TreeFileRow = ({ file, state, noted, showDir }: TreeFileRowProps) => {
  const ticked = state.ticked.has(file.path);
  return (
    <li
      class={`tree-file ${ticked ? "is-ticked" : ""} ${state.activeId === file.id ? "is-active" : ""}`}
    >
      <input
        class="tick small"
        type="checkbox"
        checked={ticked}
        aria-label={`Read ${file.path}`}
        onChange={(event) => state.tickFile(file, event.currentTarget.checked)}
      />
      <FileStatusChip path={file.path} status={file.status} />
      <button type="button" class="tree-file-link" title={file.path} onClick={() => state.goTo(file)}>
        <span
          class={`file-icon ${isImagePath(file.path) ? "file-icon-image" : "file-icon-text"}`}
          aria-hidden="true"
        />
        <span class="tree-base">{basename(file.path)}</span>
        {showDir && (
          <span class="tree-dir">
            <span>{dirname(file.path)}</span>
          </span>
        )}
      </button>
      {noted > 0 && <span class="note-count">{noted}</span>}
    </li>
  );
};
