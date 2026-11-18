import { type ComponentChildren } from "preact";
import { type CSSProperties } from "preact/compat";
import { useCallback, useContext, useState } from "preact/hooks";

import { type Xy } from "../../utils/vectors/vectors";
import { ContextMenu } from "../command/ContextMenu";
import { ContextMenuItem } from "../command/ContextMenuItem";
import { useTip } from "../tip/useTip";
import { TabBarContext } from "./TabBarContext";
import "./tabColours.css";
import { TabRenameInput } from "./TabRenameInput";

/** how a tab is renamed: return takes the edited name, escape or leaving it cancels */
export type TabRename = {
  /** the name as edited, before any marks the label adds */
  name: string;
  /** whether the name can be taken - return does nothing while it can't */
  isValid: (newName: string) => boolean;
  /** editing the name has begun */
  onStart: () => void;
  onRename: (newName: string) => void;
};

/**
 * a further choice in a tab's menu
 */
export type TabMenuItem = {
  label: string;
  onSelect: () => void;
};

export type TabProps = {
  label: string;
  /** shown in place of the label while the bar's tabs don't all fit */
  shortLabel: string;
  isActive: boolean;
  /**
   * open only until replaced - its label is slanted, as the font has no italics
   */
  isPreview?: boolean;
  /**
   * iff true, the tab can't be selected
   */
  disabled?: boolean;
  onSelect: () => void;
  /** with this, the tab can be closed - by its x or middle-click */
  onClose?: () => void;
  /** with this, the tab's menu can close the other tabs */
  onCloseOthers?: () => void;
  /**
   * more choices in the tab's menu
   */
  menuItems?: TabMenuItem[];
  /**
   * with this, the tab can be dragged
   */
  onDragStart?: (dragEvent: DragEvent) => void;
  onDblClick?: () => void;
  /**
   * with this, the tab's name can be edited in place - by enter, or its menu
   */
  rename?: TabRename;
  /** shown on interest in the tab */
  tip?: ComponentChildren;
  class?: string;
  style?: CSSProperties;
};

/**
 * one tab of a `TabBar`: click to select, middle-click or its x to close,
 * enter to rename, right-click for a menu (to rename, close the others, and
 * any further choices)
 */
export const Tab = ({
  label,
  shortLabel,
  isActive,
  isPreview = false,
  disabled = false,
  onSelect,
  onClose,
  onCloseOthers,
  menuItems = [],
  onDragStart,
  onDblClick,
  rename,
  tip: tipContent,
  class: className,
  style,
}: TabProps) => {
  const { shortenLabels, isOnlyTab, isSingletonTabCloseable } =
    useContext(TabBarContext);
  // with one tab, there are no others to close, and it is closed only where
  // the bar allows:
  const closeable =
    onClose !== undefined && (!isOnlyTab || isSingletonTabCloseable);
  const canCloseOthers = onCloseOthers !== undefined && !isOnlyTab;
  const hasMenu =
    rename !== undefined || canCloseOthers || menuItems.length > 0;
  const { interestfor, tip } = useTip(tipContent);
  // the name being typed, while renaming:
  const [editedName, setEditedName] = useState<string | undefined>(undefined);
  const [contextMenuXy, setContextMenuXy] = useState<undefined | Xy>(undefined);
  const closeContextMenu = useCallback(() => setContextMenuXy(undefined), []);
  const contextMenuAnchor = useCallback(
    (): Xy => contextMenuXy ?? { x: 0, y: 0 },
    [contextMenuXy],
  );
  const startRename = () => {
    if (rename !== undefined && editedName === undefined) {
      setEditedName(rename.name);
      rename.onStart();
    }
  };

  return (
    <>
      <div
        role="tab"
        aria-selected={isActive}
        aria-disabled={disabled}
        tabIndex={-1}
        data-selected={isActive ? "true" : "false"}
        class={`flex items-center gap-half pl-1 ${closeable ? "" : "pr-1"} ${disabled ? "cursor-default" : "cursor-pointer"} select-none ${className ?? ""}`}
        style={style}
        onClick={() => {
          if (!isActive && !disabled) {
            onSelect();
          }
        }}
        onKeyDown={(keyboardEvent) => {
          // the tab's own enter, not one typed into its name while renaming:
          if (
            keyboardEvent.key === "Enter" &&
            keyboardEvent.target === keyboardEvent.currentTarget
          ) {
            keyboardEvent.preventDefault();
            startRename();
          }
        }}
        onDblClick={onDblClick}
        draggable={onDragStart !== undefined}
        onDragStart={onDragStart}
        onMouseDown={(mouseEvent) => {
          // stop the middle button starting the browser's autoscroll:
          if (mouseEvent.button === 1) {
            mouseEvent.preventDefault();
          }
        }}
        onAuxClick={(mouseEvent) => {
          if (mouseEvent.button === 1 && closeable) {
            onClose();
          }
        }}
        onContextMenu={(mouseEvent) => {
          mouseEvent.preventDefault();
          if (hasMenu) {
            setContextMenuXy({ x: mouseEvent.clientX, y: mouseEvent.clientY });
          }
        }}
      >
        {
          rename !== undefined && editedName !== undefined ?
            <TabRenameInput
              rename={rename}
              editedName={editedName}
              onEdit={setEditedName}
              onDone={() => setEditedName(undefined)}
            />
            // a button, as only buttons and links can invoke a tip by interest:
          : <button
              type="button"
              tabIndex={-1}
              interestfor={interestfor}
              class={`text-single-line ${isPreview ? "inline-block -skew-x-12" : ""}`}
            >
              {shortenLabels ? shortLabel : label}
            </button>

        }
        {tip}
        {closeable && (
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
        {rename !== undefined && (
          <ContextMenuItem
            value="rename"
            onSelect={() => {
              closeContextMenu();
              startRename();
            }}
          >
            Rename
          </ContextMenuItem>
        )}
        {canCloseOthers && (
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
        )}
        {menuItems.map(({ label: itemLabel, onSelect: onSelectItem }) => (
          <ContextMenuItem
            key={itemLabel}
            value={itemLabel}
            onSelect={() => {
              onSelectItem();
              closeContextMenu();
            }}
          >
            {itemLabel}
          </ContextMenuItem>
        ))}
      </ContextMenu>
    </>
  );
};
