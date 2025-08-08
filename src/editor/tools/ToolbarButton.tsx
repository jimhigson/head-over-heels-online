import { Button } from "../../ui/button";

import type { ReactNode } from "react";
import { type PropsWithChildren } from "react";
import {
  buttonSizeClassNames,
  buttonSmallSizeClassNames,
} from "./buttonSizeClassNames";
import type { ShortcutKeys } from "../../ui/useKeyboardShortcut";

export type ToolbarButtonProps = {
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
  return (
    <Button
      disabled={disabled}
      selected={isCurrentTool}
      className={`
        ${small ? buttonSmallSizeClassNames : buttonSizeClassNames} 
        ${small ? "leading-none" : ""} 
        active:pt-oneScaledPix gap-0 inline-flex overflow-hidden 
        
        ${className ?? ""}`}
      onClick={onClick}
      tooltipContent={tooltipContent}
      shortcutKeys={shortcutKeys}
    >
      {children}
    </Button>
  );
};
