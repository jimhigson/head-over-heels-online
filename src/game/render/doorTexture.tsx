import { AnyRoom } from "@/modelTypes";
import { pixiSpriteSheet, type TextureId } from "@/sprites/pixiSpriteSheet";

export const doorTexture = (room: AnyRoom, axis: "x" | "y") => {
  const worldSpecificTexture =
    pixiSpriteSheet.textures[
      `${room.planet}.door.front.${axis}` as TextureId
    ] !== undefined;

  const frontTexture = (
    worldSpecificTexture
      ? `${room.planet}.door.front.${axis}`
      : `generic.door.front.${axis}`
  ) as TextureId;
  const backTexture = (
    worldSpecificTexture
      ? `${room.planet}.door.back.${axis}`
      : `generic.door.back.${axis}`
  ) as TextureId;

  return {
    frontTexture,
    backTexture,
  };
};
