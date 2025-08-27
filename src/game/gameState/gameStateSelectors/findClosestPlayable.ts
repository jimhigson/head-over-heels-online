import { playablesInRoom, type RoomState } from "../../../model/RoomState";
import { distanceSquaredXy, type Xyz } from "../../../utils/vectors/vectors";
import { playerDiedRecently } from "./playerDiedRecently";

export const findClosestPlayable = <
  RoomId extends string,
  RoomItemId extends string,
>(
  position: Xyz,
  room: RoomState<RoomId, RoomItemId>,
) => {
  // find closest player in the room:
  const { head, heels, headOverHeels } = playablesInRoom(room.items);

  if (headOverHeels !== undefined) {
    return playerDiedRecently(headOverHeels) ? undefined : headOverHeels;
  }

  const headDistance =
    head === undefined ? undefined
    : playerDiedRecently(head) ? undefined
    : head.state.action === "death" ? undefined
    : distanceSquaredXy(head.state.position, position);

  const heelsDistance =
    heels === undefined ? undefined
    : playerDiedRecently(heels) ? undefined
    : heels.state.action === "death" ? undefined
    : distanceSquaredXy(heels.state.position, position);

  return (
    headDistance === undefined ? heels
    : heelsDistance === undefined ? head
    : headDistance < heelsDistance ? head
    : heels
  );
};
