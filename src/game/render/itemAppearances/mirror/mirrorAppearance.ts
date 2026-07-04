import { Container, Sprite, Texture } from "pixi.js";

import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../../../model/ItemInPlay";
import {
  flippedMirrorOrientation,
  type MirrorOrientation,
} from "../../../../model/MirrorOrientation";
import {
  cameraAngleIsOddQuarterTurn,
  type Xy,
} from "../../../../utils/vectors/vectors";
import { blockSizePx } from "../../../physics/mechanicsConstants";
import { createSprite } from "../../createSprite";
import { type ItemRenderContext } from "../../ItemRenderContexts";
import { type ItemAppearance } from "../ItemAppearance";
import { type ItemAppearanceOutsideView } from "../itemAppearanceOutsideView";
import { ReflectionRenderers } from "./ReflectionRenderers";

/**
 * how the mirror looks up other items' appearances to draw their
 * reflections - injected by appearanceForItem to avoid a circular import
 */
export type AppearanceLookup = (
  item: UnionOfAllItemInPlayTypes<string, string>,
  cameraAngle: Xy,
) => ItemAppearanceOutsideView<ItemInPlayType> | undefined;

type MirrorRenderProps = {
  orientation: MirrorOrientation;
  /** if currently showing the brief axis-aligned mid-flip frame */
  flipping: boolean;
  /**
   * the live per-reflected-item renderers, kept across ticks so each reflected
   * item animates and reuses its rendering. Present only while the face-on pane
   * is showing reflections.
   */
  reflections?: ReflectionRenderers;
};

/**
 * the reflective surface's interior, in screen px relative to the mirror's
 * origin - the area reflections are clipped to. Matches the art: texture
 * rows 9..19, columns 2..29 of the 32x28 cell, anchored bottom-middle
 */
const surfaceMaskRect = { x: -13, y: -18, w: 26, h: 11 };

const addPivotSprite = (
  restOfMirrorRendering: Container,
  renderContext: ItemRenderContext<"mirror">,
) => {
  const {
    item: {
      config: { times },
    },
    general: { spritesheetVariants },
  } = renderContext;

  const timesZ = times?.z ?? 1;

  const spritesheet = spritesheetVariants.currentMainSpritesheet(
    false,
    false,
    false,
  );
  const container = new Container();
  container.addChild(
    createSprite({
      textureId: "mirror.bottom",
      spritesheet,
    }),
  );
  container.addChild(restOfMirrorRendering);
  container.addChild(
    createSprite({
      textureId: "mirror.top",
      spritesheet,
      y: -(timesZ - 1) * blockSizePx.z,
    }),
  );
  return container;
};

/**
 * build the face-on pane around the (persistent, externally-owned) reflections
 * container: the mirror sprite behind, the masked reflections, and the glassy
 * glint streaks over the top. Only rebuilt when the pane geometry changes.
 */
const buildFaceOnPane = (
  renderContext: ItemRenderContext<"mirror">,
  reflections: Container,
): Container => {
  const {
    item: {
      config: { times },
    },
    general: { spritesheetVariants },
    isReflection,
  } = renderContext;
  const spritesheet = spritesheetVariants.currentMainSpritesheet(
    false,
    false,
    isReflection,
  );
  const timesZ = times?.z ?? 1;

  const rendering = new Container({ label: "mirror" });
  rendering.addChild(
    createSprite({ textureId: "mirror.awayRight", times, spritesheet }),
  );

  // one mask rectangle per block of the (possibly stacked) pane's surface:
  const mask = new Container({ label: "mirrorSurfaceMask" });
  for (let row = 0; row < timesZ; row++) {
    const rowMask = new Sprite(Texture.WHITE);
    rowMask.x = surfaceMaskRect.x;
    rowMask.y = surfaceMaskRect.y - row * blockSizePx.z;
    rowMask.width = surfaceMaskRect.w;
    rowMask.height = surfaceMaskRect.h;
    mask.addChild(rowMask);
  }
  reflections.mask = mask;
  rendering.addChild(mask);
  // reflected items draw from the mirror-reflection spritesheet variant (via
  // isReflection in their context), so the container needs no recolouring filter:
  rendering.addChild(reflections);

  // front-frame of the mirror in front of the reflection:
  rendering.addChild(
    createSprite({ textureId: "mirror.awayRight.front", times, spritesheet }),
  );

  return rendering;
};

/**
 * how long after a flip the axis-aligned transition frame shows for, so the
 * eye can track the 90° rotation between the two diagonal orientations
 */
const flipTransitionMs = 100;

export const makeMirrorAppearance =
  (
    appearanceLookup: AppearanceLookup,
  ): ItemAppearance<"mirror", MirrorRenderProps> =>
  ({ renderContext, currentRendering, tickContext }) => {
    const {
      item,
      room: { roomTime },
      general: { spritesheetVariants, cameraAngle },
      isReflection,
    } = renderContext;
    const { orientation, flippedAtRoomTime, flipDirection } = item.state;

    // the mirror has only two drawn orientations, and an odd quarter camera
    // turn shows the other one - the whole rendering (face-on pane with
    // reflections vs edge-on sliver) follows the orientation as rendered:
    const renderedOrientation =
      cameraAngleIsOddQuarterTurn(cameraAngle) ?
        flippedMirrorOrientation(orientation)
      : orientation;

    const flipping =
      flippedAtRoomTime !== undefined &&
      roomTime - flippedAtRoomTime < flipTransitionMs;

    const prevRenderProps = currentRendering?.renderProps;

    // only the face-on pane has visible surface; the edge-on pane is a sliver
    // that shows no reflection (and neither does the mid-flip frame):
    if (renderedOrientation === "awayRight" && !flipping) {
      const existingReflections = prevRenderProps?.reflections;

      if (existingReflections) {
        existingReflections.tick(tickContext);
        return "no-update";
      }

      // keep the per-item reflection renderers alive across ticks so they
      // animate and reuse, rather than being rebuilt each frame:
      const reflections = new ReflectionRenderers(
        item,
        renderContext,
        appearanceLookup,
      );

      reflections.tick(tickContext);

      return {
        output:
          existingReflections ?
            currentRendering!.output
          : addPivotSprite(
              buildFaceOnPane(renderContext, reflections.container),
              renderContext,
            ),
        renderProps: { orientation, flipping, reflections },
      };
    }

    // edge-on / mid-flip panes are static sprites - only (re)build when the
    // state actually changed; otherwise keep the existing one. (prevRenderProps
    // being set implies there is a current rendering to keep.)
    if (
      prevRenderProps !== undefined &&
      prevRenderProps.reflections === undefined &&
      prevRenderProps.orientation === orientation &&
      prevRenderProps.flipping === flipping
    ) {
      return "no-update";
    }

    // not face-on: any previous reflection renderers are torn down along with
    // the old output container the framework replaces (so renderProps drops the
    // reflections manager).

    /*
     * the axis the pane passes through mid-flip depends on which way it is
     * turning: turning (screen-)clockwise into awayRight sweeps through the
     * y axis, anticlockwise through the x axis - and vice versa for turns
     * into awayLeft
     */
    const flippingAxis =
      (
        (renderedOrientation === "awayRight") ===
        (flipDirection !== "anticlockwise")
      ) ?
        "y"
      : "x";

    const mirrorCells = createSprite({
      // mid-flip: the pane axis-aligned halfway through its turn; otherwise
      // the static edge-on (awayLeft) pane:
      textureId:
        flipping ?
          `mirror.flipping.${flippingAxis}`
        : `mirror.${renderedOrientation}`,
      times: item.config.times,
      spritesheet: spritesheetVariants.currentMainSpritesheet(
        false,
        false,
        isReflection,
      ),
    });

    return {
      output: addPivotSprite(mirrorCells, renderContext),
      renderProps: { orientation, flipping },
    };
  };
