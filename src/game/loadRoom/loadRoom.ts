import { UnknownItem } from "@/Item";
import { LoadedRoom, RoomJson } from "@/modelTypes";
import { PlanetName } from "@/sprites/planets";

function* expandWalls<R extends string>(
  room: RoomJson<PlanetName, R>,
): Generator<UnknownItem<R>> {
  for (let i = room.size.y - 1; i >= 0; i--) {
    yield {
      type: "wall",
      config: { side: "left", style: room.walls.left[i] },
      position: { x: room.size.x, y: i, z: 0 },
    };
  }

  for (let xi = room.size.x - 1; xi >= 0; xi--) {
    if (
      // this is a slow search but it is ok to do at room load time
      // (not render time)
      Object.values(room.items).find(
        (i) =>
          i.type === "door" &&
          room.size.y === i.position.y &&
          i.position.x === xi - 1,
      )
    ) {
      xi--; // skip the next one too
      continue;
    }

    yield {
      type: "wall",
      config: { side: "away", style: room.walls.away[xi] },
      position: { x: xi, y: room.size.y, z: 0 },
    };
  }
}

function* expandDoors<R extends string>(
  items: UnknownItem<R>[],
): Generator<UnknownItem<R>> {
  for (const item of items.values()) {
    if (item.type === "door") {
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
        position: {
          ...item.position,
          [axis]: item.position[axis] + 1,
          ...crossAxisComponent,
        },
      };
      yield {
        ...item,
        config: {
          ...item.config,
          inHiddenWall,
        },
        type: "doorNear",
        position: {
          ...item.position,
          ...crossAxisComponent,
        },
      };
    } else yield item;
  }
}

export const loadRoom = <P extends PlanetName, R extends string>(
  roomJson: RoomJson<P, R>,
): LoadedRoom<P, R> => {
  return {
    ...roomJson,
    items: [
      ...expandDoors(Object.values(roomJson.items)),
      ...expandWalls(roomJson),
    ],
  };
};
