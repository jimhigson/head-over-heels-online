import { UnknownItemInPlay } from "@/model/ItemInPlay";
import { UnknownRoomState } from "@/model/modelTypes";
import { AxisXyz, Xyz, addXyz, axesXyz, xyzEqual } from "@/utils/vectors";
import { collision1toMany } from "../collision/aabbCollision";

export const protectAgainstIntersecting = (
  item: UnknownItemInPlay,
  xyzDelta: Xyz,
  targetPosition: Xyz,
  collisionsAtTargetPosition: UnknownItemInPlay[],
) => {
  // right now the only reaction to collisions is to not move as far. This could also be pushing the item,
  // or dying (if it is deadly), and maybe some others
  const correctedPosition = collisionsAtTargetPosition.reduce<Xyz>(
    /**
     * @param collisionItem the item collided with
     * @returns
     */
    (acPos: Xyz, { position: posC, aabb: cbb }: UnknownItemInPlay) => {
      // roll back acPos to just prior to the collision in each axis:
      return axesXyz.reduce<Xyz>((ac: Xyz, axis: AxisXyz) => {
        if (xyzDelta[axis] !== 0) {
          const aC = posC[axis];
          if (xyzDelta[axis] > 0) {
            // moving positive (left/away/up)
            const minAC = Math.min(aC, aC + cbb[axis]);
            return {
              ...ac,
              [axis]: minAC - item.aabb[axis],
            };
          } else {
            // moving negative (right/towards/down)
            const maxAC = Math.max(aC, aC + cbb[axis]);
            return {
              ...ac,
              [axis]: maxAC,
            };
          }
        }
        return ac;
      }, acPos);
    },
    targetPosition,
  );

  return correctedPosition;
};

/**
 *
 * @param item
 * @param xyzDelta
 * @param inRoom the room the item is moving in
 */
export const moveItem = (
  item: UnknownItemInPlay,
  xyzDelta: Xyz,
  room: UnknownRoomState,
  /**
   * for no collision detection, provide an empty array
   * TODO: could this be derived from the xyzDelta !== 0 in the axis?
   */
  collisionAxes: AxisXyz[] = ["x", "y", "z"],
) => {
  const targetPosition = addXyz(item.position, xyzDelta);

  const collisions = collision1toMany(
    { aabb: item.aabb, position: targetPosition, id: item.id },
    room.items,
    collisionAxes,
  );
  // right now the only reaction to collisions is to not move as far. This could also be pushing the item,
  // or dying (if it is deadly), and maybe some others
  const correctedPosition = protectAgainstIntersecting(
    item,
    xyzDelta,
    targetPosition,
    collisions,
  );

  if (!xyzEqual(correctedPosition, item.position)) {
    item.position = correctedPosition;
    item.renderPositionDirty = true;
  }

  return collisions;
};
