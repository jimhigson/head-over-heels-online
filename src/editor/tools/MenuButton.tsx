import type { PropsWithChildren, ReactElement } from "react";
import { useState } from "react";
import { CssVariables } from "../../game/components/CssVariables";
import { Button } from "../../ui/button";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { buttonSizeClassNames } from "./buttonSizeClassNames";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "../../ui/cn";

export interface MenuButtonProps {
  main: ReactElement;
  children: (ReactElement<PropsWithChildren> | null)[];
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
          <div className="flex flex-col gap-oneScaledPix py-oneScaledPix bg-metallicBlueHalfbrite">
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
