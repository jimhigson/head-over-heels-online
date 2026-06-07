import { type ComponentProps, type ReactNode } from "react";

import { cn } from "../cn";

export type CommandGroupProps = Omit<ComponentProps<"div">, "title"> & {
  /** optional heading rendered above the group's items */
  heading?: ReactNode;
};

export const CommandGroup = ({
  className,
  heading,
  children,
  ...props
}: CommandGroupProps) => (
  <div role="group" className={cn("overflow-hidden", className)} {...props}>
    {heading}
    {children}
  </div>
);
