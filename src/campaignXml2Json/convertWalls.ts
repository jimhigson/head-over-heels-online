import { convertX, convertY } from "./convertCampaign";
import { convertSceneryName } from "./convertPlanetName";
import { convertRoomDimensions } from "./convertRoomDimensions";
import { convertWallName } from "./convertWallName";
import type { Xml2JsonRoom } from "./readToJson";
import { type SidesWithDoors } from "./xmlRoomSidesWithDoors";
import type { AxisXy, Xyz } from "../utils/vectors/vectors";
import type { JsonItem } from "../model/json/JsonItem";

export const convertWalls = (
  xml2JsonRoom: Xml2JsonRoom,
  sidesWithDoors: SidesWithDoors,
  jsonDoors: JsonItem<"door">[],
): JsonItem<"wall">[] => {
  const roomSize = convertRoomDimensions(xml2JsonRoom, sidesWithDoors);
  const planet = convertSceneryName(xml2JsonRoom.scenery);

  const wallItems = xml2JsonRoom.walls.map((xml2JsonWall): JsonItem<"wall"> => {
    const alongAxis: AxisXy = xml2JsonWall.along;

    const position: Xyz = {
      x:
        alongAxis === "x" ?
          convertX(xml2JsonWall.position, xml2JsonRoom, sidesWithDoors)
        : roomSize.x,
      y:
        alongAxis === "y" ?
          convertY(xml2JsonWall.position, xml2JsonRoom, sidesWithDoors)
        : roomSize.y,
      z: 0,
    };

    return {
      type: "wall",
      config: {
        direction: xml2JsonWall.along === "x" ? "away" : "left",
        tiles: [convertWallName(planet, xml2JsonWall.picture)],
      },
      position,
    };
  });

  // add invisible, implied walls on the near sides:
  for (let x = 0; x < roomSize.x; x++) {
    // check if there is a door here:
    if (
      jsonDoors.some(
        (door) =>
          door.config.direction === "towards" &&
          (door.position.x === x || door.position.x + 1 === x) &&
          door.position.y === 0,
      )
    ) {
      continue;
    }

    wallItems.push({
      type: "wall",
      config: {
        direction: "towards",
        tiles: [],
      },
      position: { x, y: 0, z: 0 },
    });
  }
  for (let y = 0; y < roomSize.y; y++) {
    if (
      jsonDoors.some(
        (door) =>
          door.config.direction === "right" &&
          (door.position.y === y || door.position.y + 1 === y) &&
          door.position.x === 0,
      )
    ) {
      continue;
    }

    wallItems.push({
      type: "wall",
      config: {
        direction: "right",
        tiles: [],
      },
      position: { x: 0, y, z: 0 },
    });
  }

  return wallItems;
};
