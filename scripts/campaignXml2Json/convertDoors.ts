import { DoorMap, Direction, Door } from "../../src/modelTypes";
import { map, LooseDoorMap, convertY, convertX, autoZ } from "./convertCampaign";
import { convertDirection } from "./convertDirection";
import { convertRoomId } from "./convertRoomId";
import { Xml2JsonRoom, roomNameFromXmlFilename } from "./readToJson";

export const convertDoors = (
  roomName: string,
  xml2JsonRoom: Xml2JsonRoom
): DoorMap<string> => {
  const roomOnMap = map[roomName];

  const doorXmlJsonItems = xml2JsonRoom.items
    .filter((i) => i.class === "door")
    // filter out doors to nowhere (huh?)
    .filter(({ where }) => {
      const goesSomewhere = roomOnMap[where] !== undefined;

      if (!goesSomewhere) {
        console.warn(
          `room ${roomName} has a ${where} door that goes nowhere on the map`
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
