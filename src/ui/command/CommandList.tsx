import { type ComponentProps } from "preact";

import { cn } from "../cn";
import { useCommandContext } from "./useCommandContext";

export const CommandList = ({
  class: className,
  ...props
}: Omit<ComponentProps<"div">, "className">) => {
  const { listRef } = useCommandContext();
  return (
    <div
      ref={listRef}
      role="listbox"
      class={cn("overflow-y-auto overflow-x-hidden flex-grow", className)}
      {...props}
    />
  );
};
