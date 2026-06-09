import { type ComponentProps } from "react";

import { cn } from "../cn";
import { useCommandContext } from "./useCommandContext";

/** renders its children only when no items match the current filter */
export const CommandEmpty = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const { resultCount } = useCommandContext();
  if (resultCount > 0) {
    return null;
  }
  return <div className={cn("pl-1", className)} {...props} />;
};
