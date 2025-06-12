import type { PropsWithChildren, ReactElement } from "react";
import { useState } from "react";
import { CssVariables } from "../../game/components/CssVariables";
import { Button } from "../../ui/button";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { buttonSizeClassNames } from "./buttonSizeClassNames";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "../../ui/utils";

export interface MultipleToolButtonsProps {
  children: ReactElement<PropsWithChildren>[];
}

export const MultipleToolButtons = ({ children }: MultipleToolButtonsProps) => {
  const [open, setOpen] = useState(false);
  const [buttonIndex, setButtonIndex] = useState(0);

  const selectedChild = children[buttonIndex];
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div
        className={cn(buttonSizeClassNames, "relative", {
          "drop-shadow-oneBlock z-popups": open,
        })}
      >
        {selectedChild}
        <PopoverTrigger asChild>
          <Button className="absolute bottom-0 right-0 bg-metallicBlueHalfbrite">
            <BitmapText className="pl-oneScaledPix">⬇</BitmapText>
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent>
        <CssVariables scaleFactor={2}>
          <div className="flex flex-col gap-oneScaledPix py-oneScaledPix bg-metallicBlueHalfbrite">
            {children.map((child, index) => {
              if (index === buttonIndex) {
                return null; // Skip the currently selected button
              }
              return (
                <div
                  key={index}
                  className={buttonSizeClassNames}
                  onClick={() => {
                    setButtonIndex(index);
                    setOpen(false);
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
