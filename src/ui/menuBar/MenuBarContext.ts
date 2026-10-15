import { createContext, type RefObject } from "preact";
import { type Dispatch, type StateUpdater } from "preact/hooks";

/** what a `MenuBar` tells each of its menus */
export type MenuBarContextValue = {
  /** this menu's position in the bar */
  index: number;
  /** how many menus the bar has, for moving between them with the arrow keys */
  menuCount: number;
  /** which menu is open, if any */
  openIndex: number | undefined;
  setOpenIndex: Dispatch<StateUpdater<number | undefined>>;
  /** which menu was open as the pointer went down on a menu name */
  openIndexAtPointerDownRef: RefObject<number | undefined>;
};

export const MenuBarContext = createContext<MenuBarContextValue | null>(null);
