import { type ComponentProps } from "react";

import { cn } from "../cn";
import { useCommandContext } from "./useCommandContext";

export const CommandList = ({ className, ...props }: ComponentProps<"div">) => {
  const { listRef } = useCommandContext();
  return (
    <div
      ref={listRef}
      role="listbox"
      className={cn(
        "max-h-[300px] overflow-y-auto overflow-x-hidden",
        className,
      )}
      {...props}
    />
  );
};
