import { Fragment } from "preact";

import { type CampaignDirectory } from "../../../../../../db/campaign";
import { type CampaignLocator } from "../../../../../../model/modelTypes";
import { gameStarted } from "../../../../../../store/slices/gameInPlay/gameInPlaySlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { timeAgo } from "../../../../../../utils/timeAgo";
import { selectGameHintMarkdownClassName } from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";

const CampaignMenuItem = ({
  userId,
  campaignName,
  createdAt,
}: {
  userId: string;
  campaignName: string;
  createdAt: string;
}) => {
  return (
    <MenuItem
      doubleHeight
      id={`campaign-${userId}-${campaignName}`}
      label={`‘${campaignName}’`}
      doubleHeightWhenFocussed
      onSelect={useDispatchActionCallback(gameStarted, {
        campaignLocator: {
          userId,
          campaignName,
          version: -1,
        } satisfies CampaignLocator,
      })}
      hint={
        <div class="screenshot-mask">
          <span
            class={`${selectGameHintMarkdownClassName} text-single-line`}
          >{`Updated ${timeAgo(createdAt)}`}</span>
        </div>
      }
    />
  );
};

export const CampaignListContent = ({
  campaigns,
}: {
  campaigns: CampaignDirectory;
}) => {
  return (
    <>
      <div class="zx:text-zxCyan toppy:text-toppyCool1 resHandheld:mt-half flex flex-col gap-2">
        {Object.values(campaigns).flatMap((userEntry) => (
          <div key={userEntry.user.id} class="flex flex-col gap-half">
            <span class="text-metallicBlue zx:text-zxYellow toppy:text-toppyWarm3 pl-4 text-double-height">
              By {userEntry.user.username}:
            </span>
            {Object.values(userEntry.campaigns).map((campaign) => (
              <Fragment key={campaign.name}>
                <MenuItems>
                  <CampaignMenuItem
                    userId={userEntry.user.id}
                    campaignName={campaign.name}
                    createdAt={campaign.created_at}
                  />
                </MenuItems>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
