import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../../store/store";

import { BitmapText } from "../../game/components/tailwindSprites/BitmapText";
import { useAppSelector } from "../../store/hooks";
import { campaignsApiSlice } from "../../store/slices/campaigns/campaignsApiSlice";
import { Dialog } from "../../ui/Dialog";
import { DialogPortal } from "../../ui/DialogPortal";
import { LoadingBorder } from "../../ui/LoadingBorder";
import { SpinnerHead, SpinnerHeels } from "../../ui/Spinner";

const selectIsLoadingCampaign = createSelector(
  [(state: RootState) => state[campaignsApiSlice.reducerPath].queries],
  (queries) =>
    Object.entries(queries ?? {}).some(
      ([key, query]) =>
        key.startsWith("getCampaign(") && query?.status === "pending",
    ),
);

export const LoadingCampaignDialog = () => {
  const isLoading = useAppSelector(selectIsLoadingCampaign);

  if (!isLoading) {
    return null;
  }

  return (
    <DialogPortal>
      <LoadingBorder />
      <div className="contents no-keyboard-shortcuts">
        <Dialog wide className="scale-editor p-1 !h-min">
          <BitmapText className="text-white sprites-double-height bg-midRed text-center py-half">
            Loading campaign...
          </BitmapText>
          <div className="flex flex-row justify-center gap-1">
            <SpinnerHead />
            <SpinnerHeels />
          </div>
        </Dialog>
      </div>
    </DialogPortal>
  );
};
