import { Fragment } from "preact";

import {
  type CampaignDirectory,
  type CampaignInfoInDirectory,
} from "../../db/campaign";
import { BlockyMarkdown } from "../../game/components/BlockyMarkdown";
import {
  originalCampaignLocator,
  originalCampaignName,
  originalUserId,
} from "../../gameInfo";
import { type CampaignLocator } from "../../model/modelTypes";
import { releaseDateIso8601 } from "../../originalGame";
import { Button } from "../../ui/Button";
import { timeAgo } from "../../utils/timeAgo";

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
    <div class="mt-half flex flex-col">
      <Button
        class="px-1 py-half text-left ml-2 w-min mb-oneScaledPix"
        onClick={() =>
          onSelect({
            userId,
            campaignName: campaign.name,
            version: -1,
          })
        }
      >
        <span class="text-white text-single-line">{campaign.name}</span>
      </Button>
      <span class="text-lightGrey ml-2 text-single-line">
        {`v.${campaign.version} updated ${timeAgo(campaign.created_at)}`}
      </span>
    </div>
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
    <div class="flex flex-col gap-half">
      <span
        class={
          userEntry.user.isCurrentUser ?
            "text-pastelBlue text-double-height mb-half"
          : "text-metallicBlue text-single-line"
        }
      >
        {userEntry.user.isCurrentUser ?
          "Your Campaigns"
        : userEntry.user.username}
      </span>
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
    <div class="flex flex-col gap-1 overflow-y-auto flex-grow scrollbar scrollbar-w-1 scrollbar-thumb-metallicBlue">
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
                <span class="text-midRed mt-2 text-double-height">
                  Community Campaigns
                </span>
                <div>
                  <BlockyMarkdown
                    class="text-lightGrey"
                    markdown={`You can open any campaign that others have made, but only save under your own login`}
                  ></BlockyMarkdown>
                </div>
              </>
            )}
            <UserCampaigns userEntry={userEntry} onSelect={onSelect} />
          </Fragment>
        );
      })}
      <span class="text-midRed mt-2 text-double-height">
        Original Remastered
      </span>
      <div>
        <BlockyMarkdown
          class="text-lightGrey"
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
