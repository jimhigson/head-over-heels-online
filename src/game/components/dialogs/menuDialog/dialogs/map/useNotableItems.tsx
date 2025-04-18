import { useMemo } from "react";
import type { RoomJson } from "../../../../../../model/RoomJson";
import { entries, fromAllEntries } from "../../../../../../utils/entries";
import { iterate } from "../../../../../../utils/iterate";
import type { RoomPickupsCollected } from "../../../../../gameState/GameState";
import { jsonItemIsNotable } from "./jsonItemIsNotable";
import type { NotableItem } from "./NotableItem";

export const useNotableItems = <
  RoomId extends string,
  RoomItemId extends string,
>(
  roomJson: RoomJson<RoomId, RoomItemId>,
  roomPickupsCollected: RoomPickupsCollected,
  subRoomId: string,
) => {
  return useMemo<Record<RoomItemId, NotableItem<RoomId>>>(() => {
    let foundHushPuppy = false;
    let foundCrown = false;

    const notableIter = iterate(entries(roomJson.items))
      .filter(([itemId, _item]) => !roomPickupsCollected[itemId])
      .filter(([_itemId, item]) => {
        // only allow one hush puppy/teleporter to be found - the map doesn't
        // need to show multiple of them in a room
        if (item.type === "hushPuppy") {
          if (foundHushPuppy) {
            return false;
          }
          foundHushPuppy = true;
        }
        if (item.type === "pickup" && item.config.gives === "crown") {
          if (foundCrown) {
            return false;
          }
          foundCrown = true;
        }
        return true;
      })
      .filter((entry): entry is [RoomItemId, NotableItem<RoomId>] =>
        jsonItemIsNotable(entry[1], subRoomId, roomJson),
      );

    return fromAllEntries(notableIter);
  }, [roomJson, roomPickupsCollected, subRoomId]);
};
