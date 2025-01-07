import { convertX, convertY } from "./convertCampaign";
import { convertSceneryName } from "./convertPlanetName";
import { convertRoomDimensions } from "./convertRoomDimensions";
import { convertWallName } from "./convertWallName";
import type { Xml2JsonRoom } from "./readToJson";
import { type SidesWithDoors } from "./xmlRoomSidesWithDoors";
import type { AnyWall } from "../model/modelTypes";

export const convertWalls = (
  roomJson: Xml2JsonRoom,
  direction: "left" | "away",
  sidesWithDoors: SidesWithDoors,
): AnyWall[] => {
  const dims = convertRoomDimensions(roomJson, sidesWithDoors);
  const wallLength = direction === "away" ? dims.x : dims.y;

  const xmlJsonAxis = direction === "left" ? "y" : "x";
  const planet = convertSceneryName(roomJson.scenery);
  const result: AnyWall[] = new Array(wallLength);

  // we expect this to be overwritten:
  result.fill("none");

  roomJson.walls
    .filter((wall) => wall.along === xmlJsonAxis)
    .forEach(({ position, picture }) => {
      const ordinal =
        xmlJsonAxis === "x" ?
          convertX(position, roomJson, sidesWithDoors)
        : convertY(position, roomJson, sidesWithDoors);

      return (result[ordinal] = convertWallName(planet, picture));
    });

  return result;
};
