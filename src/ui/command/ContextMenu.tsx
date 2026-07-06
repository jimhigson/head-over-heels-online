import { type ComponentChildren } from "preact";
import { useLayoutEffect, useRef } from "preact/hooks";

import { CssVariables } from "../../game/components/CssVariables";
import { type Xy } from "../../utils/vectors/vectors";
import { Command } from "./Command";
import { CommandList } from "./CommandList";

export type ContextMenuProps = {
  open: boolean;
  onClose: () => void;
  /** returns the point to anchor the menu to, in viewport (client) pixels */
  anchor: () => Xy;
  /** optional content shown above the items, separated by a divider */
  header?: ComponentChildren;
  children?: ComponentChildren;
};

/**
 * A menu that floats at an arbitrary point on screen (eg, the mouse cursor),
 * built on the same Command primitives as the rest of the app. Shown as a
 * native popover in the top layer, so the browser handles Escape and light
 * dismiss; the point is clamped into the viewport once the menu's size is
 * known.
 */
export const ContextMenu = ({
  open,
  onClose,
  anchor,
  header,
  children,
}: ContextMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // layout effect (not effect) so the menu is positioned before the browser
  // paints, otherwise it can flash for one frame at a default position:
  useLayoutEffect(() => {
    const el = ref.current;
    if (!open || el === null) {
      return;
    }
    const { x, y } = anchor();
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.showPopover();
    // now the menu has a size, clamp it into the viewport:
    const { width, height } = el.getBoundingClientRect();
    el.style.left = `${Math.max(0, Math.min(x, window.innerWidth - width))}px`;
    el.style.top = `${Math.max(0, Math.min(y, window.innerHeight - height))}px`;
  }, [open, anchor]);

  if (!open) {
    return null;
  }

  return (
    // CssVariables wraps the popover from outside: custom properties inherit
    // through the DOM tree (top layer included), so --block/--scale resolve
    // for the popover's own drop shadow
    <CssVariables scaleFactor={2}>
      <div
        ref={ref}
        popover="auto"
        class="popover-point drop-shadow-oneBlock border-shadow outline-none"
        onToggle={(e) => {
          if (e.newState === "closed") {
            onClose();
          }
        }}
      >
        <Command onClose={onClose}>
          {header !== undefined && (
            <div class="border-b px-1 pb-1">{header}</div>
          )}
          <CommandList>{children}</CommandList>
        </Command>
      </div>
    </CssVariables>
  );
};
