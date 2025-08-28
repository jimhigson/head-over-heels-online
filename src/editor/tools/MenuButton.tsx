import type { PropsWithChildren, ReactElement } from "react";

import { useState } from "react";

import { CssVariables } from "../../game/components/CssVariables";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { Button } from "../../ui/button";
import { cn } from "../../ui/cn";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { buttonSizeClassNames } from "./buttonSizeClassNames";

export interface MenuButtonProps {
  main: ReactElement;
  children: (null | ReactElement<PropsWithChildren>)[];
  closeOnSelect?: boolean;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export const MenuButton = ({
  main,
  children,
  closeOnSelect,
  ref,
}: MenuButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div
        ref={ref}
        className={cn(buttonSizeClassNames, "relative group", {
          "drop-shadow-oneBlock z-popups": open,
        })}
      >
        <span className="content">
          {main}

          {children.length > 0 && (
            <PopoverTrigger asChild>
              <Button className="absolute right-0 bottom-0 bg-metallicBlueHalfbrite invisible group-hover:visible">
                <BitmapText className="pl-oneScaledPix leading-none py-oneScaledPix">
                  {open ? "X" : "⬇"}
                </BitmapText>
              </Button>
            </PopoverTrigger>
          )}
        </span>
      </div>
      <PopoverContent>
        <CssVariables scaleFactor={2}>
          <div className="flex flex-col gap-oneScaledPix py-oneScaledPix bg-metallicBlueHalfbrite max-h-20 overflow-y-auto scrollbar scrollbar-w-1 scrollbar-thumb-highlightBeige">
            {children.map((child, index) => {
              return child === null ? null : (
                  <div
                    key={index}
                    className="leading-none"
                    onClick={() => {
                      if (closeOnSelect) setOpen(false);
                    }}
                  >
                    {child}
                  </div>
                );
            })}
          </div>
        </CssVariables>
      </PopoverContent>
    </Popover>
  );
};

/**
 * typical menu item button for menu-style dropdowns off the buttons, for giving as
 * child of MenuButton
 */
export const MenuItemButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <Button className="px-1 py-half w-full justify-between" onClick={onClick}>
    {typeof children === "string" ?
      <BitmapText>{children}</BitmapText>
    : children}
  </Button>
);
