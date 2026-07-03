import {
  type ButtonHTMLAttributes,
  type MouseEvent,
  type PropsWithChildren,
  type ReactNode,
  type Ref,
} from "react";
import { type Simplify } from "type-fest";

import { BlockyMarkdown } from "../game/components/BlockyMarkdown";
import { cn } from "./cn";
import {
  enhanceTooltipWithHotkeys,
  formatShortcutKeysAsMarkdown,
} from "./enhanceTooltipWithHotkeys";
import { Tooltip } from "./tooltip/Tooltip";
import { type ShortcutKeys, useKeyboardShortcut } from "./useKeyboardShortcut";

export type ButtonProps = Simplify<
  Pick<
    // support selected html attributes
    ButtonHTMLAttributes<HTMLButtonElement>,
    | "aria-label"
    | "autoFocus"
    | "className"
    | "disabled"
    | "onMouseEnter"
    | "onMouseLeave"
    | "role"
    | "style"
  > &
    PropsWithChildren<{
      selected?: boolean;
      tooltipContent?: ReactNode;
      shortcutKeys?: ShortcutKeys;
      ref?: Ref<HTMLButtonElement>;
      /** make the event optional, in case the button wasn't triggered by clicking */
      onClick?: (event?: MouseEvent) => void;
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
          bg-metallicBlue zx:bg-zxBlue toppy:bg-toppyCool3 border-none border-shadow
          gap-2
           disabled:bg-midGrey disabled:text-lightGrey
           data-[selected=true]:bg-lightBeige
           [&:not(:disabled):hover:not([data-selected=true])]:bg-pastelBlue
           zx:[&:not(:disabled):hover:not([data-selected=true])]:bg-zxYellow
           zx:[&:not(:disabled):hover:not([data-selected=true])]:text-zxBlack
           toppy:[&:not(:disabled):hover:not([data-selected=true])]:bg-toppyWarm3
           toppy:[&:not(:disabled):hover:not([data-selected=true])]:text-toppyBlack
           `,
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );

  const finalTooltipContent =
    typeof tooltipContent === "string" ?
      enhanceTooltipWithHotkeys(tooltipContent, shortcutKeys)
    : tooltipContent !== undefined && shortcutKeys ?
      <>
        {tooltipContent}
        <BlockyMarkdown>
          {formatShortcutKeysAsMarkdown(shortcutKeys)}
        </BlockyMarkdown>
      </>
    : tooltipContent;

  return (
    <Tooltip triggerContent={button} tooltipContent={finalTooltipContent} />
  );
};
