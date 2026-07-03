import { createSelector } from "@reduxjs/toolkit";

import { useAppSelector } from "../../store/hooks";
import { campaignsApiSlice } from "../../store/slices/campaigns/campaignsApiSlice";
import { type GameRootState } from "../../store/store";
import { Dialog } from "../../ui/Dialog";
import { DialogPortal } from "../../ui/DialogPortal";
import { LoadingBorder } from "../../ui/LoadingBorder";
import { SpinnerHead, SpinnerHeels } from "../../ui/Spinner";

const selectIsLoadingCampaign = createSelector(
  [(state: GameRootState) => state[campaignsApiSlice.reducerPath].queries],
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
      <div class="contents no-keyboard-shortcuts">
        <Dialog wide class="scale-editor p-1 !h-min">
          <div class="text-white bg-midRed text-center py-half">
            <span class="text-double-height">Loading campaign...</span>
          </div>
          <div class="flex flex-row justify-center gap-1">
            <SpinnerHead />
            <SpinnerHeels />
          </div>
        </Dialog>
      </div>
    </DialogPortal>
  );
};
