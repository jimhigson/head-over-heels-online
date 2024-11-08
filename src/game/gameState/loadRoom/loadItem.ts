import { ItemType, JsonItem, UnknownJsonItem } from "@/model/Item";
import {
  fallingItemTypes,
  ItemInPlayType,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import { boundingBoxForItem } from "../../collision/boundingBoxes";
import { loadDoor } from "./loadDoor";
import { positionCentredInBlock } from "./positionCentredInBlock";
import { loadPlayer } from "./loadPlayer";

export function* loadItem<RoomId extends string>(
  id: string,
  jsonItem: UnknownJsonItem<RoomId>,
): Generator<UnknownItemInPlay<RoomId>> {
  switch (jsonItem.type) {
    case "door": {
      return yield* loadDoor<RoomId>(jsonItem, id);
    }
    case "player": {
      yield loadPlayer(jsonItem);
      return;
    }

    // catch-all for all items that don't need special handling:
    default: {
      const falls = (fallingItemTypes as ItemType[]).includes(jsonItem.type);
      yield {
        ...jsonItem,
        ...defaultItemProperties,
        ...boundingBoxForItem(jsonItem),
        onTouch:
          jsonItem.type === "pickup" ? "pickup"
          : jsonItem.type === "baddie" || jsonItem.type === "deadly-block" ?
            "deadly"
          : (
            jsonItem.type === "spring" ||
            jsonItem.type === "portable-block" ||
            jsonItem.type === "movable-block"
          ) ?
            "push"
          : "nonIntersect",
        id,
        renderingDirty: false,
        renderPositionDirty: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this is very difficult to type correctly - can probably find a way to do it by creating restricted, but discriminatable unions
        state: initialState(jsonItem) as any,
        falls,
      };
    }
  }
}

const initialState = <T extends ItemType & ItemInPlayType>(
  jsonItem: JsonItem<T>,
) => {
  const falls = (fallingItemTypes as ItemType[]).includes(jsonItem.type);

  return {
    position: positionCentredInBlock(jsonItem as UnknownJsonItem),
    ...(falls ? { standingOn: null, fallRoundingError: 0 } : {}),
    ...(jsonItem.type === "teleporter" ? { flashing: false } : {}),
  };
};
