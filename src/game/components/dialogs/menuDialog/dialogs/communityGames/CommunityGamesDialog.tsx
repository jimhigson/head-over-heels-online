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
import { Suspense, useEffect } from "react";
import { SpinnerHead } from "../../../../../../ui/Spinner";
import { CampaignListContent } from "./CampaignListContent";
import { ErrorBoundary } from "../../../../../../utils/react/ErrorBoundary";
import { NonIdealState } from "../../../../../../ui/NonIdealState";
import { clear } from "suspend-react";

export const CommunityGamesDialog = (_emptyProps: EmptyObject) => {
  // Clear cache on unmount to ensure fresh data next time, including
  // not caching failures if the user leaves this dialog to try again
  useEffect(() => {
    return () => {
      clear(["getAllUsersLatestCampaigns"]);
    };
  }, []);
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
        <ErrorBoundary
          fallback={<NonIdealState text="Failed to load campaigns" />}
        >
          <Suspense fallback={<SpinnerHead />}>
            <CampaignListContent />
          </Suspense>
        </ErrorBoundary>
        {isTouchDevice() || (
          <MenuItems>
            <BackMenuItem />
          </MenuItems>
        )}
      </Dialog>
    </DialogPortal>
  );
};
