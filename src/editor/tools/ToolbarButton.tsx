import { Button } from "../../ui/button";

import { type PropsWithChildren } from "react";
import {
  buttonSizeClassNames,
  buttonSmallSizeClassNames,
} from "./buttonSizeClassNames";
import type { ShortcutKeys } from "../../ui/useKeyboardShortcut";
import { useKeyboardShortcut } from "../../ui/useKeyboardShortcut";

type ToolbarButtonProps = {
  onClick?: () => void;
  className?: string;
  isCurrentTool?: boolean;
  disabled?: boolean;
  shortcutKeys?: ShortcutKeys;
  small?: boolean;
};

export const ToolbarButton = ({
  className,
  onClick,
  children,
  disabled = false,
  isCurrentTool = false,
  shortcutKeys,
  small = false,
}: PropsWithChildren<ToolbarButtonProps>) => {
  useKeyboardShortcut(shortcutKeys, disabled, onClick);

  return (
    <Button
      disabled={disabled}
      selected={isCurrentTool}
      className={`
        ${small ? buttonSmallSizeClassNames : buttonSizeClassNames} 
        active:pt-oneScaledPix  gap-0 inline-flex overflow-hidden 
        
        ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
