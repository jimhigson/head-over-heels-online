import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  type Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useState } from "preact/hooks";
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import { BlockyMarkdown } from "../game/components/BlockyMarkdown";
import { CssVariables } from "../game/components/CssVariables";

export type TooltipProps = {
  triggerContent: ReactNode;
  tooltipContent?: ReactNode;
  tooltipOffset?: number;
  tooltipPlacement?: Placement;
};

export const Tooltip = ({
  triggerContent,
  tooltipContent,
  tooltipOffset = 0,
  tooltipPlacement = "bottom-end",
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: tooltipPlacement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(tooltipOffset), flip(), shift()],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { delay: { open: 450, close: 0 } }),
    useFocus(context),
    useDismiss(context),
    useRole(context, { role: "tooltip" }),
  ]);

  if (!tooltipContent) {
    return triggerContent;
  }

  const referenceProps = getReferenceProps({ ref: refs.setReference });

  const trigger =
    isValidElement(triggerContent) ?
      cloneElement(triggerContent as ReactElement, referenceProps)
    : <div {...referenceProps}>{triggerContent}</div>;

  return (
    <>
      {trigger}
      {isOpen && (
        <FloatingPortal>
          <CssVariables scaleFactor={2}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="bg-lightBeige zx:bg-zxYellowDimmed toppy:bg-toppyWarm2 toppy:text-toppyCool4 text-white p-1 drop-shadow-oneBlock z-popups"
            >
              {typeof tooltipContent === "string" ?
                <div className="max-w-16">
                  <BlockyMarkdown markdown={tooltipContent} />
                </div>
              : tooltipContent}
            </div>
          </CssVariables>
        </FloatingPortal>
      )}
    </>
  );
};
