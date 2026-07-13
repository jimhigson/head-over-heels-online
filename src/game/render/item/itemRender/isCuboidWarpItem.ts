import { type UnionOfAllItemInPlayTypes } from "../../../../model/ItemInPlay";

/**
 * item types drawn as solid boxes, whose faces we warp as a cuboid mesh during a
 * camera-rotation transition (rather than rigidly sliding a flat sprite). Every
 * type here has a box-shaped silhouette that reads correctly as three projected
 * faces.
 */
const cuboidWarpTypes = new Set<UnionOfAllItemInPlayTypes["type"]>([
  "wall",
  "floor",
  "block",
  "portableBlock",
  "doorFrame",
  "doorLegs",
  "deadlyBlock",
  "pushableBlock",
  "movingPlatform",
  "barrier",
  "teleporter",
  "conveyor",
  "spikes",
  "hushPuppy",
  "lamp",
  "lightBeam",
  "slidingBlock",
]);

/**
 * whether an item should be drawn as a warped cuboid mesh during a
 * rotation. `block`s styled as a "tower" are excluded - their art is a
 * repeated column, not a single box, so a cuboid warp would distort it. Likewise
 * the round items are excluded (the `drum` portable block and the `puck` sliding
 * block) - the box-shaped `cube`/`sticks` portable blocks and `book` sliding
 * block warp.
 */
export const isCuboidWarpItem = (item: UnionOfAllItemInPlayTypes): boolean => {
  if (!cuboidWarpTypes.has(item.type)) {
    return false;
  }
  if (item.type === "block" && item.config.style === "tower") {
    return false;
  }
  if (item.type === "portableBlock" && item.config.style === "drum") {
    return false;
  }
  if (item.type === "slidingBlock" && item.config.style === "puck") {
    return false;
  }
  return true;
};
