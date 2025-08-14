import { useEffect } from "react";
import type { EmptyObject } from "type-fest";
import { backToParentMenu } from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { MenuItems } from "../../MenuItems";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { Border } from "../../../../../../ui/Border";
import { BackMenuItem } from "../../BackMenuItem";
import { MobileStyleBackButton } from "../MobileStyleBackButton";
import { isTouchDevice } from "../../../../../../utils/detectDeviceType";
import { CampaignListContent } from "./CampaignListContent";
import { NonIdealState } from "../../../../../../ui/NonIdealState";
import { useGetAllUsersLatestCampaignsQuery } from "../../../../../../store/slices/campaigns/campaignsApiSlice";
import { SpinnerHead } from "../../../../../../ui/Spinner";

export const CommunityGamesDialog = (_emptyProps: EmptyObject) => {
  const { data, error, isLoading, refetch } =
    useGetAllUsersLatestCampaignsQuery();

  useEffect(() => {
    // Force refetch on mount to get latest campaigns
    refetch();
  }, [refetch]);

  return (
    <DialogPortal>
      <Border
        className="bg-metallicBlueHalfbrite zx:bg-zxRed"
        onClick={useDispatchActionCallback(backToParentMenu)}
      />
      <Dialog
        tall
        className="bg-metallicBlueHalfbrite selectedMenuItem:text-white text-highlightBeige zx:bg-zxRed gap-y-2 resHandheld:gap-y-1 overflow-y-scroll"
      >
        <div className="flex flex-col gap-2">
          {isTouchDevice() && (
            <MobileStyleBackButton className="text-highlightBeige" />
          )}
          <BitmapText className="text-midRed zx:text-zxYellow sprites-double-height pl-3">
            Community Contributed
          </BitmapText>
        </div>
        {error !== undefined ?
          <NonIdealState text="Failed to load campaigns" />
        : null}
        {isLoading ?
          <SpinnerHead />
        : null}
        {data !== undefined ?
          <CampaignListContent campaigns={data} />
        : null}
        {isTouchDevice() || (
          <MenuItems>
            <BackMenuItem />
          </MenuItems>
        )}
      </Dialog>
    </DialogPortal>
  );
};
