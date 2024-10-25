import {
  readMapToJson,
  readRoomToJson,
  Xml2JsonRoom,
  roomNameFromXmlFilename,
  XmlFloorKind,
} from "./readToJson";
import { readdir } from "node:fs/promises";
import { AnyRoomJson, Direction, Floor } from "../../src/modelTypes";
import { ZxSpectrumRoomColour } from "../../src/originalGame";
import { convertItems } from "./convertItems";
import { convertRoomId } from "./convertRoomId";
import { writeOut } from "./writeOut";
import { convertPlanetName } from "./convertPlanetName";
import { convertRoomDimensions } from "./convertRoomDimensions";
import { convertWalls } from "./convertWalls";
import { SidesWithDoors, xmlRoomSidesWithDoors } from "./convertDoors";

export const map = await readMapToJson();

const allRoomNames = (await readdir("gamedata-map-xml"))
  .filter((name) => name.endsWith(".xml") && name !== "map.xml")
  .map(roomNameFromXmlFilename);

/**
 * a door map that can be used to just know if there is a door on a side, not necessarily
 * to have the door object
 */
export type LooseDoorMap = Partial<Record<Direction, true>>;

export const convertX = (
  xmlX: number | string,
  roomJson: Xml2JsonRoom,
  doorMap: LooseDoorMap,
): number => {
  let result = typeof xmlX === "string" ? parseInt(xmlX) : xmlX;

  // first flip to my model - origin on the bottom corner (as rendered) - not top:
  result = parseInt(roomJson.xTiles) - result - 1;

  if (doorMap.right) {
    // their x origin is on the left - remove one if there's a door since they bump everything
    // up to fit the door:
    result--;
  }

  return result;
};
export const convertY = (
  xmlY: number | string,
  roomJson: Xml2JsonRoom,
  doorMap: LooseDoorMap,
): number => {
  let result = typeof xmlY === "string" ? parseInt(xmlY) : xmlY;

  // first flip to my model - origin on the bottom corner (as rendered) - not top:
  result = parseInt(roomJson.yTiles) - result - 1;

  if (doorMap.towards) {
    // their x origin is on the left - remove one if there's a door since they bump everything
    // up to fit the door:
    result--;
  }

  return result;
};
const convertZ = (xmlZ: number | string): number => {
  return typeof xmlZ === "string" ? parseInt(xmlZ) : xmlZ;
};
export const convertXYZ = (
  { x, y, z }: { x: number | string; y: number | string; z: number | string },
  roomJson: Xml2JsonRoom,
  doorMap: LooseDoorMap,
) => {
  return {
    x: convertX(x, roomJson, doorMap),
    y: convertY(y, roomJson, doorMap),
    z: convertZ(z),
  };
};

/** sometimes items are given with z=-1; in which case, place them on top of the highest other item */
export const autoZ = (
  { x, y }: { x: number; y: number },
  xml2JsonRoom: Xml2JsonRoom,
) => {
  return xml2JsonRoom.items.reduce<number>((ac, i) => {
    if (i.class === "griditem" && parseInt(i.x) === x && parseInt(i.y) === y) {
      return Math.max(parseInt(i.z) + 1, ac);
    }
    return ac;
  }, 0);
};

/** strip off the ".reduced" from the end of, eg "yellow.reduced */
const basicColor = (color: string) => {
  return /([^.]*)(?:\.reduced)?/.exec(color)![1] as ZxSpectrumRoomColour;
};

const convertFloorSkip = (
  roomXmlJson: Xml2JsonRoom,
  sidesWithDoors: SidesWithDoors,
) => {
  return (
    roomXmlJson.nofloor?.map((nf) => ({
      x: convertX(nf._attributes.x, roomXmlJson, sidesWithDoors),
      y: convertX(nf._attributes.y, roomXmlJson, sidesWithDoors),
    })) ?? []
  );
};

const convertRoomJson = async (xmlRoomName: string) => {
  const roomXmlJson = await readRoomToJson(xmlRoomName);
  const { floorKind: jsonFloorKind, scenery: jsonScenery, color } = roomXmlJson;

  const roomSidesWithDoors = xmlRoomSidesWithDoors(roomXmlJson);

  const roomOnMap = map[xmlRoomName];
  if (roomOnMap === undefined) {
    throw new Error(`${xmlRoomName} not on the map`);
  }

  // the xml adds extra tiles for doors - compensate for this by deleting them:
  const roomDimensions = convertRoomDimensions(roomXmlJson, roomSidesWithDoors);

  // the xml calls bookworld "byblos" 🤷‍♂️
  const planet = convertPlanetName(jsonScenery);

  const floorMap: Record<XmlFloorKind, Floor> = {
    plain: planet,
    absent: "none",
    mortal: "deadly",
  };

  const room: AnyRoomJson = {
    id: convertRoomId(xmlRoomName),
    floor: floorMap[jsonFloorKind],
    floorSkip: convertFloorSkip(roomXmlJson, roomSidesWithDoors),
    planet,
    roomBelow:
      roomOnMap["below"] &&
      convertRoomId(roomNameFromXmlFilename(roomOnMap["below"])),
    roomAbove:
      roomOnMap["above"] &&
      convertRoomId(roomNameFromXmlFilename(roomOnMap["above"])),
    size: roomDimensions,
    //doors: doorMap,
    walls: {
      away: convertWalls(roomXmlJson, "away", roomSidesWithDoors),
      left: convertWalls(roomXmlJson, "left", roomSidesWithDoors),
    },
    items: convertItems(map, xmlRoomName, roomXmlJson, roomSidesWithDoors),
    color: basicColor(color),
  };

  return room;
};

const rooms: Record<string, AnyRoomJson> = {};
for (const roomName of allRoomNames) {
  try {
    const room = await convertRoomJson(roomName);

    rooms[convertRoomId(roomName)] = room;
  } catch (e) {
    throw new Error(`error converting room ${roomName} :: ${(e as Error).message}
            ${(e as Error).stack}`);
  }
}

await writeOut(rooms);
