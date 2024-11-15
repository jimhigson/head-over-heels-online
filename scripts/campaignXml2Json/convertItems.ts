import type { PlanetName } from "../../src/sprites/planets";
import type { LooseDoorMap } from "./convertCampaign";
import { convertXYZ } from "./convertCampaign";
import { convertDirection } from "./convertDirection";
import { convertPlanetName } from "./convertPlanetName";
import { convertRoomId } from "./convertRoomId";
import {
  convertWallName,
  isWallName,
  parseXmlWallName,
} from "./convertWallName";
import type { MapJson, Xml2JsonRoom } from "./readToJson";
import { roomNameFromXmlFilename } from "./readToJson";
import chalk from "chalk";
import type { Xml2JsonItem } from "./Xml2JsonItem";
import { keyItems } from "../../src/utils/keyItems";
import type {
  ItemConfigMap,
  UnknownJsonItem,
} from "../../src/model/json/JsonItem";
import { convertDoor } from "./convertDoor";

const baddieConversions = {
  "helicopter-bug": "helicopter-bug",
  "imperial-guard": "cyberman",
  "imperial-guard-head": "cyberman",
  siren: "dalek",
  bomb: "headless-base",
  diver: "american-football-head",
  "bubble-robot": "bubble-robot",
  monkey: "monkey",
  elephant: "elephant",
  "elephant-head": "elephant-head",
  turtle: "turtle",
  "throne-guard": "flying-ball",
  "bighead-robot": "computer-bot",
} as const satisfies Record<
  string,
  ItemConfigMap<PlanetName, string>["baddie"]["which"]
>;

export const convertItems = (
  map: MapJson,
  roomName: string,
  xml2JsonRoom: Xml2JsonRoom,
  doorMap: LooseDoorMap,
): Record<string, UnknownJsonItem> => {
  const convertedItemsArray = convertItemsArray(
    map,
    roomName,
    xml2JsonRoom,
    doorMap,
  );

  return keyItems(convertedItemsArray);
};

const convertItemsArray = (
  map: MapJson,
  roomName: string,
  xml2JsonRoom: Xml2JsonRoom,
  doorMap: LooseDoorMap,
): UnknownJsonItem[] => {
  return xml2JsonRoom.items
    .map((item): UnknownJsonItem | undefined => {
      const position = convertXYZ(item, xml2JsonRoom, doorMap);

      if (item.kind.includes("shaft") || item.kind.includes("capital")) {
        // weird door parts - we don't care
        return undefined;
      }

      // walls don't use 'kind' like other items - the kind is the name of the
      // picture on the wall tile:
      if (isWallName(item.kind)) {
        const planetName = convertPlanetName(xml2JsonRoom.scenery);
        // Xml2JsonWallItem has to be kept out of the wall union since it can have any string value
        // and stops us from discriminating unions properly

        return {
          type: "wall",
          config: {
            side: parseXmlWallName(item.kind).axis === "x" ? "away" : "left",
            style: convertWallName(planetName, item.kind),
          },
          position,
        };
      }

      if (item.class === "door") {
        return convertDoor(map, roomName, item, position, xml2JsonRoom);
      }

      switch (item.kind) {
        case "teleport":
        case "teleport-too": {
          const roomOnMap = map[roomName];
          const destination =
            roomOnMap[item.kind === "teleport" ? "teleport" : "teleport2"];

          if (destination === undefined) {
            throw new Error("teleporter with no destination");
          }

          return {
            type: "teleporter",
            config: {
              // this is the one item where the generics for RoomId would be useful
              toRoom: convertRoomId(roomNameFromXmlFilename(destination)),
            },
            position,
          };
        }

        case "bars-ns":
        case "bars-ew":
          return {
            type: "barrier",
            config: {
              axis: item.kind === "bars-ns" ? "y" : "x",
            },
            position,
          };

        case "cylinder":
        case "brick1":
        case "brick2": {
          const styleConversion: Record<
            typeof item.kind,
            ItemConfigMap<PlanetName, string>["block"]["style"]
          > = {
            brick1: "artificial",
            brick2: "organic",
            cylinder: "tower",
          };

          return {
            type: "block",
            config: {
              style: styleConversion[item.kind],
            },
            position,
          };
        }

        case "toaster":
        case "spikes":
        case "mortal-cap":
        case "vulcano": {
          const styleConversion: Record<
            typeof item.kind,
            ItemConfigMap<PlanetName, string>["deadly-block"]["style"]
          > = {
            vulcano: "volcano",
            spikes: "spikes",
            toaster: "toaster",
            "mortal-cap": "puck",
          };

          return {
            type: "deadly-block",
            config: {
              style: styleConversion[item.kind],
            },
            position,
          };
        }

        case "conveyor": {
          return {
            type: "conveyor",
            config: {
              direction: convertDirection(item.orientation),
            },
            position,
          };
        }

        case "extra-life":
        case "high-jumps":
        case "crown":
        case "quick-steps":
        case "donuts":
        case "horn":
        case "shield":
        case "handbag": {
          const conversions: Record<
            typeof item.kind,
            ItemConfigMap<PlanetName, string>["pickup"]["gives"]
          > = {
            horn: "hooter",
            handbag: "bag",
            "high-jumps": "jumps",
            "extra-life": "extra-life",
            shield: "shield",
            donuts: "donuts",
            "quick-steps": "fast",
            crown: "crown",
          };

          return {
            type: "pickup",
            config: {
              gives: conversions[item.kind],
            },
            position,
          };
        }

        case "mortal-fish":
        case "reincarnation-fish": {
          return {
            type: "fish",
            config: {
              alive: item.kind === "reincarnation-fish",
            },
            position,
          };
        }

        case "trampoline": {
          return {
            type: "spring",
            config: {},
            position,
          };
        }

        case "elevator": {
          return {
            type: "lift", // HoH is a British game :-)
            config: { top: parseInt(item.top), bottom: parseInt(item.bottom) },
            position,
          };
        }

        case "remote-control": {
          return {
            type: "joystick",
            config: {},
            position,
          };
        }

        case "cap":
        case "sandwich":
        case "stool": {
          const conversions: Record<
            typeof item.kind,
            ItemConfigMap<PlanetName, string>["movable-block"]["style"]
          > = {
            cap: "puck",
            stool: "anvil",
            sandwich: "sandwich",
          };

          return {
            type: "movable-block",
            config: { style: conversions[item.kind] },
            position,
          };
        }

        case "book":
          return {
            type: "book",
            config: { slider: item.class === "freeitem" },
            position,
          };

        case "drum":
        case "portable-brick":
        case "another-portable-brick": {
          const conversions: Record<
            typeof item.kind,
            ItemConfigMap<PlanetName, string>["portable-block"]["style"]
          > = {
            drum: "drum",
            "another-portable-brick": "cube",
            "portable-brick": "sticks",
          };

          return {
            type: "portable-block",
            config: { style: conversions[item.kind] },
            position,
          };
        }

        case "charles-robot": {
          return {
            type: "charles",
            config: {},
            position,
          };
        }

        case "switch": {
          return {
            type: "switch",
            config: {},
            position,
          };
        }

        case "imperial-guard":
          return {
            type: "baddie",
            config: {
              which: "cyberman",
              charging: false,
            },
            position,
          };

        case "imperial-guard-head":
          return {
            type: "baddie",
            config: {
              which: "cyberman",
              startDirection: convertDirection(item.orientation),
              charging: true,
            },
            position,
          };

        case "siren":
        case "monkey":
        case "elephant":
        case "elephant-head":
        case "helicopter-bug":
        case "throne-guard":
        case "bomb":
        case "bubble-robot":
        case "bighead-robot":
          return {
            type: "baddie",
            config: {
              which: baddieConversions[item.kind],
            },
            position,
          };

        case "turtle":
        case "diver": {
          return {
            type: "baddie",
            config: {
              which: baddieConversions[item.kind],
              startDirection: convertDirection(item.orientation),
            },
            position,
          };
        }

        case "puppy":
          return {
            type: "hush-puppy",
            config: {},
            position,
          };

        case "ball":
          return {
            type: "ball",
            config: {},
            position,
          };

        default:
          console.warn(
            `not converting ${chalk.yellow((item as unknown as Xml2JsonItem).kind)} in room ${chalk.green(roomName)}`,
          );
          //item.kind satisfies never;
          return undefined;
      }
    })
    .filter((x): x is UnknownJsonItem => x !== undefined);
};
