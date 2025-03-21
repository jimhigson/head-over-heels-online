"use client";

import type { MouseEvent, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type DialogProps = {
  children?: ReactNode;
  className?: string;
  closed?: boolean;
  // if true, css classes will be given to make the dialog only
  // a little less tall than the page. Otherwise, it will be the
  // scaled height of a zx spectrum resolution
  tall?: boolean;
  wide?: boolean;
  /** click (or tap) handler for anywhere on the div; usually for closing the dialog */
  onClick?: (e: MouseEvent) => void;
};

export const Dialog = ({
  children,
  className,
  onClick,
  tall = false,
  wide = false,
}: DialogProps) => {
  return (
    <dialog
      className={twMerge(
        // px-0: put scroll bar on menu items up against the edge of the dialog
        "p-1 px-0 fixed left-[50%] z-dialog top-[50%] translate-y-[-50%] translate-x-[-50%] " +
          "m-0 " + //override dialog default in tw3, not needed in tw4
          (tall ? "h-tallDialog portrait-rot:h-wideDialog " : "h-zx ") +
          (wide ?
            "w-wideDialog portrait-rot:w-tallDialog max-w-widestDialog "
          : "w-zx ") +
          "portrait-rot:rotate-90 " +
          "leading-none flex flex-col gap-y-1 " +
          // take up full screen width at the lowest res, possibly transverse:
          "resHandheld:h-full portrait-rot:resHandheld:h-fullScrW resHandheld:w-full portrait-rot:resHandheld:w-fullScrH resHandheld:py-0 " +
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
