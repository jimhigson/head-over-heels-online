import { useRef, useState } from "react";

import { multilineTextClass } from "../../../game/components/dialogs/menuDialog/multilineTextClass";
import { BitmapText } from "../../../game/components/tailwindSprites/BitmapText";
import { useAppDispatch } from "../../../store/hooks";
import { Border } from "../../../ui/Border";
import { Button } from "../../../ui/Button";
import { Dialog } from "../../../ui/Dialog";
import { DialogPortal } from "../../../ui/DialogPortal";
import { useKeyboardShortcut } from "../../../ui/useKeyboardShortcut";
import { newCampaign } from "../../slice/levelEditorSlice";
import { useRemoteIsInSync } from "../saving/useRemoteIsInSync";
import { ToolbarButton } from "./ToolbarButton";

const ConfirmNewCampaignDialog = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useKeyboardShortcut(["Escape"], false, onClose, dialogRef.current);
  useKeyboardShortcut(
    ["Enter", "NumpadEnter"],
    false,
    onConfirm,
    dialogRef.current,
  );

  return (
    <DialogPortal>
      <Border className="scale-editor bg-checkerboard-stifled-alphas" />
      <div className="contents no-keyboard-shortcuts">
        <Dialog ref={dialogRef} wide className="scale-editor p-1 !h-min">
          <BitmapText className="text-white sprites-double-height bg-midRed text-center py-half">
            New campaign
          </BitmapText>
          <BitmapText className={`${multilineTextClass} text-lightGrey pt-1`}>
            You have unsaved changes. Starting a new campaign will discard them.
          </BitmapText>
          <div className="flex gap-1 justify-end text-white items-center mt-1">
            <Button onClick={onClose} className="px-1 py-half self-stretch">
              <BitmapText>Cancel</BitmapText>
            </Button>
            <Button onClick={onConfirm} className="bg-midRed px-1 py-half">
              <BitmapText>Discard and start new</BitmapText>
            </Button>
          </div>
        </Dialog>
      </div>
    </DialogPortal>
  );
};

export const NewCampaignButton = () => {
  const dispatch = useAppDispatch();
  const savedIsInSync = useRemoteIsInSync();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const doNew = () => {
    dispatch(newCampaign());
    setConfirmDialogOpen(false);
  };

  return (
    <>
      <ToolbarButton
        onClick={() => {
          if (savedIsInSync) {
            doNew();
          } else {
            setConfirmDialogOpen(true);
          }
        }}
        tooltipContent={
          "## New Campaign\nCreate a new campaign, starting from one empty room"
        }
      >
        <BitmapText className="relative leading-none">NEW</BitmapText>
      </ToolbarButton>
      {confirmDialogOpen && (
        <ConfirmNewCampaignDialog
          onClose={() => setConfirmDialogOpen(false)}
          onConfirm={doNew}
        />
      )}
    </>
  );
};
