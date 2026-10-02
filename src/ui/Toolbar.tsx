import { type PropsWithChildren } from "preact/compat";
import { type EmptyObject } from "type-fest";

import { cn } from "./cn";

export type ToolbarProps = PropsWithChildren<{
  class?: string;
  ariaLabel: string;
  ariaDescription: string;
}>;

/** a scrolling panel of {@link ToolbarSection}s, wrapping as space allows */
export const Toolbar = ({
  class: className,
  ariaLabel,
  ariaDescription,
  children,
}: ToolbarProps) => (
  <div
    class={cn(
      "flex w-full h-full text-white bg-metallicBlueHalfbrite pb-1 gap-1 flex-wrap justify-start overflow-auto scrollbar scrollbar-w-1 scrollbar-thumb-shadow",
      className,
    )}
    // a group can carry a label; toolbar would also promise arrow-key navigation
    role="group"
    aria-label={ariaLabel}
    aria-description={ariaDescription}
  >
    {children}
  </div>
);

export type ToolbarSectionProps = PropsWithChildren<{
  class?: string;
}>;

/**
 * a group of related controls in a toolbar: an optional
 * {@link ToolbarSectionHeader} then {@link ToolbarSectionContents}
 */
export const ToolbarSection = ({
  class: className,
  children,
}: ToolbarSectionProps) => (
  <section class={cn("flex flex-col gap-oneScaledPix w-full", className)}>
    {children}
  </section>
);

export type ToolbarSectionContentsProps = PropsWithChildren<{
  class?: string;
}>;

/** the controls of a {@link ToolbarSection}, wrapping onto as many lines as needed */
export const ToolbarSectionContents = ({
  class: className,
  children,
}: ToolbarSectionContentsProps) => (
  <div class={cn("flex flex-wrap gap-oneScaledPix w-full", className)}>
    {children}
  </div>
);

export type ToolbarSectionHeaderProps = PropsWithChildren<EmptyObject>;

/** the heading of a {@link ToolbarSection}, on a line of its own */
export const ToolbarSectionHeader = ({
  children,
}: ToolbarSectionHeaderProps) => (
  <h2 class="w-full mt-1 text-white bg-redShadow">{children}</h2>
);
