import {
  CompassDirections,
  readMapToJson,
  readRoomToJson,
  Xml2JsonRoom,
  roomNameFromXmlFilename,
  XmlScenery,
  XmlFloorKind,
} from "./readToJson";
import { readdir } from "node:fs/promises";
import {
  AnyRoom,
  AnyWall,
  Direction,
  Door,
  DoorMap,
  Floor,
  PlanetName,
  Xy,
} from "../../src/modelTypes";
import { ZxSpectrumRoomColour } from "../../src/originalGame";
import { wallNumbers } from "./wallNumbers";
import { convertItems } from "./convertItems";
import { convertRoomId } from "./convertRoomId";
import { writeOut } from "./writeOut";

export const map = await readMapToJson();

const allRoomNames = (await readdir("gamedata-map-xml"))
  .filter((name) => name.endsWith(".xml") && name !== "map.xml")
  .map(roomNameFromXmlFilename);

const convertWallName = (
  planetName: PlanetName,
  pictureName: string,
): AnyWall => {
  // the remake I got the xml from has special tree walls for the final room, but the original
  // game uses the bars:
  if (pictureName.startsWith("trees")) {
    return "bars";
  }

  const pictureNameRegex = /(?<p>\w+)-wall-(?:x|y)(?:-(?<n>\d+))?.png/;

  const regexMatch = pictureNameRegex.exec(pictureName);

  if (regexMatch === null || regexMatch.groups === undefined) {
    throw new Error(`can't understand wall pictureName: ${pictureName}`);
  }

  const wallTypeIndex = regexMatch.groups["n"]
    ? parseInt(regexMatch.groups["n"])
    : 1; // jail walls only have one tile so in the xml there's no number

  return wallNumbers[planetName][wallTypeIndex - 1];
};

export const convertDirection = (
  compassDirection: CompassDirections,
): Direction => {
  // directions other than NESW are guesses and might be wrong - need to look into
  // why we have these.

  switch (compassDirection) {
    case "north":
    case "northwest":
    case "northeast":
      return "left";
    case "south":
    case "southeast":
    case "southwest":
      return "right";
    case "east":
    case "eastsouth":
    case "eastnorth":
      return "away";
    case "west":
    case "westnorth":
    case "westsouth":
      return "towards";

    default:
      compassDirection satisfies never;
      throw new Error(
        `Error converting direction: do not understand "${compassDirection}"`,
      );
  }
};

const convertPlanetName = (
  xmlSceneryName: XmlScenery | undefined,
): PlanetName => {
  switch (xmlSceneryName) {
    case undefined:
      return "jail";
    case "byblos":
      return "bookworld";
    case "moon":
      return "moonbase";
    default:
      return xmlSceneryName;
  }
};

const convertRoomDimensions = (
  { xTiles, yTiles, floorKind, walls }: Xml2JsonRoom,
  doorMap: LooseDoorMap,
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
      (doorMap.towards ? 1 : 0) -
      (doorMap.away ? 1 : 0);
    const x =
      parseInt(xTiles) -
      // the xml gives the room an extra tiles for the doors to fit on:
      (doorMap.left ? 1 : 0) -
      (doorMap.right ? 1 : 0);

    return { x, y };
  }
};

const convertWalls = (
  roomJson: Xml2JsonRoom,
  direction: "left" | "away",
  doorMap: LooseDoorMap,
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
      const ordinal =
        xmlJsonAxis === "x"
          ? convertX(position, roomJson, doorMap)
          : convertY(position, roomJson, doorMap);

      return (result[ordinal] = convertWallName(planet, picture));
    });

  return result;
};

/**
 * a door map that can be used to just know if there is a door on a side, not necessarily
 * to have the door object
 */
export type LooseDoorMap = Partial<Record<Direction, Door<string> | true>>;

const convertX = (
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
const convertY = (
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
const autoZ = (
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

const convertDoors = (
  roomName: string,
  xml2JsonRoom: Xml2JsonRoom,
): DoorMap<string> => {
  const roomOnMap = map[roomName];

  const doorXmlJsonItems = xml2JsonRoom.items
    .filter((i) => i.class === "door")
    // filter out doors to nowhere (huh?)
    .filter(({ where }) => {
      const goesSomewhere = roomOnMap[where] !== undefined;

      if (!goesSomewhere) {
        console.warn(
          `room ${roomName} has a ${where} door that goes nowhere on the map`,
        );
      }
      return goesSomewhere;
    });

  // to convert door locations, we need to know where doors are first (yay) since doors
  // warp the space in the xml file's version of the game world. Make a map of just which
  // sides have doors:
  const looseDoorMapEntries = doorXmlJsonItems.map(({ where }) => {
    return [convertDirection(where), true] as [Direction, true];
  });
  const looseDoorMap = Object.fromEntries(looseDoorMapEntries) as LooseDoorMap;

  const doorEntries = doorXmlJsonItems.map(({ where, x, y }) => {
    const toRoomId = convertRoomId(roomNameFromXmlFilename(roomOnMap[where]!));

    const useYOrdinal = where === "south" || where === "north";
    const ordinal = useYOrdinal
      ? // -1 because doors take up two slots, and are indexed by the lower number. So, we need to adjust this!
        convertY(parseInt(y), xml2JsonRoom, looseDoorMap) - 1
      : convertX(parseInt(x), xml2JsonRoom, looseDoorMap) - 1;

    const door: Door<string> = {
      ordinal,
      z: autoZ({ x: parseInt(x), y: parseInt(y) }, xml2JsonRoom),
      toRoom: toRoomId,
    };
    return [convertDirection(where), door] as [Direction, Door<string>];
  });
  return Object.fromEntries(doorEntries) as DoorMap<string>;
};

/** strip off the ".reduced" from the end of, eg "yellow.reduced */
const basicColor = (color: string) => {
  return /([^.]*)(?:\.reduced)?/.exec(color)![1] as ZxSpectrumRoomColour;
};

const convertRoomJson = async (xmlRoomName: string) => {
  const roomJson = await readRoomToJson(xmlRoomName);
  const { floorKind: jsonFloorKind, scenery: jsonScenery, color } = roomJson;

  const roomOnMap = map[xmlRoomName];
  if (roomOnMap === undefined) {
    throw new Error(`${xmlRoomName} not on the map`);
  }

  const doorMap = convertDoors(xmlRoomName, roomJson);

  // the xml adds extra tiles for doors - compensate for this by deleting them:
  const roomDimensions = convertRoomDimensions(roomJson, doorMap);

  // the xml calls bookworld "byblos" 🤷‍♂️
  const planet = convertPlanetName(jsonScenery);

  const floorMap: Record<XmlFloorKind, Floor> = {
    plain: planet,
    absent: "none",
    mortal: "deadly",
  };

  const room: AnyRoom = {
    id: convertRoomId(xmlRoomName),
    floor: floorMap[jsonFloorKind],
    planet,
    roomBelow:
      roomOnMap["below"] &&
      convertRoomId(roomNameFromXmlFilename(roomOnMap["below"])),
    roomAbove:
      roomOnMap["above"] &&
      convertRoomId(roomNameFromXmlFilename(roomOnMap["above"])),
    size: roomDimensions,
    doors: doorMap,
˘    walls: {
      away: convertWalls(roomJson, "away", doorMap),
      left: convertWalls(roomJson, "left", doorMap),
    },
    items: convertItems(xmlRoomName, roomJson, doorMap),
    color: basicColor(color),
  };

  return room;
};

const rooms: Record<string, AnyRoom> = {};
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
