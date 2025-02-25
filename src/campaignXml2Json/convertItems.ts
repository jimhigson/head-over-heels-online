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
import type { MapXml2Json, Xml2JsonRoom } from "./readToJson";
import { readRoomToXmlJson, roomNameFromXmlFilename } from "./readToJson";
import chalk from "chalk";
import type { Xml2JsonItem, XmlItemMonsterBehaviour } from "./Xml2JsonItem";
import { itemKey } from "../utils/keyItems";
import type { JsonItemUnion } from "../model/json/JsonItem";
import { convertDoor } from "./convertDoor";
import {
  addXyz,
  scaleXy,
  subXy,
  type DirectionXy4,
} from "../utils/vectors/vectors";
import type {
  AllowedMonsterMovements,
  ItemConfigMap,
  JsonMovement,
} from "../model/json/ItemConfigMap";
import { convertRoomDimensions } from "./convertRoomDimensions";
import { xmlRoomSidesWithDoors } from "./xmlRoomSidesWithDoors";

const monsterBehaviourConversions = {
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
} as const satisfies Record<XmlItemMonsterBehaviour, JsonMovement>;

const monsterConversions = {
  "helicopter-bug": "helicopterBug",
  "imperial-guard": "cyberman",
  "imperial-guard-head": "cyberman",
  siren: "dalek",
  bomb: "homingBot",
  diver: "skiHead",
  "bubble-robot": "bubbleRobot",
  monkey: "monkey",
  elephant: "elephant",
  "elephant-head": "elephantHead",
  turtle: "turtle",
  "throne-guard": "emperorsGuardian",
  "bighead-robot": "computerBot",
  emperor: "emperor",
} as const satisfies Record<
  string,
  ItemConfigMap<SceneryName, string, string>["monster"]["which"]
>;

export const convertItemsArray = async (
  map: MapXml2Json,
  roomName: string,
  xml2JsonRoom: Xml2JsonRoom,
  doorMap: LooseDoorMap,
): Promise<JsonItemUnion[]> => {
  return (
    await Promise.all(
      xml2JsonRoom.items.map((xml2JsonItem) =>
        convertItem({
          xml2JsonRoom,
          doorMap,
          map,
          roomName,
          xml2JsonItem,
          xml2JsonItems: xml2JsonRoom.items,
        }),
      ),
    )
  ).filter((x): x is JsonItemUnion => x !== undefined);
};

type ConvertItemParams = {
  xml2JsonRoom: Xml2JsonRoom;
  doorMap: Partial<Record<DirectionXy4, true>>;
  map: MapXml2Json;
  roomName: string;
  xml2JsonItem: Xml2JsonItem;
  xml2JsonItems: Xml2JsonItem[];
};

const convertItem = async ({
  xml2JsonRoom,
  doorMap,
  map,
  roomName,
  xml2JsonItem,
  xml2JsonItems,
}: ConvertItemParams): Promise<JsonItemUnion | undefined> => {
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
    const parsedWallName = parseXmlWallName(xml2JsonItem.kind);
    // Xml2JsonWallItem has to be kept out of the wall union since it can have any string value
    // and stops us from discriminating unions properly
    return {
      type: "wall",
      config: {
        direction:
          parsedWallName.axis === "x" ?
            parsedWallName.isInvisible ?
              "towards"
            : "away"
          : parsedWallName.isInvisible ? "right"
          : "left",
        tiles: [convertWallName(planetName, xml2JsonItem.kind)],
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
      const destinationRoomXmlFilename =
        roomOnMap[xml2JsonItem.kind === "teleport" ? "teleport" : "teleport2"];

      if (destinationRoomXmlFilename === undefined) {
        throw new Error("teleporter with no destination");
      }
      const destinationRoomXmlId = roomNameFromXmlFilename(
        destinationRoomXmlFilename,
      );

      /* teleporters locate in the original game relative to the room's
         centre. In same-size to/from rooms, this is identical to not
         changing the player's position, but the following as dissimilar sizes
         and need this:
            # egyptus9fish <-> egyptus13
            # blacktooth57 <-> moonbase9,
            # moonbase1 <-> blacktooth51
            # moonbase9 <-> blacktooth57
            # moonbase35 -> blacktooth51
            # penitentiary18fish (double room) <-> penitentiary30
            # penitentiary18fish (double room) <-> penitentiary34crown
      */

      const thisRoomSize = convertRoomDimensions(
        xml2JsonRoom,
        xmlRoomSidesWithDoors(xml2JsonRoom),
      );
      const thisRoomCentre = scaleXy(thisRoomSize, 0.5);
      const teleporterPositionVectorFromCentre = {
        ...subXy(position, thisRoomCentre),
        z: position.z,
      };

      const destinationRoomXmlJson =
        await readRoomToXmlJson(destinationRoomXmlId);
      const destinationRoomSize = convertRoomDimensions(
        destinationRoomXmlJson,
        xmlRoomSidesWithDoors(destinationRoomXmlJson),
      );
      const destinationRoomCentre = {
        ...scaleXy(destinationRoomSize, 0.5),
        z: 0,
      };
      const destinationPosition = addXyz(
        destinationRoomCentre,
        teleporterPositionVectorFromCentre,
      );

      if (
        !Number.isInteger(destinationPosition.x) ||
        !Number.isInteger(destinationPosition.y) ||
        !Number.isInteger(destinationPosition.z)
      ) {
        throw new Error("non-integer position for teleporter destination");
      }

      return {
        type: "teleporter",
        config: {
          // this is the one item where the generics for RoomId would be useful
          toRoom: convertRoomId(destinationRoomXmlId),
          toPosition: destinationPosition,
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
            xml2JsonItem.behavior === "behavior of disappearance on touch" ?
              "onTouch"
            : undefined,
        },
        position,
      };

    case "cylinder":
      return {
        type: "block",
        config: { style: "tower" },
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
            xml2JsonItem.behavior === "behavior of disappearance on jump into" ?
              "onStand"
            : undefined,
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
          disappearing:
            xml2JsonItem.behavior === "behavior of disappearance on jump into" ?
              "onStand"
            : undefined,
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
        donuts: "doughnuts",
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
      const charlesJson = await convertItem({
        xml2JsonRoom,
        doorMap,
        map,
        roomName,
        xml2JsonItem: charlesXml2Json,
        xml2JsonItems,
      });
      if (charlesJson === undefined) {
        throw new Error("charles didn't convert while converting joystick");
      }
      return {
        type: "joystick",
        config: { controls: [itemKey(charlesJson, [charlesJson])] },
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
        stool: "stepStool",
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
      return xml2JsonItem.class === "freeitem" ?
          {
            type: "slidingBlock",
            config: { style: "book" },
            position,
          }
        : {
            type: "block",
            config: {
              style: "book",
              disappearing:
                (
                  xml2JsonItem.behavior ===
                  "behavior of disappearance on jump into"
                ) ?
                  "onStand"
                : undefined,
            },
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
        type: "monster",
        config: {
          which: "cyberman",
          startDirection: "towards",
          activated: true,
          movement: monsterBehaviourConversions[
            xml2JsonItem.behavior
          ] as AllowedMonsterMovements<"cyberman">,
        },
        position,
      };

    case "imperial-guard-head":
      return {
        type: "monster",
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
        type: "monster",
        config: {
          which: monsterConversions[xml2JsonItem.kind],
          activated: true,
          movement: monsterBehaviourConversions[xml2JsonItem.behavior],
        },
        position,
      };
    }
    case "bomb":
      return {
        type: "monster",
        config: {
          which: "homingBot",
          activated: true,
          movement: "towards-tripped-on-axis-xy4",
        },
        position,
      };

    case "elephant-head":
      return {
        type: "monster",
        config: {
          which: "elephantHead",
          activated: true,
          movement: "unmoving",
          startDirection: convertDirection(xml2JsonItem.orientation),
        },
        position,
      };

    case "siren":
      return {
        type: "monster",
        config: {
          which: "dalek",
          activated: true,
          movement: "patrol-randomly-diagonal",
        },
        position,
      };

    case "elephant":
      return {
        type: "monster",
        config: {
          which: "elephant",
          activated: true,
          movement: "patrol-randomly-xy4",
        },
        position,
      };

    case "bubble-robot":
      return {
        type: "monster",
        config: {
          which: "bubbleRobot",
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
        throw new Error("unknown helicopterBug behaviour");
      }

      return {
        type: "monster",
        config: {
          which: "helicopterBug",
          activated: true,
          movement,
        },
        position,
      };
    }

    case "emperor":
      return {
        type: "monster",
        config: {
          which: "emperor",
          activated: true,
          movement: "towards-when-in-square-xy8",
        },
        position,
      };

    case "throne-guard":
      return {
        type: "monster",
        config: {
          which: "emperorsGuardian",
          activated: true,
          movement: "towards-when-in-square-xy8-unless-planet-crowns",
        },
        position,
      };

    case "turtle":
      return {
        type: "monster",
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
        type: "monster",
        config: {
          which: monsterConversions[xml2JsonItem.kind],
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
          startDirection: convertDirection(xml2JsonItem.orientation),
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
