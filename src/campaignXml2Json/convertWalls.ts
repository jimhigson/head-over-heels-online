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
        side: xml2JsonWall.along === "x" ? "away" : "left",
        tiles: [convertWallName(planet, xml2JsonWall.picture)],
      },
      position,
    };
  });

  return wallItems;
};
