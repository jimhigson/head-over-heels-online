import type {
  ItemInPlayType,
  UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlay";
import type { Xy } from "../../../utils/vectors/vectors";
import type { FreeItemTypes } from "../itemPredicates";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";

import {
  scaleXy,
  scaleXyz,
  unitVector,
  vectorClosestDirectionXy4,
} from "../../../utils/vectors/vectors";
import { assignLatentMovement } from "../../gameState/mutators/assignLatentMovement";
import { moveSpeedPixPerMs } from "../mechanicsConstants";
import { mtv } from "../mtv";
import { recordActedOnBy } from "../recordActedOnBy";

export const handleItemTouchingJoystick = <
  RoomId extends string,
  RoomItemId extends string,
>({
  movingItem,
  room,
  touchedItem: joystickItem,
  deltaMS,
}: ItemTouchEventByItemType<
  RoomId,
  RoomItemId,
  ItemInPlayType,
  "joystick"
>) => {
  const {
    state: {
      position: joystickPosition,
      // use controls from state so it can be changed in-game:
      controls,
    },
    aabb: joystickAabb,
  } = joystickItem;

  const m = mtv(
    movingItem.state.position,
    movingItem.aabb,
    joystickPosition,
    joystickAabb,
  );

  if (m.x === 0 && m.y === 0) {
    joystickItem.state.lastPushDirection = undefined;
    return;
  }

  const unitM = unitVector(m);

  joystickItem.state.lastPushDirection = vectorClosestDirectionXy4(
    scaleXy(unitM, -1),
  );

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

    if (sillyOldFaceId === undefined) {
      // it's possible the controlled item could have been moved out of the room
      continue;
    }

    const posDelta = scaleXyz(unitM, -moveSpeedPixPerMs.charles * deltaMS);
    sillyOldFace.state.facing = posDelta;
    sillyOldFace.state.controlledWithJoystickAtRoomTime = roomTime;

    recordActedOnBy(
      joystickItem,
      sillyOldFace,
      room,
      // joysticks always act in xy plane
      true,
      // never act on z-axis
      false,
    );

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
  }
};
