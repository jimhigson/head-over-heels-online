import { Container } from "pixi.js";

import { roomSpatialIndexKey } from "../../../model/RoomState";
import { isAnimationId } from "../../../sprites/assertIsTextureId";
import { wallTileSize } from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import { isEmpty } from "../../../utils/iterators/isEmpty";
import { phaseForSubItem } from "../../../utils/maths/hashing";
import { renderContainerToSprite } from "../../../utils/pixi/renderContainerToSprite";
import {
  invertCameraAngle,
  nearestQuarterAngle,
} from "../../../utils/vectors/cameraAngleVectors";
import { octantIndexOfDirection } from "../../../utils/vectors/octantIndexOfDirection" with { type: "macro" };
import {
  axisProjectsReversed,
  resolveSpriteDirectionIndexXy4,
  spriteFlipXAtAngle,
} from "../../../utils/vectors/resolveCameraRelativeVector";
import { rotateXy } from "../../../utils/vectors/rotateXy";
import {
  alongAxisOfDirectionXy,
  directionIndexXy8,
  dominantAxisXy,
  isNegativeSideXy,
  mirrorDirectionIndexXy4,
  originXy,
  type Xy,
} from "../../../utils/vectors/vectors";
import {
  type CollideableItem,
  collisionItemWithIndex,
} from "../../collision/aabbCollision";
import { isWall } from "../../physics/itemPredicates";
import { blockSizePx, veryHighZ } from "../../physics/mechanicsConstants";
import { createSprite } from "../createSprite";
import { asItemRenderContext } from "../ItemRenderContexts";
import {
  projectBlockXyzToScreenXy,
  projectWorldXyzToScreenXy,
} from "../projections";
import { wallTextureId } from "../wallTextureId";
import {
  seeThroughWallTile,
  wallOccludesRoomFloorBehind,
} from "../wallWindowSeeThrough";
import { itemAppearanceRenderMemoised } from "./ItemAppearance";

const sampleBuffer: CollideableItem = {
  aabb: { x: 1, y: 1, z: veryHighZ },
  id: "wallAppearanceSampleBuffer",
  state: { position: { x: 0, y: 0, z: 0 } },
};

export const wallAppearance = itemAppearanceRenderMemoised<"wall">(
  ({ renderContext }) => {
    const {
      general: { pixiRenderer, spritesheets, cameraAngle },
      item,
      room,
    } = renderContext;
    const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
    // walls only ever render inside a room renderer (they are not portable, so
    // never appear in a standalone appearance context) - the full pipeline
    // context is available for the see-through decision's z-graph:
    const { zEdges } = asItemRenderContext(renderContext);
    const { config } = item;

    const { direction, tiles } = config;

    // the sprite variant to draw (d0 = left art / d2 = away art), resolved
    // against the continuous angle, with its paired flip. The flip keeps each
    // tile's painted shading on its world faces - so the light source stays
    // fixed in the world as the camera turns - while the mirror-symmetric
    // outline lands exactly where the other variant's would. A wall whose
    // apparent facing lands on a near/hidden side resolves to right/towards
    // (which no art exists for) and draws nothing: decline to render, removing
    // any current rendering. This near/far split matches
    // isWallDirectionHiddenAtAngle, which excludes the same wall from
    // z-sorting in effectiveFixedZIndex - keeping draw and sort in lockstep:
    const flipX = spriteFlipXAtAngle(cameraAngle);
    const resolvedFacingArtIndexXy4 = resolveSpriteDirectionIndexXy4(
      direction,
      cameraAngle,
      false,
    );
    if (
      resolvedFacingArtIndexXy4 === directionIndexXy8.right ||
      resolvedFacingArtIndexXy4 === directionIndexXy8.towards
    ) {
      return undefined;
    }
    // which slot the wall occupies on screen (the apparent facing): the away
    // (d2) slot anchors tiles at their far corner, the left (d0) slot at their
    // near one:
    const slotIsAway =
      (flipX ?
        mirrorDirectionIndexXy4(resolvedFacingArtIndexXy4)
      : resolvedFacingArtIndexXy4) === directionIndexXy8.away;

    // the tiles still repeat along the wall's physical axis (the projection
    // rotates them onto the screen):
    const alongAxis = alongAxisOfDirectionXy(direction);
    const alongReversed = axisProjectsReversed(alongAxis, cameraQuarterAngle);

    // the tile apparently furthest from the camera - the array-last tile at the
    // base angle, or the first when the along axis projects reversed:
    const endTileIndex = alongReversed ? 0 : tiles.length - 1;

    // a window looks out to space (moonscape) unless there is more of this room
    // behind the wall, in which case its panes must be see-through instead - a
    // moonscape pane can't honestly sit in front of room floor. Decided per wall
    // (uniform across its run) from the resolved z-graph:
    const seeThrough = wallOccludesRoomFloorBehind(item, alongAxis, zEdges);

    const wallTilesContainer = new Container({ label: "wallTiles" });
    const wallAnimationsContainer = new Container({ label: "wallAnimations" });
    for (let i = 0; i < config.tiles.length; i++) {
      const tileRenderPosition: Xy = projectBlockXyzToScreenXy(
        {
          [alongAxis]: i,
        },
        cameraQuarterAngle,
      );

      // the pivot pairs with the ART variant (not the slot): pixi mirrors
      // art-and-pivot together about the sprite's position, so a flipped
      // variant lands exactly over its slot's tile cell. The away (d2) art
      // anchors at the far corner:
      const tileRenderPivot =
        resolvedFacingArtIndexXy4 === directionIndexXy8.away ?
          {
            x: wallTileSize.w,
            y: wallTileSize.h,
          }
        : { x: 0, y: wallTileSize.h };

      const { spritesheetForCurrentRoom: spritesheet } = spritesheets;

      const clearTile =
        seeThrough ? seeThroughWallTile(room.planet, tiles[i]) : undefined;

      const wallTileSprite = createSprite({
        textureId: wallTextureId(
          room.planet,
          clearTile ?? tiles[i],
          resolvedFacingArtIndexXy4,
          room.color.shade === "dimmed",
          spritesheet.data,
        ),
        ...tileRenderPosition,
        pivot: tileRenderPivot,
        flipX,
        spritesheet,
      });
      // TODO: use callback version of createSprite to create the wall with different textures
      wallTilesContainer.addChild(wallTileSprite);

      if (room.planet === "moonbase") {
        const animationId = `moonbase.wall.screen.${tiles[i]}.d${octantIndexOfDirection("away")}`;
        // only moonbase has animated walls. The screens exist only as the
        // away-facing (d2) art, so the flip is form-forced by the slot (a
        // left-slot screen must show the mirrored form) rather than paired
        // with the lighting flip:
        if (isAnimationId(animationId, spritesheet.data)) {
          wallAnimationsContainer.addChild(
            createSprite({
              animationId,
              startFramePhase: phaseForSubItem(item.hash, i),
              flipX: !slotIsAway,
              x: tileRenderPosition.x + (slotIsAway ? -8 : 8),
              y: tileRenderPosition.y - 23,
              spritesheet,
            }),
          );
        }

        if (i === endTileIndex && tiles[endTileIndex] !== "coil") {
          const spatialIndex = room[roomSpatialIndexKey];

          // a moonbase wall's apparent end tile steps down with transition art
          // (eg into a door frame, or just ending) unless another wall continues
          // around a corner there. Walls sit outside the floor, so the corner
          // partner's end block wraps around the corner: one block onwards along
          // the apparent run and one block inwards towards the room - (+1,-1) in
          // camera space for away-rendered walls, (-1,+1) for left - rotated
          // back into world space to probe the spatial index:
          const cornerDiagonal = rotateXy(
            slotIsAway ?
              { x: blockSizePx.x, y: -blockSizePx.y }
            : { x: -blockSizePx.x, y: blockSizePx.y },
            invertCameraAngle(cameraQuarterAngle),
          );
          // the world min corner of the apparent end block: the max-along end of
          // the run normally, or the min-along end when the run projects
          // reversed (the tangent axis is one block thick, so both formulas
          // agree on it):
          const endBlockX =
            alongAxis === "x" && alongReversed ?
              item.state.position.x
            : item.state.position.x + item.aabb.x - blockSizePx.x;
          const endBlockY =
            alongAxis === "y" && alongReversed ?
              item.state.position.y
            : item.state.position.y + item.aabb.y - blockSizePx.y;
          sampleBuffer.state.position.x = endBlockX + cornerDiagonal.x;
          sampleBuffer.state.position.y = endBlockY + cornerDiagonal.y;

          const wallCornerAtEndOfWall = !isEmpty(
            collisionItemWithIndex(sampleBuffer, spatialIndex, isWall),
          );

          if (!wallCornerAtEndOfWall) {
            const isDarkStr = room.color.shade === "dimmed" ? ".dark" : "";

            // the transition art (and its mask) follows the wall's own (d2/d3)
            // variant and lighting flip, exactly like the tiles it caps:
            wallTilesContainer.addChild(
              createSprite({
                textureId: `moonbase.wallDoorTransition.d${resolvedFacingArtIndexXy4}${isDarkStr}`,
                ...tileRenderPosition,
                pivot: tileRenderPivot,
                flipX,
                spritesheet,
              }),
            );
            const maskSprite = createSprite({
              textureId: `moonbase.wallDoorTransition.d${resolvedFacingArtIndexXy4}.mask`,
              ...tileRenderPosition,
              pivot: tileRenderPivot,
              flipX,
              // masks are read through their red channel, so must sample the
              // pristine sheet - the room bake's ambient swops would recolour
              // the mask art and change how strongly it cuts:
              spritesheet: spritesheets.originalSpritesheet,
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
      isNegativeSideXy(direction) ?
        projectWorldXyzToScreenXy(
          { [dominantAxisXy(direction)]: item.aabb[dominantAxisXy(direction)] },
          cameraQuarterAngle,
        )
      : originXy;

    // each tile's art extends over its block in the direction the wall runs at
    // the base angle; when the along-wall axis projects reversed on screen the
    // art would hang over the block on the wrong side of its anchor corner, so
    // shift the whole wall one block along its axis to compensate:
    const alongShiftXy =
      alongReversed ?
        projectBlockXyzToScreenXy({ [alongAxis]: 1 }, cameraQuarterAngle)
      : originXy;

    mainContainer.x = roomFaceXy.x + alongShiftXy.x;
    mainContainer.y = roomFaceXy.y + alongShiftXy.y;

    return mainContainer;
  },
  // re-render on every quarter turn: a wall persists across camera flips (it is
  // no longer torn down), so the render-once cache must invalidate when the
  // quarter angle changes, to re-decide decline vs draw and re-pick the
  // far-side sprite - exactly as barrier and doorLegs already do:
  (_item, cameraQuarterAngle) => cameraQuarterAngle,
);
