import { Container } from "pixi.js";
import { addXyz, XyMaybeZ } from "@/utils/vectors";
import { blockSizePx } from "@/sprites/pixiSpriteSheet";
import { Xy, Xyz } from "@/utils/vectors";

import { AnyItemInPlay } from "@/model/ItemInPlay";

export const moveContainerToBlockXyz = (
  blockXyz: XyMaybeZ,
  sprite: Container,
) => {
  const projectionXyz = projectBlockXyzToScreenXy(blockXyz);

  sprite.x = projectionXyz.x;
  sprite.y = projectionXyz.y;

  return sprite;
};

export const itemZIndex = ({ position, aabb }: AnyItemInPlay) => {
  return projectWorldXyzToScreenZIndex(addXyz(position, aabb));
};

export const moveSpriteToItemProjection = (
  item: AnyItemInPlay,
  sprite: Container,
) => {
  const { position } = item;
  const projectionXyz = projectWorldXyzToScreenXy(position);

  sprite.x = projectionXyz.x;
  sprite.y = projectionXyz.y;

  // for the same of z-index, we always use the back, top corner of the item:
  sprite.zIndex = itemZIndex(item);
};

export const projectWorldXyzToScreenZIndex = ({
  x = 0,
  y = 0,
  z = 0,
}: Partial<Xyz>): number => {
  // z here is the z-index, for if the renderer needs it
  // boost x and y because height alone can never put an item in front
  // of another item it is set back from, no matter what the relative heights
  return z - (x << 8) - (y << 8);
  //return z - x - y;
};

/* position on 2d screen for a given xyz in game-space 3d pixels */
export const projectWorldXyzToScreenXy = ({
  x = 0,
  y = 0,
  z = 0,
}: Partial<Xyz>): Xy => {
  const projY = -(x + y) / 2 - z;
  return {
    x: y - x,
    y: projY,
  };
};

/** get the in-game x,y,z for any given block x,y,z */
export const blockXyzToFineXyz = ({
  x = 0,
  y = 0,
  z = 0,
}: Partial<Xyz>): Xyz => {
  return {
    x: x * blockSizePx.w,
    y: y * blockSizePx.d,
    z: z * blockSizePx.h,
  };
};

/* position on 2d screen for a given xyz in game-space block position */
export const projectBlockXyzToScreenXy = (blockXyz: Partial<Xyz>): Xy => {
  return projectWorldXyzToScreenXy(blockXyzToFineXyz(blockXyz));
};
