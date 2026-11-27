import { completeTimesXy } from "../../../model/times";
import type { Xy } from "../../../utils/vectors/vectors";
import type { RoomDirectionalIndex } from "./buildRoomJsonDirectionalIndex";

export const floorZAtPosition = <
  RoomId extends string,
  RoomItemId extends string,
>(
  position: Xy,
  { floors }: RoomDirectionalIndex<RoomId, RoomItemId>,
): number | undefined => {
  const { x, y } = position;
  const floor = floors.find((f) => {
    const timesCompleted = completeTimesXy(f.config.times);
    return (
      x >= f.position.x &&
      x <= f.position.x + timesCompleted.x &&
      y >= f.position.y &&
      y <= f.position.y + timesCompleted.y
    );
  });
  return floor?.position.z;
};
