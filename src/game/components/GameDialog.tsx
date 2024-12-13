import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { ReactNode } from "react";

export type GameDialogProps = {
  content: ReactNode;
};

export const GameDialog = ({ content }: GameDialogProps) => {
  return (
    <Dialog open={true} modal={false}>
      <DialogContent className="bg-highlightBeige" aria-describedby={undefined}>
        {content}
      </DialogContent>
    </Dialog>
  );
};
