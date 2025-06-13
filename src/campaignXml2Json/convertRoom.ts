import type { AnyRoomJson } from "../model/RoomJson";
import { keyItems } from "../utils/keyItems";
import { consolidateItems } from "./consolidateItems/consolidateItems";
import { map, convertRoomColour } from "./convertCampaign";
import { convertFloor } from "./convertFloor";
import { convertItemsArray } from "./convertItems";
import { convertSceneryName } from "./convertPlanetName";
import { convertRoomDimensions } from "./convertRoomDimensions";
import { convertRoomId } from "./convertRoomId";
import { convertWalls } from "./convertWalls";
import { readRoomToXmlJson } from "./readToJson";
import { roomNameFromXmlFilename } from "./roomNameFromXmlFilename";
import { xmlRoomSidesWithDoors } from "./xmlRoomSidesWithDoors";

export const convertRoom = async (
  xmlRoomName: string,
): Promise<AnyRoomJson> => {
  const roomXmlJson = await readRoomToXmlJson(xmlRoomName);
  const { floorKind: xmlFloorKind, scenery: xmlScenery, color } = roomXmlJson;

  const roomSidesWithDoors = xmlRoomSidesWithDoors(roomXmlJson);

  const roomOnMap = map[xmlRoomName];
  if (roomOnMap === undefined) {
    throw new Error(`${xmlRoomName} not on the map`);
  }

  // the xml adds extra tiles for doors - compensate for this by deleting them:
  const roomDimensions = convertRoomDimensions(roomXmlJson, roomSidesWithDoors);

  // the xml calls bookworld "byblos" 🤷‍♂️
  const planet = convertSceneryName(xmlScenery);

  const convertedItems = await convertItemsArray(
    map,
    xmlRoomName,
    roomXmlJson,
    roomSidesWithDoors,
  );
  const items = keyItems([
    // rooms in the original all had a single floor - for big rooms, this can
    // be corrected in patches
    ...convertFloor(roomDimensions, xmlFloorKind, xmlScenery),
    ...consolidateItems([
      ...convertedItems,
      ...convertWalls(
        roomXmlJson,
        roomSidesWithDoors,
        convertedItems.filter((i) => i.type === "door"),
      ),
    ]),
  ]);

  const roomId = convertRoomId(xmlRoomName);

  return {
    id: roomId,
    planet,
    roomBelow:
      roomOnMap["below"] &&
      convertRoomId(roomNameFromXmlFilename(roomOnMap["below"])),
    roomAbove:
      roomOnMap["above"] &&
      convertRoomId(roomNameFromXmlFilename(roomOnMap["above"])),
    size: roomDimensions,
    items,
    color: convertRoomColour(color),
  };
};
