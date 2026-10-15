import { type ComponentChildren } from "preact";
import { useMemo, useRef } from "preact/hooks";

import { useOverflowsAtFullSize } from "../useOverflowsAtFullSize";
import { TabBarContext } from "./TabBarContext";

export type TabBarProps = {
  /** the tabs' labels - a change means they are measured again for fit */
  tabLabels: string[];
  /** names the tab list, for assistive tech */
  label: string;
  class?: string;
  children: ComponentChildren;
};

/** a row of `Tab`s, as wide as they are up to the width available */
export const TabBar = ({
  tabLabels,
  label,
  class: className,
  children,
}: TabBarProps) => {
  const tabListRef = useRef<HTMLDivElement>(null);
  const shortenLabels = useOverflowsAtFullSize(
    tabListRef,
    // as one string, so a new array of the same labels isn't a change:
    tabLabels.join("\n"),
  );
  const isOnlyTab = tabLabels.length === 1;
  const tabBarContext = useMemo(
    () => ({ shortenLabels, isOnlyTab }),
    [shortenLabels, isOnlyTab],
  );

  return (
    <div
      ref={tabListRef}
      role="tablist"
      aria-label={label}
      class={`flex max-w-full min-w-0 overflow-x-auto ${className ?? ""}`}
    >
      <TabBarContext value={tabBarContext}>{children}</TabBarContext>
    </div>
  );
};
