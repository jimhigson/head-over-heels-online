import type {
  JsonItemType,
  JsonItem,
  UnknownJsonItem,
} from "@/model/json/JsonItem";
import type { ItemInPlayType, UnknownItemInPlay } from "@/model/ItemInPlay";
import { fallingItemTypes } from "@/model/ItemInPlay";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import { boundingBoxForItem } from "../../collision/boundingBoxes";
import { loadDoor } from "./loadDoor";
import { positionCentredInBlock } from "./positionCentredInBlock";
import { loadPlayer } from "./loadPlayer";
import type { PickupsCollected } from "../GameState";
import type { RoomJson } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";

export function* loadItem<RoomId extends string>(
  itemId: string,
  jsonItem: UnknownJsonItem<RoomId>,
  { id: roomId }: RoomJson<PlanetName, RoomId>,
  pickupsCollected: PickupsCollected<RoomId>,
): Generator<UnknownItemInPlay<RoomId>, undefined> {
  if (jsonItem.type === "pickup" && pickupsCollected[roomId][itemId]) {
    // skip pickups that have already been collected
    return;
  }

  switch (jsonItem.type) {
    case "door": {
      return yield* loadDoor<RoomId>(jsonItem, itemId);
    }
    case "player": {
      yield loadPlayer(jsonItem);
      return;
    }

    // catch-all for all items that don't need special handling:
    default: {
      const falls = (fallingItemTypes as JsonItemType[]).includes(
        jsonItem.type,
      );
      yield {
        ...jsonItem,
        ...defaultItemProperties,
        ...boundingBoxForItem(jsonItem),
        id: itemId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: jsonItem.config as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this is very difficult to type correctly - can probably find a way to do it by creating restricted, but discriminatable unions
        state: initialState(jsonItem) as any,
        falls,
      };
    }
  }
}

const initialState = <T extends JsonItemType & ItemInPlayType>(
  jsonItem: JsonItem<T>,
) => {
  const falls = (fallingItemTypes as JsonItemType[]).includes(jsonItem.type);

  return {
    expires: null,
    position: positionCentredInBlock(jsonItem as UnknownJsonItem),
    ...(falls ? { standingOn: null, velZ: 0 } : {}),
    ...(jsonItem.type === "teleporter" ? { flashing: false } : {}),
    ...(jsonItem.type === "pickup" ? { collected: false } : {}),
    ...(jsonItem.type === "lift" ? { direction: "up" } : {}),
  };
};
