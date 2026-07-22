import { Container, Sprite, Texture } from "pixi.js";

import { blockSizePx } from "../../../physics/mechanicsConstants";
import { createSprite } from "../../createSprite";
import {
  asItemRenderContext,
  type ItemLeafRenderContext,
} from "../../ItemRenderContexts";
import { type ItemAppearance } from "../ItemAppearance";
import { ReflectionRenderers } from "./ReflectionRenderers";
import {
  type MirrorPaneNumber,
  resolveMirrorPaneNumber,
} from "./resolveMirrorPaneNumber";

type MirrorRenderProps = {
  /** the pane shown, by direction number (see resolveMirrorPaneNumber) */
  number: MirrorPaneNumber;
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
  renderContext: ItemLeafRenderContext<"mirror">,
) => {
  const {
    item: {
      config: { times },
    },
    general: { spritesheets },
  } = renderContext;

  const timesZ = times?.z ?? 1;

  const { spritesheetForCurrentRoom: spritesheet } = spritesheets;
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
  renderContext: ItemLeafRenderContext<"mirror">,
  reflections: Container,
): Container => {
  const {
    item: {
      config: { times },
    },
    general: { spritesheets },
  } = renderContext;
  const { spritesheetForCurrentRoom: spritesheet } = spritesheets;
  const timesZ = times?.z ?? 1;

  const rendering = new Container({ label: "mirror" });
  rendering.addChild(
    createSprite({
      textureId: "mirror.d3",
      times,
      spritesheet,
    }),
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
    createSprite({
      textureId: "mirror.d3.front",
      times,
      spritesheet,
    }),
  );

  return rendering;
};

export const mirrorAppearance: ItemAppearance<"mirror", MirrorRenderProps> = ({
  renderContext,
  currentRendering,
  tickContext,
}) => {
  const {
    item,
    room: { roomTime },
    general: { spritesheets, cameraAngle },
  } = renderContext;
  const { orientation, flippedAtRoomTime, flipDirection } = item.state;

  // the pane shown is a pure function of the (possibly mid-turn) camera angle
  // and the mirror's facing, as a direction number d0..d3 snapped to the
  // nearest 1/8 turn - d3 face-on (reflective), d1 edge-on, d0/d2 the
  // axis-aligned panes between. An item spinning the mirror interpolates its
  // facing so the number steps through the in-between pane:
  const { number, faceOn } = resolveMirrorPaneNumber(
    cameraAngle,
    orientation,
    roomTime,
    flippedAtRoomTime,
    flipDirection,
  );

  const prevRenderProps = currentRendering?.renderProps;

  // only the face-on (d3) pane has a visible reflective surface; the edge-on
  // and axis-aligned panes are static slivers with no reflection:
  if (faceOn) {
    const existingReflections = prevRenderProps?.reflections;

    if (existingReflections) {
      existingReflections.tick(tickContext);
      return "no-update";
    }

    // keep the per-item reflection renderers alive across ticks so they
    // animate and reuse, rather than being rebuilt each frame:
    const reflections = new ReflectionRenderers(
      item,
      // reflections render other items with the full pipeline context - the
      // mirror never renders standalone:
      asItemRenderContext(renderContext),
    );

    reflections.tick(tickContext);

    return {
      output: addPivotSprite(
        buildFaceOnPane(renderContext, reflections.container),
        renderContext,
      ),
      renderProps: { number, reflections },
    };
  }

  // edge-on / axis-aligned panes are static sprites - only (re)build when the
  // number actually changed; otherwise keep the existing one. (prevRenderProps
  // being set implies there is a current rendering to keep.)
  if (
    prevRenderProps !== undefined &&
    prevRenderProps.reflections === undefined &&
    prevRenderProps.number === number
  ) {
    return "no-update";
  }

  const mirrorCells = createSprite({
    textureId: `mirror.d${number}`,
    times: item.config.times,
    spritesheet: spritesheets.spritesheetForCurrentRoom,
  });

  return {
    output: addPivotSprite(mirrorCells, renderContext),
    renderProps: { number },
  };
};
