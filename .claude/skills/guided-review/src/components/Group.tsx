import { type ReadingState } from "../readingState.ts";
import { type ReviewFile, type ReviewGroup } from "../ReviewPayload.ts";
import { Row } from "./Row.tsx";

export type GroupProps = {
  group: ReviewGroup;
  index: number;
  files: ReviewFile[];
  open: boolean;
  state: ReadingState;
};

export const Group = ({ group, index, files, open, state }: GroupProps) => {
  const done = files.filter((file) => state.ticked.has(file.path)).length;

  return (
    <section class={`group ${open ? "is-open" : ""}`}>
      <div class="group-head" onClick={() => state.openGroup(index, !open)}>
        <input
          class="tick"
          type="checkbox"
          checked={done === files.length}
          indeterminate={done > 0 && done < files.length}
          aria-label={`Tick every file in ${group.title}`}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) => state.tickGroup(index, event.currentTarget.checked)}
        />
        <span class="step">{index + 1}</span>
        <span class="group-title">{group.title}</span>
        <span class="group-count">
          {done}/{files.length} files
        </span>
        <button
          type="button"
          class="caret"
          aria-expanded={open}
          aria-label={open ? "Collapse this group" : "Expand this group"}
          onClick={(event) => {
            event.stopPropagation();
            state.openGroup(index, !open);
          }}
        >
          {open ? "▾" : "▸"}
        </button>
      </div>

      <div class="group-body" hidden={!open}>
        <p class="blurb" dangerouslySetInnerHTML={{ __html: group.blurb ?? "" }} />
        <div class="rows">
          {files.map((file) => (
            <Row
              key={file.id}
              file={file}
              ticked={state.ticked.has(file.path)}
              collapsed={state.collapsed.has(file.id)}
              diffOpen={state.openDiffs.has(file.id)}
              active={state.activeId === file.id}
              onTick={(on) => state.tickFile(file, on)}
              onCollapse={(on) => state.collapseFile(file.id, on)}
              onDiff={(on) => state.openDiff(file.id, on)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
