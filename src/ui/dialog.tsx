"use client";

import type { MouseEvent, ReactNode, Ref } from "react";
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
  /** if true, css classes will be given to make the dialog full screen (no border) */
  fullScreen?: boolean;
  /** if small, will be as small as it can be to fit the content */
  small?: boolean;
  /** click (or tap) handler for anywhere on the div; usually for closing the dialog */
  onClick?: (e: MouseEvent) => void;
  ref?: Ref<HTMLDialogElement>;
};

const getDialogClassName = (
  tall: boolean,
  wide: boolean,
  fullScreen: boolean,
  small: boolean,
  className?: string,
) => {
  return twMerge(
    "fixed " +
      // px-0: put scroll bar on menu items up against the edge of the dialog
      "p-1 px-0 " +
      "m-0 " + //override dialog (no reset for dialogs in tw3, not needed in tw4)
      "z-dialog " +
      (small ? "h-min w-min "
      : fullScreen ?
        "h-full portrait-rot:h-fullScrW w-full portrait-rot:w-fullScrH "
        // h-zx shouldn't apply when not fullscreen
      : (tall ? "h-tallDialog portrait-rot:h-wideDialog " : "h-zx ") +
        (wide ?
          "w-wideDialog portrait-rot:w-tallDialog max-w-widestDialog "
        : "w-zx ")) +
      // centre the dialog:
      "left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] " +
      // even without fullscreen, take up full screen width at the lowest res, possibly transverse:
      "resHandheld:h-full portrait-rot:resHandheld:h-fullScrW resHandheld:w-full portrait-rot:resHandheld:w-fullScrH resHandheld:py-0 " +
      "portrait-rot:rotate-90 " +
      "leading-none flex flex-col gap-y-1 " +
      // bring away from a 'notch on mobile devices:
      "mobile:pl-2",
    className,
  );
};

export const Dialog = ({
  children,
  className,
  onClick,
  tall = false,
  wide = false,
  fullScreen = false,
  small = false,
  ref,
}: DialogProps) => {
  return (
    <dialog
      ref={ref}
      className={getDialogClassName(tall, wide, fullScreen, small, className)}
      onClick={onClick}
    >
      {children}
    </dialog>
  );
};
