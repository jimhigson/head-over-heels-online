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
    <dialog
      className={twMerge(
        // pr-0: put scroll bar on menu items up against the edge of the dialog
        "p-1 pr-0 fixed left-[50%] z-dialog top-[50%] translate-y-[-50%] translate-x-[-50%] h-zx w-zx m-0 " +
          "leading-none flex flex-col gap-y-1 " +
          // take up full screen width at the lowest res:
          "resGameboy:h-full resGameboy:w-full resGameboy:py-0 " +
          // bring away from a 'notch on mobile devices:
          "mobile:pl-2",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </dialog>
  );
};
