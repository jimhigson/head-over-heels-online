import type { CharacterName } from "@/model/modelTypes";
import { addXyz, doorAlongAxis } from "@/utils/vectors/vectors";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";

/*
 * colliding with doors is a special case - since they are so narrow, the playable character
 * slides sideways into their opening, to make them easier to walk through
 */
export const handlePlayerTouchingDoorFrame = <RoomId extends string>({
  movingItem: player,
  movementVector,
  touchedItem: doorFrame,
}: ItemTouchEventByItemType<RoomId, CharacterName, "doorFrame">) => {
  const {
    config: { direction, part },
  } = doorFrame;

  const axis = doorAlongAxis(direction);

  if (part === "top") return;

  const slideVector =
    part === "far" ?
      {
        x: axis === "x" ? -Math.abs(movementVector.y) : 0,
        y: axis === "y" ? -Math.abs(movementVector.x) : 0,
        z: 0,
      }
    : {
        x: axis === "x" ? Math.abs(movementVector.y) : 0,
        y: axis === "y" ? Math.abs(movementVector.x) : 0,
        z: 0,
      };

  player.state.position = addXyz(player.state.position, slideVector);
};
