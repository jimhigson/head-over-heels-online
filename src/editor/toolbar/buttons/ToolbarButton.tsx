import { type PropsWithChildren, type ReactNode, type Ref } from "react";

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
  ref?: Ref<HTMLButtonElement>;
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
  ref,
}: PropsWithChildren<ToolbarButtonProps>) => {
  return (
    <Button
      ref={ref}
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
