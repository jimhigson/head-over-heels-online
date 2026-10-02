import { type EmptyObject } from "type-fest";

import { exitGameRoomId } from "../../ItemConfigMap";
import { type CampaignVerifier, notAutoFixable } from "../CampaignVerification";
import { allDoors } from "../helpers/doorPartner";

/**
 * no door leads to `$$final`, so the game can never be finished.
 * Campaign-level, so no `roomId`.
 */
export const missingExitVerifier: CampaignVerifier<EmptyObject> = {
  name: "Missing exit",
  *check(campaign) {
    if (
      allDoors(campaign).some(
        ({ door }) => door.config.toRoom === exitGameRoomId,
      )
    ) {
      return;
    }
    yield {
      severity: "error",
      msg: `No door leads to ‘${exitGameRoomId}’, so the game can never be finished`,
      fixable: false,
      fixText: `Assign a door's config.toRoom the special value ‘${exitGameRoomId}’ - this door will end the game`,
      issueData: {},
      verifier: missingExitVerifier,
    };
  },
  fix() {
    return notAutoFixable();
  },
};
