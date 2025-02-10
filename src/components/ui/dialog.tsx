"use client";

import type { MouseEvent, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type DialogProps = {
  children?: ReactNode;
  className?: string;
  closed?: boolean;
  /** click (or tap) handler for anywhere on the div; usually for closing the dialog */
  onClick?: (e: MouseEvent) => void;
};

export const Dialog = ({ children, className, onClick }: DialogProps) => {
  return (
    <div
      className={twMerge(
        // pr-0: put scroll bar on menu items up against the edge of the dialog
        `p-1 pr-0 fixed left-[50%] z-50 top-[50%] translate-y-[-50%] translate-x-[-50%] h-zx w-zx leading-none flex flex-col gap-y-1`,
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

/**
 * if you know the spectrum, you know this - the unusable/unused
 * area around the dialog
 */
export const Border = ({
  className,
  onClick,
}: {
  className?: string;
  /** click (or tap) handler for anywhere on the div; usually for closing the dialog */
  onClick?: (e: MouseEvent) => void;
}) => {
  return (
    <div
      className={`fixed inset-0 ${className ? className : ""}`}
      onClick={onClick}
    />
  );
};
