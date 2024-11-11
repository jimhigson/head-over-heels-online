import type { UnknownRoomState } from "@/model/modelTypes";
import { spriteSheet, type TextureId } from "@/sprites/spriteSheet";

export const doorTexture = (
  room: UnknownRoomState,
  axis: "x" | "y",
  nearness: "near" | "far",
): TextureId => {
  const worldSpecificTexture =
    spriteSheet.textures[`${room.planet}.door.front.${axis}` as TextureId] !==
    undefined;

  if (nearness == "near") {
    return (
      worldSpecificTexture ?
        `${room.planet}.door.front.${axis}`
      : `generic.door.front.${axis}`) as TextureId;
  } else {
    return (
      worldSpecificTexture ?
        `${room.planet}.door.back.${axis}`
      : `generic.door.back.${axis}`) as TextureId;
  }
};
