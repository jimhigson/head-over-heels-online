import { Container, Texture } from "pixi.js";

import { type ItemInPlay } from "../../../../model/ItemInPlay";
import { type Campaign } from "../../../../model/modelTypes";
import { paletteBlockstack } from "../../../../sprites/palette/spritesheetPalette";
import { type SceneryName } from "../../../../sprites/planets";
import { planetSpecificIfExists } from "../../../../sprites/planetSpecificIfExists";
import { type AppSpritesheet } from "../../../../sprites/spritesheet/variants/AppSpritesheet";
import { selectMaybeCurrentCampaign } from "../../../../store/slices/gameMenus/gameMenusSelectors";
import { store } from "../../../../store/store";
import { resolveSwops } from "../../../../utils/palette/palette";
import { iterateToContainer } from "../../../../utils/pixi/iterateToContainer";
import { renderContainerToSprite } from "../../../../utils/pixi/renderContainerToSprite";
import { axisProjectsReversed } from "../../../../utils/vectors/rotateXy";
import {
  addXy,
  cameraAngleIsOddQuarterTurn,
  type DirectionXy4,
  doorAlongAxis,
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
import { replacementColours } from "../../gameColours/gameColours";
import {
  projectBlockXyzToScreenXy,
  projectWorldXyzToScreenXy,
} from "../../projections";
import { isDoorPartInHiddenWall } from "../../renderBox/makeItemRenderBoxAtCameraAngle";
import {
  type ItemAppearance,
  itemAppearanceRenderOnce,
} from "../ItemAppearance";
import { doorTexture } from "./doorTexture";

function* doorLegsGenerator<RoomId extends string, RoomItemId extends string>(
  {
    config,
    config: { direction, height },
  }: ItemInPlay<"doorLegs", RoomId, RoomItemId>,
  spritesheet: AppSpritesheet,
  sceneryName: SceneryName,
  isDark: boolean,
  cameraAngle: Xy,
): Generator<Container> {
  const inHiddenWall = isDoorPartInHiddenWall(config, cameraAngle);
  // positions repeat along the door's physical axis (projection rotates them); the
  // sprite uses the apparent axis after the camera rotation:
  const axis = doorAlongAxis(direction);
  const renderedAxis = rotateAxisXyByCameraAngle(axis, cameraAngle);

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
        cameraAngle,
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
      ...projectBlockXyzToScreenXy({ ...originXy, z: height }, cameraAngle),
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
  direction: DirectionXy4,
  aabb: Xyz,
  cameraAngle: Xy,
): Xy => {
  const axis = doorAlongAxis(direction);
  const crossAxis = perpendicularAxisXy(axis);

  const doorPostRenderedDepth = 8;

  // the art's depth through the doorway extends from its anchor in the
  // +crossAxis world direction at the base angle; when the through axis
  // projects reversed on screen the art hangs on the wrong side of the
  // anchor (out of the tunnel, or sunk into it), so shift it back over
  // the tunnel's room end:
  const crossReversed = axisProjectsReversed(crossAxis, cameraAngle);

  const roomEndCross =
    direction === "towards" || direction === "right" ?
      aabb[crossAxis] - doorPostRenderedDepth
    : 0;
  const reversalShift = crossReversed ? doorPostRenderedDepth : 0;

  return projectWorldXyzToScreenXy(
    { [crossAxis]: roomEndCross + reversalShift },
    cameraAngle,
  );
};

export const doorLegsAppearance: ItemAppearance<"doorLegs"> =
  itemAppearanceRenderOnce(
    ({
      renderContext: {
        isReflection,
        item,
        general: { pixiRenderer, spritesheetVariants, cameraAngle },
        room,
      },
    }) => {
      const { planet, color } = room;
      const spritesheet = spritesheetVariants.currentMainSpritesheet(
        false,
        false,
        isReflection,
      );
      const doorLegsContainer = iterateToContainer(
        doorLegsGenerator(
          item,
          spritesheet,
          planet,
          color.shade === "dimmed",
          cameraAngle,
        ),
      );

      const { direction } = item.config;
      const inHiddenWall = isDoorPartInHiddenWall(item.config, cameraAngle);

      // the floating threshold's textures carry the floor edges' colours,
      // which swap sides on odd quarter camera turns exactly as the floor's
      // own edge lips do:
      const crossSwopFilter =
        inHiddenWall && cameraAngleIsOddQuarterTurn(cameraAngle) ?
          new PaletteSwapFilter(
            { swops: floorEdgeCrossSwops(color), lutType: "sparse" },
            // baked off-screen, so don't clip to the viewport:
            Texture.WHITE,
            false,
          )
        : undefined;
      if (crossSwopFilter !== undefined) {
        doorLegsContainer.filters = crossSwopFilter;
      }

      // door legs can take quite a few sprites (ie, 11 each for the 5-high
      // doors in #blacktooth39 - reduce down to a single sprite:
      const sprite = renderContainerToSprite(pixiRenderer, doorLegsContainer);
      crossSwopFilter?.destroy({ destroyLutTexture: true, destroyMask: true });

      const axis = doorAlongAxis(direction);
      // the legs' art extends over its blocks in the direction the wall runs at
      // the base angle; when the along-wall axis projects reversed on screen the
      // art would hang over the blocks on the wrong side of its anchor, so shift
      // it back over the legs' footprint. The floating threshold is anchored
      // per-block (shift one), the legs/base sprites span both blocks (shift two):
      const alongReversed = axisProjectsReversed(axis, cameraAngle);
      const alongShiftXy =
        alongReversed ?
          projectBlockXyzToScreenXy(
            { [axis]: inHiddenWall ? 1 : 2 },
            cameraAngle,
          )
        : originXy;

      const spriteXy = addXy(
        xyToTranslateToInsideOfRoom(
          item.config.direction,
          item.aabb,
          cameraAngle,
        ),
        alongShiftXy,
      );
      sprite.x = spriteXy.x;
      sprite.y = spriteXy.y;

      return sprite;
    },
  );

export const doorFrameAppearance: ItemAppearance<"doorFrame"> =
  itemAppearanceRenderOnce(
    ({
      renderContext: {
        isReflection,
        item,
        item: {
          config: { direction, part, toRoom },
          aabb,
        },
        room,
        general: {
          pixiRenderer,
          spritesheetVariants,
          spritesheetMeta,
          cameraAngle,
        },
        renderBoxes,
      },
    }) => {
      const campaign =
        import.meta.env.VITE_APP === "editor" ?
          (store.getState().levelEditor?.campaignInProgress as
            | Campaign<string>
            | undefined)
        : selectMaybeCurrentCampaign(store.getState());
      const axis = doorAlongAxis(direction);
      const renderedAxis = rotateAxisXyByCameraAngle(axis, cameraAngle);

      // the far post sits at +alongWall from the near post, so it is drawn behind
      // the near post only while +alongWall still points away from the camera.
      // once the camera has rotated enough that +alongWall points towards the
      // viewer (its projected depth goes negative), the far post is actually
      // nearer the camera, so the near/far post graphics must swap:
      const farPostNowNearer =
        (axis === "x" ?
          cameraAngle.x + cameraAngle.y
        : cameraAngle.x - cameraAngle.y) < 0;
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

      const filter = new PaletteSwapFilter(
        {
          swops: resolveSwops(
            paletteBlockstack,
            replacementColours(
              useColoursFromRoom.color.hue,
              spritesheetMeta.paletteDim !== undefined &&
                room.color.shade === "dimmed",
              room.planet === "moonbase" ?
                // moonbase doors are illuminated:
                "light-mid"
              : "light-dark",
            ),
          ),
          lutType: "sparse",
        },
        // the door frame is baked off-screen via renderContainerToSprite, so the
        // filter must not be clipped to the screen viewport:
        Texture.WHITE,
        false,
      );

      const { x, y } = xyToTranslateToInsideOfRoom(
        direction,
        aabb,
        cameraAngle,
      );

      const doorFrameSprite = createSprite({
        textureId: doorTexture(
          room,
          renderedAxis,
          renderedPart,
          spritesheetVariants.originalSpritesheet,
        ),
        // needs a special filter since this may not be going to the same room:
        x,
        y,
        spritesheet: spritesheetVariants.currentMainSpritesheet(
          false,
          false,
          isReflection,
        ),
      });
      doorFrameSprite.filters = filter;

      // render to a static sprite to avoid every-frame application of the filter
      // which would break sprite batching
      const spriteInContainer = new Container({ children: [doorFrameSprite] });
      const rendered = renderContainerToSprite(pixiRenderer, spriteInContainer);

      spriteInContainer.destroy({ children: true });
      filter.destroy({ destroyLutTexture: true, destroyMask: true });

      if (part === "top") {
        // since the near post is 9px (odd)
        // we fudge the door top to render on a even world-pixel on its along axis,
        // so that the y is predictable (not on a half and subject to rounding errors)
        rendered.x = renderedAxis === "x" ? -1 : 1;
      }

      // each part's art extends over its box in the direction the wall runs at
      // the base angle; when the along-wall axis projects reversed on screen the
      // art would hang over the wrong side of its anchor, so shift it back over
      // the part's render box:
      const alongReversed = axisProjectsReversed(axis, cameraAngle);
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
          cameraAngle,
        );
        rendered.x += alongShift.x;
        rendered.y += alongShift.y;
      }

      return rendered;
    },
  );
