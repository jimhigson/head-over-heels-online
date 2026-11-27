import type { ItemInPlay } from "../../model/itemInPlay/ItemInPlay";
import type { FreeItem } from "../../model/itemInPlay/ItemInPlayNarrowedUnions";
import { roomItemsIterable } from "../../model/roomItemsInPlayIterators";
import { epsilon } from "../../utils/epsilon";
import {
  addXy,
  lengthXy,
  scaleXyz,
  unitVectorInPlace,
  type Xy,
} from "../../utils/vectors/vectors";
import { assignLatentMovement } from "../gameState/mutators/assignLatentMovement";
import type { ItemTouchEvent } from "../physics/handleTouch/ItemTouchEvent";
import { moveSpeedPixPerMs } from "../physics/mechanicsConstants";
import { mtv } from "../physics/mtv";
import { recordActedOnBy } from "../physics/recordActedOnBy";
import { ItemBehaviour } from "./ItemBehaviour";

/**
 * how long after a joystick is pushed what it controls moves
 */
const joystickLatencyMs = 1;

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
          joystickVotes: { atRoomTime: number; total: Xy };
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
      const { joystickVotes } = controlledItem.state;
      const firstVoteThisTick = joystickVotes.atRoomTime !== roomTime;
      if (firstVoteThisTick) {
        joystickVotes.total = { x: unitM.x, y: unitM.y };
        joystickVotes.atRoomTime = roomTime;
      } else if (
        // the first push this tick decides the axis - charles only moves in 4
        // directions - so only pushes along it count. Once they cancel out, none do:
        lengthXy(joystickVotes.total) < epsilon ||
        Math.abs(
          joystickVotes.total.x * unitM.y - joystickVotes.total.y * unitM.x,
        ) >= epsilon
      ) {
        continue;
      } else {
        joystickVotes.total = addXy(joystickVotes.total, unitM);
      }

      const totalLength = lengthXy(joystickVotes.total);
      const votesCancelOut = totalLength < epsilon;
      // the way the votes point, at the item's own speed:
      const posDelta =
        votesCancelOut ?
          { x: 0, y: 0, z: 0 }
        : scaleXyz(
            { ...joystickVotes.total, z: 0 },
            (moveSpeedPixPerMs.charles * deltaMS) / totalLength,
          );
      if (!votesCancelOut) {
        // the push direction, not the move: a tiny frame makes a near-zero move
        controlledItem.state.facing = {
          x: joystickVotes.total.x / totalLength,
          y: joystickVotes.total.y / totalLength,
        };
      }

      recordActedOnBy(
        joystickItem.id,
        controlledItem,
        room,
        // joysticks always act in xy plane
        true,
        // never act on z-axis
        false,
      );

      if (firstVoteThisTick) {
        assignLatentMovement(
          controlledItem,
          room,
          posDelta,
          deltaMS,
          // pushing with slight latency means silly old face can latch onto his own joystick
          // - eg if two charles are controlled, one can keep pushing it to move the other.
          // - each frame sets up the next until the chain is broken
          joystickLatencyMs,
        );
      } else {
        // a later vote this tick changes the movement the first one queued:
        const maybeQueuedMovement =
          controlledItem.state.latentMovement.findLast(
            (frame) => frame.startAtRoomTime === roomTime + joystickLatencyMs,
          );
        if (import.meta.env.DEV && maybeQueuedMovement === undefined) {
          throw new Error(
            "a joystick vote found no movement queued by this tick's first vote",
          );
        }
        maybeQueuedMovement!.velocity = scaleXyz(posDelta, 1 / deltaMS);
      }
    }
  }
}
