import { Container, type Rectangle, Sprite, type Texture } from "pixi.js";

import type { Xy } from "../vectors/vectors";

/**
 * a rectangle covered edge to edge with copies of a texture, laid as a tiling
 * sprite would lay them. Tiles at the edges overhang the rectangle rather than
 * being cut off, so this is for use under a mask
 */
export const tiledSprites = (
  texture: Texture,
  /**
   * the rectangle to cover, in the parent's space
   */
  rectangle: Rectangle,
  /**
   * where one tile's top-left corner falls, relative to the rectangle's
   * top-left
   */
  tilePosition: Xy,
): Container => {
  const tiles = new Container({
    label: "tiledSprites",
    x: rectangle.x,
    y: rectangle.y,
  });
  const { width: tileWidth, height: tileHeight } = texture;
  // the tile column and row covering the rectangle's top-left corner:
  const firstTileX =
    tilePosition.x - Math.ceil(tilePosition.x / tileWidth) * tileWidth;
  const firstTileY =
    tilePosition.y - Math.ceil(tilePosition.y / tileHeight) * tileHeight;

  for (let tileY = firstTileY; tileY < rectangle.height; tileY += tileHeight) {
    for (let tileX = firstTileX; tileX < rectangle.width; tileX += tileWidth) {
      tiles.addChild(new Sprite({ texture, x: tileX, y: tileY }));
    }
  }
  return tiles;
};
