import { Button } from "../../ui/button";

import type { ReactNode } from "react";
import { type PropsWithChildren } from "react";
import {
  buttonSizeClassNames,
  buttonSmallSizeClassNames,
} from "./buttonSizeClassNames";
import type { ShortcutKeys } from "../../ui/useKeyboardShortcut";
import { useKeyboardShortcut } from "../../ui/useKeyboardShortcut";
import {
  Root as TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipPortal,
} from "@radix-ui/react-tooltip";
import { CssVariables } from "../../game/components/CssVariables";
import { BlockyMarkdown } from "../../game/components/BlockyMarkdown";

type ToolbarButtonProps = {
  onClick?: () => void;
  className?: string;
  isCurrentTool?: boolean;
  disabled?: boolean;
  shortcutKeys?: ShortcutKeys;
  small?: boolean;
  tooltipContent?: ReactNode;
};

export const ToolbarButton = ({
  className,
  onClick,
  children,
  disabled = false,
  isCurrentTool = false,
  shortcutKeys,
  small = false,
  tooltipContent,
}: PropsWithChildren<ToolbarButtonProps>) => {
  useKeyboardShortcut(shortcutKeys, disabled, onClick);

  const button = (
    <Button
      disabled={disabled}
      selected={isCurrentTool}
      className={`
        ${small ? buttonSmallSizeClassNames : buttonSizeClassNames} 
        active:pt-oneScaledPix gap-0 inline-flex overflow-hidden 
        
        ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );

  if (tooltipContent) {
    return (
      <TooltipRoot>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipPortal>
          <CssVariables scaleFactor={2}>
            <TooltipContent
              side="bottom"
              align="end"
              className="bg-highlightBeige text-white p-1 mt-oneScaledPix drop-shadow-oneBlock z-popups"
            >
              {typeof tooltipContent === "string" ?
                <div className="max-w-15">
                  <BlockyMarkdown markdown={tooltipContent} />
                </div>
              : tooltipContent}
            </TooltipContent>
          </CssVariables>
        </TooltipPortal>
      </TooltipRoot>
    );
  }
  return button;
};
