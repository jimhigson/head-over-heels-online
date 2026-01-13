import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { JsonItem } from "../../../model/json/JsonItem";
import type { Xy, Xyz } from "../../../utils/vectors/vectors";

import { iterateRoomJsonItems, type RoomJson } from "../../../model/RoomJson";
import { wallTimes } from "../../../model/times";
import { emptyObject } from "../../../utils/empty";
import { addXyz, type DirectionXy4 } from "../../../utils/vectors/vectors";
import { blockXyzToFineXyz } from "../../render/projections";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { defaultBaseState } from "./itemDefaultStates";

const setback: Xy = { x: -9 / 12, y: -9 / 12 };
const cubeSize: Xyz = blockXyzToFineXyz({ x: 9 / 12, y: 9 / 12, z: 1 });

const addDirectionalItemToLocationMap = <
  T extends "door" | "wall",
  RoomId extends string,
  RoomItemId extends string,
>(
  jsonItem: JsonItem<T, RoomId, RoomItemId>,
  locationMap: Map<string, Map<DirectionXy4, JsonItem<T, RoomId, RoomItemId>>>,
) => {
  const coordStr = `${jsonItem.position.x},${jsonItem.position.y}`;
  let directions = locationMap.get(coordStr);
  if (directions === undefined) {
    directions = new Map<DirectionXy4, JsonItem<T, RoomId, RoomItemId>>();
    locationMap.set(coordStr, directions);
  }
  directions.set(jsonItem.config.direction, jsonItem);
};

export function* maybeLoadExtraCornerShadow<
  RoomId extends string,
  RoomItemId extends string,
>(
  roomJson: RoomJson<RoomId, RoomItemId>,
): Generator<ItemInPlay<"blocker", RoomId, RoomItemId>> {
  // as a special case, if there are two walls at one location, and they're right and towards,
  // add an extra item to cast a shadow at the corner where they meet:

  const wallLocations = new Map<
    string,
    Map<DirectionXy4, JsonItem<"wall", RoomId, RoomItemId>>
  >();
  const doorLocations = new Map<
    string,
    Map<DirectionXy4, JsonItem<"door", RoomId, RoomItemId>>
  >();

  // first, collect stats on the json walls in the room:
  for (const jsonItem of iterateRoomJsonItems(roomJson)) {
    switch (jsonItem.type) {
      case "wall":
        addDirectionalItemToLocationMap(jsonItem, wallLocations);
        break;

      case "door":
        addDirectionalItemToLocationMap(jsonItem, doorLocations);
        break;
    }
  }

  for (const [coordStr, wallDirections] of wallLocations.entries()) {
    const rightWall = wallDirections.get("right");
    const towardsWall = wallDirections.get("towards");

    if (!rightWall || !towardsWall) {
      continue;
    }

    // check if right-facing wall ends with same-facing doors:
    const rightWallEnd = addXyz(
      rightWall.position,
      wallTimes(rightWall.config),
      { x: -1 },
    );

    if (
      doorLocations.get(`${rightWallEnd.x},${rightWallEnd.y}`)?.get("right") ===
      undefined
    ) {
      continue;
    }

    // check it towards-facing wall end with same-facing doors:
    const towardsWallEnd = addXyz(
      towardsWall.position,
      wallTimes(towardsWall.config),
      { y: -1 },
    );

    if (
      doorLocations
        .get(`${towardsWallEnd.x},${towardsWallEnd.y}`)
        ?.get("towards") === undefined
    ) {
      continue;
    }

    const wallJsonPosition = rightWall.position;

    const cornerCube: ItemInPlay<"blocker", RoomId, RoomItemId> = {
      id: `extraCornerShadow-${coordStr}` as RoomItemId,
      type: "blocker",
      state: {
        ...defaultBaseState<RoomItemId>(),
        position: blockXyzToFineXyz(addXyz(wallJsonPosition, setback)),
      },
      shadowCastTexture: {
        textureId: "shadow.wallCorner",
        spritesheetVariant: "original",
      },
      castsShadowWhileStoodOn: true,
      config: emptyObject,
      aabb: cubeSize,
      fixedZIndex: nonRenderingItemFixedZIndex,
    };

    yield cornerCube;
  }
}
