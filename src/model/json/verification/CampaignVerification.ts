import { type RoomGraph } from "../../map/roomGridPositions";
import {
  type VerificationCampaign,
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "./verificationTypes";

/**
 * how serious a verification issue is: an `"error"` stops the game working,
 * while a `"warning"` is harmless but suboptimal markup that could be tidied up
 */
export type CampaignVerificationSeverity = "error" | "warning";

export type CampaignVerificationIssue<TErr> = {
  severity: CampaignVerificationSeverity;
  msg: string;
  /** the room the problem is in, if it is specific to one room - lets the editor link there. Omitted for campaign-wide problems */
  roomId?: VerificationRoomId;
  /** the item that should be updated to address the problem, if any - lets the editor select it */
  itemId?: VerificationRoomItemId;
  /** whether the problem can be auto-fixed by calling the verifier's `fix` */
  fixable: boolean;
  /** when fixable, a short description of the fix (eg "remove toDoor from door a in room b"); otherwise an explanation of why it can't be auto-fixed */
  fixText: string;
  issueData: TErr;
  verifier: CampaignVerifier<TErr>;
};

export type CampaignVerifier<TErr> = {
  name: string;
  // the whole-campaign room graph is computed once by the orchestrator and passed
  // to every verifier; the ones that don't need it (most) simply ignore it
  check: (
    campaign: VerificationCampaign,
    graph: RoomGraph<string>,
  ) => Generator<CampaignVerificationIssue<TErr>>;
  // a method (not an arrow property) so its `TErr` parameter is bivariant - this
  // lets a CampaignVerifier<SpecificErr> widen to CampaignVerifier<unknown> for
  // the orchestrator, which treats issueData opaquely and only passes it back here
  fix(campaign: VerificationCampaign, issueData: TErr): VerificationCampaign;
};

/**
 * the `fix` for a verifier whose issues are never auto-fixable (always
 * `fixable: false`). The dialog never calls it; it's a loud safety net.
 */
export const notAutoFixable = (): never => {
  throw new Error("this verification issue cannot be auto-fixed");
};
