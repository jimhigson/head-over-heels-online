import { type ComponentChildren } from "preact";
import { useMemo, useRef, useState } from "preact/hooks";

import { useOverflowsAtFullSize } from "../useOverflowsAtFullSize";
import { TabBarContext } from "./TabBarContext";

/**
 * where among a bar's tabs a drop at this x goes, and the x (in the bar's own
 * coordinates) to mark it at
 */
const dropPlaceAmongTabs = (
  barElement: HTMLElement,
  clientX: number,
): { index: number; markerX: number } => {
  const barLeft = barElement.getBoundingClientRect().left;
  const tabRects = Array.from(
    barElement.querySelectorAll('[role="tab"]'),
    (tabElement) => tabElement.getBoundingClientRect(),
  );
  const index = tabRects.findIndex(
    ({ left, width }) => clientX < left + width / 2,
  );
  if (index === -1) {
    return {
      index: tabRects.length,
      markerX: (tabRects.at(-1)?.right ?? barLeft) - barLeft,
    };
  }
  return { index, markerX: tabRects[index].left - barLeft };
};

export type TabBarProps = {
  /** the tabs' labels - a change means they are measured again for fit */
  tabLabels: string[];
  /** names the tab list, for assistive tech */
  label: string;
  /**
   * iff true, a bar's last tab can be closed, eg when closing it closes the bar
   */
  isSingletonTabCloseable?: boolean;
  /**
   * whether a drag over the bar can be dropped among its tabs
   */
  acceptsDrag?: (dragEvent: DragEvent) => boolean;
  /**
   * a drag the bar accepts was dropped, to go before the tab at this index
   * (or after the last)
   */
  onDropAt?: (dragEvent: DragEvent, index: number) => void;
  class?: string;
  children: ComponentChildren;
};

/**
 * a row of `Tab`s, as wide as they are up to the width available - marked
 * `data-tab-bar`, so what is around it can leave drags over it to the bar
 */
export const TabBar = ({
  tabLabels,
  label,
  isSingletonTabCloseable = false,
  acceptsDrag,
  onDropAt,
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
    () => ({ shortenLabels, isOnlyTab, isSingletonTabCloseable }),
    [shortenLabels, isOnlyTab, isSingletonTabCloseable],
  );
  const barRef = useRef<HTMLDivElement>(null);
  const [dropMarkerX, setDropMarkerX] = useState<number | undefined>(undefined);

  return (
    <div
      ref={barRef}
      data-tab-bar
      class={`relative min-w-0 max-w-full ${className ?? ""}`}
      onDragOver={(dragEvent) => {
        const { current: barElement } = barRef;
        if (barElement === null || !(acceptsDrag?.(dragEvent) ?? false)) {
          return;
        }
        const { clientX } = dragEvent;
        dragEvent.preventDefault();
        setDropMarkerX(dropPlaceAmongTabs(barElement, clientX).markerX);
      }}
      onDragLeave={() => setDropMarkerX(undefined)}
      onDrop={(dragEvent) => {
        setDropMarkerX(undefined);
        const { current: barElement } = barRef;
        if (
          barElement === null ||
          onDropAt === undefined ||
          !(acceptsDrag?.(dragEvent) ?? false)
        ) {
          return;
        }
        const { clientX } = dragEvent;
        dragEvent.preventDefault();
        // dropped on the tabs, not on what is under them:
        dragEvent.stopPropagation();
        onDropAt(dragEvent, dropPlaceAmongTabs(barElement, clientX).index);
      }}
    >
      <div
        ref={tabListRef}
        role="tablist"
        aria-label={label}
        class="flex max-w-full min-w-0 overflow-x-auto"
      >
        <TabBarContext value={tabBarContext}>{children}</TabBarContext>
      </div>
      {dropMarkerX !== undefined && (
        <div
          class="absolute top-0 bottom-0 w-half bg-moss pointer-events-none"
          style={{ left: dropMarkerX }}
        />
      )}
    </div>
  );
};
