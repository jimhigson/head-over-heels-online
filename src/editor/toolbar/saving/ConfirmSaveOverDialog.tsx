import { Border } from "../../../ui/Border";
import { Button } from "../../../ui/Button";
import { Dialog } from "../../../ui/Dialog";
import { DialogHeader } from "../../../ui/DialogHeader";
import { DialogPortal } from "../../../ui/DialogPortal";

export type ConfirmSaveOverDialogProps = {
  campaignName: string;
  /** the latest version already in the db for this name */
  latest: number;
  onConfirm: () => void;
  onClose: () => void;
};

/**
 * shown when "save as" targets a name the user has already saved - saving
 * stacks a new version on top; nothing is destroyed
 */
export const ConfirmSaveOverDialog = ({
  campaignName,
  latest,
  onConfirm,
  onClose,
}: ConfirmSaveOverDialogProps) => {
  return (
    <DialogPortal>
      <Border class="scale-editor bg-checkerboard-stifled-alphas" />
      <div class="contents no-keyboard-shortcuts">
        <Dialog
          small
          ariaLabel="Campaign already exists"
          class="scale-editor p-1 !h-min"
        >
          <DialogHeader>Already exists</DialogHeader>
          <span class="text-multi-line text-lightGrey pt-1">
            You already have a campaign called ‘
            <span class="text-midGrey">{campaignName}</span>’ at v{latest}.
          </span>
          <span class="text-multi-line text-lightGrey pt-1">
            Overwrite it and make current campaign v{latest + 1}?
          </span>
          <div class="flex gap-1 justify-end text-white mt-1">
            <Button class="px-1 py-half" onClick={onClose} aria-label="Cancel">
              Cancel
            </Button>
            <Button
              class="px-1 py-half bg-midRed"
              onClick={onConfirm}
              aria-label="Save a new version over the existing campaign"
            >
              Save new version
            </Button>
          </div>
        </Dialog>
      </div>
    </DialogPortal>
  );
};
