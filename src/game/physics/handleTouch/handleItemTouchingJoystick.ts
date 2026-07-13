import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlay";
import { roomItemsIterable } from "../../../model/RoomState";
import {
  scaleXyz,
  unitVectorInPlace,
  type Xy,
} from "../../../utils/vectors/vectors";
import { assignLatentMovement } from "../../gameState/mutators/assignLatentMovement";
import { type FreeItemTypes, isItemType } from "../itemPredicates";
import { moveSpeedPixPerMs } from "../mechanicsConstants";
import { mtv } from "../mtv";
import { recordActedOnBy } from "../recordActedOnBy";
import { type ItemTouchEventByItemType } from "./ItemTouchEvent";

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

  // calculate the vector of the joystick moving out of the moving item,
  // which is the direction the joystick is being pushed in
  const m = mtv(
    joystickPosition,
    joystickAabb,
    movingItem.state.position,
    movingItem.aabb,
  );

  if (m.x === 0 && m.y === 0) {
    joystickItem.state.lastPushDirection = undefined;
    return;
  }

  const unitM = unitVectorInPlace(m);

  joystickItem.state.lastPushDirection = unitM;

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

  // if controls is omitted, this joystick controls every charles in the
  // room — which is how joysticks always behaved in the original game
  const controlledItems: Iterable<CompatibleItem | undefined> =
    controls === undefined ?
      roomItemsIterable(room.items).filter(isItemType("charles"))
    : controls.map((id) => room.items[id] as CompatibleItem | undefined);

  for (const controlledItem of controlledItems) {
    if (controlledItem === undefined) {
      // item could have been removed from the room
      continue;
    }

    const { roomTime } = room;

    if (controlledItem.state.controlledWithJoystickAtRoomTime === roomTime) {
      // can only be controlled by one joystick per frame - skip this
      continue;
    }

    const posDelta = scaleXyz(unitM, moveSpeedPixPerMs.charles * deltaMS);
    controlledItem.state.facing = posDelta;
    controlledItem.state.controlledWithJoystickAtRoomTime = roomTime;

    recordActedOnBy(
      joystickItem.id,
      controlledItem,
      room,
      // joysticks always act in xy plane
      true,
      // never act on z-axis
      false,
    );

    assignLatentMovement(
      controlledItem,
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
