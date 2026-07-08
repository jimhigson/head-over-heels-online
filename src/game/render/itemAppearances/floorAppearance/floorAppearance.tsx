import {
  Container,
  Graphics,
  type Sprite,
  Texture,
  TilingSprite,
} from "pixi.js";

import {
  type ItemInPlay,
  type UnionOfAllItemInPlayTypes,
} from "../../../../model/ItemInPlay";
import { roomItemsIterable, type RoomState } from "../../../../model/RoomState";
import { zxSpectrumColors } from "../../../../originalGame";
import { assertIsTextureId } from "../../../../sprites/assertIsTextureId";
import { type AppSpritesheet } from "../../../../sprites/spritesheet/variants/AppSpritesheet";
import { frac } from "../../../../utils/maths/maths";
import { rangesOverlap } from "../../../../utils/maths/numberPairs";
import { getAmbientSwoppedColour } from "../../../../utils/palette/palette";
import { renderContainerToSprite } from "../../../../utils/pixi/renderContainerToSprite";
import { type Subset } from "../../../../utils/Subset";
import { axisProjectsReversed } from "../../../../utils/vectors/rotateXy";
import {
  addXy,
  addXyz,
  type AxisXy,
  type DirectionXy4,
  originXyz,
  perpendicularAxisXy,
  rotateAxisXyByCameraAngle,
  rotateDirectionXy4ByCameraAngle,
  subXy,
  tangentAxis,
  type Xy,
  type Xyz,
} from "../../../../utils/vectors/vectors";
import { isWallOrDoorFrame } from "../../../physics/itemPredicates";
import { blockSizePx } from "../../../physics/mechanicsConstants";
import { createSprite } from "../../createSprite";
import { ColourClashFilter } from "../../filters/ColourClashFilter";
import { OutlineFilter } from "../../filters/OutlineFilter";
import { PaletteSwapFilter } from "../../filters/PaletteSwapFilter";
import { floorTextureId } from "../../floorTextureId";
import { edgeOriginalGameColour } from "../../gameColours/colourScheme";
import { floorEdgeCrossSwops } from "../../gameColours/floorEdgeCrossSwops";
import {
  projectBlockXyzToScreenXy,
  projectFootprintScreenXExtent,
  projectWorldXyzToScreenX,
  projectWorldXyzToScreenXy,
} from "../../projections";
import { type RenderBoxes } from "../../renderBox/makeItemRenderBoxAtCameraAngle";
import {
  effectiveFixedZIndex,
  nonRenderingItemFixedZIndex,
} from "../../sortZ/fixedZIndexes";
import {
  type ItemAppearance,
  itemAppearanceRenderOnce,
} from "../ItemAppearance";
import { renderFloorOverdraws } from "./renderFloorOverdraws";

/**
 * the screen-x range a footprint (position + aabb) spans when projected,
 * translated into the floor's local space
 */
const footprintScreenXExtent = (
  position: Xyz,
  aabb: Xyz,
  cameraAngle: Xy,
  offsetX: number,
): { left: number; right: number } => {
  const { left, right } = projectFootprintScreenXExtent(
    position,
    aabb,
    cameraAngle,
  );
  return { left: left + offsetX, right: right + offsetX };
};

/**
 * create a rectangle mask for the floor that cuts off anything past the last
 * wall or door frame on the left/right of the room
 */
const floorLeftRightCutOffMask = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  floorItem: ItemInPlay<"floor", RoomId, RoomItemId>,
  cameraAngle: Xy,
  renderBoxes: RenderBoxes<UnionOfAllItemInPlayTypes> | undefined,
): Graphics | undefined => {
  const {
    config: {
      naturalFootprint: {
        aabb: floorNaturalAabb,
        position: floorNaturalPosition,
      },
    },
    state: { position: floorPosition },
  } = floorItem;

  // if (floorItem.id !== "floorCrossR") {
  //   return undefined;
  // }

  const offsetX = projectWorldXyzToScreenX(
    subXy(originXyz, floorPosition),
    cameraAngle,
  );

  const { left, right } = roomItemsIterable(room.items)
    .filter(isWallOrDoorFrame)
    .filter((item) => {
      const {
        state: { position },
        aabb,
      } = item;

      const itemDirection = item.config.direction;
      // axis going into or out of the room (if a door) or bouncing off the wall
      const intoRoomAxis = tangentAxis(itemDirection);
      // axis along the item:
      const alongItemAxis = perpendicularAxisXy(intoRoomAxis);
      // will this item have to be on the positive or negative side of the axis?
      // 1 for far, 0 for near
      const farSide =
        itemDirection === "away" || itemDirection === "left" ? true : false;

      const floorOrdOnIntoRoomAxis =
        floorNaturalPosition[intoRoomAxis] +
        (farSide ? 1 : 0) * floorNaturalAabb[intoRoomAxis];

      const itemOrdOnIntoRoomAxis =
        position[intoRoomAxis] + (farSide ? 0 : 1) * aabb[intoRoomAxis];

      if (floorOrdOnIntoRoomAxis !== itemOrdOnIntoRoomAxis) {
        return false;
      }

      // they are aligned with an edge - now check if they overlap:
      const overlaps = rangesOverlap(
        position[alongItemAxis],
        position[alongItemAxis] + aabb[alongItemAxis],
        floorNaturalPosition[alongItemAxis],
        floorNaturalPosition[alongItemAxis] + floorNaturalAabb[alongItemAxis],
      );

      return overlaps;
    })
    .reduce(
      (acc, boundingItem) => {
        const {
          aabb,
          state: { position },
          config: { direction },
        } = boundingItem;
        const nonRendering =
          effectiveFixedZIndex(boundingItem, cameraAngle) ===
          nonRenderingItemFixedZIndex;

        // non-rendering items (on the hidden sides) draw nothing, so their
        // box's out-of-room extent must not widen the window: they bound it at
        // their room face - the zero-thickness segment where they touch the
        // floor edge (see moonbase_home_central in sequel). Visible items bound
        // by their drawn footprint (renderAabb):
        let visAabb: Xyz;
        let visPosition: Xyz;
        if (nonRendering) {
          const faceAxis = tangentAxis(direction);
          const outIsNegative =
            direction === "towards" || direction === "right";
          visAabb = { ...aabb, [faceAxis]: 0 };
          visPosition =
            outIsNegative ?
              addXyz(position, { [faceAxis]: aabb[faceAxis] })
            : position;
        } else {
          const renderBox = renderBoxes?.get(boundingItem);
          visAabb = renderBox?.renderAabb ?? aabb;
          visPosition = addXyz(
            position,
            renderBox?.renderAabbOffset ?? originXyz,
          );
        }

        // which footprint corner projects screen-leftmost/rightmost depends
        // on the camera angle, so take the extremes over all four corners:
        const { left: itemLeft, right: itemRight } = footprintScreenXExtent(
          visPosition,
          visAabb,
          cameraAngle,
          offsetX,
        );

        return {
          left: Math.min(acc.left, itemLeft),
          right: Math.max(acc.right, itemRight),
        };
      },
      // seed with the floor's own natural footprint extent: bounding items can
      // only widen the window (eg for the floor visible through doorways). This
      // matters at rotated camera angles, where the room's json walls (only ever
      // on the world-far sides) can all project onto the same screen side,
      // leaving the other side unbounded by any item:
      footprintScreenXExtent(
        floorNaturalPosition,
        floorNaturalAabb,
        cameraAngle,
        offsetX,
      ),
    );

  if (right > left) {
    // span above and below the floor's local origin: at rotated camera angles
    // floor content projects below local y=0, so the mask must not constrain
    // vertically. Kept to the floor's own projected span (plus margin) rather
    // than an arbitrary huge rect - this graphic is baked to a render texture,
    // and an oversized bake exceeds the GPU's maximum texture size on weaker
    // renderers (eg headless), which breaks the mask and blanks the floor:
    const halfProjectedSpanY =
      (floorNaturalAabb.x + floorNaturalAabb.y) / 2 + floorNaturalAabb.z + 100;
    return new Graphics()
      .rect(left, -halfProjectedSpanY, right - left, halfProjectedSpanY * 2)
      .fill("rgba(255, 0, 0)");
  }
};

const edgeSprites = ({
  direction,
  times,
  position,
  spritesheet,
  cameraAngle,
}: {
  /** the camera-space direction the edge appears on, used to pick the sprite */
  direction: Subset<DirectionXy4, "right" | "towards">;
  times: Partial<Xy> | undefined;
  position: Partial<Xyz>;
  spritesheet: AppSpritesheet;
  cameraAngle: Xy;
}): Container<Sprite> => {
  return createSprite({
    label: `floorEdge(${direction})`,
    textureId: `floorEdge.${direction}`,
    times,
    ...projectWorldXyzToScreenXy(position, cameraAngle),
    cameraAngle,
    spritesheet,
  }) as Container<Sprite>;
};

/**
 * one camera-near floor edge as laid out for its lip sprites - the colour
 * clash strips are drawn from the same layout so the two always align
 */
type NearFloorEdge = {
  /** the camera-space direction the edge appears on */
  direction: Subset<DirectionXy4, "right" | "towards">;
  /** the lip strip's (possibly reversal-shifted) anchor, in fine world px */
  position: Partial<Xyz>;
  worldAlongAxis: AxisXy;
  tilesCount: number;
  /**
   * true when the edge's world axis projects reversed on screen, putting the
   * corner shared with the other lip at the strip's far (max index) end
   */
  sharedCornerAtEnd: boolean;
};

const createColourClash = ({
  room,
  edges,
  cameraAngle,
}: {
  room: RoomState<string, string>;
  edges: NearFloorEdge[];
  cameraAngle: Xy;
}) => {
  const container = new Container({
    label: "floorColourClash",
  });

  for (const {
    direction,
    position,
    worldAlongAxis,
    tilesCount,
    sharedCornerAtEnd,
  } of edges) {
    // the colour belongs to the world edge and travels with it as the camera
    // rotates (towards/away edges run along x, right/left along y - opposite
    // edges share a colour, so a 180° rotation looks like the base angle):
    const colour = edgeOriginalGameColour(
      room,
      worldAlongAxis === "x" ? "towards" : "right",
    );
    const edgeContainer = new Container({
      label: `floorColourClash.${direction}`,
      filters: [new ColourClashFilter(colour)],
    });
    for (let i = 0; i <= tilesCount; i++) {
      const screenXy = projectWorldXyzToScreenXy(
        addXyz(
          { ...originXyz, ...position },
          { [worldAlongAxis]: i * blockSizePx.x },
        ),
        cameraAngle,
      );
      // don't cross past the corner shared with the other edge's strip:
      const atSharedCorner = sharedCornerAtEnd ? i === tilesCount : i === 0;
      const g =
        direction === "right" ?
          new Graphics()
            .rect(
              screenXy.x - (atSharedCorner ? 0 : 8),
              screenXy.y + 1,
              8 * 3,
              8,
            )
            .fill(colour)
        : new Graphics()
            .rect(
              screenXy.x - 16,
              screenXy.y + 1,
              8 * (atSharedCorner ? 2 : 3),
              8,
            )
            .fill(colour);
      edgeContainer.addChild(g);
    }
    container.addChild(edgeContainer);
  }

  return container;
};

export const floorAppearance: ItemAppearance<"floor"> =
  itemAppearanceRenderOnce(
    ({
      renderContext: {
        isReflection,
        room,
        item: floorItem,
        general: {
          spriteOption,
          spritesheetVariants,
          spritesheetMeta,
          pixiRenderer,
          cameraAngle,
        },
        colourClashLayer,
        renderBoxes,
      },
    }) => {
      const {
        color: { shade },
      } = room;

      const {
        config: floorConfig,
        state: { position },
        aabb,
      } = floorItem;

      const { floorType, naturalFootprint } = floorConfig;

      const container = new Container({ label: "floorAppearance" });
      const spritesRenderContainer = new Container({ label: "sprites" });

      // draw the whole floor (tiles, edge lips, cut-off mask) to its render box,
      // not its raw physical aabb: the box extends the apparently-far ("back")
      // door-expanded edges by a cosmetic 0.02 block so they meet the back wall
      // (see makeItemRenderBoxAtCameraAngle), while the physical aabb stays integer-aligned.
      // Only the horizontal x/y extent comes from the box; z stays the physical
      // floor thickness (aabb.z). The edge-lip layout below relies on this
      // extent carrying the door fraction (matching the pre-refactor aabb):
      const floorRenderBox = renderBoxes?.get(floorItem);
      const drawnMin = floorRenderBox?.renderAabbOffset ?? originXyz;
      const drawnAabb: Xyz = {
        x: floorRenderBox?.renderAabb.x ?? aabb.x,
        y: floorRenderBox?.renderAabb.y ?? aabb.y,
        z: aabb.z,
      };
      const xMin = drawnMin.x;
      const xMax = drawnMin.x + drawnAabb.x;
      const yMin = drawnMin.y;
      const yMax = drawnMin.y + drawnAabb.y;

      const tilesLeft = projectWorldXyzToScreenXy(
        { x: xMax, y: yMin, z: aabb.z },
        cameraAngle,
      );
      const tilesBottom = projectWorldXyzToScreenXy(
        { x: xMin, y: yMin, z: aabb.z },
        cameraAngle,
      );
      const tilesRight = projectWorldXyzToScreenXy(
        { x: xMin, y: yMax, z: aabb.z },
        cameraAngle,
      );
      const tilesTop = projectWorldXyzToScreenXy(
        { x: xMax, y: yMax, z: aabb.z },
        cameraAngle,
      );

      // the four projected floor corners in cyclic (perimeter) order. which one is
      // screen-topmost depends on the camera rotation, so re-order them starting
      // from it: the tiles mask's downward fudge and the fallen-items apron both
      // hang off the lower edges, which must follow the camera-near (lower) side as
      // the camera turns:
      const cyclicCorners = [tilesTop, tilesRight, tilesBottom, tilesLeft];
      const topCornerIndex = cyclicCorners.reduce(
        (best, corner, index) =>
          corner.y < cyclicCorners[best].y ? index : best,
        0,
      );
      const [maskTop, maskRight, maskBottom, maskLeft] = [0, 1, 2, 3].map(
        (offset) => cyclicCorners[(topCornerIndex + offset) % 4],
      );

      const spritesheet = spritesheetVariants.currentMainSpritesheet(
        false,
        false,
        isReflection,
      );

      const outlineFilter = new OutlineFilter({
        color:
          spriteOption.uncolourised ?
            zxSpectrumColors.black
          : getAmbientSwoppedColour(
              spritesheetMeta.palette,
              spritesheetMeta.effectColours.outline,
              spritesheet.ambient,
            ),
        width: 1,
        // floor tiles are baked off-screen via renderContainerToSprite, so the
        // outline must not be clipped to the screen viewport:
        clipToViewport: false,
      });

      if (floorType !== "none") {
        const tilesContainer = new Container({
          label: "tiles",
        });

        const floorTileTextureId = floorTextureId(
          floorConfig,
          shade === "dimmed",
          spritesheet.data,
        );

        const tileTexture = spritesheet.textures[floorTileTextureId];

        if (import.meta.env.DEV) {
          try {
            assertIsTextureId(floorTileTextureId, spritesheet.data);
          } catch (e) {
            throw new Error(
              `no floor textureId for floorType: ${floorType}, shade: ${shade}`,
              {
                cause: e,
              },
            );
          }
        }

        // aligning floor tiles, we have three goals:
        //   1: matching the original game, and
        //   2: so that the floor tiles and wall tiles are aligned
        //   3: so that rooms with multiple floors have the tiles lining up

        /* for deciding the offset of the floor tiles, only the towards/left (near side)
           doors count. Find how much we were offset by from the natural position when 
           the floor was loaded*/
        const tileOffsetVector = subXy(naturalFootprint.position, position);

        const tileOffsetBlocks = {
          x: frac(tileOffsetVector.x / blockSizePx.x),
          y: frac(tileOffsetVector.y / blockSizePx.x),
        };

        // it is safe to add extra since the mask will cut off any excess.
        // safer to draw a bit more than not enough.
        const tilesVerticalExtra = 8;

        // the tiled region is the screen bounding box of the (rotated) floor
        // diamond - taking named corners as the extremes only holds at the base
        // angle, since rotation permutes which corner is leftmost/topmost etc:
        const tilesMinX = Math.min(
          tilesLeft.x,
          tilesBottom.x,
          tilesRight.x,
          tilesTop.x,
        );
        const tilesMaxX = Math.max(
          tilesLeft.x,
          tilesBottom.x,
          tilesRight.x,
          tilesTop.x,
        );
        const tilesMinY = Math.min(
          tilesLeft.y,
          tilesBottom.y,
          tilesRight.y,
          tilesTop.y,
        );
        const tilesMaxY = Math.max(
          tilesLeft.y,
          tilesBottom.y,
          tilesRight.y,
          tilesTop.y,
        );

        const tilingSpriteRect = {
          x: tilesMinX,
          y: tilesMinY - tilesVerticalExtra,
          width: tilesMaxX - tilesMinX,
          height: tilesMaxY - tilesMinY + 2 * tilesVerticalExtra,
        };

        const tilePosition = subXy(
          projectBlockXyzToScreenXy(
            addXy(tileOffsetBlocks, { x: 0.5, y: 0.5 }),
            cameraAngle,
          ),
          // origin of the floor is at the bottom of its thickness,
          // so adjust in y to bring to the top
          { y: aabb.z },
          // tilePosition in pixijs is relative to the top-left corner
          // of the tiling sprite, so we need to adjust it to be relative
          // to the left/towards/top corner of the floor
          tilingSpriteRect,
        );

        const floorTilesTilingSprite = new TilingSprite({
          texture: tileTexture,
          tilePosition,
          ...tilingSpriteRect,
        });
        tilesContainer.addChild(floorTilesTilingSprite);

        if (spritesheetMeta.showFloorOverDraw) {
          tilesContainer.addChild(
            renderFloorOverdraws(floorItem, room, spritesheet, cameraAngle),
          );
        }

        const tilesMask = new Graphics()
          // screen-top corner
          .moveTo(maskTop.x, maskTop.y)
          // one side corner
          .lineTo(maskRight.x, maskRight.y)
          .lineTo(maskRight.x, maskRight.y + 3) // adding takes tiles closer to the floor edge, to match original game
          // screen-bottom corner
          .lineTo(maskBottom.x, maskBottom.y + 3)
          // other side corner
          .lineTo(maskLeft.x, maskLeft.y + 3)
          .lineTo(maskLeft.x, maskLeft.y)
          .fill({ color: 0xff_00_00, alpha: 1 });

        // firefox is fussy about using graphics as sprites, so pre-render to a sprite+texture
        // first:
        const tilesMaskSprite = renderContainerToSprite(
          pixiRenderer,
          tilesMask,
        );
        tilesMask.destroy();

        tilesContainer.addChild(tilesMaskSprite);
        tilesContainer.mask = tilesMaskSprite;

        // outline the tiles. This helps where floors are floating in the room (in remake only) - otherwise they are
        // the only item without a black outline. Also fills the gap between the tiles and the floor edge in with some
        // extra black pixels
        // the output from a mask doesn't get the filter applied, so to put an outline around the floor tiles, wrap them in an
        // extra container.
        const tilesOutline = new Container({ children: [tilesContainer] });
        tilesOutline.filters = outlineFilter;

        spritesRenderContainer.addChild(tilesOutline);
      }

      {
        const floorEdgeContainer = new Container({
          label: `edges`,
        });

        // removing this - it looks fine without and it hurts rooms with multiple different kinds of floors
        // in 'big' rooms
        // if (floorType === "none") {
        //   const overDrawFallenItemsGraphic = new Graphics()
        //     // right
        //     .moveTo(tilesRight.x, tilesRight.y + 10)
        //     // right below:
        //     .lineTo(tilesRight.x, tilesRight.y + 100)

        //     // left below
        //     .lineTo(tilesLeft.x, tilesLeft.y + 100)

        //     // left
        //     .lineTo(tilesLeft.x, tilesLeft.y + 10)

        //     // bottom
        //     .lineTo(tilesBottom.x, tilesBottom.y + 10)
        //     .fill(0x00_00_00);
        //   const overDrawFallenItemsGraphicSprite = renderContainerToSprite(
        //     pixiRenderer,
        //     overDrawFallenItemsGraphic,
        //   );
        //   // cover up anything that falls below the floor (ie, monsters, blocks that get pushed or walk out)
        //   // but put this on the front layer so it doesn't get the room palette swap filter, which would change
        //   // it from pure black, whereas it needs to appear as if it were in the black background
        //   container.addChild(overDrawFallenItemsGraphicSprite);
        //   frontLayer.attach(overDrawFallenItemsGraphicSprite);
        //   overDrawFallenItemsGraphic.destroy();
        // }

        const edgeTilesX = Math.ceil(drawnAabb.x / blockSizePx.x);
        const edgeTilesY = Math.ceil(drawnAabb.y / blockSizePx.x);

        // the floor's four edges, each anchored at its own corner and running the
        // floor's full extent along its axis. only the two that face the camera
        // get a drawn lip: a camera-near edge is one whose direction rotates into a
        // camera-facing (towards/right) side, and that rotated direction also picks
        // the sprite (so the lip art swaps axis on odd quarter turns):
        const floorEdges = [
          {
            direction: "towards",
            position: { z: drawnAabb.z },
            times: { x: edgeTilesX },
          },
          {
            direction: "away",
            position: { y: drawnAabb.y, z: drawnAabb.z },
            times: { x: edgeTilesX },
          },
          {
            direction: "right",
            position: { z: drawnAabb.z },
            times: { y: edgeTilesY },
          },
          {
            direction: "left",
            position: { x: drawnAabb.x, z: drawnAabb.z },
            times: { y: edgeTilesY },
          },
        ] as const satisfies ReadonlyArray<{
          direction: DirectionXy4;
          position: Partial<Xyz>;
          times: Partial<Xy>;
        }>;

        // the two camera-near edges' layouts, as used by the lip sprites - the
        // colour clash (uncolourised mode) is drawn from the same layout:
        const nearEdges: NearFloorEdge[] = [];

        for (const { direction, position, times } of floorEdges) {
          const renderedDirection = rotateDirectionXy4ByCameraAngle(
            direction,
            cameraAngle,
          );
          if (
            renderedDirection === "towards" ||
            renderedDirection === "right"
          ) {
            // each lip tile's art extends over its cell in the direction the
            // rendered edge runs at the base angle. When the edge's world axis
            // projects reversed relative to that, every tile would hang over the
            // cell on the wrong side of its anchor corner - so anchor the strip
            // one block along the axis to compensate:
            const worldAlongAxis: AxisXy =
              direction === "towards" || direction === "away" ? "x" : "y";
            const alongReversed = axisProjectsReversed(
              worldAlongAxis,
              cameraAngle,
            );

            // the strip is a whole number of tiles but the edge can be
            // fractional (extended for doors), overshooting by the fraction.
            // The overshoot must sit at the camera-far end (where the cutoff
            // mask clips it), never over the near corner shared with the other
            // lip - so the reversed shift is reduced by the overshoot:
            const alongExtentPx =
              worldAlongAxis === "x" ? drawnAabb.x : drawnAabb.y;
            const tilesCount = worldAlongAxis === "x" ? edgeTilesX : edgeTilesY;
            const overshootPx = tilesCount * blockSizePx.x - alongExtentPx;

            const lipPosition =
              alongReversed ?
                addXyz(
                  { ...originXyz, ...position },
                  { [worldAlongAxis]: blockSizePx.x - overshootPx },
                )
              : position;

            nearEdges.push({
              direction: renderedDirection,
              position: lipPosition,
              worldAlongAxis,
              tilesCount,
              sharedCornerAtEnd: alongReversed,
            });

            floorEdgeContainer.addChild(
              edgeSprites({
                direction: renderedDirection,
                times,
                position: lipPosition,
                spritesheet,
                cameraAngle,
              }),
            );
          }
        }

        // the lip textures are colour-swopped per world side at spritesheet
        // build. Their colours belong to the world edges and must travel with
        // them as the camera rotates: at odd quarter-turns each rendered near
        // edge is showing the other pair's world edge, so swap the two edge
        // colour sets on the baked lips (180° pairs opposite edges, which share
        // a colour, so it needs no swap):
        const oddQuarterTurn =
          rotateAxisXyByCameraAngle("x", cameraAngle) === "y";
        if (oddQuarterTurn) {
          floorEdgeContainer.filters = new PaletteSwapFilter(
            { swops: floorEdgeCrossSwops(room.color), lutType: "sparse" },
            // baked off-screen, so don't clip to the viewport:
            Texture.WHITE,
            false,
          );
        }

        spritesRenderContainer.addChild(floorEdgeContainer);

        const cutoffMask = floorLeftRightCutOffMask(
          room,
          floorItem,
          cameraAngle,
          renderBoxes,
        );
        if (cutoffMask !== undefined) {
          // rendering to a sprite first works around an issue in
          // Firefox where floors are rendered blank. Otherwise, there's no need to do this,
          // but this is only done once per floor (not every frame) so it isn't too worrysome to
          // make a texture we immediately throw away
          const cutoffSprite = renderContainerToSprite(
            pixiRenderer,
            cutoffMask,
          );
          spritesRenderContainer.addChild(cutoffSprite);
          spritesRenderContainer.mask = cutoffSprite;
          cutoffMask.destroy();
        }

        container.addChild(
          renderContainerToSprite(pixiRenderer, spritesRenderContainer),
        );

        spritesRenderContainer.destroy({
          // destroying children is needed to free mem used for intermediate textures
          children: true,
        });
        outlineFilter.destroy(false /* do not destroy programs */);

        if (spriteOption.uncolourised) {
          const colourClashContainer = createColourClash({
            edges: nearEdges,
            room,
            cameraAngle,
          });

          container.addChild(colourClashContainer);
          colourClashLayer!.attach(colourClashContainer);
        }
      }

      return container;
    },
  );
