import type { DirectionXy4, Xy, Xyz } from "../../../../utils/vectors/vectors";

import { addDoorToRoom } from "../../../../model/inPlaceMutators/addDoorToRoom";
import { createNewRoom } from "../../../../model/inPlaceMutators/createNewRoom";
import {
  doorAlongAxis,
  perpendicularAxisXy,
} from "../../../../utils/vectors/vectors";

const doorPosition = (
  direction: DirectionXy4,
  origin: Xyz,
  size: Xy,
  doorZRelative: number,
) => {
  const alongAxis = doorAlongAxis(direction);
  const throughAxis = perpendicularAxisXy(alongAxis);
  const wallLength = size[alongAxis];
  const doorAlongPos = origin[alongAxis] + Math.floor((wallLength - 2) / 2);

  const throughPos =
    direction === "right" || direction === "towards" ?
      origin[throughAxis]
    : origin[throughAxis] + size[throughAxis];

  return {
    [alongAxis]: doorAlongPos,
    [throughAxis]: throughPos,
    z: origin.z + doorZRelative,
  } as Xyz;
};

export const makeRoomJsonWithDoors = (
  origin: Xyz,
  size: Xy,
  directions: DirectionXy4[],
  doorZRelative: number,
) => {
  const roomJson = createNewRoom(
    "testRoom",
    size,
    { hue: "cyan", shade: "basic" },
    "blacktooth",
    [{ x: 0, y: 0 }],
    origin,
  );

  for (const direction of directions) {
    addDoorToRoom(
      roomJson,
      doorPosition(direction, origin, size, doorZRelative),
      direction,
      {
        toRoom: "otherRoom",
        toDoor: "d",
      },
    );
  }

  return roomJson;
};
