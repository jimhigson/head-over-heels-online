import { useEffect, useRef } from "react";

import type { CampaignLocator } from "../../model/modelTypes";

import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { useGetAllUsersLatestCampaignsQuery } from "../../store/slices/campaigns/campaignsApiSlice";
import { Border } from "../../ui/Border";
import { Button } from "../../ui/button";
import { Dialog } from "../../ui/dialog";
import { DialogPortal } from "../../ui/DialogPortal";
import { NonIdealState } from "../../ui/NonIdealState";
import { SpinnerHead } from "../../ui/Spinner";
import { useKeyboardShortcut } from "../../ui/useKeyboardShortcut";
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
        <Dialog ref={dialogRef} tall wide className="scale-editor p-1">
          <BitmapText className="text-white sprites-double-height bg-midRed text-center py-half">
            Open Campaign
          </BitmapText>

          {error !== undefined ?
            <NonIdealState text="Failed to load campaigns" />
          : null}

          {isLoading ?
            <SpinnerHead />
          : null}

          {data !== undefined ?
            <CampaignListForEditor campaigns={data} onSelect={handleSelect} />
          : null}

          <div className="flex gap-1 justify-end text-white">
            <Button onClick={onClose} className="px-1 py-half bg-moss">
              <BitmapText>Create New</BitmapText>
            </Button>
            <Button onClick={onClose} className="px-1 py-half">
              <BitmapText>Cancel</BitmapText>
            </Button>
          </div>
        </Dialog>
      </div>
    </DialogPortal>
  );
};
