import type { PropsWithChildren, Ref } from "react";
import type { ButtonHTMLAttributes, MouseEvent } from "react";
import type { Simplify } from "type-fest";

import { type ReactNode } from "react";

import type { ShortcutKeys } from "./useKeyboardShortcut";

import { cn } from "./cn";
import { enhanceTooltipWithHotkeys } from "./hotkeyTooltip";
import { Tooltip } from "./Tooltip";
import { useKeyboardShortcut } from "./useKeyboardShortcut";

export type ButtonProps = Simplify<
  Pick<
    // support selected html attributes
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "disabled" | "role" | "style"
  > &
    PropsWithChildren<{
      selected?: boolean;
      tooltipContent?: ReactNode;
      shortcutKeys?: ShortcutKeys;
      ref?: Ref<HTMLButtonElement>;
      /** make the event optional, in case the button wasn't triggered by clicking */
      onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    }>
>;

export const Button = ({
  className,
  selected,
  disabled = false,
  onClick,
  ref,
  tooltipContent,
  shortcutKeys,
  children,
  ...props
}: ButtonProps) => {
  useKeyboardShortcut(shortcutKeys, disabled, onClick);
  const button = (
    <button
      disabled={disabled}
      onClick={onClick}
      data-selected={selected}
      className={cn(
        `inline-flex items-center justify-center whitespace-nowrap 
          bg-metallicBlue zx:bg-zxBlue border-none border-shadow
          gap-2
           disabled:bg-midGrey disabled:text-lightGrey 
           data-[selected=true]:bg-lightBeige
           [&:not(:disabled):hover:not([data-selected=true])]:bg-pastelBlue 
           `,
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      {/* 
      this might be better but needs testing
      <MultipleBitmapText>{children}</MultipleBitmapText> */}
    </button>
  );

  const finalTooltipContent =
    enhanceTooltipWithHotkeys(
      typeof tooltipContent === "string" ? tooltipContent : undefined,
      shortcutKeys,
    ) ?? tooltipContent;

  return (
    <Tooltip triggerContent={button} tooltipContent={finalTooltipContent} />
  );
};
