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
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import { CssVariables } from "../game/components/CssVariables";
import { cn } from "./cn";

export type PopoverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
  contents: ReactNode;
  className?: string;
  contentsScaleFactor?: number;
};

export const Popover = ({
  open,
  onOpenChange,
  trigger,
  contents,
  className,
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
      cloneElement(trigger as ReactElement, referenceProps)
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
              className={cn(
                "z-popups drop-shadow-oneBlock p-0 border-shadow outline-none",
                className,
              )}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              {...getFloatingProps()}
            >
              {contents}
            </div>
          </CssVariables>
        </FloatingPortal>
      )}
    </>
  );
};
