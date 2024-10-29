import { AnyRoomState } from "@/modelTypes";
import { pixiSpriteSheet, type TextureId } from "@/sprites/pixiSpriteSheet";

export const doorTexture = (
  room: AnyRoomState,
  axis: "x" | "y",
  nearness: "near" | "far",
): TextureId => {
  const worldSpecificTexture =
    pixiSpriteSheet.textures[
      `${room.planet}.door.front.${axis}` as TextureId
    ] !== undefined;

  if (nearness == "near") {
    return (
      worldSpecificTexture
        ? `${room.planet}.door.front.${axis}`
        : `generic.door.front.${axis}`
    ) as TextureId;
  } else {
    return (
      worldSpecificTexture
        ? `${room.planet}.door.back.${axis}`
        : `generic.door.back.${axis}`
    ) as TextureId;
  }
};
