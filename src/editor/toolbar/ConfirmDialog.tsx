import { type ComponentChildren } from "preact";
import { useCallback, useState } from "preact/hooks";

import { Border } from "../../ui/Border";
import { Button } from "../../ui/Button";
import { Dialog } from "../../ui/Dialog";
import { DialogPortal } from "../../ui/DialogPortal";
import { useKeyboardShortcut } from "../../ui/useKeyboardShortcut";

export type ConfirmDialogProps = {
  heading: string;
  body: ComponentChildren | string;
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
      <Border class="scale-editor bg-checkerboard-stifled-alphas" />
      <div class="contents no-keyboard-shortcuts">
        <Dialog ref={dialogRef} wide class="scale-editor p-1 !h-min">
          <div class="text-white bg-midRed text-center py-half">
            <span class="text-double-height">{heading}</span>
          </div>
          <div class="text-lightGrey pt-1">
            {typeof body === "string" ?
              <span class="text-multi-line">{body}</span>
            : body}
          </div>
          <div class="flex gap-1 justify-end text-white items-center mt-1">
            <Button
              aria-label={cancelText}
              onClick={onCancel}
              class="px-1 py-half self-stretch"
              autoFocus
            >
              <span class="text-single-line">{cancelText}</span>
            </Button>
            <Button
              aria-label={okText}
              onClick={onOk}
              class="bg-midRed px-1 py-half"
            >
              <span class="text-single-line">{okText}</span>
            </Button>
          </div>
        </Dialog>
      </div>
    </DialogPortal>
  );
};
