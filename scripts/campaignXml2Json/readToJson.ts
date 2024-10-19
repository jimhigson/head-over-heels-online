import { xml2js } from "xml-js";
import { readFile } from "node:fs/promises";

const readXmlToJson = async (fileName: string) => {
  const xmlText = await readFile(`gamedata-map-xml/${fileName}.xml`, {
    encoding: "utf-8",
  });
  const json = xml2js(xmlText, {
    compact: true,
    ignoreComment: true,
    ignoreDeclaration: true,
    textFn(value, parentElement) {
      const parentObject = parentElement as unknown as Record<
        string,
        string | object
      > & { _parent: Record<string, object | string> };

      const keyNo = Object.keys(parentObject._parent).length;
      const keyName = Object.keys(parentObject._parent)[keyNo - 1];

      if (parentObject._parent._attributes !== undefined) {
        Object.entries(parentObject._parent._attributes).forEach(([k, v]) => {
          parentObject._parent[k] = v;
          delete parentObject._parent._attributes[k];
        });
      }

      parentObject._parent[keyName] = value;
    },
  });
  return json;
};

// compass directions as found in room xml - some unusual notation in there, eg "westsouth" as well as "southwest"
type CompassDirectionsNS = "north" | "south";
type CompassDirectionsEW = "east" | "west";
type CompassDirectionsNESW = CompassDirectionsNS | CompassDirectionsEW;
export type CompassDirections =
  | `${CompassDirectionsNS}${CompassDirectionsEW}`
  | `${CompassDirectionsEW}${CompassDirectionsNS}`
  | CompassDirectionsEW
  | CompassDirectionsNS;

export type Xml2JsonItem = {
  x: string;
  y: string;
  z: string;
} & (
  | {
      kind: `${string}-door-${string}`;
      class: "door";
      where: CompassDirections;
    }
  | {
      kind: "teleport" | "brick1" | "brick2" | "vulcano" /* sic */;
      class: "griditem";
    }
  | {
      kind:
        | "bars-ns"
        | "bars-ew"
        | "extra-life"
        | "donuts"
        | "handbag"
        | "reincarnation-fish"
        | "mortal-fish"
        | "trampoline"
        | "horn";
      class: "freeitem";
    }
  | {
      kind: "conveyor";
      orientation: CompassDirectionsNESW;
      class: "griditem";
    }
);

export type XmlScenery =
  | "moon"
  | "egyptus"
  | /* huh? */ "byblos"
  | "penitentiary"
  | "safari";

export type Xml2JsonWall = {
  position: number;
  along: "x" | "y";
  picture: string;
};

export type Xml2JsonRoom = {
  xTiles: string;
  yTiles: string;
  scenery?: XmlScenery;
  color: string;
  floorKind: "plain";
  walls: Array<Xml2JsonWall>;
  items: Array<Xml2JsonItem>;
};

export const readRoomToJson = async (
  roomName: string,
): Promise<Xml2JsonRoom> => {
  let roomJson = (await readXmlToJson(roomName)) as any;

  roomJson = roomJson.room;
  roomJson.walls = roomJson.walls.wall || [];
  roomJson.items = Array.isArray(roomJson.items.item)
    ? roomJson.items.item
    : [roomJson.items.item];

  delete roomJson._attributes;
  roomJson.walls.forEach((w: { _attributes?: object }) => delete w._attributes);
  roomJson.items.forEach((i: { _attributes?: object }) => delete i._attributes);

  return roomJson as Xml2JsonRoom;
};

export const roomNameFromXmlFilename = (xmlFileName: string) => {
  const match = /(.*)\.xml/.exec(xmlFileName);

  if (match === null) {
    throw new Error(`unparsable file name: ${xmlFileName}`);
  }

  return match![1];
};

export type MapJsonRoom = Partial<
  Record<CompassDirections | "above" | "below" | "teleport", string>
>;
export type MapJson = Record<string, MapJsonRoom>;

export const readMapToJson = async (): Promise<MapJson> => {
  const roomJson = (await readXmlToJson("map")) as any;

  const rooms = roomJson.map.room;

  const roomsByName = Object.fromEntries(
    rooms.map((r) => {
      const xmlFileName = r.file || r._attributes.file;

      delete r.file;
      delete r._attributes;
      return [roomNameFromXmlFilename(xmlFileName), r];
    }),
  );

  return roomsByName as MapJson;
};
