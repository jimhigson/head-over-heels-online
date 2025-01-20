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
        <div className={`fixed inset-0 ${borderClassName}`} />
        {/* css variables don't flow through react portals, so repeat it here: */}
        <CssVariables>
          <RadixDialogContent
            ref={ref}
            className={twMerge(
              `p-1 w-zx fixed left-[50%] z-50 top-[50%] translate-y-[-50%] h-fit max-h-screen overflow-y-hidden translate-x-[-50%]`,
              className,
            )}
            aria-describedby={undefined}
          >
            {/* keep radix happy with an empty title: */}
            <RadixDialogTitle />
            {children}
          </RadixDialogContent>
        </CssVariables>
      </RadixDialogPortal>
    </RadixDialog>
  );
};
