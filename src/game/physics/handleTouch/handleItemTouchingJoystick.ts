import { mtv } from "../mtv";
import {
  maxPushRecursionDepth,
  moveSpeedPixPerMs,
} from "../mechanicsConstants";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";
import type {
  ItemInPlayType,
  UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlay";
import type { Xy } from "../../../utils/vectors/vectors";
import { unitVector, scaleXyz } from "../../../utils/vectors/vectors";
import type { FreeItemTypes } from "../itemPredicates";
import { assignLatentMovement } from "../../gameState/mutators/assignLatentMovement";
import { recordActedOnBy } from "../recordActedOnBy";

export const handleItemTouchingJoystick = <
  RoomId extends string,
  RoomItemId extends string,
>({
  movingItem,
  room,
  touchedItem: joystickItem,
  deltaMS,
  recursionDepth,
}: ItemTouchEventByItemType<
  RoomId,
  RoomItemId,
  ItemInPlayType,
  "joystick"
>) => {
  const {
    config: { controls },
    state: { position: joystickPosition },
    aabb: joystickAabb,
  } = joystickItem;

  const m = mtv(
    movingItem.state.position,
    movingItem.aabb,
    joystickPosition,
    joystickAabb,
  );

  if (m.x === 0 && m.y === 0) {
    return;
  }

  const unitM = unitVector(m);

  type CompatibleItem = Extract<
    UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    {
      type: FreeItemTypes;
      state: {
        facing: Xy;
        controlledWithJoystickAtRoomTime: number;
      };
    }
  >;

  for (const sillyOldFaceId of controls) {
    const sillyOldFace = room.items[sillyOldFaceId] as CompatibleItem;

    if (sillyOldFace === undefined) {
      // it's possible the controlled item could have been removed from the room
      continue;
    }

    const { roomTime } = room;

    if (sillyOldFace.state.controlledWithJoystickAtRoomTime === roomTime) {
      // can only be controlled by one joystick per frame - skip this
      continue;
    }

    const posDelta = scaleXyz(unitM, -moveSpeedPixPerMs.charles * deltaMS);
    sillyOldFace.state.facing = posDelta;
    sillyOldFace.state.controlledWithJoystickAtRoomTime = roomTime;

    if (recursionDepth < maxPushRecursionDepth) {
      recordActedOnBy(joystickItem, sillyOldFace, room);

      assignLatentMovement(
        sillyOldFace,
        room,
        posDelta,
        deltaMS,
        // pushing with slight latency means silly old face can latch onto his own joystick
        // - eg if two charles are controlled, one can keep pushing it to move the other.
        // - each frame sets up the next until the chain is broken
        1,
      );
    } else {
      console.warn("hit recursion depth limit", new Error());
    }
  }
};
