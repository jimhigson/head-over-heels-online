"use client";

import {
  Dialog as RadixDialog,
  DialogContent as RadixDialogContent,
  DialogTitle as RadixDialogTitle,
  DialogPortal as RadixDialogPortal,
} from "@radix-ui/react-dialog";

import type { ComponentPropsWithRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { CssVariables } from "../../game/components/CssVariables";

export type DialogProps = ComponentPropsWithRef<"div"> & {
  children: ReactNode;
  className?: string;
  /** if you know the spectrum, you know this */
  borderClassName?: string;
  closed?: boolean;
};

export const Dialog = ({
  children,
  className,
  borderClassName,
  ref,
}: DialogProps) => {
  return (
    <RadixDialog open={true} modal={false}>
      <RadixDialogPortal>
        <CssVariables>
          {/* css variables don't flow through react portals, so repeat it here: */}
          {borderClassName && <DialogBorder className={borderClassName} />}
          <RadixDialogContent
            ref={ref}
            className={twMerge(
              `p-1 w-zx fixed left-[50%] z-50 top-[50%] translate-y-[-50%] translate-x-[-50%] h-zx leading-none flex flex-col gap-y-1`,
              className,
            )}
            aria-describedby={undefined}
          >
            {/* keep radix happy with an empty title: */}
            <RadixDialogTitle className="hidden" />
            {children}
          </RadixDialogContent>
        </CssVariables>
      </RadixDialogPortal>
    </RadixDialog>
  );
};

export const DialogBorder = ({ className }: { className: string }) => {
  return <div className={`fixed inset-0 ${className}`} />;
};
