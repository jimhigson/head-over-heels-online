import { type ReactNode, useCallback, useState } from "react";

import { multilineTextClass } from "../../game/components/dialogs/menuDialog/multilineTextClass";
import { BitmapText } from "../../game/components/tailwindSprites/BitmapText";
import { Border } from "../../ui/Border";
import { Button } from "../../ui/Button";
import { Dialog } from "../../ui/Dialog";
import { DialogPortal } from "../../ui/DialogPortal";
import { useKeyboardShortcut } from "../../ui/useKeyboardShortcut";

export type ConfirmDialogProps = {
  heading: string;
  body: ReactNode | string;
  cancelText: string;
  onCancel: () => void;
  okText: string;
  onOk: () => void;
};

export const ConfirmDialog = ({
  heading,
  body,
  cancelText,
  onCancel,
  okText,
  onOk,
}: ConfirmDialogProps) => {
  const [dialogEl, setDialogEl] = useState<HTMLDialogElement | null>(null);
  const dialogRef = useCallback((el: HTMLDialogElement | null) => {
    setDialogEl(el);
    el?.focus();
  }, []);

  useKeyboardShortcut(["Escape"], false, onCancel, dialogEl);
  useKeyboardShortcut(["Enter", "NumpadEnter"], false, onOk, dialogEl);

  return (
    <DialogPortal>
      <Border className="scale-editor bg-checkerboard-stifled-alphas" />
      <div className="contents no-keyboard-shortcuts">
        <Dialog ref={dialogRef} wide className="scale-editor p-1 !h-min">
          <BitmapText className="text-white sprites-double-height bg-midRed text-center py-half">
            {heading}
          </BitmapText>
          <div className="text-lightGrey pt-1">
            {typeof body === "string" ?
              <BitmapText className={multilineTextClass}>{body}</BitmapText>
            : body}
          </div>
          <div className="flex gap-1 justify-end text-white items-center mt-1">
            <Button
              onClick={onCancel}
              className="px-1 py-half self-stretch"
              autoFocus
            >
              <BitmapText>{cancelText}</BitmapText>
            </Button>
            <Button onClick={onOk} className="bg-midRed px-1 py-half">
              <BitmapText>{okText}</BitmapText>
            </Button>
          </div>
        </Dialog>
      </div>
    </DialogPortal>
  );
};
