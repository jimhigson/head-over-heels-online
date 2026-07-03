import { type ComponentChildren, type Ref } from "preact";
import { type PropsWithChildren } from "preact/compat";

import { Button } from "../../../ui/Button";
import { type ShortcutKeys } from "../../../ui/useKeyboardShortcut";
import {
  buttonSizeClassNames,
  buttonSmallSizeClassNames,
} from "../buttonSizeClassNames";

export type ToolbarButtonProps = {
  onClick?: () => void;
  class?: string;
  isCurrentTool?: boolean;
  disabled?: boolean;
  shortcutKeys?: ShortcutKeys;
  small?: boolean;
  tooltipContent?: ComponentChildren;
  /** accessible name for the (usually icon-only) button */
  ariaLabel?: string;
  ref?: Ref<HTMLButtonElement>;
};

export const ToolbarButton = ({
  class: className,
  onClick,
  children,
  disabled = false,
  isCurrentTool = false,
  shortcutKeys,
  small = false,
  tooltipContent,
  ariaLabel,
  ref,
}: PropsWithChildren<ToolbarButtonProps>) => {
  return (
    <Button
      ref={ref}
      aria-label={ariaLabel}
      disabled={disabled}
      selected={isCurrentTool}
      class={`
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
