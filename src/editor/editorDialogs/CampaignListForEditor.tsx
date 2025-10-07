import { Fragment } from "react/jsx-runtime";
import { format } from "timeago.js";

import type {
  CampaignDirectory,
  CampaignInfoInDirectory,
} from "../../db/campaign";

import { BlockyMarkdown } from "../../game/components/BlockyMarkdown";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import {
  type CampaignLocator,
  originalCampaignLocator,
  originalCampaignName,
  originalUserId,
} from "../../model/modelTypes";
import { releaseDateIso8601 } from "../../originalGame";
import { Button } from "../../ui/button";

const CampaignItem = ({
  campaign,
  userId,
  onSelect,
}: {
  campaign: CampaignInfoInDirectory;
  userId: string;
  onSelect: (locator: CampaignLocator) => void;
}) => {
  return (
    <>
      <Button
        className="px-1 py-half text-left ml-2 w-min"
        onClick={() =>
          onSelect({
            userId,
            campaignName: campaign.name,
            version: -1,
          })
        }
      >
        <BitmapText className="text-white">{campaign.name}</BitmapText>
      </Button>
      <BitmapText className="text-lightGrey ml-2">
        {`v.${campaign.version} updated ${format(campaign.created_at)}`}
      </BitmapText>
    </>
  );
};

const UserCampaigns = ({
  userEntry,
  onSelect,
}: {
  userEntry: CampaignDirectory[string];
  onSelect: (locator: CampaignLocator) => void;
}) => {
  const campaignsList = Object.values(userEntry.campaigns);

  return (
    <div className="flex flex-col gap-half">
      <BitmapText
        className={
          userEntry.user.isCurrentUser ?
            "text-pastelBlue sprites-double-height mb-half"
          : "text-metallicBlue"
        }
      >
        {userEntry.user.isCurrentUser ?
          "Your Campaigns"
        : userEntry.user.username}
      </BitmapText>
      {campaignsList.map((campaign) => (
        <CampaignItem
          key={campaign.name}
          campaign={campaign}
          userId={userEntry.user.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export const CampaignListForEditor = ({
  campaigns,
  onSelect,
}: {
  campaigns: CampaignDirectory;
  onSelect: (locator: CampaignLocator) => void;
}) => {
  const userEntries = Object.values(campaigns);
  let hasShownCommunityHeading = false;

  return (
    <div className="flex flex-col gap-1 overflow-y-auto flex-grow scrollbar scrollbar-w-1 scrollbar-thumb-metallicBlue">
      {userEntries.map((userEntry) => {
        const shouldShowCommunityHeading =
          !userEntry.user.isCurrentUser && !hasShownCommunityHeading;
        if (shouldShowCommunityHeading) {
          hasShownCommunityHeading = true;
        }

        return (
          <Fragment key={userEntry.user.id}>
            {shouldShowCommunityHeading && (
              <>
                <BitmapText className="text-midRed mt-2 sprites-double-height">
                  Community Campaigns
                </BitmapText>
                <div>
                  <BlockyMarkdown
                    className="text-lightGrey"
                    markdown={`You can open any campaign that others have made, but only save under your own login`}
                  ></BlockyMarkdown>
                </div>
              </>
            )}
            <UserCampaigns userEntry={userEntry} onSelect={onSelect} />
          </Fragment>
        );
      })}
      <BitmapText className="text-midRed mt-2 sprites-double-height">
        Original Remastered
      </BitmapText>
      <div>
        <BlockyMarkdown
          className="text-lightGrey"
          markdown={`Open the original game in the editor`}
        ></BlockyMarkdown>
      </div>
      <CampaignItem
        campaign={{
          created_at: releaseDateIso8601,
          name: originalCampaignName,
          version: 1,
        }}
        userId={originalUserId}
        onSelect={() => onSelect(originalCampaignLocator)}
      />
    </div>
  );
};
