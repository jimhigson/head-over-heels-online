import type { UnknownRoomState } from "@/model/modelTypes";
import type { DoorFrameTextureName } from "@/sprites/doorSpritesheetData";
import { spriteSheet } from "@/sprites/spriteSheet";
import type { TextureId } from "@/sprites/spriteSheetData";

export const doorTexture = (
  room: UnknownRoomState,
  axis: "x" | "y",
  position: "near" | "far" | "top",
): DoorFrameTextureName => {
  const hasWorldSpecificTexture =
    spriteSheet.textures[
      `door.frame.${room.planet}.${axis}.near` as TextureId
    ] !== undefined;

  const sceneryName = hasWorldSpecificTexture ? room.planet : "generic";

  const useDarkTexture =
    room.color.shade === "dimmed" &&
    spriteSheet.textures[
      `door.frame.${sceneryName}.dark.${axis}.${position}` as TextureId
    ] !== undefined;

  return `door.frame.${sceneryName}${useDarkTexture ? ".dark" : ""}.${axis}.${position}` as DoorFrameTextureName;
};
