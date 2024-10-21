import { Container } from "pixi.js";
import { AnyRoom, RoomId } from "../../modelTypes";
import { RenderWorldOptions } from "./renderWorld";
import { makeClickPortal } from "./makeClickPortal";
import { spriteAtBlock } from "./spriteAtBlock";
import { TextureId } from "../../sprites/pixiSpriteSheet";
import { ItemAppearance, itemAppearances } from "../../ItemAppearances";
import { Item, ItemType } from "../../Item";

const reifyTexture = <T extends ItemType>(item: Item<T>): TextureId => {
  const appearanceTexture = itemAppearances[item.type]
    .textureId as ItemAppearance<T>["textureId"];
  return typeof appearanceTexture === "function"
    ? appearanceTexture(item.config)
    : appearanceTexture;
};

export function* renderItems(
  room: AnyRoom,
  options: RenderWorldOptions,
): Generator<Container, undefined, undefined> {
  for (const item of room.items) {
    const sprite = spriteAtBlock(
      item.position,
      { ...itemAppearances[item.type], textureId: reifyTexture(item) },
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
