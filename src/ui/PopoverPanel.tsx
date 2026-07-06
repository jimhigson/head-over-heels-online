import { type ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";

import { CssVariables } from "../game/components/CssVariables";
import { cn } from "./cn";

export type PopoverPanelProps = {
  /** referenced by the trigger button's `popovertarget` attribute */
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ComponentChildren;
  class?: string;
  contentsScaleFactor?: number;
};

/**
 * A native popover panel, anchored below the button that opens it. Pair with
 * a trigger button carrying `popovertarget={id}` - the browser handles
 * click-to-toggle, Escape and light dismiss, and positions the panel with css
 * anchor positioning against the trigger as implicit anchor (the
 * `popover-panel` class in the anchorPopovers tailwind plugin).
 * `open`/`onOpenChange` mirror the DOM popover state so callers can react to
 * it and close programmatically.
 */
export const PopoverPanel = ({
  id,
  open,
  onOpenChange,
  children,
  class: className,
  contentsScaleFactor = 2,
}: PopoverPanelProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el === null) {
      return;
    }
    const domOpen = el.matches(":popover-open");
    if (open && !domOpen) {
      el.showPopover();
    } else if (!open && domOpen) {
      el.hidePopover();
    }
  }, [open]);

  return (
    // CssVariables wraps the popover from outside: custom properties inherit
    // through the DOM tree (top layer included), so --block/--scale resolve
    // for the popover's own drop shadow
    <CssVariables scaleFactor={contentsScaleFactor}>
      <div
        id={id}
        popover="auto"
        ref={ref}
        class={cn(
          "popover-panel drop-shadow-oneBlock border-shadow outline-none",
          className,
        )}
        onToggle={(e) => onOpenChange(e.newState === "open")}
        // Stops keystrokes bubbling to window-level listeners (in-game
        // controls in keyboardState, menu shortcuts in useKeyboardShortcut)
        // while typing in the popover's filter input. Escape still
        // light-dismisses: the browser implements that as a close request,
        // not via this bubbling keydown.
        onKeyDown={(e) => e.stopPropagation()}
        onKeyUp={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </CssVariables>
  );
};
