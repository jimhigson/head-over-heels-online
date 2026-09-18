import { characterNames } from "../../../model/modelTypes";
import { type PlayableItem } from "../../physics/itemPredicates";
import { type GameState } from "../GameState";
import { selectCurrentRoomState } from "./selectCurrentRoomState";

/**
 * the playable whose death fade is currently playing in the current room, with
 * the room it is in and the room time the fade ends at - `undefined` when nobody
 * is mid-death
 */
export const findDyingPlayable = (
  gameState: Pick<GameState, "characterRooms" | "currentCharacterName">,
) => {
  const room = selectCurrentRoomState(gameState);
  if (room === undefined) {
    return undefined;
  }

  for (const name of characterNames) {
    const item = room.items[name] as PlayableItem | undefined;
    if (item === undefined || item.state.action !== "death") {
      continue;
    }
    const { expires } = item.state;
    if (expires !== null && expires > room.roomTime) {
      return { item, room, expires };
    }
  }

  return undefined;
};
