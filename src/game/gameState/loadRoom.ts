import { UnknownJsonItem } from "@/model/Item";
import { UnknownItemInPlay } from "@/model/ItemInPlay";
import { RoomState, RoomJson } from "@/model/modelTypes";
import { PlanetName } from "@/sprites/planets";
import { blockXyzToFineXyz } from "../render/projectToScreen";
import mitt from "mitt";
import { blockSizePx } from "@/sprites/pixiSpriteSheet";
import { boundingBoxForItem } from "../collision/boundingBoxes";

function* wallsAsItems<R extends string>(
  room: RoomJson<PlanetName, R>,
): Generator<UnknownItemInPlay<R>> {
  // left/right sides:
  for (let yi = room.size.y - 1; yi >= 0; yi--) {
    const style = room.walls.left[yi];
    if (style !== "none")
      yield {
        type: "wall",
        config: { side: "left", style },
        position: blockXyzToFineXyz({ x: room.size.x, y: yi, z: 0 }),
        events: mitt(), // TODO: question if a wall really needs an event bus!
        state: {},
        aabb: { x: 999, y: blockSizePx.d, z: 999 },
      };

    const skipInvisibleWall =
      Object.values(room.items).find(
        (i) =>
          i.type === "door" &&
          i.config.axis === "y" &&
          i.position.x === 0 &&
          (i.position.y === yi || i.position.y + 1 === yi),
      ) !== undefined;

    if (!skipInvisibleWall)
      yield {
        type: "wall",
        config: { side: "left", style: "none" },
        position: blockXyzToFineXyz({ x: 0, y: yi, z: 0 }),
        events: mitt(), // TODO: question if a wall really needs an event bus!
        state: {},
        aabb: { x: -999, y: blockSizePx.d, z: 999 },
      };
  }

  // towards/away sides:
  for (let xi = room.size.x - 1; xi >= 0; xi--) {
    const style = room.walls.away[xi];
    if (style !== "none")
      yield {
        type: "wall",
        config: { side: "away", style },
        position: blockXyzToFineXyz({ x: xi, y: room.size.y, z: 0 }),
        events: mitt(), // TODO: question if a wall really needs an event bus!
        state: {},
        aabb: { x: blockSizePx.w, y: 999, z: 999 },
      };

    const skipInvisibleWall =
      Object.values(room.items).find(
        (i) =>
          i.type === "door" &&
          i.config.axis === "x" &&
          (i.position.x === xi || i.position.x + 1 === xi) &&
          i.position.y === 0,
      ) !== undefined;

    if (!skipInvisibleWall)
      yield {
        type: "wall",
        config: { side: "left", style: "none" },
        position: blockXyzToFineXyz({ x: xi, y: 0, z: 0 }),
        events: mitt(), // TODO: question if a wall really needs an event bus!
        state: {},
        aabb: { x: blockSizePx.w, y: -999, z: 999 },
      };
  }
}

function* loadItem<R extends string>(
  item: UnknownJsonItem<R>,
): Generator<UnknownItemInPlay<R>> {
  switch (item.type) {
    case "door": {
      const {
        config: { axis },
        position,
      } = item;

      const crossAxis = axis === "x" ? "y" : "x";

      const inHiddenWall =
        (axis === "x" && item.position.y === 0) ||
        (axis === "y" && item.position.x === 0);

      // doors on the front are moved back half a square to embed them inside the unseen near-side wall:
      const crossAxisComponent = {
        [crossAxis]: inHiddenWall
          ? position[crossAxis] - 0.5
          : position[crossAxis],
      };

      yield {
        ...item,
        config: {
          ...item.config,
          inHiddenWall,
        },
        type: "doorFar",
        position: blockXyzToFineXyz({
          ...item.position,
          [axis]: item.position[axis] + 1.5,
          ...crossAxisComponent,
        }),
        events: mitt(),
        state: {},
        aabb: { x: 8, y: 8, z: 48 },
      };
      yield {
        ...item,
        config: {
          ...item.config,
          inHiddenWall,
        },
        type: "doorNear",
        position: blockXyzToFineXyz({
          ...item.position,
          ...crossAxisComponent,
        }),
        events: mitt(),
        state: {},
        aabb: { x: 8, y: 8, z: 48 },
      };
      return;
    }
    case "player": {
      yield {
        ...item,
        events: mitt(),
        state: { facing: "towards", movement: "idle" },
        aabb: boundingBoxForItem(item),
        position: blockXyzToFineXyz(item.position),
      };
      return;
    }
    default:
      yield {
        ...item,
        events: mitt(),
        state: {},
        aabb: boundingBoxForItem(item),
        position: blockXyzToFineXyz(item.position),
      };
  }
}

function* loadItems<R extends string>(
  items: UnknownJsonItem<R>[],
): Generator<UnknownItemInPlay<R>> {
  for (const item of items.values()) {
    yield* loadItem(item);
  }
}

/**
 * convert a room from it's storage (json) format to its in-play (loaded) format
 */
export const loadRoom = <P extends PlanetName, R extends string>(
  roomJson: RoomJson<P, R>,
): RoomState<P, R> => {
  return {
    ...roomJson,
    items: [
      ...loadItems(Object.values(roomJson.items)),
      ...wallsAsItems(roomJson),
    ],
  };
};
