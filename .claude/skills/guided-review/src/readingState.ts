import { type ReviewFile } from "./ReviewPayload.ts";

/** The reading state, owned by App and handed down whole. One object is why a
    tick in the contents and a tick on a row are the same tick; there is no
    second copy anywhere. */
export type ReadingState = {
  ticked: Set<string>;
  /** file ids folded away */
  collapsed: Set<string>;
  /** file ids whose diff panel is open */
  openDiffs: Set<string>;
  activeId: string | undefined;
  showContents: boolean;
  setShowContents: (on: boolean) => void;
  tickFile: (file: ReviewFile, on: boolean) => void;
  tickGroup: (groupIndex: number, on: boolean) => void;
  goTo: (file: ReviewFile | undefined) => void;
  collapseFile: (id: string, on: boolean) => void;
  openGroup: (groupIndex: number, on: boolean) => void;
  openDiff: (id: string, on: boolean) => void;
  setAllDiffs: (on: boolean) => void;
  clearTicks: () => void;
};
