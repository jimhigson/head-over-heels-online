import { AnyWall } from "../../src/modelTypes";
import { LooseDoorMap, convertX, convertY } from "./convertCampaign";
import { convertPlanetName } from "./convertPlanetName";
import { convertRoomDimensions } from "./convertRoomDimensions";
import { convertWallName } from "./convertWallName";
import { Xml2JsonRoom } from "./readToJson";

export const convertWalls = (
  roomJson: Xml2JsonRoom,
  direction: "left" | "away",
  doorMap: LooseDoorMap
): AnyWall[] => {
  const dims = convertRoomDimensions(roomJson, doorMap);
  const wallLength = direction === "away" ? dims.x : dims.y;

  const xmlJsonAxis = direction === "left" ? "y" : "x";
  const planet = convertPlanetName(roomJson.scenery);
  const result: AnyWall[] = new Array(wallLength);

  // we expect this to be overwritten:
  result.fill("none");

  roomJson.walls
    .filter((wall) => wall.along === xmlJsonAxis)
    .forEach(({ position, picture }) => {
      const ordinal = xmlJsonAxis === "x"
        ? convertX(position, roomJson, doorMap)
        : convertY(position, roomJson, doorMap);

      return (result[ordinal] = convertWallName(planet, picture));
    });

  return result;
};
