import { type RefObject, type VNode } from "preact";
import { type PropsWithChildren } from "preact/compat";
import { useState } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { Button, type ButtonProps } from "../../../ui/Button";
import { cn } from "../../../ui/cn";
import { Popover } from "../../../ui/Popover";
import { buttonSizeClassNames } from "../buttonSizeClassNames";

export interface MenuButtonProps {
  main: VNode;
  children: (null | VNode<PropsWithChildren<EmptyObject>>)[];
  contentsClassName?: string;
  ref?: RefObject<HTMLDivElement | null>;
}

export const MenuButton = ({
  main,
  children,
  contentsClassName,
  ref,
}: MenuButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      ref={ref}
      class={cn(buttonSizeClassNames, "relative group", {
        "drop-shadow-oneBlock z-popups": open,
      })}
    >
      <span class="content">
        {main}

        {children.length > 0 && (
          <Popover
            open={open}
            onOpenChange={setOpen}
            trigger={
              <Button
                aria-label={open ? "Close menu" : "More actions"}
                class="absolute right-0 bottom-0 bg-metallicBlueHalfbrite invisible group-hover:visible"
              >
                <span class="pl-oneScaledPix py-oneScaledPix text-single-line">
                  {open ? "X" : "⬇"}
                </span>
              </Button>
            }
            contents={
              <div
                class={cn(
                  "flex flex-col gap-oneScaledPix py-oneScaledPix",
                  "bg-metallicBlueHalfbrite text-white max-h-20 overflow-y-auto",
                  "scrollbar scrollbar-w-1 scrollbar-thumb-highlightBeige",
                  contentsClassName,
                )}
              >
                {children}
              </div>
            }
          />
        )}
      </span>
    </div>
  );
};

/**
 * typical menu item button for menu-style dropdowns off the buttons, for giving as
 * child of MenuButton
 */
export const MenuItemButton = ({
  children,
  class: className,
  ...rest
}: ButtonProps) => (
  <Button
    class={`px-1 py-half w-full justify-between ${className ?? ""}`}
    {...rest}
  >
    {typeof children === "string" ?
      <span class="text-single-line">{children}</span>
    : children}
  </Button>
);
