import {
  autoUpdate,
  flip,
  FloatingPortal,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { type ComponentChildren } from "preact";
import { useLayoutEffect } from "preact/hooks";

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
 * built on the same Command primitives as the rest of the app. The anchor is
 * supplied as a function returning viewport pixels, so the caller controls how
 * the point is derived (and the menu re-anchors as the page scrolls/resizes).
 */
export const ContextMenu = ({
  open,
  onClose,
  anchor,
  header,
  children,
}: ContextMenuProps) => {
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange(nextOpen) {
      if (!nextOpen) {
        onClose();
      }
    },
    placement: "right-start",
    whileElementsMounted: autoUpdate,
    middleware: [flip(), shift()],
  });

  const { getFloatingProps } = useInteractions([useDismiss(context)]);

  // layout effect (not effect) so the anchor is set before the browser paints,
  // otherwise the menu can flash for one frame at a default position:
  useLayoutEffect(() => {
    if (!open) {
      return;
    }
    refs.setPositionReference({
      getBoundingClientRect() {
        const { x, y } = anchor();
        return {
          x,
          y,
          top: y,
          left: x,
          right: x,
          bottom: y,
          width: 0,
          height: 0,
        };
      },
    });
  }, [open, anchor, refs]);

  if (!open) {
    return null;
  }

  return (
    <FloatingPortal>
      <CssVariables scaleFactor={2}>
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          class="z-popups drop-shadow-oneBlock p-0 border-shadow outline-none"
          {...getFloatingProps()}
        >
          <Command onClose={onClose}>
            {header !== undefined && (
              <div class="border-b px-1 pb-1">{header}</div>
            )}
            <CommandList>{children}</CommandList>
          </Command>
        </div>
      </CssVariables>
    </FloatingPortal>
  );
};
