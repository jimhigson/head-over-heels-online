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
      class={cn(
        // children keep their height so the list scrolls, rather than all
        // shrinking to fit it:
        "overflow-y-auto overflow-x-hidden flex-grow flex flex-col [&>*]:shrink-0",
        className,
      )}
      {...props}
    />
  );
};
