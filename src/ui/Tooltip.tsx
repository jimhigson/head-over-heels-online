import type { ReactNode } from "react";

import {
  TooltipContent,
  TooltipPortal,
  Root as TooltipRoot,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

import { BlockyMarkdown } from "../game/components/BlockyMarkdown";
import { CssVariables } from "../game/components/CssVariables";

export type TooltipProps = {
  triggerContent: ReactNode;
  tooltipContent?: ReactNode;
};

export const Tooltip = ({ triggerContent, tooltipContent }: TooltipProps) => {
  if (tooltipContent) {
    return (
      <TooltipRoot>
        <TooltipTrigger asChild>{triggerContent}</TooltipTrigger>
        <TooltipPortal>
          <CssVariables scaleFactor={2}>
            <TooltipContent
              side="bottom"
              align="end"
              className="bg-lightBeige text-white p-1 mt-oneScaledPix drop-shadow-oneBlock z-popups"
            >
              {typeof tooltipContent === "string" ?
                <div className="max-w-16">
                  <BlockyMarkdown markdown={tooltipContent} />
                </div>
              : tooltipContent}
            </TooltipContent>
          </CssVariables>
        </TooltipPortal>
      </TooltipRoot>
    );
  }
  return triggerContent;
};
