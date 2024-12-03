import type { UnknownRoomState } from "@/model/modelTypes";
import { spriteSheet, type TextureId } from "@/sprites/spriteSheet";

export const doorTexture = (
  room: UnknownRoomState,
  axis: "x" | "y",
  nearness: "near" | "far",
): TextureId => {
  const hasWorldSpecificTexture =
    spriteSheet.textures[`${room.planet}.door.front.${axis}` as TextureId] !==
    undefined;

  const sceneryName = hasWorldSpecificTexture ? room.planet : "generic";

  const useDarkTexture =
    room.color.shade === "dimmed" &&
    spriteSheet.textures[
      `${sceneryName}.dark.door.front.${axis}` as TextureId
    ] !== undefined;

  return `${sceneryName}${useDarkTexture ? ".dark" : ""}.door.${nearness == "near" ? "front" : "back"}.${axis}` as TextureId;
};
