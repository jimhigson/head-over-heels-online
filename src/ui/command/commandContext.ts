import { createContext, type RefObject } from "preact";

export type CommandContextValue = {
  /** the current filter text */
  search: string;
  setSearch: (search: string) => void;
  /** the value of the currently highlighted (keyboard/hover) item */
  activeValue: string | undefined;
  setActiveValue: (value: string | undefined) => void;
  /** how many items are currently visible (after filtering) */
  resultCount: number;
  /** the scrollable list element, used to read the visible items from the DOM */
  listRef: RefObject<HTMLDivElement | null>;
};

export const CommandContext = createContext<CommandContextValue | undefined>(
  undefined,
);
