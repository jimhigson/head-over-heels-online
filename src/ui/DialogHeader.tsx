import { type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export type DialogHeaderProps = PropsWithChildren<{ className?: string }>;

export const DialogHeader = ({ children, className }: DialogHeaderProps) => (
  <div className={twMerge("text-white bg-midRed text-center px-1", className)}>
    <span className="text-double-height">{children}</span>
  </div>
);
