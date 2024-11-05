import { ItemInPlay } from "@/model/ItemInPlay";
import { MechanicResult } from "../MechanicResult";
import { UnknownRoomState } from "@/model/modelTypes";
import { InputState } from "@/game/input/InputState";

/**
 * walking, but also gliding and changing direction mid-air
 */
export function teleporter(
  teleporter: ItemInPlay<"teleporter">,
  inputState: InputState,
  room: UnknownRoomState,
): MechanicResult<"teleporter"> {
  const stoodOn =
    room.items.find(
      (i) =>
        (i.type === "head" || i.type === "heels") &&
        i.state.standingOn === teleporter,
    ) !== undefined;

  if (stoodOn && inputState.jump) {
    console.log("TIME TO TELEPORT!!!");
  }

  return {
    stateDelta: { flashing: !!stoodOn },
  };
}
