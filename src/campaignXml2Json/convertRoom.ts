import type { AnyRoomJson } from "@/model/RoomJson";
import type { Floor } from "../model/modelTypes";
import { map, convertRoomColour } from "./convertCampaign";
import { convertItems } from "./convertItems";
import { convertSceneryName } from "./convertPlanetName";
import { convertRoomDimensions } from "./convertRoomDimensions";
import { convertRoomId } from "./convertRoomId";
import { convertWalls } from "./convertWalls";
import {
  readRoomToXmlJson,
  type XmlFloorKind,
  roomNameFromXmlFilename,
} from "./readToJson";
import { xmlRoomSidesWithDoors } from "./xmlRoomSidesWithDoors";

export const convertRoom = async (xmlRoomName: string) => {
  const roomXmlJson = await readRoomToXmlJson(xmlRoomName);
  const { floorKind: jsonFloorKind, scenery: jsonScenery, color } = roomXmlJson;

  const roomSidesWithDoors = xmlRoomSidesWithDoors(roomXmlJson);

  const roomOnMap = map[xmlRoomName];
  if (roomOnMap === undefined) {
    throw new Error(`${xmlRoomName} not on the map`);
  }

  // the xml adds extra tiles for doors - compensate for this by deleting them:
  const roomDimensions = convertRoomDimensions(roomXmlJson, roomSidesWithDoors);

  // the xml calls bookworld "byblos" 🤷‍♂️
  const planet = convertSceneryName(jsonScenery);

  const floorMap: Record<XmlFloorKind, Floor> = {
    plain: planet,
    absent: "none",
    mortal: "deadly",
  };

  const room: AnyRoomJson = {
    id: convertRoomId(xmlRoomName),
    floor: floorMap[jsonFloorKind],
    //floorSkip: convertFloorSkip(roomXmlJson, roomSidesWithDoors),
    planet,
    roomBelow:
      roomOnMap["below"] &&
      convertRoomId(roomNameFromXmlFilename(roomOnMap["below"])),
    roomAbove:
      roomOnMap["above"] &&
      convertRoomId(roomNameFromXmlFilename(roomOnMap["above"])),
    size: roomDimensions,
    walls: {
      away: convertWalls(roomXmlJson, "away", roomSidesWithDoors),
      left: convertWalls(roomXmlJson, "left", roomSidesWithDoors),
    },
    items: await convertItems(
      map,
      xmlRoomName,
      roomXmlJson,
      roomSidesWithDoors,
    ),
    color: convertRoomColour(color),
  };

  return room;
};
