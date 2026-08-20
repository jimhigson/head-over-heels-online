import { type ContentsMode, contentsModeStore, setContentsMode } from "../contentsMode.ts";
import { type ReadingState } from "../readingState.ts";
import { useStore } from "../stores.ts";
import { DiffSizeOrder } from "./DiffSizeOrder.tsx";
import { FsTree } from "./FsTree.tsx";
import { GuidedOrder } from "./GuidedOrder.tsx";

export type SidebarProps = { state: ReadingState };

export const Sidebar = ({ state }: SidebarProps) => {
  const contentsMode = useStore(contentsModeStore);

  return (
    <aside class="sidebar" id="contents" aria-label="Contents">
      <div class="sidebar-head">
        <p class="sidebar-title">contents</p>
        <label class="control select">
          <span>view</span>
          <select
            value={contentsMode}
            aria-label="Contents view"
            onChange={(event) => setContentsMode(event.currentTarget.value as ContentsMode)}
          >
            <option value="guided">guided order</option>
            <option value="tree">fs tree</option>
            <option value="size">diff size</option>
          </select>
        </label>
      </div>
      <nav>
        {contentsMode === "tree" ? <FsTree state={state} />
        : contentsMode === "size" ? <DiffSizeOrder state={state} />
        : <GuidedOrder state={state} />}
      </nav>
    </aside>
  );
};
