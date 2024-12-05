import type { ItemInPlay, PlayableItem } from "@/model/ItemInPlay";
import type { CharacterName } from "@/model/modelTypes";
import { type Xyz, addXyz, doorAlongAxis } from "@/utils/vectors/vectors";

/*
 * colliding with doors is a special case - since they are so narrow, the playable character
 * slides sideways into their opening, to make them easier to walk through
 */
export const handlePlayerTouchingDoorFrame = <RoomId extends string>(
  playableItem: PlayableItem<CharacterName, RoomId>,
  xyzDelta: Xyz,
  doorFrame: ItemInPlay<"doorFrame">,
): boolean => {
  const {
    config: { direction, nearness },
  } = doorFrame;

  const axis = doorAlongAxis(direction);

  const slideVector =
    nearness === "far" ?
      {
        x: axis === "x" ? -Math.abs(xyzDelta.y) : 0,
        y: axis === "y" ? -Math.abs(xyzDelta.x) : 0,
        z: 0,
      }
    : {
        x: axis === "x" ? Math.abs(xyzDelta.y) : 0,
        y: axis === "y" ? Math.abs(xyzDelta.x) : 0,
        z: 0,
      };

  playableItem.state.position = addXyz(
    playableItem.state.position,
    slideVector,
  );
  return false;
};
