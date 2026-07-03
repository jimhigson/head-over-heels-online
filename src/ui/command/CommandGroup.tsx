import { type ComponentChildren, type ComponentProps } from "preact";

import { cn } from "../cn";

export type CommandGroupProps = Omit<
  ComponentProps<"div">,
  "className" | "title"
> & {
  /** optional heading rendered above the group's items */
  heading?: ComponentChildren;
};

export const CommandGroup = ({
  class: className,
  heading,
  children,
  ...props
}: CommandGroupProps) => (
  <div role="group" class={cn("overflow-hidden", className)} {...props}>
    {heading}
    {children}
  </div>
);
