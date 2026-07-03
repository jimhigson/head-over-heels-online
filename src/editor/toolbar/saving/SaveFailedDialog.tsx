import { useState } from "preact/hooks";

import { type SaveFailure } from "../../../db/campaign";
import { Border } from "../../../ui/Border";
import { Button } from "../../../ui/Button";
import { Dialog } from "../../../ui/Dialog";
import { DialogHeader } from "../../../ui/DialogHeader";
import { DialogPortal } from "../../../ui/DialogPortal";

export type SaveFailedDialogProps = {
  failure: SaveFailure;
  /** force-save, overwriting the newer work (conflicts only) */
  onForceSave: () => void;
  /** discard local changes and load the latest (conflicts only) */
  onLoadLatest: () => void;
  /** try the save again unchanged (network / other) */
  onRetry: () => void;
  onClose: () => void;
};

const bodyText = (failure: SaveFailure): string => {
  switch (failure.type) {
    case "conflict":
      return failure.latest === undefined ?
          "There's already a newer version than the one you’re trying to save"
        : `There's already a newer version than the one you’re trying to save (v${failure.latest})`;
    case "auth":
      return "You are not signed in - log in and try again.";
    case "network":
      return "Could not reach the server. Check your connection and try again.";
    case "other":
      return failure.message;
    default:
      failure.type satisfies never;
      throw new Error();
  }
};

export const SaveFailedDialog = ({
  failure,
  onForceSave,
  onLoadLatest,
  onRetry,
  onClose,
}: SaveFailedDialogProps) => {
  // the force-save needs two clicks - the label flips to "are you sure?" first
  const [confirmingForce, setConfirmingForce] = useState(false);

  return (
    <DialogPortal>
      <Border class="scale-editor bg-checkerboard-stifled-alphas" />
      <div class="contents no-keyboard-shortcuts">
        <Dialog small ariaLabel="Save failed" class="scale-editor p-1 !h-min">
          <DialogHeader>Save failed</DialogHeader>
          <span class="text-multi-line text-lightGrey pt-1">
            {bodyText(failure)}
          </span>
          <div class="flex gap-1 justify-end text-white mt-1">
            <Button class="px-1 py-half" onClick={onClose} aria-label="Cancel">
              Cancel
            </Button>
            {failure.type === "conflict" && (
              <>
                <Button
                  class="px-1 py-half"
                  onClick={onLoadLatest}
                  aria-label="Load the latest version, discarding my changes"
                >
                  Load latest (discard my changes)
                </Button>
                <Button
                  class="px-1 py-half bg-midRed"
                  onClick={() =>
                    confirmingForce ? onForceSave() : setConfirmingForce(true)
                  }
                  aria-label="Force save, overwriting newer work"
                >
                  {confirmingForce ?
                    "Click again to confirm overwrite"
                  : "Force save (overwrite newer work)"}
                </Button>
              </>
            )}
            {(failure.type === "network" || failure.type === "other") && (
              <Button
                class="px-1 py-half bg-midRed text-moss"
                onClick={onRetry}
                aria-label="Retry the save"
              >
                Retry
              </Button>
            )}
          </div>
        </Dialog>
      </div>
    </DialogPortal>
  );
};
