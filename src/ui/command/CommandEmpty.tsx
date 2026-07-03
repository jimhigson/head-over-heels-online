import { type ComponentProps } from "preact";

import { cn } from "../cn";
import { useCommandContext } from "./useCommandContext";

/** renders its children only when no items match the current filter */
export const CommandEmpty = ({
  class: className,
  ...props
}: Omit<ComponentProps<"div">, "className">) => {
  const { resultCount } = useCommandContext();
  if (resultCount > 0) {
    return null;
  }
  return <div class={cn("pl-1", className)} {...props} />;
};
