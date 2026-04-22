import type { AnyRoomJson } from "../../src/model/RoomJson";

import { consolidateItemsMap } from "../../src/consolidateItems/consolidateItems";
import { keyItems } from "../../src/utils/keyItems";
import { convertRoomColour, map } from "./convertCampaign";
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
  // consolidateItemsMap needs items already keyed, but some walls/floors
  // get merged into `times` multipliers and dropped, so we re-key the
  // consolidated result to keep the counter-based keys sequential
  const items = keyItems(
    Object.values(
      consolidateItemsMap(
        keyItems([
          ...convertFloor(roomDimensions, xmlFloorKind, xmlScenery),
          ...convertedItems,
          ...convertWalls(
            roomXmlJson,
            roomSidesWithDoors,
            convertedItems.filter((i) => i.type === "door"),
          ),
        ]),
      ),
    ),
  );

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
    items,
    color: convertRoomColour(color),
  };
};
