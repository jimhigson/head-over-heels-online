import { useMemo } from "preact/hooks";

import { zxSpectrumFrameRate } from "../../../../../../originalGame";
import { type AppSpritesheetData } from "../../../../../../sprites/spritesheet/AppSpritesheet";
import { type AppSpriteFrame } from "../../../../../../sprites/spritesheet/spritesheetData/AppSpriteFrame";
import {
  type BaseAnimationId,
  type BaseTextureId,
  type FramesWithSpeed,
  spritesheetSize,
} from "../../../../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import {
  type AnimatedTextureTailwindClass,
  type TextureTailwindClass,
} from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useCurrentSpritesheetData } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { animationIsUniformlyFlipped } from "../../../../../../tailwind/plugins/spriteCss";
import { keys } from "../../../../../../utils/entries";
import { sanitiseForClassName } from "../../../../tailwindSprites/SanitiseForClassName";
import { useCurrentSpritesheetUrl } from "../../../../tailwindSprites/useCurrentSpritesheetUrl";
import { ScrollIntoView } from "./ScrollIntoView";

/**
 * A sprite drawn on the map as a native SVG `<image>` cropped to one frame of the
 * spritesheet, rather than an HTML `<div>` in a `<foreignObject>`. Safari renders
 * foreignObjects unreliably (in particular `transform: scaleX(var(--flip))` can
 * make the whole sprite vanish), so map icons use this native-SVG path instead.
 *
 * The crop is a nested `<svg>` with a fixed, frame-sized `viewBox`; the spritesheet
 * image pans behind it to show one frame, and animations step the image's x/y via a
 * SMIL `<animate>`; a horizontal mirror is a native SVG transform.
 */
type SvgSpriteInRoomProps = {
  spriteClass: AnimatedTextureTailwindClass | TextureTailwindClass;
  /** multiplies the frame's pixel size to get the on-map size */
  scale: number;
  scrollTo?: boolean;
  onClick?: (e: MouseEvent) => void;
  /** shifts the sprite up the map, keeping its bottom edge as the anchor */
  yAdjust?: number;
};

type ResolvedSprite =
  | {
      type: "animated";
      frames: AppSpriteFrame[];
      durationSeconds: number;
      flipX: boolean;
    }
  | { type: "static"; frame: AppSpriteFrame; flipX: boolean };

const texturePrefix = "texture-";
const animatedPrefix = "texture-animated-";
const reversedPrefix = "reversed-";

/**
 * Maps from a sanitised class-name fragment (as `texture-*` classes are built)
 * back to the id it came from, so we can look up frame geometry at runtime.
 * Cached per spritesheet-data object (memoised upstream).
 */
type ReverseIdMaps = {
  textures: Map<string, BaseTextureId>;
  animations: Map<string, BaseAnimationId>;
};
const reverseIdMapsCache = new WeakMap<AppSpritesheetData, ReverseIdMaps>();

const reverseIdMapsFor = (
  spritesheetData: AppSpritesheetData,
): ReverseIdMaps => {
  const cached = reverseIdMapsCache.get(spritesheetData);
  if (cached !== undefined) {
    return cached;
  }

  const textures = new Map<string, BaseTextureId>();
  for (const textureId of keys(spritesheetData.frames)) {
    textures.set(sanitiseForClassName(textureId), textureId);
  }
  const animations = new Map<string, BaseAnimationId>();
  for (const animationId of keys(spritesheetData.animations)) {
    animations.set(sanitiseForClassName(animationId), animationId);
  }

  const maps: ReverseIdMaps = { textures, animations };
  reverseIdMapsCache.set(spritesheetData, maps);
  return maps;
};

const resolveSpriteClass = (
  spriteClass: string,
  spritesheetData: AppSpritesheetData,
): ResolvedSprite => {
  const { textures, animations } = reverseIdMapsFor(spritesheetData);

  if (spriteClass.startsWith(animatedPrefix)) {
    const afterPrefix = spriteClass.slice(animatedPrefix.length);
    const reversed = afterPrefix.startsWith(reversedPrefix);
    const sanitised =
      reversed ? afterPrefix.slice(reversedPrefix.length) : afterPrefix;

    const animationId = animations.get(sanitised);
    if (animationId === undefined) {
      throw new Error(`no animation found for sprite class "${spriteClass}"`);
    }

    const framesWithSpeed = (
      spritesheetData.animations as Record<
        BaseAnimationId,
        FramesWithSpeed<BaseTextureId[]>
      >
    )[animationId];
    const orderedTextureIds =
      reversed ? framesWithSpeed.toReversed() : framesWithSpeed;
    const frames = orderedTextureIds.map(
      (textureId) => spritesheetData.frames[textureId].frame as AppSpriteFrame,
    );

    return {
      type: "animated",
      frames,
      durationSeconds:
        frames.length / zxSpectrumFrameRate / framesWithSpeed.animationSpeed,
      flipX: animationIsUniformlyFlipped(framesWithSpeed, spritesheetData),
    };
  }

  const textureId = textures.get(spriteClass.slice(texturePrefix.length));
  if (textureId === undefined) {
    throw new Error(`no texture found for sprite class "${spriteClass}"`);
  }
  const frame = spritesheetData.frames[textureId].frame as AppSpriteFrame;
  return { type: "static", frame, flipX: frame.flipX === true };
};

/** the box size (in sheet pixels, before scaling) the sprite occupies */
const spriteBoxSize = (resolved: ResolvedSprite): { w: number; h: number } =>
  resolved.type === "static" ?
    { w: resolved.frame.w, h: resolved.frame.h }
  : resolved.frames.reduce(
      (acc, { w, h }) => ({ w: Math.max(acc.w, w), h: Math.max(acc.h, h) }),
      { w: 0, h: 0 },
    );

/**
 * Safari's svg foreign object rendering is buggy, so use a reimplementation of the css sprites in svg instead
 */
export const SvgSpriteInRoom = ({
  spriteClass,
  scale,
  scrollTo = false,
  onClick,
  yAdjust = 0,
}: SvgSpriteInRoomProps) => {
  const spritesheetUrl = useCurrentSpritesheetUrl();
  const spritesheetData = useCurrentSpritesheetData();
  const resolved = useMemo(
    () => resolveSpriteClass(spriteClass, spritesheetData),
    [spriteClass, spritesheetData],
  );

  const { w, h } = spriteBoxSize(resolved);
  const boxW = w * scale;
  const boxH = h * scale;
  const firstFrame =
    resolved.type === "static" ? resolved.frame : resolved.frames[0];

  return (
    <>
      {/* the box is centred on x=0, so a plain scale(-1,1) mirrors it in place */}
      <g transform={resolved.flipX ? "scale(-1,1)" : undefined}>
        <svg
          // anchored by its bottom-centre at the local origin (shifted by yAdjust)
          x={-boxW / 2}
          y={yAdjust - boxH}
          width={boxW}
          height={boxH}
          // a fixed, frame-sized window that the spritesheet image pans behind to
          // show one frame. Panning the image (rather than animating the viewBox)
          // is what keeps Safari clipping this nested-svg viewport to the frame -
          // animating the viewBox makes Safari stop clipping and the whole 1024px
          // image becomes the element's box
          viewBox={`0 0 ${w} ${h}`}
          overflow="hidden"
          class="zx:sprite-revert-to-two-tone"
          style={{ pointerEvents: onClick ? "auto" : "none" }}
          onClick={onClick}
        >
          <image
            href={spritesheetUrl}
            width={spritesheetSize.w}
            height={spritesheetSize.h}
            x={-firstFrame.x}
            y={-firstFrame.y}
            style={{ imageRendering: "pixelated" }}
          >
            {resolved.type === "animated" && (
              <>
                <animate
                  attributeName="x"
                  calcMode="discrete"
                  dur={`${resolved.durationSeconds}s`}
                  repeatCount="indefinite"
                  values={resolved.frames.map(({ x }) => -x).join(";")}
                />
                <animate
                  attributeName="y"
                  calcMode="discrete"
                  dur={`${resolved.durationSeconds}s`}
                  repeatCount="indefinite"
                  values={resolved.frames.map(({ y }) => -y).join(";")}
                />
              </>
            )}
          </image>
        </svg>
      </g>
      {scrollTo && <ScrollIntoView svg />}
    </>
  );
};
