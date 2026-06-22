import { entries } from "../../../utils/entries";
import {
  type CharacterName,
  type IndividualCharacterName,
  individualCharacterNames,
} from "../../modelTypes";
import { iterateRoomJsonItemsWithIds } from "../../RoomJson";
import { type CampaignVerifier, notAutoFixable } from "./CampaignVerification";

type MissingPlayerStart = {
  character: IndividualCharacterName;
};

/**
 * G1: there's no starting room for one of the two characters. A `headOverHeels`
 * player counts as a start for both. Campaign-level, so no `roomId`.
 */
export const missingPlayerStartVerifier: CampaignVerifier<MissingPlayerStart> =
  {
    name: "Missing player start",
    *check(campaign) {
      const present = new Set<CharacterName>();
      for (const [, room] of entries(campaign.rooms)) {
        for (const [, player] of iterateRoomJsonItemsWithIds(
          room.items,
          "player",
        )) {
          present.add(player.config.which);
        }
      }
      for (const character of individualCharacterNames) {
        if (present.has(character) || present.has("headOverHeels")) {
          continue;
        }
        yield {
          severity: "error",
          msg: `There's no starting room for ${character} - the campaign can't begin without it`,
          fixable: false,
          fixText: `Add a ${character} player item to one of the rooms`,
          issueData: { character },
          verifier: missingPlayerStartVerifier,
        };
      }
    },
    fix() {
      return notAutoFixable();
    },
  };
