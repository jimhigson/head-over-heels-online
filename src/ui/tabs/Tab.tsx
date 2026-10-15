import { type ComponentChildren } from "preact";
import { type CSSProperties } from "preact/compat";
import { useCallback, useContext, useState } from "preact/hooks";

import { type Xy } from "../../utils/vectors/vectors";
import { ContextMenu } from "../command/ContextMenu";
import { ContextMenuItem } from "../command/ContextMenuItem";
import { useTip } from "../tip/useTip";
import { TabBarContext } from "./TabBarContext";

export type TabProps = {
  label: string;
  /** shown in place of the label while the bar's tabs don't all fit */
  shortLabel: string;
  isActive: boolean;
  onSelect: () => void;
  onClose: () => void;
  onCloseOthers: () => void;
  onDblClick?: () => void;
  /** shown on interest in the tab */
  tip?: ComponentChildren;
  class?: string;
  style?: CSSProperties;
};

/**
 * one tab of a `TabBar`: click to select, middle-click or its x to close,
 * right-click for a menu to close the others
 */
export const Tab = ({
  label,
  shortLabel,
  isActive,
  onSelect,
  onClose,
  onCloseOthers,
  onDblClick,
  tip: tipContent,
  class: className,
  style,
}: TabProps) => {
  const { shortenLabels, isOnlyTab } = useContext(TabBarContext);
  const { interestfor, tip } = useTip(tipContent);
  const [contextMenuXy, setContextMenuXy] = useState<undefined | Xy>(undefined);
  const closeContextMenu = useCallback(() => setContextMenuXy(undefined), []);
  const contextMenuAnchor = useCallback(
    (): Xy => contextMenuXy ?? { x: 0, y: 0 },
    [contextMenuXy],
  );

  return (
    <>
      <div
        role="tab"
        aria-selected={isActive}
        tabIndex={-1}
        data-selected={isActive ? "true" : "false"}
        class={`flex items-center gap-half pl-1 ${isOnlyTab ? "pr-1" : ""} cursor-pointer select-none ${className ?? ""}`}
        style={style}
        onClick={() => {
          if (!isActive) {
            onSelect();
          }
        }}
        onDblClick={onDblClick}
        onMouseDown={(mouseEvent) => {
          // stop the middle button starting the browser's autoscroll:
          if (mouseEvent.button === 1) {
            mouseEvent.preventDefault();
          }
        }}
        onAuxClick={(mouseEvent) => {
          if (mouseEvent.button === 1 && !isOnlyTab) {
            onClose();
          }
        }}
        onContextMenu={(mouseEvent) => {
          mouseEvent.preventDefault();
          // with one tab, there are no others to close:
          if (!isOnlyTab) {
            setContextMenuXy({ x: mouseEvent.clientX, y: mouseEvent.clientY });
          }
        }}
      >
        {/* a button, as only buttons and links can invoke a tip by interest: */}
        <button
          type="button"
          tabIndex={-1}
          interestfor={interestfor}
          class="text-single-line"
        >
          {shortenLabels ? shortLabel : label}
        </button>
        {tip}
        {!isOnlyTab && (
          <button
            type="button"
            aria-label={`Close ${label}`}
            class="text-single-line px-half hover:text-midRed"
            onClick={(mouseEvent) => {
              // closing isn't also selecting the tab:
              mouseEvent.stopPropagation();
              onClose();
            }}
          >
            x
          </button>
        )}
      </div>
      {/* beside the tab, not in it, so choosing an item doesn't also click the tab: */}
      <ContextMenu
        open={contextMenuXy !== undefined}
        onClose={closeContextMenu}
        anchor={contextMenuAnchor}
      >
        <ContextMenuItem
          value="close other tabs"
          onSelect={() => {
            onCloseOthers();
            // choosing an item doesn't close the menu by itself:
            closeContextMenu();
          }}
        >
          Close other tabs
        </ContextMenuItem>
      </ContextMenu>
    </>
  );
};
