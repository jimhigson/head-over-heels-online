import { ItemConfig, ItemType, UnknownItem } from "../../src/Item";
import {
  LooseDoorMap,
  map,
  convertXYZ,
  convertDirection,
} from "./convertCampaign";
import { convertRoomId } from "./convertRoomId";
import { Xml2JsonRoom, roomNameFromXmlFilename } from "./readToJson";

export const convertItems = (
  roomName: string,
  xml2JsonRoom: Xml2JsonRoom,
  doorMap: LooseDoorMap,
): UnknownItem[] => {
  return xml2JsonRoom.items
    .map((item): UnknownItem | undefined => {
      switch (true) {
        case item.kind === "teleport": {
          const roomOnMap = map[roomName];
          const destination = roomOnMap.teleport;

          if (destination === undefined) {
            throw new Error("teleporter with no destination");
          }

          return {
            type: "teleporter",
            config: {
              toRoom: convertRoomId(roomNameFromXmlFilename(destination)),
            },
            position: convertXYZ(item, xml2JsonRoom, doorMap),
          };
        }

        case item.kind === "bars-ns" || item.kind === "bars-ew": {
          return {
            type: "barrier",
            config: {
              axis: item.kind === "bars-ns" ? "y" : "x",
            },
            position: convertXYZ(item, xml2JsonRoom, doorMap),
          };
        }

        case item.kind === "cylinder":
        case item.kind === "brick1":
        case item.kind === "brick2": {
          const styleConversion: Record<typeof item.kind, ItemConfig['block']['style']> = {
            brick1: 'artificial',
            brick2: 'organic',
            cylinder: 'tower'
          }

          return {
            type: "block",
            config: {
              style: styleConversion[item.kind],
            },
            position: convertXYZ(item, xml2JsonRoom, doorMap),
          };
        }

        case item.kind === "toaster":
        case item.kind === "vulcano": {
          return {
            type: "deadly-block",
            config: {
              style: item.kind === "vulcano" ? "volcano" : 'toaster',
            },
            position: convertXYZ(item, xml2JsonRoom, doorMap),
          };
        }

        case item.kind === "conveyor": {
          return {
            type: "conveyor",
            config: {
              direction: convertDirection(item.orientation),
            },
            position: convertXYZ(item, xml2JsonRoom, doorMap),
          };
        }

        case item.kind === "extra-life":
        case item.kind === "donuts":
        case item.kind === "horn":
        case item.kind === "handbag": {
          const conversions = {
            horn: "hooter",
            handbag: "bag",
          };

          return {
            type: "pickup",
            config: {
              gives: conversions[item.kind] || item.kind,
            },
            position: convertXYZ(item, xml2JsonRoom, doorMap),
          };
        }

        case item.kind === "mortal-fish":
        case item.kind === "reincarnation-fish": {
          return {
            type: "fish",
            config: {
              alive: item.kind === "reincarnation-fish",
            },
            position: convertXYZ(item, xml2JsonRoom, doorMap),
          };
        }

        case item.kind === "trampoline": {
          return {
            type: "spring",
            config: {},
            position: convertXYZ(item, xml2JsonRoom, doorMap),
          };
        }

        default:
          //item.kind satisfies never;
          return undefined;
      }
    })
    .filter((x): x is UnknownItem => x !== undefined);
};
