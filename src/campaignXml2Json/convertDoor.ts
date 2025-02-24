import type { JsonItemUnion } from "../model/json/JsonItem";
import type { DirectionXy4 } from "../utils/vectors/vectors";
import { perpendicularAxisXy, addXy } from "../utils/vectors/vectors";
import { autoZ } from "./convertCampaign";
import { convertDirection } from "./convertDirection";
import { convertRoomId } from "./convertRoomId";
import {
  type MapXml2Json,
  type CompassDirectionsNESW,
  type CompassDirections,
  type Xml2JsonRoom,
  roomNameFromXmlFilename,
} from "./readToJson";

export const convertDoor = (
  map: MapXml2Json,
  roomName: string,
  item: { x: string; y: string; z: string } & {
    kind: `${string}-door-${CompassDirectionsNESW}`;
    class: "door";
    where: CompassDirections;
  },
  position: { x: number; y: number; z: number },
  xml2JsonRoom: Xml2JsonRoom,
): JsonItemUnion => {
  const roomOnMap = map[roomName];
  const toRoom = convertRoomId(roomNameFromXmlFilename(roomOnMap[item.where]!));

  const direction: DirectionXy4 = convertDirection(item.where);
  // this is unreliable - east and west can be used interchangeably in the xml(!).
  // ie, foo-door-west will sometimes be used to go wast (!) - presumably because they look
  // similar
  //const isFront =
  //  item.kind.endsWith("-west") || item.kind.endsWith("-south");
  // this isn't really reliable either since the "where" is just a label
  // but might be the best we have (for now) - it is sometimes wrong in the "triple" rooms
  // so these probably need manual patching
  const isFront = direction === "towards" || direction === "right";

  const axis =
    item.kind.endsWith("-east") || item.kind.endsWith("-west") ? "x" : "y";
  const cAxis = perpendicularAxisXy(axis);

  const z =
    position.z === -1 ?
      autoZ({ x: parseInt(item.x), y: parseInt(item.y) }, xml2JsonRoom)
    : position.z;

  const vectorToMoveFrontSideInwards = isFront ? { [cAxis]: 1 } : {};

  // axes have flipped, so start the door on its opposite side:
  const vectorToMoveStartingOnLowSide = { [axis]: -1 };

  return {
    type: "door",
    config: {
      direction,
      toRoom,
    },
    position: {
      ...addXy(
        position,
        vectorToMoveStartingOnLowSide,
        vectorToMoveFrontSideInwards,
      ),
      z,
    },
  };
};
