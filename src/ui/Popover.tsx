import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import {
  cloneElement,
  type ComponentChildren,
  isValidElement,
  type VNode,
} from "preact";

import { CssVariables } from "../game/components/CssVariables";
import { cn } from "./cn";

export type PopoverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ComponentChildren;
  contents: ComponentChildren;
  class?: string;
  contentsScaleFactor?: number;
};

export const Popover = ({
  open,
  onOpenChange,
  trigger,
  contents,
  class: className,
  contentsScaleFactor = 2,
}: PopoverProps) => {
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange,
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(0),
      flip(),
      shift(),
      size({
        apply({ rects, elements }) {
          elements.floating.style.setProperty(
            "--popover-anchor-width",
            `${rects.reference.width}px`,
          );
        },
      }),
    ],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ]);

  const referenceProps = getReferenceProps({ ref: refs.setReference });

  const triggerElement =
    isValidElement(trigger) ?
      cloneElement(trigger as VNode, referenceProps)
    : <button type="button" {...referenceProps}>
        {trigger}
      </button>;

  return (
    <>
      {triggerElement}
      {open && (
        <FloatingPortal>
          <CssVariables scaleFactor={contentsScaleFactor}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              class={cn(
                "z-popups drop-shadow-oneBlock p-0 border-shadow outline-none",
                className,
              )}
              // compose the stop-propagation through getFloatingProps so it
              // isn't overridden by useDismiss's own onKeyDown. Stops keystrokes
              // bubbling to window-level listeners (in-game controls in
              // keyboardState, menu shortcuts in useKeyboardShortcut) while
              // typing in the popover's filter input.
              {...getFloatingProps({
                onKeyDown(e) {
                  e.stopPropagation();
                },
                onKeyUp(e) {
                  e.stopPropagation();
                },
              })}
            >
              {contents}
            </div>
          </CssVariables>
        </FloatingPortal>
      )}
    </>
  );
};
