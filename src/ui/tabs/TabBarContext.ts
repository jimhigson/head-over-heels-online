import { createContext } from "preact";

export type TabBarContextValue = {
  /** the tabs don't all fit at full size, so show their short labels */
  shortenLabels: boolean;
  /** the last tab can't be closed */
  isOnlyTab: boolean;
};

export const TabBarContext = createContext<TabBarContextValue>({
  shortenLabels: false,
  isOnlyTab: false,
});
