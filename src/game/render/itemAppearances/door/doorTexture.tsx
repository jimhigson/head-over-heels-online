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
  axis: "x" | "y",
  spritesheetData: AppSpritesheetData,
): planet is SceneryWithOwnDoors =>
  isTextureId(`door.frame.${planet}.${axis}.near`, spritesheetData);

export const doorTexture = (
  room: Pick<UnknownRoomState, "color" | "planet">,
  axis: "x" | "y",
  position: "far" | "near" | "top",
  spritesheetData: AppSpritesheetData,
  /** the destination room's hue the frame variant is recoloured to */
  hue: ZxSpectrumRoomHue,
): `${DoorFrameId}.${DoorHueSuffix}` => {
  const sceneryName =
    hasWorldSpecificTexture(room.planet, axis, spritesheetData) ?
      room.planet
    : "generic";

  if (room.color.shade === "dimmed") {
    const darkId =
      `door.frame.${sceneryName}.dark.${axis}.${position}` as const;
    if (isTextureId(darkId, spritesheetData)) {
      return `${darkId}.hue=${hue}`;
    }
  }

  return `door.frame.${sceneryName}.${axis}.${position}.hue=${hue}`;
};
