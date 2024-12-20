import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useContext, type ReactNode } from "react";
import { ScaleFactorContext } from "./GameOverlayDialogs";

export type GameDialogProps = {
  content: ReactNode;
};

export const GameDialog = ({ content }: GameDialogProps) => {
  const scaleFactor = useContext(ScaleFactorContext);
  return (
    <Dialog open={true} modal={false}>
      <DialogContent
        className={`max-w-dialog${scaleFactor} bg-highlightBeige`}
        aria-describedby={undefined}
      >
        {content}
      </DialogContent>
    </Dialog>
  );
};
