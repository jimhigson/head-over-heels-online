import type { Xy } from "../../src/utils/vectors";
import type { SidesWithDoors } from "./xmlRoomSidesWithDoors";
import type { Xml2JsonRoom } from "./readToJson";

export const convertRoomDimensions = (
  { xTiles, yTiles, floorKind, walls }: Xml2JsonRoom,
  sidesWithDoors: SidesWithDoors,
): Xy => {
  // note; xTiles, yTiles are unreliable for rooms with no floors (it is usually set incorrectly)
  // so in this case we fall back to looking at the walls. the xml is far from perfect
  if (floorKind === "absent") {
    //eg: blacktooth3., blacktooth30
    const xMin = walls
      .filter((w) => w.along === "x")
      .reduce<number>(
        (ac, { position }) => Math.min(ac, parseInt(position)),
        1,
      );
    const yMin = walls
      .filter((w) => w.along === "y")
      .reduce<number>(
        (ac, { position }) => Math.min(ac, parseInt(position)),
        1,
      );
    const xMax = walls
      .filter((w) => w.along === "x")
      .reduce<number>(
        (ac, { position }) => Math.max(ac, parseInt(position)),
        2,
      );
    const yMax = walls
      .filter((w) => w.along === "y")
      .reduce<number>(
        (ac, { position }) => Math.max(ac, parseInt(position)),
        2,
      );

    return { x: xMax - xMin + 1, y: yMax - yMin + 1 };
  } else {
    const y =
      parseInt(yTiles) -
      // the xml gives the room an extra tiles for the doors to fit on:
      (sidesWithDoors.towards ? 1 : 0) -
      (sidesWithDoors.away ? 1 : 0);
    const x =
      parseInt(xTiles) -
      // the xml gives the room an extra tiles for the doors to fit on:
      (sidesWithDoors.left ? 1 : 0) -
      (sidesWithDoors.right ? 1 : 0);

    return { x, y };
  }
};
