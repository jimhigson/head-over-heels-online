import type { ItemInPlay } from "../../../model/itemInPlay/ItemInPlay";
import {
  addXyz,
  boxAt,
  originXyz,
  productXyz,
  type XyzBox,
} from "../../../utils/vectors/vectors";
import { blockSizePx } from "../../physics/mechanicsConstants";

/**
 * where an emitter puts an item it emits: centred on the emitter in x and y,
 * standing on its base, then moved by the emitter's offset
 */
export const emittedItemBox = <
  RoomId extends string,
  RoomItemId extends string,
>(
  emitter: ItemInPlay<"emitter", RoomId, RoomItemId>,
  /**
   * the emitted item's box as loaded - only its size is kept
   */
  emittedBox: XyzBox,
): XyzBox => {
  const {
    state: { box },
    config: { offset },
  } = emitter;
  const emitOffset =
    offset ? productXyz({ ...originXyz, ...offset }, blockSizePx) : originXyz;
  return boxAt(
    addXyz(
      {
        x: box.x + (box.xd - emittedBox.xd) / 2,
        y: box.y + (box.yd - emittedBox.yd) / 2,
        z: box.z,
      },
      emitOffset,
    ),
    emittedBox,
  );
};
