import type { UnknownRoomState } from "../../../../model/RoomState";
import type { DoorFrameTextureName } from "../../../../sprites/doorSpritesheetData";
import type { TextureId } from "../../../../sprites/spriteSheetData";

import { loadedSpriteSheet } from "../../../../sprites/spriteSheet";

export const doorTexture = (
  room: Pick<UnknownRoomState, "color" | "planet">,
  axis: "x" | "y",
  position: "far" | "near" | "top",
): DoorFrameTextureName => {
  const hasWorldSpecificTexture =
    loadedSpriteSheet().textures[
      `door.frame.${room.planet}.${axis}.near` as TextureId
    ] !== undefined;

  const sceneryName = hasWorldSpecificTexture ? room.planet : "generic";

  const useDarkTexture =
    room.color.shade === "dimmed" &&
    loadedSpriteSheet().textures[
      `door.frame.${sceneryName}.dark.${axis}.${position}` as TextureId
    ] !== undefined;

  return `door.frame.${sceneryName}${useDarkTexture ? ".dark" : ""}.${axis}.${position}` as DoorFrameTextureName;
};
