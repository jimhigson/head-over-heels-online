import type { UnknownRoomState } from "@/model/modelTypes";
import type { DoorFrameTextureName } from "@/sprites/doorSpritesheetData";
import { spriteSheet, type TextureId } from "@/sprites/spriteSheet";

export const doorTexture = (
  room: UnknownRoomState,
  axis: "x" | "y",
  position: "near" | "far" | "top",
): DoorFrameTextureName => {
  const hasWorldSpecificTexture =
    spriteSheet.textures[`${room.planet}.door.front.${axis}` as TextureId] !==
    undefined;

  const sceneryName = hasWorldSpecificTexture ? room.planet : "generic";

  const useDarkTexture =
    room.color.shade === "dimmed" &&
    spriteSheet.textures[
      `${sceneryName}.dark.door.front.${axis}` as TextureId
    ] !== undefined;

  return `door.frame.${sceneryName}${useDarkTexture ? ".dark" : ""}.${axis}.${position}` as DoorFrameTextureName;
};
