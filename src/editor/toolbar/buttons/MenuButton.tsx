import { useState } from "preact/hooks";
import { type PropsWithChildren, type ReactElement } from "react";

import { BitmapText } from "../../../game/components/tailwindSprites/BitmapText";
import { Button, type ButtonProps } from "../../../ui/Button";
import { cn } from "../../../ui/cn";
import { Popover } from "../../../ui/Popover";
import { buttonSizeClassNames } from "../buttonSizeClassNames";

export interface MenuButtonProps {
  main: ReactElement;
  children: (null | ReactElement<PropsWithChildren>)[];
  contentsClassName?: string;
  ref?: React.RefObject<HTMLDivElement | null>;
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
      className={cn(buttonSizeClassNames, "relative group", {
        "drop-shadow-oneBlock z-popups": open,
      })}
    >
      <span className="content">
        {main}

        {children.length > 0 && (
          <Popover
            open={open}
            onOpenChange={setOpen}
            trigger={
              <Button
                aria-label={open ? "Close menu" : "More actions"}
                className="absolute right-0 bottom-0 bg-metallicBlueHalfbrite invisible group-hover:visible"
              >
                <BitmapText className="pl-oneScaledPix leading-none py-oneScaledPix">
                  {open ? "X" : "⬇"}
                </BitmapText>
              </Button>
            }
            contents={
              <div
                className={cn(
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
  className,
  ...rest
}: ButtonProps) => (
  <Button
    className={`px-1 py-half w-full justify-between ${className ?? ""}`}
    {...rest}
  >
    {typeof children === "string" ?
      <BitmapText>{children}</BitmapText>
    : children}
  </Button>
);
