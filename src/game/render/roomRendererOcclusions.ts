import { type Container, Graphics } from "pixi.js";

import { iterateRoomItems, type RoomState } from "../../model/RoomState";
import { addXyz, originXyz } from "../../utils/vectors/vectors";
import { isItemType } from "../physics/itemPredicates";
import { projectWorldXyzToScreenXy } from "./projections";

const itemIsWallOrDoorFrame = isItemType("wall", "doorFrame");

const occlusionHeight = 256;

// create a rectangle mask for the floor that cuts off anything past the last
// wall or door frame on the left/right of the room
// this only really renders on the floor - it could move onto the floor sprite itself
// - the right way is to render on the floor but only if wall/doorframe ends at the floor's
// natural edge
export function* roomRendererOcclusions<
  RoomId extends string,
  RoomItemId extends string,
>(room: RoomState<RoomId, RoomItemId>): Generator<Container> {
  const { left, right } = iterateRoomItems(room.items)
    .filter(itemIsWallOrDoorFrame)
    .reduce(
      (acc, { aabb, renderAabb, renderAabbOffset, state: { position } }) => {
        const useAabb = renderAabb ?? aabb;
        const usePosition = addXyz(position, renderAabbOffset ?? originXyz);

        const itemLeft = projectWorldXyzToScreenXy(
          addXyz(usePosition, { x: useAabb.x }),
        ).x;
        const itemRight = projectWorldXyzToScreenXy(
          addXyz(usePosition, { y: useAabb.y }),
        ).x;

        return {
          left: Math.min(acc.left, itemLeft),
          right: Math.max(acc.right, itemRight),
        };
      },
      {
        left: Number.POSITIVE_INFINITY,
        right: Number.NEGATIVE_INFINITY,
      },
    );

  if (left !== Number.POSITIVE_INFINITY) {
    yield new Graphics()
      .rect(left - 100, -occlusionHeight, 100, occlusionHeight)
      .fill(0x000);
  }
  if (right !== Number.NEGATIVE_INFINITY) {
    yield new Graphics()
      .rect(right, -occlusionHeight, 100, occlusionHeight)
      .fill(0x000);
  }
}
