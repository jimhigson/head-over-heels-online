import { type UnknownRoomState } from "../../../../model/RoomState";
import { type DoorFrameTextureName } from "../../../../sprites/spritesheet/spritesheetData/doorSpritesheetData";
import { type TextureId } from "../../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { type AppSpritesheet } from "../../../../sprites/spritesheet/variants/SpritesheetVariants";

export const doorTexture = (
  room: Pick<UnknownRoomState, "color" | "planet">,
  axis: "x" | "y",
  position: "far" | "near" | "top",
  originalSpritesheet: AppSpritesheet,
): DoorFrameTextureName => {
  const hasWorldSpecificTexture =
    originalSpritesheet.textures[
      `door.frame.${room.planet}.${axis}.near` as TextureId
    ] !== undefined;

  const sceneryName = hasWorldSpecificTexture ? room.planet : "generic";

  const useDarkTexture =
    room.color.shade === "dimmed" &&
    originalSpritesheet.textures[
      `door.frame.${sceneryName}.dark.${axis}.${position}` as TextureId
    ] !== undefined;

  return `door.frame.${sceneryName}${useDarkTexture ? ".dark" : ""}.${axis}.${position}` as DoorFrameTextureName;
};
