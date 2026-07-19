import { type UnknownRoomState } from "../../../../model/RoomState";
import { type ZxSpectrumRoomHue } from "../../../../originalGame";
import { isTextureId } from "../../../../sprites/assertIsTextureId";
import { type SceneryName } from "../../../../sprites/planets";
import { type AppSpritesheetData } from "../../../../sprites/spritesheet/AppSpritesheet";
import { type SceneryWithOwnDoors } from "../../../../sprites/spritesheet/spritesheetData/doorSpritesheetData";
import {
  type DoorFrameId,
  type DoorHueSuffix,
} from "../../../../sprites/spritesheet/spritesheetData/variantSpritesheetData";

/** only the sceneries with door art of their own have a frame of their own */
const hasWorldSpecificTexture = (
  planet: SceneryName,
  axisIndex: 0 | 2,
  spritesheetData: AppSpritesheetData,
): planet is SceneryWithOwnDoors =>
  isTextureId(`door.frame.${planet}.d${axisIndex}.near`, spritesheetData);

export const doorTexture = (
  room: Pick<UnknownRoomState, "color" | "planet">,
  /** the door's along-wall world axis as a d-number: 0 = x, 2 = y */
  axisIndex: 0 | 2,
  position: "far" | "near" | "top",
  spritesheetData: AppSpritesheetData,
  /** the destination room's hue the frame variant is recoloured to */
  hue: ZxSpectrumRoomHue,
): `${DoorFrameId}.${DoorHueSuffix}` => {
  const sceneryName =
    hasWorldSpecificTexture(room.planet, axisIndex, spritesheetData) ?
      room.planet
    : "generic";

  if (room.color.shade === "dimmed") {
    const darkId =
      `door.frame.${sceneryName}.dark.d${axisIndex}.${position}` as const;
    if (isTextureId(darkId, spritesheetData)) {
      return `${darkId}.hue=${hue}`;
    }
  }

  return `door.frame.${sceneryName}.d${axisIndex}.${position}.hue=${hue}`;
};
