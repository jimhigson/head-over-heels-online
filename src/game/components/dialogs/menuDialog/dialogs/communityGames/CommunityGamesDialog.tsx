import type { EmptyObject } from "type-fest";

import { useEffect } from "react";

import { useGetAllUsersLatestCampaignsQuery } from "../../../../../../store/slices/campaigns/campaignsApiSlice";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { NonIdealState } from "../../../../../../ui/NonIdealState";
import { SpinnerHead } from "../../../../../../ui/Spinner";
import { DialogTitleBar } from "../DialogTitleBar";
import { CampaignListContent } from "./CampaignListContent";

export const CommunityGamesDialog = (_emptyProps: EmptyObject) => {
  const { data, error, isLoading, refetch } =
    useGetAllUsersLatestCampaignsQuery({ publishedOnly: true });

  useEffect(() => {
    // Force refetch on mount to get latest campaigns
    refetch();
  }, [refetch]);

  return (
    <DialogPortal>
      <Dialog
        fullScreen
        className="bg-metallicBlueHalfbrite text-highlightBeige zx:text-zxCyan selectedMenuItem:text-white zx:bg-zxRed gap-y-2 resHandheld:gap-y-1"
      >
        <DialogTitleBar
          path={["Play", "Community contrib."]}
          className="mobile:px-4"
        />
        <div
          className={
            "flex flex-col gap-1 p-1 " +
            //"min-h-full " +
            "overflow-y-scroll scrollbar scrollbar-w-1 " +
            "scrollbar-thumb-lightGrey scrollbar-track-metallicBlueHalfbrite " +
            "zx:scrollbar-thumb-zxBlue zx:scrollbar-track-zxWhite " +
            // bring away from any 'notch' on mobile devices:
            "mobile:px-3 " +
            "[--leader-col-width:theme(width.3)] "
          }
        >
          {error !== undefined ?
            <NonIdealState text="Failed to load campaigns" />
          : null}
          {isLoading ?
            <SpinnerHead />
          : null}
          {data !== undefined ?
            <CampaignListContent campaigns={data} />
          : null}
        </div>
      </Dialog>
    </DialogPortal>
  );
};
