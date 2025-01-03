import type { Campaign, CharacterName } from "@/model/modelTypes";
import type { RoomJson } from "@/model/RoomJson";
import type { GameState, PickupsCollected } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { loadRoom } from "./loadRoom/loadRoom";
import { fromAllEntries } from "@/utils/entries";
import type { RenderOptions } from "../RenderOptions";
import mitt from "mitt";
import type { GameEvents } from "../GameApi";
import { entryState } from "./PlayableEntryState";
import { createEmptyInput } from "../input/InputState";
import { keyAssignmentPresets } from "../input/keyAssignmentPresets";

export type StartingRooms<RoomId extends string> = Partial<
  Record<CharacterName, RoomId>
>;

/** 
  For a given campaign, get the starting room for the two playable characters.
  This is nothing smarter than a search through every item in every room until we find them
*/
export const startingRooms = <RoomId extends string>(
  campaign: Campaign<RoomId>,
): StartingRooms<RoomId> => {
  const results: Partial<StartingRooms<RoomId>> = {};

  for (const r of Object.values<RoomJson<PlanetName, RoomId>>(campaign.rooms)) {
    for (const i of Object.values(r.items)) {
      if (i.type === "player") {
        const { which } = i.config;
        results[which] = r.id;
      }
    }
  }

  // note it is technically possible to have a campaign with only one character, but
  // not no characters
  if (results.head === undefined && results.heels === undefined) {
    throw new Error("couldn't find either head or heels in campaign");
  }

  return results as StartingRooms<RoomId>;
};

export const initGameState = <RoomId extends string>({
  campaign,
  renderOptions,
}: {
  campaign: Campaign<RoomId>;
  renderOptions: RenderOptions<NoInfer<RoomId>>;
}): GameState<RoomId> => {
  const starts = startingRooms(campaign);

  const pickupsCollected = fromAllEntries(
    Object.keys(campaign.rooms).map((roomId) => [roomId, {}]),
  ) as PickupsCollected<RoomId>;

  const headRoom =
    starts.head &&
    loadRoom(campaign.rooms[starts.head], pickupsCollected[starts.head], true);
  const heelsRoom =
    starts.heels === starts.head ?
      headRoom
    : starts.heels &&
      loadRoom(
        campaign.rooms[starts.heels],
        pickupsCollected[starts.heels],
        true,
      );

  return {
    keyAssignment: keyAssignmentPresets.default,
    // if head isn't in the campaign (unusual!), start with heels
    currentCharacterName: starts.head === undefined ? "heels" : "head",
    characterRooms: {
      head: headRoom,
      heels: heelsRoom,
    },
    entryState: {
      head:
        headRoom === undefined ? undefined : entryState(headRoom.items.head!),
      heels:
        heelsRoom === undefined ? undefined : (
          entryState(heelsRoom.items.heels!)
        ),
    },
    inputState: createEmptyInput(),
    renderOptions,
    campaign,
    events: mitt<GameEvents<RoomId>>(),
    pickupsCollected,
    gameTime: 0,
    progression: 0,
    gameSpeed: 1,
  };
};
