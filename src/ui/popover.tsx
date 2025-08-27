import type { Content as RadixContent } from "@radix-ui/react-popover";

import {
  Popover as RadixPopover,
  PopoverContent as RadixPopoverContent,
  Trigger as RadixTrigger,
} from "@radix-ui/react-popover";
import * as React from "react";

import { cn } from "./cn";

export const Popover = RadixPopover;

export const PopoverTrigger = RadixTrigger;

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof RadixContent>,
  React.ComponentPropsWithoutRef<typeof RadixContent>
>(({ className, align = "end", ...props }, ref) => (
  <RadixPopoverContent
    ref={ref}
    align={align}
    className={cn(
      "z-popups drop-shadow-oneBlock p-0 border-shadow outline-none",
      className,
    )}
    {...props}
    onKeyDown={(e) => {
      // don't want keys bubbling up and being detected on the window by the game engine:
      e.stopPropagation();
    }}
  />
));
