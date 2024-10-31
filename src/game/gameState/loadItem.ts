import { UnknownJsonItem } from "@/model/Item";
import { UnknownItemInPlay } from "@/model/ItemInPlay";
import mitt from "mitt";
import { boundingBoxForItem } from "../collision/boundingBoxes";
import { blockXyzToFineXyz } from "../render/projectToScreen";
import { addXy } from "@/utils/vectors";
import { blockSizePx } from "@/sprites/pixiSpriteSheet";

const positionAndAabb = (
  item: UnknownJsonItem,
): Pick<UnknownItemInPlay, "aabb" | "position"> => {
  const blockPosition = blockXyzToFineXyz(item.position);
  const aabb = boundingBoxForItem(item);

  if (aabb === undefined) {
    return { position: blockPosition, aabb };
  }

  const centredPosition = addXy(blockPosition, {
    x: (blockSizePx.w - aabb.x) / 2,
    y: (blockSizePx.d - aabb.y) / 2,
  });

  return { position: { ...centredPosition, z: blockPosition.z }, aabb };
};

export function* loadItem<RoomId extends string>(
  id: string,
  item: UnknownJsonItem<RoomId>,
): Generator<UnknownItemInPlay<RoomId>> {
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
        id: `${id}/far`,
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
        id: `${id}/near`,
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
        id: item.config.which,
        events: mitt(),
        state: { facing: "towards", movement: "idle" },
        ...positionAndAabb(item),
      };
      return;
    }
    default:
      yield {
        ...item,
        id,
        events: mitt(),
        state: {},
        ...positionAndAabb(item),
      };
  }
}
