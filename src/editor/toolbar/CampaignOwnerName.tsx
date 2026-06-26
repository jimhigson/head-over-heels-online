import { useGetUsernameQuery } from "../../store/slices/campaigns/editorCampaignsApiSlice";

export type CampaignOwnerNameProps = {
  /** the campaign owner's user id */
  userId: string;
};

/**
 * Renders "by {username}" for a campaign owned by someone other than the current
 * user. Rendered only in that case, so the username lookup never runs for your own
 * campaigns. Shows nothing while loading or if the owner has no profile name.
 */
export const CampaignOwnerName = ({ userId }: CampaignOwnerNameProps) => {
  const { data: username } = useGetUsernameQuery(userId);

  return username ?
      <>
        <span className="text-lightGrey">by</span>{" "}
        <span className="text-pink">{username}</span>
      </>
    : null;
};
