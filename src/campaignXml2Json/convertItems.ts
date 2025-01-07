import type { SceneryName } from "../sprites/planets";
import type { LooseDoorMap } from "./convertCampaign";
import { convertXYZ } from "./convertCampaign";
import { convertDirection } from "./convertDirection";
import { convertPlanetName, convertSceneryName } from "./convertPlanetName";
import { convertRoomId } from "./convertRoomId";
import {
  convertWallName,
  isWallName,
  parseXmlWallName,
} from "./convertWallName";
import type { MapJson, Xml2JsonRoom } from "./readToJson";
import { roomNameFromXmlFilename } from "./readToJson";
import chalk from "chalk";
import type { Xml2JsonItem, XmlItemBaddieBehaviour } from "./Xml2JsonItem";
import { itemKey, keyItems } from "../utils/keyItems";
import type { UnknownJsonItem } from "../model/json/JsonItem";
import { convertDoor } from "./convertDoor";
import type { DirectionXy4 } from "../utils/vectors/vectors";
import type {
  AllowedBaddieMovements,
  ItemConfigMap,
  JsonMovement,
} from "../model/json/ItemConfigMap";

const baddieBehaviourConversions = {
  "behavior of detector": "towards-tripped-on-axis-xy4",
  "behavior of hunter in four directions": "towards-on-shortest-axis-xy4",
  "behavior of random patroling in four primary directions":
    "patrol-randomly-xy4",
  "behavior of random patroling in four secondary directions":
    "patrol-randomly-diagonal",
  "behavior of random patroling in eight directions": "patrol-randomly-xy8",
  "behavior of waiting hunter in eight directions":
    "towards-when-in-square-xy8",
  // seems only to be used for cybermen when they are charging and can wake up:
  "behavior of waiting hunter in four directions":
    "towards-on-shortest-axis-xy4",
  "behavior of move then turn left and move": "clockwise",
  "behavior of there and back": "back-forth",
} as const satisfies Record<XmlItemBaddieBehaviour, JsonMovement>;

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
  emperor: "emperor",
} as const satisfies Record<
  string,
  ItemConfigMap<SceneryName, string, string>["baddie"]["which"]
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
    .map((xml2JsonItem) =>
      convertItem({
        xml2JsonRoom,
        doorMap,
        map,
        roomName,
        xml2JsonItem,
      }),
    )
    .filter((x): x is UnknownJsonItem => x !== undefined);
};

type ConvertItemParams = {
  xml2JsonRoom: Xml2JsonRoom;
  doorMap: Partial<Record<DirectionXy4, true>>;
  map: MapJson;
  roomName: string;
  xml2JsonItem: Xml2JsonItem;
};

const convertItem = ({
  xml2JsonRoom,
  doorMap,
  map,
  roomName,
  xml2JsonItem,
}: ConvertItemParams): UnknownJsonItem | undefined => {
  const position = convertXYZ(xml2JsonItem, xml2JsonRoom, doorMap);

  if (
    xml2JsonItem.kind.includes("shaft") ||
    xml2JsonItem.kind.includes("capital")
  ) {
    // weird door parts - we don't care
    return undefined;
  }

  // walls don't use 'kind' like other items - the kind is the name of the
  // picture on the wall tile:
  if (isWallName(xml2JsonItem.kind)) {
    const planetName = convertSceneryName(xml2JsonRoom.scenery);
    // Xml2JsonWallItem has to be kept out of the wall union since it can have any string value
    // and stops us from discriminating unions properly
    return {
      type: "wall",
      config: {
        side:
          parseXmlWallName(xml2JsonItem.kind).axis === "x" ? "away" : "left",
        style: convertWallName(planetName, xml2JsonItem.kind),
      },
      position,
    };
  }

  if (xml2JsonItem.class === "door") {
    return convertDoor(map, roomName, xml2JsonItem, position, xml2JsonRoom);
  }

  switch (xml2JsonItem.kind) {
    case "teleport":
    case "teleport-too": {
      const roomOnMap = map[roomName];
      const destination =
        roomOnMap[xml2JsonItem.kind === "teleport" ? "teleport" : "teleport2"];

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
          axis: xml2JsonItem.kind === "bars-ns" ? "y" : "x",
          disappearing:
            xml2JsonItem.behavior === "behavior of disappearance on touch",
        },
        position,
      };

    case "cylinder":
      return {
        type: "block",
        config: { style: "tower", disappearing: false },
        position,
      };

    case "brick1":
    case "brick2": {
      const styleConversion: Record<
        typeof xml2JsonItem.kind,
        ItemConfigMap<SceneryName, string, string>["block"]["style"]
      > = {
        brick1: "artificial",
        brick2: "organic",
      };

      return {
        type: "block",
        config: {
          style: styleConversion[xml2JsonItem.kind],
          disappearing:
            xml2JsonItem.behavior === "behavior of disappearance on jump into",
        },
        position,
      };
    }

    case "toaster":
    case "spikes":
    case "vulcano": {
      const styleConversion: Record<
        typeof xml2JsonItem.kind,
        ItemConfigMap<SceneryName, string, string>["deadlyBlock"]["style"]
      > = {
        vulcano: "volcano",
        spikes: "spikes",
        toaster: "toaster",
      };

      return {
        type: "deadlyBlock",
        config: {
          style: styleConversion[xml2JsonItem.kind],
        },
        position,
      };
    }

    case "conveyor": {
      return {
        type: "conveyor",
        config: {
          direction: convertDirection(xml2JsonItem.orientation),
        },
        position,
      };
    }

    case "crown":
      return {
        type: "pickup",
        config: {
          gives: "crown",
          planet: convertPlanetName(xml2JsonRoom.scenery),
        },
        position,
      };

    case "extra-life":
    case "high-jumps":
    case "quick-steps":
    case "donuts":
    case "horn":
    case "shield":
    case "reincarnation-fish":
    case "handbag": {
      const conversions = {
        horn: "hooter",
        handbag: "bag",
        "high-jumps": "jumps",
        "extra-life": "extra-life",
        shield: "shield",
        donuts: "donuts",
        "quick-steps": "fast",
        "reincarnation-fish": "reincarnation",
      } as const satisfies Record<
        typeof xml2JsonItem.kind,
        ItemConfigMap<SceneryName, string, string>["pickup"]["gives"]
      >;

      return {
        type: "pickup",
        config: {
          gives: conversions[xml2JsonItem.kind],
        },
        position,
      };
    }

    case "mortal-cap":
      return {
        type: "slidingDeadly",
        config: {
          style: "puck",
        },
        position,
      };
    case "mortal-fish":
      return {
        type: "moveableDeadly",
        config: {
          style: "deadFish",
        },
        position,
      };

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
        config: {
          top: parseInt(xml2JsonItem.top),
          bottom: parseInt(xml2JsonItem.bottom),
        },
        position,
      };
    }

    case "remote-control": {
      const charlesXml2Json = xml2JsonRoom.items.find(
        (i) => i.kind === "charles-robot",
      );
      if (charlesXml2Json === undefined) {
        throw new Error("remote control with no Charles");
      }
      const charlesJson = convertItem({
        xml2JsonRoom,
        doorMap,
        map,
        roomName,
        xml2JsonItem: charlesXml2Json,
      })!;
      return {
        type: "joystick",
        config: { controls: [itemKey(charlesJson)] },
        position,
      };
    }

    case "cap":
      return {
        type: "slidingBlock",
        config: { style: "puck" },
        position,
      };

    case "sandwich":
    case "stool": {
      const conversions: Record<
        typeof xml2JsonItem.kind,
        ItemConfigMap<SceneryName, string, string>["movableBlock"]["style"]
      > = {
        stool: "anvil",
        sandwich: "sandwich",
      };

      return {
        type: "movableBlock",
        config: {
          style: conversions[xml2JsonItem.kind],
          ...((
            xml2JsonItem.behavior ===
            "behavior of thing able to move by pushing"
          ) ?
            { movement: "free" }
          : {
              movement:
                (
                  xml2JsonItem.behavior ===
                    "behavior of flying there and back" ||
                  xml2JsonItem.behavior === "behavior of there and back"
                ) ?
                  "back-forth"
                : "clockwise",
              startDirection: convertDirection(
                // blacktooth 78 xml has a back and forth without a direction
                xml2JsonItem.orientation || "south",
              ),
              // I don't know where in the xml this is stored - think it might not be
              // at all - this needs to be changed in a patch on the room where items are
              // moving on first entry
              activated: false,
            }),
        },
        position,
      };
    }

    case "book":
      return {
        type: "book",
        config: { slider: xml2JsonItem.class === "freeitem" },
        position,
      };

    case "drum":
    case "portable-brick":
    case "another-portable-brick": {
      const conversions: Record<
        typeof xml2JsonItem.kind,
        ItemConfigMap<SceneryName, string, string>["portableBlock"]["style"]
      > = {
        drum: "drum",
        "another-portable-brick": "cube",
        "portable-brick": "sticks",
      };

      return {
        type: "portableBlock",
        config: { style: conversions[xml2JsonItem.kind] },
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
        config: {
          // this doesn't seem to be in the xml - will need to be added via a patch
          activates: {},
        },
        position,
      };
    }

    case "imperial-guard":
      return {
        type: "baddie",
        config: {
          which: "cyberman",
          startDirection: "towards",
          activated: true,
          movement: baddieBehaviourConversions[
            xml2JsonItem.behavior
          ] as AllowedBaddieMovements<"cyberman">,
        },
        position,
      };

    case "imperial-guard-head":
      return {
        type: "baddie",
        config: {
          which: "cyberman",
          startDirection: convertDirection(xml2JsonItem.orientation),
          // they are charging:
          activated: false,
          wakes:
            xml2JsonItem.behavior ===
            "behavior of waiting hunter in four directions",
          movement: "towards-on-shortest-axis-xy4",
        },
        position,
      };

    case "monkey":
    case "bighead-robot": {
      return {
        type: "baddie",
        config: {
          which: baddieConversions[xml2JsonItem.kind],
          activated: true,
          movement: baddieBehaviourConversions[xml2JsonItem.behavior],
        },
        position,
      };
    }
    case "bomb":
      return {
        type: "baddie",
        config: {
          which: "headless-base",
          activated: true,
          movement: "towards-tripped-on-axis-xy4",
        },
        position,
      };

    case "elephant-head":
      return {
        type: "baddie",
        config: {
          which: "elephant-head",
          activated: true,
          movement: "unmoving",
          startDirection: convertDirection(xml2JsonItem.orientation),
        },
        position,
      };

    case "siren":
      return {
        type: "baddie",
        config: {
          which: "dalek",
          activated: true,
          movement: "patrol-randomly-diagonal",
        },
        position,
      };

    case "elephant":
      return {
        type: "baddie",
        config: {
          which: "elephant",
          activated: true,
          movement: "patrol-randomly-xy4",
        },
        position,
      };

    case "bubble-robot":
      return {
        type: "baddie",
        config: {
          which: "bubble-robot",
          activated: true,
          movement: "patrol-randomly-xy8",
        },
        position,
      };

    case "helicopter-bug": {
      const movement =
        (
          xml2JsonItem.behavior ===
          "behavior of random patroling in eight directions"
        ) ?
          "patrol-randomly-xy8"
        : (
          xml2JsonItem.behavior ===
          "behavior of waiting hunter in eight directions"
        ) ?
          "towards-when-in-square-xy8"
        : null;

      if (movement === null) {
        throw new Error("unknown helicopter-bug behaviour");
      }

      return {
        type: "baddie",
        config: {
          which: "helicopter-bug",
          activated: true,
          movement,
        },
        position,
      };
    }

    case "emperor":
    case "throne-guard":
      return {
        type: "baddie",
        config: {
          which: baddieConversions[xml2JsonItem.kind],
          activated: true,
          movement: "towards-when-in-square-xy8",
        },
        position,
      };

    case "turtle":
      return {
        type: "baddie",
        config: {
          which: "turtle",
          startDirection: convertDirection(xml2JsonItem.orientation),
          movement: "clockwise",
          activated: true,
        },
        position,
      };

    case "diver":
      return {
        type: "baddie",
        config: {
          which: baddieConversions[xml2JsonItem.kind],
          startDirection: convertDirection(xml2JsonItem.orientation),
          activated: true,
          style:
            // rough way to psuedo-randomise which style:
            (
              (parseInt(xml2JsonItem.x) * 2 + parseInt(xml2JsonItem.y)) % 2 ===
              1
            ) ?
              "starsAndStripes"
            : "greenAndPink",
          movement:
            xml2JsonItem.behavior === "behavior of there and back" ?
              "back-forth"
            : "clockwise",
        },
        position,
      };

    case "puppy":
      return {
        type: "hushPuppy",
        config: {},
        position,
      };

    case "ball":
      return {
        type: "ball",
        config: {},
        position,
      };

    case "head":
    case "heels":
    case "headoverheels":
      return {
        type: "sceneryPlayer",
        config: {
          which:
            xml2JsonItem.kind === "headoverheels" ?
              "headOverHeels"
            : xml2JsonItem.kind,
        },
        position,
      };

    default:
      console.warn(
        `not converting ${chalk.yellow((xml2JsonItem as unknown as Xml2JsonItem).kind)} in room ${chalk.green(roomName)}`,
      );
      //item.kind satisfies never;
      return undefined;
  }
};
