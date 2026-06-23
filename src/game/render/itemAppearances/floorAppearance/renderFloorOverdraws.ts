import { Container } from "pixi.js";

import { type ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";
import { type ItemInPlay } from "../../../../model/ItemInPlay";
import { roomItemsIterable, type RoomState } from "../../../../model/RoomState";
import { wallTimes } from "../../../../model/times";
import { type AppSpritesheet } from "../../../../sprites/spritesheet/variants/AppSpritesheet";
import { iterateToContainer } from "../../../../utils/pixi/iterateToContainer";
import { axisProjectsReversed } from "../../../../utils/vectors/rotateXy";
import {
  addXyz,
  originXyz,
  perpendicularAxisXy,
  rotateDirectionXy4ByCameraAngle,
  subXyz,
  tangentAxis,
  type Xy,
} from "../../../../utils/vectors/vectors";
import { blockSizePx } from "../../../physics/mechanicsConstants";
import { createSprite } from "../../createSprite";
import { projectWorldXyzToScreenXy } from "../../projections";

// the original game had floor tiles that didn't go all the way up to the walls.
// that was an artifact, but I like it, so I render small rectangular sprites to
// make the same effect
export const renderFloorOverdraws = (
  { state: { position: floorPosition } }: ItemInPlay<"floor", string, string>,
  roomState: RoomState<string, string>,
  spritesheet: AppSpritesheet,
  cameraAngle: Xy,
): Container => {
  // which walls/doors are on the far side of the room - and so get a floor
  // corner drawn under them - depends on the camera angle:
  const isOnFarSide = (
    item: ItemTypeUnion<"doorFrame" | "wall", string, string>,
  ): boolean => {
    const renderedDirection = rotateDirectionXy4ByCameraAngle(
      item.config.direction,
      cameraAngle,
    );
    return renderedDirection === "away" || renderedDirection === "left";
  };

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
        const renderedDirection = rotateDirectionXy4ByCameraAngle(
          direction,
          cameraAngle,
        );

        const crossAxis = tangentAxis(direction);
        const alongAxis = perpendicularAxisXy(crossAxis);

        // towards/right items' boxes extend negative, out of the room, so
        // their position (min corner) is off the floor edge by the item's
        // cross-axis extent - the corners anchor at the room-face edge:
        const outIsNegative = direction === "towards" || direction === "right";

        // the corner sprites extend from their anchor in the rendered axis's
        // base screen direction; when the world along-axis projects reversed
        // the art hangs over the cell on the wrong side, so shift one block
        // back over it:
        const alongReversed = axisProjectsReversed(alongAxis, cameraAngle);

        const anchorWorld = addXyz(
          subXyz(doorOrWallPosition, floorPosition),
          outIsNegative ? { [crossAxis]: item.aabb[crossAxis] } : originXyz,
          alongReversed ? { [alongAxis]: blockSizePx[alongAxis] } : originXyz,
        );

        // draw the corners on the floor:
        return createSprite({
          textureId: "floorOverdraw.cornerNearWall",
          label: id,
          ...projectWorldXyzToScreenXy(anchorWorld, cameraAngle),
          times:
            item.type === "wall" ?
              wallTimes(item.config)
              // doors are two blocks wide:
            : { [alongAxis]: 2 },
          cameraAngle,
          anchor: { x: 0, y: 1 },
          flipX: renderedDirection === "away",
          spritesheet,
        });
      }),
    new Container({ label: "floorOverdraws" }),
  );

  return floorOverdraws;
};
