import { type PropsWithChildren, type ReactNode } from "react";

import { Button } from "../../../ui/Button";
import { type ShortcutKeys } from "../../../ui/useKeyboardShortcut";
import {
  buttonSizeClassNames,
  buttonSmallSizeClassNames,
} from "../buttonSizeClassNames";

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
