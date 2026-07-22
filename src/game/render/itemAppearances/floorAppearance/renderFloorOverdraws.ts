import { Container } from "pixi.js";

import { type ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";
import { roomItemsIterable, type RoomState } from "../../../../model/RoomState";
import { wallInPlayTimes } from "../../../../model/times";
import { type AppSpritesheetWithVariants } from "../../../../sprites/spritesheet/AppSpritesheet";
import { iterateToContainer } from "../../../../utils/pixi/iterateToContainer";
import {
  axisProjectsReversed,
  rotateXy,
} from "../../../../utils/vectors/rotateXy";
import {
  addXyz,
  dominantAxisXy,
  isNegativeSideXy,
  originXyz,
  perpendicularAxisXy,
  subXyz,
  type Xy,
  type Xyz,
} from "../../../../utils/vectors/vectors";
import { blockSizePx } from "../../../physics/mechanicsConstants";
import { createSprite } from "../../createSprite";
import { projectWorldXyzToScreenXy } from "../../projections";

// the original game had floor tiles that didn't go all the way up to the walls.
// that was an artifact, but I like it, so I render small rectangular sprites to
// make the same effect
export const renderFloorOverdraws = (
  /**
   * the origin of the floor's content-local space - its (integer) physical
   * position
   */
  floorPosition: Xyz,
  roomState: RoomState<string, string>,
  spritesheet: AppSpritesheetWithVariants,
  cameraQuarterAngle: Xy,
): Container => {
  // which walls/doors are on the far side of the room - and so get a floor
  // corner drawn under them - depends on the camera angle:
  const isOnFarSide = (
    item: ItemTypeUnion<"doorFrame" | "wall", string, string>,
  ): boolean =>
    !isNegativeSideXy(rotateXy(item.config.direction, cameraQuarterAngle));

  const floorOverdraws = iterateToContainer(
    roomItemsIterable(roomState.items)
      .filter(
        (
          otherItem,
        ): otherItem is ItemTypeUnion<"doorFrame" | "wall", string, string> => {
          return (
            otherItem.type === "wall" ||
            // for heightened doors (with legs), draw a corner the same as for walls:
            otherItem.type === "doorLegs"
          );
        },
      )
      // TODO: use collision detection to test if the wall/door intersects the floor
      .filter(isOnFarSide)
      .map((item): Container => {
        const {
          id,
          config: { direction },
          state: { position: doorOrWallPosition },
        } = item;
        const apparentDirection = rotateXy(direction, cameraQuarterAngle);

        const crossAxis = dominantAxisXy(direction);
        const alongAxis = perpendicularAxisXy(crossAxis);

        // towards/right items' boxes extend negative, out of the room, so
        // their position (min corner) is off the floor edge by the item's
        // cross-axis extent - the corners anchor at the room-face edge:
        const outIsNegative = isNegativeSideXy(direction);

        // the corner sprites extend from their anchor in the rendered axis's
        // base screen direction; when the world along-axis projects reversed
        // the art hangs over the cell on the wrong side, so shift one block
        // back over it:
        const alongReversed = axisProjectsReversed(
          alongAxis,
          cameraQuarterAngle,
        );

        const anchorWorld = addXyz(
          subXyz(doorOrWallPosition, floorPosition),
          outIsNegative ? { [crossAxis]: item.aabb[crossAxis] } : originXyz,
          alongReversed ? { [alongAxis]: blockSizePx[alongAxis] } : originXyz,
        );

        // draw the corners on the floor:
        return createSprite({
          textureId: "floorOverdraw.cornerNearWall",
          label: id,
          ...projectWorldXyzToScreenXy(anchorWorld, cameraQuarterAngle),
          times:
            item.type === "wall" ?
              wallInPlayTimes(item.config)
              // doors are two blocks wide:
            : { [alongAxis]: 2 },
          cameraQuarterAngle,
          anchor: { x: 0, y: 1 },
          // of the two far sides, apparently-away (dominant +y) flips;
          // apparently-left does not:
          flipX: apparentDirection.y > apparentDirection.x,
          spritesheet,
        });
      }),
    new Container({ label: "floorOverdraws" }),
  );

  return floorOverdraws;
};
