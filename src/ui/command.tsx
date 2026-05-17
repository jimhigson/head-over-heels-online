import { Command as CommandPrimitive } from "cmdk";
import { type ComponentProps } from "react";

import { type TextureTailwindClass } from "../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { cn } from "./cn";

const Command = ({
  className,
  onClose,
  ...props
}: ComponentProps<typeof CommandPrimitive> & { onClose?: () => void }) => (
  <CommandPrimitive
    className={cn(
      "flex h-full w-full flex-col overflow-hidden bg-metallicBlue zx:bg-zxBlue toppy:bg-toppyCool3 text-popover-foreground",
      className,
    )}
    onKeyDown={(e) => {
      if (e.key === "Escape") onClose?.();
    }}
    {...props}
  />
);

const CommandInput = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Input>) => (
  <div className="flex items-center border-b px-1 pb-1" cmdk-input-wrapper="">
    <span
      className={`sprite mr-1 ${"texture-hud_char_gt" satisfies TextureTailwindClass}`}
    />
    <CommandPrimitive.Input
      className={cn(
        "flex h-1 w-full bg-pastelBlue zx:bg-zxCyan toppy:bg-toppyCool1 py-1 outline-none placeholder:text-shadow zx:placeholder:text-zxBlack toppy:placeholder:text-toppyGrey4 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  </div>
);

const CommandList = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
);

const CommandEmpty = (props: ComponentProps<typeof CommandPrimitive.Empty>) => (
  <CommandPrimitive.Empty className="pl-1" {...props} />
);

const CommandGroup = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group
    className={cn("overflow-hidden", className)}
    {...props}
  />
);

const CommandItem = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Item>) => (
  <CommandPrimitive.Item
    className={cn(
      "relative flex cursor-default select-none items-center text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-midRed zx:data-[selected='true']:bg-zxRed toppy:data-[selected='true']:bg-toppyPink2 hover:bg-pastelBlue zx:hover:bg-zxCyan toppy:hover:bg-toppyCool1 data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
);

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
};
