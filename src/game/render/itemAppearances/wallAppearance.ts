import { Container } from "pixi.js";

import { roomSpatialIndexKey } from "../../../model/RoomState";
import { isAnimationId } from "../../../sprites/assertIsTextureId";
import { wallTileSize } from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import { isEmpty } from "../../../utils/iterators/isEmpty";
import { phaseForSubItem } from "../../../utils/maths/hashXyzToNumber0to1";
import { renderContainerToSprite } from "../../../utils/pixi/renderContainerToSprite";
import { axisProjectsReversed } from "../../../utils/vectors/rotateXy";
import {
  originXy,
  perpendicularAxisXy,
  rotateDirectionXy4ByCameraAngle,
  tangentAxis,
  type Xy,
} from "../../../utils/vectors/vectors";
import {
  type CollideableItem,
  collisionItemWithIndex,
} from "../../collision/aabbCollision";
import { isDoorframeOrLegs } from "../../physics/itemPredicates";
import { veryHighZ } from "../../physics/mechanicsConstants";
import { createSprite } from "../createSprite";
import {
  projectBlockXyzToScreenXy,
  projectWorldXyzToScreenXy,
} from "../projections";
import { wallTextureId } from "../wallTextureId";
import { itemAppearanceRenderOnce } from "./ItemAppearance";

const sampleBuffer: CollideableItem = {
  aabb: { x: 1, y: 1, z: veryHighZ },
  id: "farWallAppearanceSampleBuffer",
  state: { position: { x: 0, y: 0, z: 0 } },
};

export const farWallAppearance = itemAppearanceRenderOnce<"wall">(
  ({
    renderContext: {
      isReflection,
      general: { pixiRenderer, spritesheetVariants, cameraAngle },
      item,
      room,
    },
  }) => {
    const { id, config } = item;

    const { direction, tiles } = config;

    // which sprite a wall shows, and whether it shows at all, depends on its
    // facing after the camera rotation:
    const renderedDirection = rotateDirectionXy4ByCameraAngle(
      direction,
      cameraAngle,
    );

    if (renderedDirection === "right" || renderedDirection === "towards") {
      throw new Error(`wall is near after rotation: ${id}`);
    }

    // the tiles still repeat along the wall's physical axis (the projection
    // rotates them onto the screen):
    const alongAxis = perpendicularAxisXy(tangentAxis(direction));

    const wallTilesContainer = new Container({ label: "wallTiles" });
    const wallAnimationsContainer = new Container({ label: "wallAnimations" });
    for (let i = 0; i < config.tiles.length; i++) {
      const tileRenderPosition: Xy = projectBlockXyzToScreenXy(
        {
          [alongAxis]: i,
        },
        cameraAngle,
      );

      const tileRenderPivot =
        renderedDirection === "away" ?
          {
            x: wallTileSize.w,
            y: wallTileSize.h,
          }
        : { x: 0, y: wallTileSize.h };

      const spritesheet = spritesheetVariants.currentMainSpritesheet(
        false,
        false,
        isReflection,
      );

      const wallTileSprite = createSprite({
        textureId: wallTextureId(
          room.planet,
          tiles[i],
          renderedDirection,
          room.color.shade === "dimmed",
          spritesheet.data,
        ),
        ...tileRenderPosition,
        pivot: tileRenderPivot,
        spritesheet,
      });
      // TODO: use callback version of createSprite to create the wall with different textures
      wallTilesContainer.addChild(wallTileSprite);

      if (room.planet === "moonbase") {
        const animationId = `moonbase.wall.screen.${tiles[i]}.away`;
        // only moonbase has animated walls
        if (isAnimationId(animationId, spritesheet.data)) {
          wallAnimationsContainer.addChild(
            createSprite({
              animationId,
              startFramePhase: phaseForSubItem(item.hash, i),
              flipX: renderedDirection === "left",
              x: tileRenderPosition.x + (renderedDirection === "away" ? -8 : 8),
              y: tileRenderPosition.y - 23,
              spritesheet,
            }),
          );
        }

        if (i === config.tiles.length - 1 && config.tiles.at(-1) !== "coil") {
          const spatialIndex = room[roomSpatialIndexKey];

          sampleBuffer.state.position.x = item.state.position.x + item.aabb.x;
          sampleBuffer.state.position.y = item.state.position.y + item.aabb.y;

          const doorAtEndOfWall = !isEmpty(
            collisionItemWithIndex(
              sampleBuffer,
              spatialIndex,
              isDoorframeOrLegs,
            ),
          );

          if (doorAtEndOfWall) {
            const isDarkStr = room.color.shade === "dimmed" ? ".dark" : "";

            wallTilesContainer.addChild(
              createSprite({
                textureId: `moonbase.wallDoorTransition.${renderedDirection}${isDarkStr}`,
                ...tileRenderPosition,
                pivot: tileRenderPivot,
                spritesheet: spritesheetVariants.currentMainSpritesheet(
                  false,
                  false,
                  isReflection,
                ),
              }),
            );
            const maskSprite = createSprite({
              textureId: `moonbase.wallDoorTransition.${renderedDirection}.mask`,
              ...tileRenderPosition,
              pivot: tileRenderPivot,
              spritesheet: spritesheetVariants.originalSpritesheet,
            });
            wallTilesContainer.addChild(maskSprite);
            wallTileSprite.setMask({ mask: maskSprite, inverse: true });
          }
        }
      }
    }

    const mainContainer = new Container({ label: "wallAppearance" });
    //since .cacheAsTexture() is buggy, much safer to replace the container
    //entirely with a single sprite:
    mainContainer.addChild(
      renderContainerToSprite(pixiRenderer, wallTilesContainer),
    );
    wallTilesContainer.destroy({ children: true });
    if (wallAnimationsContainer.children.length > 0) {
      // only add animations if there are any:
      mainContainer.addChild(wallAnimationsContainer);
    }

    // the wall draws on its room-side face: for away/left walls that is the item's
    // position (min corner); towards/right walls' boxes extend negative (out of the
    // room), so their room face is a wall-thickness away from the position:
    const roomFaceXy =
      direction === "towards" || direction === "right" ?
        projectWorldXyzToScreenXy(
          { [tangentAxis(direction)]: item.aabb[tangentAxis(direction)] },
          cameraAngle,
        )
      : originXy;

    // each tile's art extends over its block in the direction the wall runs at
    // the base angle; when the along-wall axis projects reversed on screen the
    // art would hang over the block on the wrong side of its anchor corner, so
    // shift the whole wall one block along its axis to compensate:
    const alongReversed = axisProjectsReversed(alongAxis, cameraAngle);
    const alongShiftXy =
      alongReversed ?
        projectBlockXyzToScreenXy({ [alongAxis]: 1 }, cameraAngle)
      : originXy;

    mainContainer.x = roomFaceXy.x + alongShiftXy.x;
    mainContainer.y = roomFaceXy.y + alongShiftXy.y;

    return mainContainer;
  },
);
