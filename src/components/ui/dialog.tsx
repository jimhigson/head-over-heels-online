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

export type DialogProps = {
  children: ReactNode;
};

export const Dialog = ({ children }: DialogProps) => {
  const scaleFactor = useContext(ScaleFactorContext);

  return (
    <RadixDialog open={true} modal={false}>
      <RadixDialogPortal>
        <RadixDialogContent
          className={`max-w-dialog${scaleFactor} bg-highlightBeige fixed left-[50%] z-50 top-[50%] translate-y-[-50%] h-fit max-h-screen w-full overflow-y-hidden translate-x-[-50%] gap-4 bg-background shadow-lg`}
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
