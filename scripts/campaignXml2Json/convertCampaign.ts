import type { Xml2JsonRoom } from "./readToJson";
import { readMapToJson, roomNameFromXmlFilename } from "./readToJson";
import { readdir } from "node:fs/promises";
import { convertRoomId } from "./convertRoomId";
import { writeOut } from "./writeOut";
import type { SidesWithDoors } from "./xmlRoomSidesWithDoors";
import type { Direction4Xy } from "../../src/utils/vectors/vectors";
import type { AnyRoomJson } from "../../src/model/modelTypes";
import { convertRoom } from "./convertRoom";
import type { Shade, ZxSpectrumRoomHue } from "../../src/originalGame";

export const map = await readMapToJson();

const allRoomNames = (await readdir("gamedata-map-xml"))
  .filter((name) => name.endsWith(".xml") && name !== "map.xml")
  .map(roomNameFromXmlFilename);

/**
 * a door map that can be used to just know if there is a door on a side, not necessarily
 * to have the door object
 */
export type LooseDoorMap = Partial<Record<Direction4Xy, true>>;

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

export const convertRoomColour = (color: string) => {
  const match = /([^.]*)(\.reduced)?/.exec(color)!;
  return {
    hue: match[1] as ZxSpectrumRoomHue,
    shade: (match[2] === undefined ? "basic" : "dimmed") as Shade,
  };
};

export const convertFloorSkip = (
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

const rooms: Record<string, AnyRoomJson> = {};
for (const roomName of allRoomNames) {
  try {
    const room = await convertRoom(roomName);

    rooms[convertRoomId(roomName)] = room;
  } catch (e) {
    throw new Error(`error converting room ${roomName} :: ${(e as Error).message}
            ${(e as Error).stack}`);
  }
}

await writeOut(rooms);
