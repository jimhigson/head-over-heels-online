"use client";

import {
  Dialog as RadixDialog,
  DialogContent as RadixDialogContent,
  DialogTitle as RadixDialogTitle,
  DialogPortal as RadixDialogPortal,
} from "@radix-ui/react-dialog";

import {
  CssVariables,
  ScaleFactorContext,
} from "@/game/components/ScaleFactorContext";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { useContext } from "react";
import { twMerge } from "tailwind-merge";

export type DialogProps = ComponentPropsWithRef<"div"> & {
  children: ReactNode;
  className?: string;
};

export const Dialog = ({ children, className, ref }: DialogProps) => {
  const scaleFactor = useContext(ScaleFactorContext);

  return (
    <RadixDialog open={true} modal={false}>
      <RadixDialogPortal>
        {/* css variables don't flow through react portals, so repeat it here: */}
        <CssVariables scaleFactor={scaleFactor}>
          <RadixDialogContent
            ref={ref}
            className={twMerge(
              `p-1 max-w-zx bg-pureBlack fixed left-[50%] z-50 top-[50%] translate-y-[-50%] h-fit max-h-screen w-full overflow-y-hidden translate-x-[-50%]`,
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
