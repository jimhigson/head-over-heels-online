import { type ItemInPlay } from "../../model/ItemInPlay";
import { type FreeItem } from "../../model/ItemInPlayNarrowedUnions";
import { roomItemsIterable } from "../../model/RoomState";
import {
  scaleXyz,
  unitVectorInPlace,
  type Xy,
} from "../../utils/vectors/vectors";
import { assignLatentMovement } from "../gameState/mutators/assignLatentMovement";
import { type ItemTouchEvent } from "../physics/handleTouch/ItemTouchEvent";
import { moveSpeedPixPerMs } from "../physics/mechanicsConstants";
import { mtv } from "../physics/mtv";
import { recordActedOnBy } from "../physics/recordActedOnBy";
import { ItemBehaviour } from "./ItemBehaviour";

export class JoystickBehaviour extends ItemBehaviour {
  constructor() {
    super({
      snagsHelpfulMovement: true,
    });
  }

  override onTouch<RoomId extends string, RoomItemId extends string>(
    joystickItem: ItemInPlay<"joystick", RoomId, RoomItemId>,
    e: ItemTouchEvent<RoomId, RoomItemId>,
    isMover: boolean,
  ): void {
    if (isMover) {
      super.onTouch(joystickItem, e, isMover);
      return;
    }
    const { movingItem, room, deltaMS } = e;
    const {
      state: {
        box: joystickBox,
        // use controls from state so it can be changed in-game:
        controls,
      },
    } = joystickItem;

    // calculate the vector of the joystick moving out of the moving item,
    // which is the direction the joystick is being pushed in
    const m = mtv(joystickBox, movingItem.state.box);

    if (m.x === 0 && m.y === 0) {
      joystickItem.state.lastPushDirection = undefined;
      return;
    }

    const unitM = unitVectorInPlace(m);

    joystickItem.state.lastPushDirection = unitM;

    type CompatibleItem = Extract<
      FreeItem<RoomId, RoomItemId>,
      {
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
        roomItemsIterable(room.items).filter((item) => item.type === "charles")
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
      // the push direction, not the move: a tiny frame makes a near-zero move
      controlledItem.state.facing = unitM;
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
  }
}
