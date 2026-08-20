/* the changed files, nested into a directory tree instead of reading order.
   Built only from the review's own file list - the same changed-file set the
   guided order reads - never a real filesystem walk, so there is nothing
   gitignored to exclude in the first place. */

import { type ReviewFile } from "./ReviewPayload.ts";

export type FsTreeNode =
  | { type: "dir"; name: string; path: string; children: FsTreeNode[] }
  | { type: "file"; name: string; file: ReviewFile };

type MutableDir = {
  name: string;
  path: string;
  dirs: Map<string, MutableDir>;
  files: ReviewFile[];
};

const makeDir = (name: string, path: string): MutableDir => ({
  name,
  path,
  dirs: new Map(),
  files: [],
});

const insert = (root: MutableDir, file: ReviewFile): void => {
  const segments = file.path.split("/");
  const dirSegments = segments.slice(0, -1);
  let cursor = root;
  let path = "";
  for (const segment of dirSegments) {
    path = path === "" ? segment : `${path}/${segment}`;
    const existing = cursor.dirs.get(segment);
    if (existing === undefined) {
      const created = makeDir(segment, path);
      cursor.dirs.set(segment, created);
      cursor = created;
    } else {
      cursor = existing;
    }
  }
  cursor.files.push(file);
};

/** directories before files, both alphabetical - a familiar file-tree order */
const toNodes = (dir: MutableDir): FsTreeNode[] => {
  const dirNodes: FsTreeNode[] = [...dir.dirs.values()]
    .sort((left, right) => left.name.localeCompare(right.name))
    .map((child) => ({
      type: "dir",
      name: child.name,
      path: child.path,
      children: toNodes(child),
    }));
  const fileNodes: FsTreeNode[] = [...dir.files]
    .sort((left, right) => left.path.localeCompare(right.path))
    .map((file) => ({
      type: "file",
      name: file.path.slice(file.path.lastIndexOf("/") + 1),
      file,
    }));
  return [...dirNodes, ...fileNodes];
};

/** a directory whose only content is one more directory reads better merged
    with it, eg ".generated/fonts" rather than two rows deep for nothing - the
    chain stops at the first level that holds more than one entry, or a file */
const collapseChain = (node: FsTreeNode): FsTreeNode => {
  if (node.type === "file") {
    return node;
  }
  let name = node.name;
  let current = node;
  while (current.children.length === 1) {
    const only = current.children.find((child) => child.type === "dir");
    if (only === undefined) {
      break;
    }
    name = `${name}/${only.name}`;
    current = only;
  }
  return { type: "dir", name, path: current.path, children: current.children.map(collapseChain) };
};

export const buildFsTree = (files: ReviewFile[]): FsTreeNode[] => {
  const root = makeDir("", "");
  for (const file of files) {
    insert(root, file);
  }
  return toNodes(root).map(collapseChain);
};

/** every file under a directory node, for its tick-all-in-directory checkbox */
export const filesUnder = (node: FsTreeNode): ReviewFile[] =>
  node.type === "file" ? [node.file] : node.children.flatMap(filesUnder);
