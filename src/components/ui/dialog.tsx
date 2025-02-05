"use client";

import type { MouseEvent, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { CssVariables } from "../../game/components/CssVariables";
import { createPortal } from "react-dom";

export type DialogProps = {
  children: ReactNode;
  className?: string;
  /** if you know the spectrum, you know this */
  borderClassName?: string;
  closed?: boolean;
  /** click handler for anywhere on the div */
  onClick?: (e: MouseEvent) => void;
};

export const Dialog = ({
  children,
  className,
  borderClassName,
  onClick,
}: DialogProps) => {
  return createPortal(
    <CssVariables>
      {/* css variables don't flow through react portals, so repeat it here: */}
      {borderClassName && <DialogBorder className={borderClassName} />}
      <div
        className={twMerge(
          `p-1 w-zx fixed left-[50%] z-50 top-[50%] translate-y-[-50%] translate-x-[-50%] h-zx leading-none flex flex-col gap-y-1`,
          className,
        )}
        onClick={onClick}
      >
        {children}
      </div>
    </CssVariables>,
    document.body,
  );
};

export const DialogBorder = ({ className }: { className: string }) => {
  return <div className={`fixed inset-0 ${className}`} />;
};
