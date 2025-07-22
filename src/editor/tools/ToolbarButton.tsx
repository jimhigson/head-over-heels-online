import { Button } from "../../ui/button";

import { type PropsWithChildren } from "react";
import { buttonSizeClassNames } from "./buttonSizeClassNames";
import type { ShortcutKeys } from "./useKeyboardShortcut";
import { useKeyboardShortcut } from "./useKeyboardShortcut";

type ToolbarButtonProps = {
  onClick?: () => void;
  className?: string;
  isCurrentTool?: boolean;
  disabled?: boolean;
  shortcutKeys?: ShortcutKeys;
};

export const ToolbarButton = ({
  className,
  onClick,
  children,
  disabled = false,
  isCurrentTool = false,
  shortcutKeys,
}: PropsWithChildren<ToolbarButtonProps>) => {
  useKeyboardShortcut(shortcutKeys, disabled, onClick);

  return (
    <Button
      disabled={disabled}
      selected={isCurrentTool}
      className={`
        ${buttonSizeClassNames} 
        active:pt-oneScaledPix  gap-0 inline-flex overflow-hidden 
        
        ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
