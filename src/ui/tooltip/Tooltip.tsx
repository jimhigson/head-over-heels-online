import { FloatingPortal, type Placement } from "@floating-ui/react";
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import { BlockyMarkdown } from "../../game/components/BlockyMarkdown";
import { CssVariables } from "../../game/components/CssVariables";
import { useTooltip } from "./useTooltip";

export type TooltipFloatingProps = {
  isOpen: boolean;
  floatingStyles: React.CSSProperties;
  refs: ReturnType<typeof useTooltip>["refs"];
  getFloatingProps: ReturnType<typeof useTooltip>["getFloatingProps"];
  tooltipContent: ReactNode;
};

export const TooltipFloating = ({
  isOpen,
  floatingStyles,
  refs,
  getFloatingProps,
  tooltipContent,
}: TooltipFloatingProps) =>
  isOpen ?
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
  : null;

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
  const { refs, floatingStyles, isOpen, getReferenceProps, getFloatingProps } =
    useTooltip({ tooltipOffset, tooltipPlacement });

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
      <TooltipFloating
        isOpen={isOpen}
        floatingStyles={floatingStyles}
        refs={refs}
        getFloatingProps={getFloatingProps}
        tooltipContent={tooltipContent}
      />
    </>
  );
};
