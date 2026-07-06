import { type ComponentChildren, type Ref } from "preact";
import {
  type ButtonHTMLAttributes,
  type PropsWithChildren,
} from "preact/compat";
import { type Simplify } from "type-fest";

import { BlockyMarkdown } from "../game/components/BlockyMarkdown";
import { cn } from "./cn";
import {
  enhanceTooltipWithHotkeys,
  formatShortcutKeysAsMarkdown,
} from "./enhanceTooltipWithHotkeys";
import { useTip } from "./tip/useTip";
import { type ShortcutKeys, useKeyboardShortcut } from "./useKeyboardShortcut";

export type ButtonProps = Simplify<
  Pick<
    // support selected html attributes
    ButtonHTMLAttributes<HTMLButtonElement>,
    | "aria-label"
    | "autoFocus"
    | "class"
    | "onMouseEnter"
    | "onMouseLeave"
    | "popovertarget"
    | "role"
    | "style"
  > &
    PropsWithChildren<{
      disabled?: boolean;
      selected?: boolean;
      tooltipContent?: ComponentChildren;
      shortcutKeys?: ShortcutKeys;
      ref?: Ref<HTMLButtonElement>;
      /** make the event optional, in case the button wasn't triggered by clicking */
      onClick?: (event?: MouseEvent) => void;
    }>
>;

export const Button = ({
  class: className,
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

  const { interestfor, tip } = useTip(finalTooltipContent);

  const button = (
    <button
      disabled={disabled}
      onClick={onClick}
      data-selected={selected}
      interestfor={interestfor}
      class={cn(
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

  return (
    <>
      {button}
      {tip}
    </>
  );
};
