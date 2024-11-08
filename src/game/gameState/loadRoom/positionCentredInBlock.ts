import { boundingBoxForItem } from "@/game/collision/boundingBoxes";
import { blockXyzToFineXyz } from "@/game/render/projectToScreen";
import { UnknownJsonItem } from "@/model/Item";
import { blockSizePx } from "@/sprites/spriteSheet";
import { Xyz, addXyz } from "@/utils/vectors";

export const positionCentredInBlock = (item: UnknownJsonItem): Xyz => {
  const blockPosition = blockXyzToFineXyz(item.position);
  const { aabb } = boundingBoxForItem(item);

  if (aabb === undefined) {
    throw new Error(
      `item type= ${item.type} config=${JSON.stringify(item.config)} has no bounding box`
    );
  }

  // 'extra' walls don't get centred on their square (it needs to stay on the edge between
  // squares) - if this extends to more types, make more generic than an if-type
  const centredPosition = item.type === "wall" ?
    blockPosition
    : addXyz(blockPosition, {
      x: (blockSizePx.w - aabb.x) / 2,
      y: (blockSizePx.d - aabb.y) / 2,
    });

  return centredPosition;
};
