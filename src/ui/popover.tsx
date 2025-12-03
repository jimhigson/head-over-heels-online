import type { ComponentProps } from "react";

import {
  Popover as RadixPopover,
  PopoverContent as RadixPopoverContent,
  Trigger as RadixTrigger,
} from "@radix-ui/react-popover";

import { cn } from "./cn";

export const Popover = RadixPopover;

export const PopoverTrigger = RadixTrigger;

export const PopoverContent = ({
  className,
  align = "end",
  ...props
}: ComponentProps<typeof RadixPopoverContent>) => (
  <RadixPopoverContent
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
);
