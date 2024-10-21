import { Container, Texture } from "pixi.js";
import { AnyRoom, RoomId } from "../../modelTypes";
import { RenderWorldOptions } from "./renderWorld";
import { makeClickPortal } from "./makeClickPortal";
import { spriteAtBlock } from "./spriteAtBlock";
import { TextureId } from "../../sprites/pixiSpriteSheet";
import { ItemAppearance, itemAppearances } from "../../ItemAppearances";
import { Item, ItemType } from "../../Item";

const reifyTexture = <T extends ItemType>(
  item: Item<T>,
): TextureId | Texture[] => {
  const appearanceTexture = itemAppearances[item.type]
    .texture as ItemAppearance<T>["texture"];
  return typeof appearanceTexture === "function"
    ? appearanceTexture(item.config)
    : appearanceTexture;
};

export function* renderItems(
  room: AnyRoom,
  options: RenderWorldOptions,
): Generator<Container, undefined, undefined> {
  for (const item of room.items) {
    const reifiedTextureId = reifyTexture(item);
    const itemAppearance = itemAppearances[item.type];

    const sprite = spriteAtBlock(
      item.position,
      { ...itemAppearance, texture: reifiedTextureId },
      {
        giveZIndex: true,
      },
    );

    if (item.type === "teleporter") {
      makeClickPortal(
        (item as Item<"teleporter">).config.toRoom as RoomId,
        options,
        sprite,
      );
    }

    yield sprite;
  }
}
