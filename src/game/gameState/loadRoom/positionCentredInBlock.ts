import type { JsonItemUnion } from "../../../model/json/JsonItem";
import type { Xyz } from "../../../utils/vectors/vectors";

import { addXyz } from "../../../utils/vectors/vectors";
import { boundingBoxForItem } from "../../collision/boundingBoxes";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { blockXyzToFineXyz } from "../../render/projections";

export const positionCentredInBlock = (item: JsonItemUnion): Xyz => {
  // this is wrong when we have times set to on!

  const blockPosition = blockXyzToFineXyz(item.position);
  const { aabb } = boundingBoxForItem(item);

  if (aabb === undefined) {
    throw new Error(
      `item type= ${item.type} config=${JSON.stringify(item.config)} has no bounding box`,
    );
  }

  // 'extra' walls don't get centred on their square (it needs to stay on the edge between
  // squares) - if this extends to more types, make more generic than an if-type
  const centredPosition =
    item.type === "wall" ?
      blockPosition
    : addXyz(blockPosition, {
        x: (blockSizePx.x - aabb.x) >> 1,
        y: (blockSizePx.y - aabb.y) >> 1,
      });

  return centredPosition;
};
