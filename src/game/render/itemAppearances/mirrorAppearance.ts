import { Color, Container, Sprite, Texture } from "pixi.js";

import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlay";
import {
  type MirrorOrientation,
  reflectedBeamDirection,
  reflectedFacingVector,
} from "../../../model/MirrorOrientation";
import { roomItemsIterable } from "../../../model/RoomState";
import { zxSpectrumColor } from "../../../originalGame";
import { type Xyz } from "../../../utils/vectors/vectors";
import { isItemType } from "../../physics/itemPredicates";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { createSprite } from "../createSprite";
import { TwoToneFilter } from "../filters/TwoToneFilter";
import { replacementColours } from "../gameColours/gameColours";
import {
  type ItemRenderContext,
  type ItemTickContext,
} from "../ItemRenderContexts";
import { projectWorldXyzToScreenXy } from "../projections";
import { type ItemAppearance } from "./ItemAppearance";
import { type ItemAppearanceOutsideView } from "./itemAppearanceOutsideView";

/**
 * how the mirror looks up other items' appearances to draw their
 * reflections - injected by appearanceForItem to avoid a circular import
 */
export type AppearanceLookup = (
  item: UnionOfAllItemInPlayTypes<string, string>,
) => ItemAppearanceOutsideView<ItemInPlayType> | undefined;

type MirrorRenderProps = {
  orientation: MirrorOrientation;
  /** if currently showing the brief axis-aligned mid-flip frame */
  flipping: boolean;
  /** identity+geometry of everything currently showing in the reflection */
  reflectionFingerprint: string;
};

/** how far in front of the pane an item can be and still show in the reflection */
const reflectionRangePx = blockSizePx.x * 2;
/** how far either side of the pane's extent an item's centre can be */
const reflectionLateralRangePx = 20;

/**
 * items that never show in reflections: room structure, invisible/utility
 * items, and other mirrors (so two facing mirrors cannot recurse)
 */
const isUnreflectedItemType = isItemType(
  "floor",
  "wall",
  "doorFrame",
  "doorLegs",
  "portal",
  "stopAutowalk",
  "blocker",
  "particle",
  "soundEffect",
  "outOfBounds",
  "emitter",
  "timer",
  "floatingText",
  "bubbles",
  "mirror",
);

type ReflectedItem = {
  item: UnionOfAllItemInPlayTypes<string, string>;
  /** the reflected image's screen x, relative to the mirror's origin -
   * reflections keep the item's own screen x (a mirror facing the camera
   * does not flip left/right in screen terms) */
  screenX: number;
  /** how far in front of the pane the item is */
  depthPx: number;
  /** the item's height above the mirror's base */
  zPx: number;
};

/**
 * find the items in front of the (face-on) mirror's pane that should show
 * in its reflection, with where their reflected image sits
 */
const collectReflectedItems = (
  mirror: ItemTypeUnion<"mirror", string, string>,
  renderContext: ItemRenderContext<"mirror">,
): ReflectedItem[] => {
  const { room } = renderContext;
  const mirrorPosition = mirror.state.position;
  // the pane's plane runs through the centre of the mirror's block:
  const centreX = mirrorPosition.x + blockSizePx.x / 2;
  const centreY = mirrorPosition.y + blockSizePx.y / 2;

  const reflected: ReflectedItem[] = [];
  for (const item of roomItemsIterable(room.items)) {
    if (item === (mirror as UnionOfAllItemInPlayTypes<string, string>)) {
      continue;
    }
    if (isUnreflectedItemType(item)) {
      continue;
    }

    const itemPosition = item.state.position;
    const itemCentreDx = itemPosition.x + item.aabb.x / 2 - centreX;
    const itemCentreDy = itemPosition.y + item.aabb.y / 2 - centreY;

    // distance in front of the pane (towards the camera is negative x+y):
    const inFrontOfPane = -(itemCentreDx + itemCentreDy) / 2;
    if (inFrontOfPane <= 0 || inFrontOfPane > reflectionRangePx) {
      continue;
    }
    // distance along the pane from its centre:
    const alongPane = Math.abs(itemCentreDy - itemCentreDx) / 2;
    if (alongPane > reflectionLateralRangePx) {
      continue;
    }
    // vertically, the item must overlap the pane:
    if (
      itemPosition.z >= mirrorPosition.z + mirror.aabb.z ||
      itemPosition.z + item.aabb.z <= mirrorPosition.z
    ) {
      continue;
    }

    reflected.push({
      item,
      screenX: projectWorldXyzToScreenXy({
        x: itemPosition.x - mirrorPosition.x,
        y: itemPosition.y - mirrorPosition.y,
      }).x,
      depthPx: inFrontOfPane,
      zPx: itemPosition.z - mirrorPosition.z,
    });
  }
  return reflected;
};

const vectorKey = (vector: undefined | Xyz): string =>
  vector === undefined ? "" : `${vector.x},${vector.y},${vector.z}`;

const reflectionFingerprint = (reflectedItems: ReflectedItem[]): string =>
  reflectedItems
    .map(({ item, screenX, depthPx, zPx }) => {
      // playables render from visualFacingVector when they have one:
      const { facing, visualFacingVector } = item.state as {
        facing?: Xyz;
        visualFacingVector?: Xyz;
      };
      return `${item.id}@${screenX},${depthPx},${zPx}:${item.aabb.x}x${item.aabb.y}:${vectorKey(facing)}|${vectorKey(visualFacingVector)}`;
    })
    .join("/");

/**
 * a shallow copy of the item, with its facing/direction reflected in the
 * mirror's plane, for rendering its appearance as seen in the mirror
 */
const reflectedFacsimile = (
  item: UnionOfAllItemInPlayTypes<string, string>,
  orientation: MirrorOrientation,
): UnionOfAllItemInPlayTypes<string, string> => {
  const { facing, visualFacingVector } = item.state as {
    facing?: Xyz;
    visualFacingVector?: Xyz;
  };
  const state =
    facing === undefined && visualFacingVector === undefined ?
      item.state
    : {
        ...item.state,
        ...(facing === undefined ?
          {}
        : { facing: reflectedFacingVector(orientation, facing) }),
        // playables face the way their visualFacingVector points:
        ...(visualFacingVector === undefined ?
          {}
        : {
            visualFacingVector: reflectedFacingVector(
              orientation,
              visualFacingVector,
            ),
          }),
      };

  if (item.type === "lightBeam") {
    const { end } = item.state;
    return {
      ...item,
      state: {
        ...(state as typeof item.state),
        // a bend seen in a mirror turns the other way:
        end:
          end === "reflect-left" ? "reflect-right"
          : end === "reflect-right" ? "reflect-left"
          : end,
      },
      config: {
        ...item.config,
        direction: reflectedBeamDirection(orientation, item.config.direction),
      },
      // the reflected beam runs along the other axis:
      aabb: { x: item.aabb.y, y: item.aabb.x, z: item.aabb.z },
    };
  }

  return { ...item, state } as UnionOfAllItemInPlayTypes<string, string>;
};

/** the two colours reflections are drawn in - matching what the mirror
 * surface's placeholder colours render as for this room */
const reflectionColours = (
  renderContext: ItemRenderContext<"mirror">,
): { light: Color; dark: Color } => {
  const {
    room,
    general: { spriteOption },
  } = renderContext;
  if (spriteOption.uncolourised) {
    // the filter runs downstream of the room tint and overwrites pixel
    // colours, so apply the room's zx colour to the reflection directly:
    return { light: zxSpectrumColor(room.color), dark: new Color("black") };
  }
  const { replaceLight, replaceDark } = replacementColours(
    room.color.hue,
    spriteOption.name === "BlockStack" && room.color.shade === "dimmed",
  );
  return { light: replaceLight, dark: replaceDark };
};

/**
 * the reflective surface's interior, in screen px relative to the mirror's
 * origin - the area reflections are clipped to. Matches the art: texture
 * rows 9..19, columns 2..29 of the 32x28 cell, anchored bottom-middle
 */
const surfaceMaskRect = { x: -14, y: -19, w: 28, h: 11 };

const renderFaceOnMirror = (
  appearanceLookup: AppearanceLookup,
  renderContext: ItemRenderContext<"mirror">,
  tickContext: ItemTickContext,
  reflectedItems: ReflectedItem[],
): Container => {
  const {
    item: mirror,
    general: { spritesheetVariants },
  } = renderContext;
  const spritesheet = spritesheetVariants.currentMainSpritesheet();
  const { times } = mirror.config;
  const timesZ = times?.z ?? 1;
  // the centre of the whole (possibly stacked) pane's surface:
  const surfaceCentreScreenY =
    surfaceMaskRect.y + (surfaceMaskRect.h - (timesZ - 1) * blockSizePx.z) / 2;

  const rendering = new Container({ label: "mirror" });
  rendering.addChild(
    createSprite({ textureId: "mirror.awayRight", times, spritesheet }),
  );

  const { light, dark } = reflectionColours(renderContext);
  const reflections = new Container({
    label: "mirrorReflections",
    filters: [new TwoToneFilter(light, dark)],
  });

  for (const { item, screenX, depthPx, zPx } of reflectedItems) {
    const facsimile = reflectedFacsimile(item, mirror.state.orientation);
    const appearance = appearanceLookup(facsimile);
    if (appearance === undefined) {
      continue;
    }
    let appearanceReturn;
    try {
      appearanceReturn = appearance({
        renderContext: {
          ...renderContext,
          item: facsimile,
        },
        currentRendering: undefined,
        tickContext,
      } as Parameters<typeof appearance>[0]);
    } catch {
      // an appearance that can't render outside its own item's renderer
      // simply doesn't show in the mirror:
      continue;
    }
    if (
      appearanceReturn === "no-update" ||
      appearanceReturn.output === undefined
    ) {
      continue;
    }
    const { output } = appearanceReturn;
    /*
     * the pane is far smaller than most sprites, so placement is
     * presentational rather than strictly optical: the image keeps the
     * item's screen x, is centred vertically on the pane (lifted by the
     * item's height above the mirror's base), and rises with distance at
     * half the item's own on-screen vertical rate - sliding up and off the
     * glass as it recedes
     */
    output.x += screenX;
    output.y += surfaceCentreScreenY + output.height / 2 - zPx - depthPx / 2;
    reflections.addChild(output);
  }

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
  rendering.addChild(reflections);

  // the glassy glint streaks render over the reflections:
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
      general: { spritesheetVariants },
    } = renderContext;
    const { orientation, flippedAtRoomTime, flipDirection } = item.state;

    const flipping =
      flippedAtRoomTime !== undefined &&
      roomTime - flippedAtRoomTime < flipTransitionMs;

    // only the face-on pane has visible surface; the edge-on pane is a sliver
    // that shows no reflection (and neither does the mid-flip frame):
    const reflectedItems =
      orientation === "awayRight" && !flipping ?
        collectReflectedItems(item, renderContext)
      : [];
    const fingerprint = reflectionFingerprint(reflectedItems);

    const currentlyRenderedProps = currentRendering?.renderProps;
    const render =
      currentlyRenderedProps === undefined ||
      orientation !== currentlyRenderedProps.orientation ||
      flipping !== currentlyRenderedProps.flipping ||
      fingerprint !== currentlyRenderedProps.reflectionFingerprint;

    if (!render) {
      return "no-update";
    }

    /*
     * the axis the pane passes through mid-flip depends on which way it is
     * turning: turning (screen-)clockwise into awayRight sweeps through the
     * y axis, anticlockwise through the x axis - and vice versa for turns
     * into awayLeft
     */
    const flippingAxis =
      (orientation === "awayRight") === (flipDirection !== "anticlockwise") ?
        "y"
      : "x";

    const output =
      flipping ?
        createSprite({
          // the pane axis-aligned, halfway through its turn to the new
          // orientation:
          textureId: `mirror.flipping.${flippingAxis}`,
          times: item.config.times,
          spritesheet: spritesheetVariants.currentMainSpritesheet(),
        })
      : orientation === "awayRight" ?
        renderFaceOnMirror(
          appearanceLookup,
          renderContext,
          tickContext,
          reflectedItems,
        )
      : createSprite({
          textureId: `mirror.${orientation}`,
          times: item.config.times,
          spritesheet: spritesheetVariants.currentMainSpritesheet(),
        });

    return {
      output,
      renderProps: {
        orientation,
        flipping,
        reflectionFingerprint: fingerprint,
      },
    };
  };
