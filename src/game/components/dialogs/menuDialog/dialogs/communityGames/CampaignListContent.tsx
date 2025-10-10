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
import { selectGameHintMarkdownClassName } from "../whichGame/selectGameHintMarkdownClassName";

const CampaignMenuItem = ({
  userId,
  campaignName,
  label,
  version,
  createdAt,
}: {
  userId: string;
  campaignName: string;
  label: string;
  version: number;
  createdAt: string;
}) => {
  return (
    <MenuItem
      className="sprites-double-height"
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
      hintInline
      hint={
        <BlockyMarkdown
          className={selectGameHintMarkdownClassName}
          markdown={` v.${version} updated ${format(createdAt)}`}
        />
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
      <div className="zx:text-zxCyan  resHandheld:mt-half flex flex-col gap-2">
        {Object.values(campaigns).flatMap((userEntry) => (
          <div key={userEntry.user.id} className="flex flex-col gap-half">
            <BitmapText className="text-metallicBlue zx:text-zxYellow pl-4 sprites-double-height">
              By {userEntry.user.username}:
            </BitmapText>
            {Object.values(userEntry.campaigns).map((campaign) => (
              <Fragment key={campaign.name}>
                <MenuItems>
                  <CampaignMenuItem
                    userId={userEntry.user.id}
                    campaignName={campaign.name}
                    label={`'${campaign.name}'`}
                    version={campaign.version}
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
