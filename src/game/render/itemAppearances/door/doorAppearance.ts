import { type Container, Texture } from "pixi.js";

import { type ItemInPlay } from "../../../../model/ItemInPlay";
import { type Campaign } from "../../../../model/modelTypes";
import { type SceneryName } from "../../../../sprites/planets";
import { planetSpecificIfExists } from "../../../../sprites/planetSpecificIfExists";
import { type AppSpritesheetWithVariants } from "../../../../sprites/spritesheet/AppSpritesheet";
import { selectMaybeCurrentCampaign } from "../../../../store/slices/gameMenus/gameMenusSelectors";
import { store } from "../../../../store/store";
import { iterateToContainer } from "../../../../utils/pixi/iterateToContainer";
import { renderContainerToSprite } from "../../../../utils/pixi/renderContainerToSprite";
import {
  axisProjectsReversed,
  nearestQuarterAngle,
} from "../../../../utils/vectors/rotateXy";
import {
  addXy,
  alongAxisOfDirectionXy,
  cameraAngleIsOddQuarterTurn,
  isNegativeSideXy,
  originXy,
  perpendicularAxisXy,
  rotateAxisXyByCameraAngle,
  type Xy,
  type Xyz,
} from "../../../../utils/vectors/vectors";
import { blockSizePx } from "../../../physics/mechanicsConstants";
import { createSprite } from "../../createSprite";
import { PaletteSwapFilter } from "../../filters/PaletteSwapFilter";
import { floorEdgeCrossSwops } from "../../gameColours/floorEdgeCrossSwops";
import {
  projectBlockXyzToScreenXy,
  projectWorldXyzToScreenXy,
} from "../../projections";
import { isDoorPartInHiddenWall } from "../../renderBox/makeItemRenderBoxAtCameraAngle";
import {
  type ItemAppearance,
  itemAppearanceRenderMemoised,
  type RenderOnceProps,
} from "../ItemAppearance";
import { doorTexture } from "./doorTexture";

function* doorLegsGenerator<RoomId extends string, RoomItemId extends string>(
  {
    config,
    config: { direction, height },
  }: ItemInPlay<"doorLegs", RoomId, RoomItemId>,
  spritesheet: AppSpritesheetWithVariants,
  sceneryName: SceneryName,
  isDark: boolean,
  cameraQuarterAngle: Xy,
): Generator<Container> {
  const inHiddenWall = isDoorPartInHiddenWall(config, cameraQuarterAngle);
  // positions repeat along the door's physical axis (projection rotates them); the
  // sprite uses the apparent axis after the camera rotation:
  const axis = alongAxisOfDirectionXy(direction);
  const renderedAxis = rotateAxisXyByCameraAngle(axis, cameraQuarterAngle);

  if (inHiddenWall) {
    if (height !== 0) {
      // draw the 'floating' (no legs) threshold - one sprite per block along
      // the wall. createSprite's times handles the block displacement and the
      // camera-aware back-to-front draw order:
      yield createSprite({
        textureId: planetSpecificIfExists(
          sceneryName,
          `door.floatingThreshold.${renderedAxis}`,
          spritesheet.data,
          isDark,
        ),
        times: { [axis]: 2 },
        cameraQuarterAngle,
        y: -blockSizePx.z * height,
        spritesheet,
      });
    }
  } else {
    yield createSprite({
      textureId: planetSpecificIfExists(
        sceneryName,
        `door.legs.base.${renderedAxis}`,
        spritesheet.data,
        isDark,
      ),
      spritesheet,
    });

    const pillarTextureId = planetSpecificIfExists(
      sceneryName,
      `door.legs.pillar.${renderedAxis}`,
      spritesheet.data,
      isDark,
    );

    for (let h = 1; h < height; h++) {
      yield createSprite({
        textureId: pillarTextureId,
        y: -h * blockSizePx.z,
        spritesheet,
      });
    }
  }

  if (!inHiddenWall) {
    // non-floating threshold
    yield createSprite({
      textureId: planetSpecificIfExists(
        sceneryName,
        `door.legs.threshold.${renderedAxis}`,
        spritesheet.data,
        isDark,
      ),
      ...projectBlockXyzToScreenXy(
        { ...originXy, z: height },
        cameraQuarterAngle,
      ),
      spritesheet,
    });
  }
}

/**
 * since door aabbs are like tunnels that extend out of the room, render
 * on the other side of the aabb (the side in the room). The tunnel protrudes
 * out of the room in world space: for towards/right doors that is the negative
 * axis direction, putting the item's position (the aabb min corner) at the
 * out-of-room end - so the rendering translates to the opposite (room) end.
 * away/left doors already have their position at the room end.
 */
const xyToTranslateToInsideOfRoom = (
  direction: Xyz,
  aabb: Xyz,
  cameraQuarterAngle: Xy,
): Xy => {
  const axis = alongAxisOfDirectionXy(direction);
  const crossAxis = perpendicularAxisXy(axis);

  const doorPostRenderedDepth = 8;

  // the art's depth through the doorway extends from its anchor in the
  // +crossAxis world direction at the base angle; when the through axis
  // projects reversed on screen the art hangs on the wrong side of the
  // anchor (out of the tunnel, or sunk into it), so shift it back over
  // the tunnel's room end:
  const crossReversed = axisProjectsReversed(crossAxis, cameraQuarterAngle);

  const roomEndCross =
    isNegativeSideXy(direction) ? aabb[crossAxis] - doorPostRenderedDepth : 0;
  const reversalShift = crossReversed ? doorPostRenderedDepth : 0;

  return projectWorldXyzToScreenXy(
    { [crossAxis]: roomEndCross + reversalShift },
    cameraQuarterAngle,
  );
};

export const doorLegsAppearance: ItemAppearance<"doorLegs", RenderOnceProps> =
  itemAppearanceRenderMemoised(
    ({
      renderContext: {
        item,
        general: { pixiRenderer, spritesheets, cameraAngle },
        room,
        filterCache: maybeFilterCache,
      },
    }) => {
      if (import.meta.env.DEV && maybeFilterCache === undefined) {
        throw new Error(
          "doorLegsAppearance requires a filterCache but was rendered without one",
        );
      }
      const filterCache = maybeFilterCache!;

      const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
      const { planet, color } = room;
      const doorLegsContainer = iterateToContainer(
        doorLegsGenerator(
          item,
          spritesheets.spritesheetForCurrentRoom,
          planet,
          color.shade === "dimmed",
          cameraQuarterAngle,
        ),
      );

      const { direction } = item.config;
      const inHiddenWall = isDoorPartInHiddenWall(
        item.config,
        cameraQuarterAngle,
      );

      // the floating threshold's textures carry the floor edges' colours,
      // which swap sides on odd quarter camera turns exactly as the floor's
      // own edge lips do:
      const crossSwopFilter =
        inHiddenWall && cameraAngleIsOddQuarterTurn(cameraQuarterAngle) ?
          filterCache.getOrInsertComputed(
            `floorEdgeCross(${color.hue},${color.shade})`,
            () =>
              new PaletteSwapFilter(
                { swops: floorEdgeCrossSwops(color), lutType: "sparse" },
                Texture.WHITE,
                // baked off-screen, so don't clip to the viewport:
                false,
              ),
          )
        : undefined;
      if (crossSwopFilter !== undefined) {
        doorLegsContainer.filters = crossSwopFilter;
      }

      // door legs can take quite a few sprites (ie, 11 each for the 5-high
      // doors in #blacktooth39 - reduce down to a single sprite:
      const sprite = renderContainerToSprite(pixiRenderer, doorLegsContainer);

      const axis = alongAxisOfDirectionXy(direction);
      // the legs' art extends over its blocks in the direction the wall runs at
      // the base angle; when the along-wall axis projects reversed on screen the
      // art would hang over the blocks on the wrong side of its anchor, so shift
      // it back over the legs' footprint. The floating threshold is anchored
      // per-block (shift one), the legs/base sprites span both blocks (shift two):
      const alongReversed = axisProjectsReversed(axis, cameraQuarterAngle);
      const alongShiftXy =
        alongReversed ?
          projectBlockXyzToScreenXy(
            { [axis]: inHiddenWall ? 1 : 2 },
            cameraQuarterAngle,
          )
        : originXy;

      const spriteXy = addXy(
        xyToTranslateToInsideOfRoom(
          item.config.direction,
          item.aabb,
          cameraQuarterAngle,
        ),
        alongShiftXy,
      );
      sprite.x = spriteXy.x;
      sprite.y = spriteXy.y;

      return sprite;
    },
    // the legs resolve their form (full legs vs floating threshold) and
    // position per camera angle:
    (_item, cameraQuarterAngle) => cameraQuarterAngle,
  );

export const doorFrameAppearance: ItemAppearance<"doorFrame", RenderOnceProps> =
  itemAppearanceRenderMemoised(
    ({
      renderContext: {
        item,
        item: {
          config: { direction, part, toRoom },
          aabb,
        },
        room,
        general: { spritesheets, cameraAngle },
        renderBoxes,
      },
    }) => {
      const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
      const campaign =
        import.meta.env.VITE_APP === "editor" ?
          (store.getState().levelEditor?.campaignInProgress as
            Campaign<string> | undefined)
        : selectMaybeCurrentCampaign(store.getState());
      const axis = alongAxisOfDirectionXy(direction);
      const renderedAxis = rotateAxisXyByCameraAngle(axis, cameraQuarterAngle);

      // the far post sits at +alongWall from the near post, so it is drawn behind
      // the near post only while +alongWall still points away from the camera.
      // once the camera has rotated enough that +alongWall points towards the
      // viewer (its projected depth goes negative), the far post is actually
      // nearer the camera, so the near/far post graphics must swap:
      const farPostNowNearer =
        (axis === "x" ?
          cameraQuarterAngle.x + cameraQuarterAngle.y
        : cameraQuarterAngle.x - cameraQuarterAngle.y) < 0;
      const renderedPart =
        !farPostNowNearer ? part
        : part === "near" ? "far"
        : part === "far" ? "near"
        : part;

      const useColoursFromRoom =
        campaign?.rooms[toRoom] ??
        // toRoom might not exist if working in the editor and didn't make it yet
        // so just colour using the current room's colours:
        room;

      const { x, y } = xyToTranslateToInsideOfRoom(
        direction,
        aabb,
        cameraQuarterAngle,
      );

      const { spritesheetForCurrentRoom: spritesheet } = spritesheets;

      // the frame's recolour to the destination room's hue is pre-baked into
      // the atlas as a suffixed variant frame - just pick the texture:
      const rendered = createSprite({
        textureId: `${doorTexture(
          room,
          renderedAxis,
          renderedPart,
          spritesheet.data,
        )}.hue=${useColoursFromRoom.color.hue}`,
        x,
        y,
        spritesheet,
      });

      if (part === "top") {
        // since the near post is 9px (odd)
        // we fudge the door top to render on a even world-pixel on its along axis,
        // so that the y is predictable (not on a half and subject to rounding errors)
        rendered.x += renderedAxis === "x" ? -1 : 1;
      }

      // each part's art extends over its box in the direction the wall runs at
      // the base angle; when the along-wall axis projects reversed on screen the
      // art would hang over the wrong side of its anchor, so shift it back over
      // the part's render box:
      const alongReversed = axisProjectsReversed(axis, cameraQuarterAngle);
      if (alongReversed) {
        // the door frame's render box is a per-angle derivation owned by the
        // room renderer - a wrong/missing box here leaves the shift at 0,
        // hanging the art over the wrong side at every reversed angle:
        const renderBox = renderBoxes?.get(item);
        // shift by the box's along-axis EXTENT plus its along-axis OFFSET: the
        // offset (eg the apparently-near far post's -1, whose 9th art pixel
        // extends back past its min corner) used to be encoded in the part's
        // angle-dependent physical position, but the post freeze fixed the
        // position, so the art must apply it here to line up:
        const alongShift = projectWorldXyzToScreenXy(
          {
            [axis]:
              (renderBox?.renderAabb?.[axis] ?? 0) +
              (renderBox?.renderAabbOffset?.[axis] ?? 0),
          },
          cameraQuarterAngle,
        );
        rendered.x += alongShift.x;
        rendered.y += alongShift.y;
      }

      return rendered;
    },
    // the frame resolves its apparent post widths/shifts per camera angle:
    (_item, cameraQuarterAngle) => cameraQuarterAngle,
  );
