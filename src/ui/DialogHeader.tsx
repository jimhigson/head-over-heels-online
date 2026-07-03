import { type PropsWithChildren } from "preact/compat";
import { twMerge } from "tailwind-merge";

export type DialogHeaderProps = PropsWithChildren<{ class?: string }>;

export const DialogHeader = ({
  children,
  class: className,
}: DialogHeaderProps) => (
  <div class={twMerge("text-white bg-midRed text-center px-1", className)}>
    <span class="text-double-height">{children}</span>
  </div>
);
