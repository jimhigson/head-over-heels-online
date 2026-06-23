import { type PlanetName, planets } from "../../../sprites/planets";
import { entries } from "../../../utils/entries";
import { iterateRoomJsonItemsWithIds } from "../../RoomJson";
import { type CampaignVerifier, notAutoFixable } from "./CampaignVerification";

type MissingCrown = {
  planet: PlanetName;
};

/**
 * G2: one of the five planets' crowns isn't anywhere in the campaign, so it can
 * never be completed. The crowns can live in any room, but all five must exist.
 * Campaign-level, so no `roomId`.
 */
export const missingCrownVerifier: CampaignVerifier<MissingCrown> = {
  name: "Missing crown",
  *check(campaign) {
    const present = new Set<PlanetName>();
    for (const [, room] of entries(campaign.rooms)) {
      for (const [, pickup] of iterateRoomJsonItemsWithIds(
        room.items,
        "pickup",
      )) {
        if (pickup.config.gives === "crown") {
          present.add(pickup.config.planet);
        }
      }
    }
    for (const planet of planets) {
      if (present.has(planet)) {
        continue;
      }
      yield {
        severity: "warning",
        msg: `No ${planet} crown`,
        fixable: false,
        fixText: `Add ${planet} crown somewhere`,
        issueData: { planet },
        verifier: missingCrownVerifier,
      };
    }
  },
  fix() {
    return notAutoFixable();
  },
};
