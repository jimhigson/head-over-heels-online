import type { ComponentProps } from "react";

import { Command as CommandPrimitive } from "cmdk";

import { cn } from "./cn";

const Command = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive>) => (
  <CommandPrimitive
    className={cn(
      "flex h-full w-full flex-col overflow-hidden bg-metallicBlue text-popover-foreground",
      className,
    )}
    {...props}
  />
);

const CommandInput = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Input>) => (
  <div className="flex items-center border-b px-1 pb-1" cmdk-input-wrapper="">
    <span className="sprite mr-1 texture-hud_char_gt" />
    <CommandPrimitive.Input
      className={cn(
        "flex h-1 w-full bg-pastelBlue py-1 outline-none placeholder:text-shadow disabled:cursor-not-allowed",
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

const CommandSeparator = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Separator>) => (
  <CommandPrimitive.Separator
    className={cn("-mx-1 h-px bg-shadow", className)}
    {...props}
  />
);

const CommandItem = ({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Item>) => (
  <CommandPrimitive.Item
    className={cn(
      "relative flex cursor-default select-none items-center text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-midRed hover:bg-pastelBlue data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
);

const CommandShortcut = ({ className, ...props }: ComponentProps<"span">) => (
  <span
    className={cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
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
  CommandShortcut,
  CommandSeparator,
};
