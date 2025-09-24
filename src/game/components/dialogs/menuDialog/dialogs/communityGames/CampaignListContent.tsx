import { Fragment } from "react/jsx-runtime";
import { format } from "timeago.js";

import type { CampaignDirectory } from "../../../../../../db/campaign";
import type { CampaignLocator } from "../../../../../../model/modelTypes";

import { gameStarted } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";

const CampaignMenuItem = ({
  userId,
  campaignName,
  label,
}: {
  userId: string;
  campaignName: string;
  label: string;
}) => {
  return (
    <MenuItem
      id={`campaign-${userId}-${campaignName}`}
      label={label}
      doubleHeightWhenFocussed
      onSelect={useDispatchActionCallback(gameStarted, {
        campaignLocator: {
          userId,
          campaignName,
          version: -1,
        } satisfies CampaignLocator,
      })}
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
      <div className="zx:text-zxCyan  resHandheld:mt-half flex flex-col gap-2">
        {Object.values(campaigns).flatMap((userEntry) => (
          <div key={userEntry.user.id} className="flex flex-col gap-half">
            <BitmapText className="text-metallicBlue">
              {userEntry.user.username}
            </BitmapText>
            {Object.values(userEntry.campaigns).map((campaign) => (
              <Fragment key={campaign.name}>
                <MenuItems>
                  <CampaignMenuItem
                    userId={userEntry.user.id}
                    campaignName={campaign.name}
                    label={`'${campaign.name}'`}
                  />
                </MenuItems>
                <div className="pl-3">
                  <BlockyMarkdown
                    className="text-midGrey"
                    markdown={` v.${campaign.version} updated ${format(campaign.created_at)}`}
                  />
                </div>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
