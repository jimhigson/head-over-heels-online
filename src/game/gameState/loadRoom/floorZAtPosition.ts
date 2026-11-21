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
  const floor = floors.find(
    (f) =>
      x >= f.position.x &&
      x <= f.position.x + f.config.times.x &&
      y >= f.position.y &&
      y <= f.position.y + f.config.times.y,
  );
  return floor?.position.z;
};
