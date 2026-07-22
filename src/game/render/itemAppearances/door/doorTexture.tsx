import { type UnknownRoomState } from "../../../../model/RoomState";
import { isTextureId } from "../../../../sprites/assertIsTextureId";
import { type SceneryName } from "../../../../sprites/planets";
import { type AppSpritesheetData } from "../../../../sprites/spritesheet/AppSpritesheet";
import { type SceneryWithOwnDoors } from "../../../../sprites/spritesheet/spritesheetData/doorSpritesheetData";
import { type DoorFrameId } from "../../../../sprites/spritesheet/spritesheetData/variantSpritesheetData";

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
): DoorFrameId => {
  const sceneryName =
    hasWorldSpecificTexture(room.planet, axis, spritesheetData) ?
      room.planet
    : "generic";

  if (room.color.shade === "dimmed") {
    const darkId =
      `door.frame.${sceneryName}.dark.${axis}.${position}` as const;
    if (isTextureId(darkId, spritesheetData)) {
      return darkId;
    }
  }

  return `door.frame.${sceneryName}.${axis}.${position}`;
};
