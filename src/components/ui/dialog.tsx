"use client";

import {
  Dialog as RadixDialog,
  DialogContent as RadixDialogContent,
  DialogTitle as RadixDialogTitle,
  DialogPortal as RadixDialogPortal,
} from "@radix-ui/react-dialog";

import { ScaleFactorContext } from "@/game/components/ScaleFactorContext";
import type { ReactNode } from "react";
import { useContext } from "react";
import { twMerge } from "tailwind-merge";

export type DialogProps = {
  children: ReactNode;
  className?: string;
};

export const Dialog = ({ children, className }: DialogProps) => {
  const scaleFactor = useContext(ScaleFactorContext);

  return (
    <RadixDialog open={true} modal={false}>
      <RadixDialogPortal>
        <RadixDialogContent
          className={twMerge(
            `max-w-dialog${scaleFactor} bg-pureBlack fixed left-[50%] z-50 top-[50%] translate-y-[-50%] h-fit max-h-screen w-full overflow-y-hidden translate-x-[-50%]`,
            className,
          )}
          aria-describedby={undefined}
        >
          {/* keep radix happy with an empty title: */}
          <RadixDialogTitle />
          {children}
        </RadixDialogContent>
      </RadixDialogPortal>
    </RadixDialog>
  );
};
