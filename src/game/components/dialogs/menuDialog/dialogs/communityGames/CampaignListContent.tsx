import { Fragment } from "react/jsx-runtime";
import { getAllUsersLatestCampaigns } from "../../../../../../db/campaign";
import { suspend } from "suspend-react";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";

export const CampaignListContent = () => {
  const campaigns = suspend(
    () => getAllUsersLatestCampaigns(),
    ["getAllUsersLatestCampaigns"], // cache key
    {
      lifespan: 60_000, // Cache for 1 minute
    },
  );

  return (
    <>
      <div className="zx:text-zxCyan  resHandheld:mt-half flex flex-col gap-2">
        {Object.values(campaigns).flatMap((userEntry) => (
          <div key={userEntry.user.id} className="flex flex-col gap-half">
            <BitmapText className="text-metallicBlue">
              {userEntry.user.username}
            </BitmapText>
            {Object.values(userEntry.campaigns).map((campaign) => (
              <Fragment key={`${userEntry.user.id}-${campaign.name}`}>
                <MenuItems>
                  <MenuItem
                    id={`campaign-${userEntry.user.id}-${campaign.name}`}
                    label={`‘${campaign.name}’`}
                    doubleHeightWhenFocussed
                    onSelect={() => {
                      // Campaign selection to be implemented later
                    }}
                  />
                </MenuItems>
                <div className="pl-3">
                  <BlockyMarkdown
                    className="text-midGrey"
                    markdown={` ${new Date(campaign.created_at).toLocaleDateString()} v${campaign.version}`}
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
