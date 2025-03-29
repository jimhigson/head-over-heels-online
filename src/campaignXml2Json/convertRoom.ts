import type { Floor } from "../model/modelTypes";
import type { AnyRoomJson } from "../model/RoomJson";
import { keyItems } from "../utils/keyItems";
import { consolidateItems } from "./consolidateItems/consolidateItems";
import { map, convertRoomColour } from "./convertCampaign";
import { convertItemsArray } from "./convertItems";
import { convertSceneryName } from "./convertPlanetName";
import { convertRoomDimensions } from "./convertRoomDimensions";
import { convertRoomId } from "./convertRoomId";
import { convertWalls } from "./convertWalls";
import { readRoomToXmlJson, type XmlFloorKind } from "./readToJson";
import { roomNameFromXmlFilename } from "./roomNameFromXmlFilename";
import { xmlRoomSidesWithDoors } from "./xmlRoomSidesWithDoors";

export const convertRoom = async (
  xmlRoomName: string,
): Promise<AnyRoomJson> => {
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

  const convertedItems = await convertItemsArray(
    map,
    xmlRoomName,
    roomXmlJson,
    roomSidesWithDoors,
  );
  const items = keyItems([
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
    floor: floorMap[jsonFloorKind],
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
