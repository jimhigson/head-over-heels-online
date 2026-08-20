import { type VNode } from "preact";
import { useState } from "preact/hooks";

import { buildFsTree, filesUnder, type FsTreeNode } from "../fsTree.ts";
import { notesStore } from "../notes.ts";
import { files } from "../payload.ts";
import { type ReadingState } from "../readingState.ts";
import { useStore } from "../stores.ts";
import { withMembership } from "../ticks.ts";
import { TreeFileRow } from "./TreeFileRow.tsx";

export type FsTreeProps = { state: ReadingState };

/** the same changed files, nested by directory instead of reading order - for
    browsing a large change by where it lives rather than the authored path
    through it */
export const FsTree = ({ state }: FsTreeProps) => {
  const notes = useStore(notesStore);
  const [collapsedDirs, setCollapsedDirs] = useState(() => new Set<string>());
  const tree = buildFsTree(files);

  const tickDirectory = (node: FsTreeNode, on: boolean) => {
    for (const file of filesUnder(node)) {
      state.tickFile(file, on);
    }
  };

  const renderNode = (node: FsTreeNode): VNode => {
    if (node.type === "file") {
      return (
        <TreeFileRow
          key={node.file.id}
          file={node.file}
          state={state}
          noted={(notes[node.file.path] ?? []).length}
          showDir={false}
        />
      );
    }

    const descendants = filesUnder(node);
    const done = descendants.filter((file) => state.ticked.has(file.path)).length;
    const open = !collapsedDirs.has(node.path);

    return (
      <li class="fs-dir" key={node.path}>
        <div class="fs-dir-head">
          <input
            class="tick small"
            type="checkbox"
            checked={done === descendants.length}
            indeterminate={done > 0 && done < descendants.length}
            aria-label={`Tick every file in ${node.path}`}
            onChange={(event) => tickDirectory(node, event.currentTarget.checked)}
          />
          <button
            type="button"
            class="fs-dir-toggle"
            aria-expanded={open}
            onClick={() => setCollapsedDirs((previous) => withMembership(previous, node.path, open))}
          >
            <span class="fs-dir-caret" aria-hidden="true">
              {open ? "▾" : "▸"}
            </span>
            <span class="fs-dir-name">{node.name}</span>
          </button>
          <span class="tree-count">
            {done}/{descendants.length}
          </span>
        </div>
        {open && <ul class="fs-dir-children">{node.children.map(renderNode)}</ul>}
      </li>
    );
  };

  return <ul class="tree fs-tree">{tree.map(renderNode)}</ul>;
};
