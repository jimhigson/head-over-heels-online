import { Border } from "../../../ui/Border";
import { Button } from "../../../ui/Button";
import { Dialog } from "../../../ui/Dialog";
import { DialogHeader } from "../../../ui/DialogHeader";
import { DialogPortal } from "../../../ui/DialogPortal";

export type StaleVersionDialogProps = {
  /** the version we have loaded */
  ours: number;
  /** the newer version the db holds */
  latest: number;
  onLoadLatest: () => void;
  onDismiss: () => void;
};

/**
 * Warns that the db holds a newer version of the loaded campaign than the one
 * being edited (e.g. saved from another device, or by another editor). Dismissible.
 */
export const StaleVersionDialog = ({
  ours,
  latest,
  onLoadLatest,
  onDismiss,
}: StaleVersionDialogProps) => {
  return (
    <DialogPortal>
      <Border class="scale-editor bg-checkerboard-stifled-alphas" />
      <div class="contents no-keyboard-shortcuts">
        <Dialog
          small
          ariaLabel="A newer version exists in the database"
          class="scale-editor p-1 !h-min"
        >
          <DialogHeader>Newer version in the database</DialogHeader>
          <span class={`text-multi-line text-lightGrey pt-1`}>
            {`A newer version of this campaign (v${latest}) is in the database — you are editing v${ours}.`}
          </span>
          <span class={`text-multi-line text-lightGrey pt-1`}>
            {`Load the latest to get it (your unsaved changes will be lost), or keep editing this version.`}
          </span>
          <div class="flex gap-1 justify-end text-white mt-1">
            <Button
              class="px-1 py-half bg-midRed"
              onClick={onDismiss}
              aria-label="Keep editing this version"
            >
              Keep editing
            </Button>
            <Button
              class="px-1 py-half bg-moss"
              onClick={onLoadLatest}
              aria-label="Load the latest version"
            >
              Load latest
            </Button>
          </div>
        </Dialog>
      </div>
    </DialogPortal>
  );
};
