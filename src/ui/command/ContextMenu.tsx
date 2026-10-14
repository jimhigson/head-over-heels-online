import { type ComponentChildren } from "preact";
import { useLayoutEffect, useRef } from "preact/hooks";

import { CssVariables } from "../../game/components/CssVariables";
import { type Xy } from "../../utils/vectors/vectors";
import { Command, type CommandProps } from "./Command";
import { CommandList } from "./CommandList";

export type ContextMenuProps = {
  open: boolean;
  onClose: () => void;
  /** returns the point to anchor the menu to, in viewport (client) pixels */
  anchor: () => Xy;
  /** optional content shown above the items, separated by a divider */
  header?: ComponentChildren;
  /** sees every keydown in the menu first, before it is acted on */
  onKeyDown?: CommandProps["onKeyDown"];
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
  onKeyDown,
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
    // as tall as fits below the anchor, scrolling past that - but anchored low
    // in the window, it may take half the window, and is moved up to fit:
    el.style.maxHeight = `${Math.max(window.innerHeight - y, window.innerHeight / 2)}px`;
    el.showPopover();
    // now the menu has a size, clamp it into the viewport:
    const { width, height } = el.getBoundingClientRect();
    el.style.left = `${Math.max(0, Math.min(x, window.innerWidth - width))}px`;
    el.style.top = `${Math.max(0, Math.min(y, window.innerHeight - height))}px`;
    // so the keyboard drives the menu straight away:
    el.querySelector<HTMLElement>("[data-command-root]")?.focus();
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
        // keys pressed in the menu are for it, not the app's shortcuts:
        class="popover-point drop-shadow-oneBlock border-shadow outline-none no-keyboard-shortcuts overflow-hidden"
        onToggle={(e) => {
          if (e.newState === "closed") {
            onClose();
          }
        }}
      >
        <Command
          onClose={onClose}
          onKeyDown={onKeyDown}
          data-command-root=""
          tabIndex={-1}
          // the popover's height limit, so the list scrolls within it:
          class="outline-none max-h-[inherit]"
        >
          {header !== undefined && (
            <div class="border-b px-1 pb-1">{header}</div>
          )}
          <CommandList>{children}</CommandList>
        </Command>
      </div>
    </CssVariables>
  );
};
