import { notesStore } from "../notes.ts";
import { filesInGroup, groups } from "../payload.ts";
import { type ReadingState } from "../readingState.ts";
import { useStore } from "../stores.ts";

const basename = (path: string): string => path.slice(path.lastIndexOf("/") + 1);
const dirname = (path: string): string =>
  path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "";

export type SidebarProps = { state: ReadingState };

export const Sidebar = ({ state }: SidebarProps) => {
  const notes = useStore(notesStore);

  return (
    <aside class="sidebar" id="contents" aria-label="Contents">
      <p class="sidebar-title">contents</p>
      <nav>
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
                  <span class="tree-step">{index + 1}</span>
                  <button
                    type="button"
                    class="tree-group-title"
                    title={group.title}
                    onClick={() => state.goTo(files[0])}
                  >
                    {group.title}
                  </button>
                  <span class="tree-count">
                    {done}/{files.length}
                  </span>
                </div>
                <ul class="tree-files">
                  {files.map((file) => {
                    const ticked = state.ticked.has(file.path);
                    const noted = (notes[file.path] ?? []).length;
                    return (
                      <li
                        class={`tree-file ${ticked ? "is-ticked" : ""} ${
                          state.activeId === file.id ? "is-active" : ""
                        }`}
                        key={file.id}
                      >
                        <input
                          class="tick small"
                          type="checkbox"
                          checked={ticked}
                          aria-label={`Read ${file.path}`}
                          onChange={(event) => state.tickFile(file, event.currentTarget.checked)}
                        />
                        <button
                          type="button"
                          class="tree-file-link"
                          title={file.path}
                          onClick={() => state.goTo(file)}
                        >
                          <span class="tree-base">{basename(file.path)}</span>
                          <span class="tree-dir">
                            <span>{dirname(file.path)}</span>
                          </span>
                        </button>
                        {noted > 0 && <span class="note-count">{noted}</span>}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
};
