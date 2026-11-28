import { createContext } from "preact";

export type TabBarContextValue = {
  /**
   * the `tabId` of the active tab - undefined for a tab drawn alone, eg as a
   * drag image
   */
  activeTabId: string | undefined;
  /**
   * the last tab can't be closed, unless `isSingletonTabCloseable`
   */
  isOnlyTab: boolean;
  isSingletonTabCloseable: boolean;
};

export const TabBarContext = createContext<TabBarContextValue>(
  // don't support root context:
  null as unknown as TabBarContextValue,
);
