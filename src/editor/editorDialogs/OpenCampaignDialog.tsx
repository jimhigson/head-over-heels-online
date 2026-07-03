import { useEffect, useRef } from "preact/hooks";

import { type CampaignDirectory } from "../../db/campaign";
import { type CampaignLocator } from "../../model/modelTypes";
import { useGetAllUsersLatestCampaignsQuery } from "../../store/slices/campaigns/editorCampaignsApiSlice";
import { Border } from "../../ui/Border";
import { Button } from "../../ui/Button";
import { Dialog } from "../../ui/Dialog";
import { DialogPortal } from "../../ui/DialogPortal";
import { NonIdealState } from "../../ui/NonIdealState";
import { SpinnerHead } from "../../ui/Spinner";
import { useKeyboardShortcut } from "../../ui/useKeyboardShortcut";
import { emptyObject } from "../../utils/empty";
import { CampaignListForEditor } from "./CampaignListForEditor";

export const OpenCampaignDialog = ({
  /**
   * Callback to close the dialog
   */
  onClose,
  /**
   * Callback when open is clicked, receives the campaign locator
   */
  onDone,
}: {
  onClose: () => void;
  onDone: (param: { campaignLocator: CampaignLocator }) => void;
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const { data, error, isLoading, refetch } =
    useGetAllUsersLatestCampaignsQuery({ publishedOnly: false });

  // Force refetch on mount to get latest campaigns
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Keyboard shortcuts for the dialog
  useKeyboardShortcut(["Escape"], false, onClose, dialogRef.current);

  const handleSelect = (campaignLocator: CampaignLocator) => {
    onDone({ campaignLocator });
  };

  return (
    <DialogPortal>
      <Border className="scale-editor bg-checkerboard-stifled-alphas" />
      {/* stop window-level shortcuts catching our keypresses that match their shortcuts */}
      <div className="contents no-keyboard-shortcuts">
        <Dialog
          ref={dialogRef}
          tall
          wide
          ariaLabel="Open campaign"
          className="scale-editor p-1"
        >
          <div className="text-white bg-midRed text-center py-half">
            <span className="text-double-height">Open Campaign</span>
          </div>

          {isLoading ?
            // while loading, only the spinner shows - no clickable options yet
            <SpinnerHead loadingBorder />
          : <>
              {error !== undefined ?
                <NonIdealState
                  text="Could not reach the database"
                  className="h-6 mt-1"
                />
              : null}
              {/* the original campaign is bundled with the game, so the list -
              which always includes it - can be shown even when the community
              directory can't be reached, in which case only the original is
              offered */}
              <CampaignListForEditor
                campaigns={data ?? (emptyObject as CampaignDirectory)}
                onSelect={handleSelect}
              />
            </>
          }

          <div className="flex gap-1 justify-end text-white">
            <Button
              onClick={onClose}
              aria-label="Create new campaign"
              className="px-1 py-half bg-moss"
            >
              <span className="text-single-line">Create New</span>
            </Button>
            <Button
              onClick={onClose}
              className="px-1 py-half"
              shortcutKeys={["Escape"]}
            >
              <span className="text-single-line">Cancel</span>
            </Button>
          </div>
        </Dialog>
      </div>
    </DialogPortal>
  );
};
