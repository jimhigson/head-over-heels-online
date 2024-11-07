import {
  isPlayableItem,
  ItemInPlay,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import {
  AxisXyz,
  Xyz,
  addXyz,
  axesXyz,
  subXyz,
  xyzEqual,
} from "@/utils/vectors";
import { collision1toMany } from "../collision/aabbCollision";
import { currentRoom, GameState } from "../gameState/GameState";
import { changeCharacterRoom } from "../gameState/changeCharacterRoom";
import { PlanetName } from "@/sprites/planets";
import { blockSizePx } from "@/sprites/spriteSheet";

export const protectAgainstIntersecting = (
  item: UnknownItemInPlay,
  xyzDelta: Partial<Xyz>,
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
          if (xyzDelta[axis] === undefined) {
            return ac;
          }

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
export const moveItem = <RoomId extends string>(
  item: UnknownItemInPlay,
  xyzDelta: Partial<Xyz>,
  gameState: GameState<RoomId>,
  /**
   * for no collision detection, provide an empty array
   * TODO: could this be derived from the xyzDelta !== 0 in the axis?
   */
  collisionAxes: AxisXyz[] = ["x", "y", "z"],
) => {
  const room = currentRoom(gameState);
  const targetPosition = addXyz(item.position, xyzDelta);

  const collisions = collision1toMany(
    { aabb: item.aabb, position: targetPosition, id: item.id },
    room.items,
    collisionAxes,
  );

  const { nonIntersect, portal, deadly, pickup } = Object.groupBy(
    collisions,
    (ci) => ci.onTouch,
  );

  if (isPlayableItem(item)) {
    const firstPortal = portal?.at(0) as
      | ItemInPlay<"portal", PlanetName, RoomId>
      | undefined;
    if (firstPortal !== undefined && item.state.autoWalkDistance === 0) {
      changeCharacterRoom(
        gameState,
        firstPortal.config.toRoom,
        subXyz(item.position, firstPortal.config.relativePoint),
      );
      // automatically walk forward a short way in the new room to put character properly
      // inside the room (this doesn't happen for entering a room via teleporting or falling/climbing
      //  - only doors)
      item.state.autoWalkDistance = blockSizePx.w * 0.75;
      return;
    }

    if (deadly !== undefined && deadly.length > 0) {
      console.log("LOSE a life");
    }
    if (pickup !== undefined && pickup.length > 0) {
      console.log("Got a bunny or something");
    }
  }

  // right now the only reaction to collisions is to not move as far. This could also be pushing the item,
  // or dying (if it is deadly), and maybe some others
  const correctedPosition = protectAgainstIntersecting(
    item,
    xyzDelta,
    targetPosition,
    nonIntersect || [],
  );

  if (!xyzEqual(correctedPosition, item.position)) {
    item.position = correctedPosition;
    item.renderPositionDirty = true;
  }
};
