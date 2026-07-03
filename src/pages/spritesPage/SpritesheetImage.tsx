import { useEffect, useMemo, useRef, useState } from "preact/hooks";

import { BlockyMarkdown } from "../../game/components/BlockyMarkdown";
import { sanitiseForClassName } from "../../game/components/tailwindSprites/SanitiseForClassName";
import { type AppSpriteFrame } from "../../sprites/spritesheet/spritesheetData/AppSpriteFrame";
import {
  type FramesWithSpeed,
  type TextureId,
} from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import {
  useCurrentSpritesheetData,
  useSpritesOption,
} from "../../store/slices/gameMenus/gameMenusSelectors";
import {
  animatedSpriteSpecificCssVars,
  animationIsUniformlyFlipped,
  keyframesForAnimatedSprite,
  spriteSpecificCssVars,
} from "../../tailwind/plugins/spriteCss";
import { Tooltip } from "../../ui/tooltip/Tooltip";
import { entries } from "../../utils/entries";
import { type Xy } from "../../utils/vectors/vectors";
import { keyframesToCss } from "./keyframesToCss";

const xRelative = (value: number) =>
  `calc(${value} / var(--spritesheetW) * 100%)`;
const yRelative = (value: number) =>
  `calc(${value} / var(--spritesheetH) * 100%)`;

/**
 * A single region of the spritesheet, and every textureId that resolves to it -
 * the sprite drawn there directly, plus any `copyFrom` copies (which share the
 * region, some horizontally mirrored).
 */
type SpritePosition = { frame: AppSpriteFrame; textureIds: TextureId[] };

const positionKey = ({ x, y, w, h }: AppSpriteFrame) => `${x},${y},${w},${h}`;

const AnimationPreview = ({
  animationName,
  frames,
}: {
  animationName: string;
  frames: FramesWithSpeed<TextureId[]>;
}) => {
  const currentSpritesheetData = useCurrentSpritesheetData();
  const spriteOption = useSpritesOption();
  const styleRef = useRef<HTMLStyleElement>(null);

  useEffect(() => {
    if (styleRef.current) {
      styleRef.current.textContent = keyframesToCss(
        keyframesForAnimatedSprite(
          animationName,
          sanitiseForClassName,
          frames,
          currentSpritesheetData,
        ),
      );
    }
  }, [animationName, frames, currentSpritesheetData]);

  return (
    <div className="mt-1">
      <style ref={styleRef} />
      <span className="text-single-line">In animation {animationName}</span>
      <div
        className="[background:repeating-conic-gradient(#ddd_0_25%,_#ccc_0_50%)_50%_/_10px_10px] w-min"
        style={{ "--scale": 4 }}
      >
        <div
          className={`sprite box-content w-min
            ${animationIsUniformlyFlipped(frames, currentSpritesheetData) ? "sprite-flip-x" : ""}
            ${spriteOption.uncolourised ? "sprite-revert-to-two-tone" : ""}`}
          style={animatedSpriteSpecificCssVars(
            animationName,
            sanitiseForClassName,
            frames,
            currentSpritesheetData,
          )}
        />
      </div>
    </div>
  );
};

const TextureIdEntry = ({
  textureId,
  frame,
  flipX,
}: {
  textureId: TextureId;
  frame: AppSpriteFrame;
  flipX: boolean;
}) => {
  const currentSpritesheetData = useCurrentSpritesheetData();
  const spriteOption = useSpritesOption();

  const containingAnimations = entries(
    currentSpritesheetData.animations as Record<
      string,
      FramesWithSpeed<TextureId[]>
    >,
  ).filter(([, frames]) => frames.includes(textureId));

  return (
    <div className="mt-1">
      <div
        className="[background:repeating-conic-gradient(#ddd_0_25%,_#ccc_0_50%)_50%_/_10px_10px] w-min"
        style={{ "--scale": 4 }}
      >
        <div
          className={`sprite box-content w-min
            ${flipX ? "sprite-flip-x" : ""}
            ${spriteOption.uncolourised ? "sprite-revert-to-two-tone" : ""}`}
          style={spriteSpecificCssVars(frame.w, frame.h, frame.x, frame.y)}
        />
      </div>
      <BlockyMarkdown markdown={`${textureId}${flipX ? " *(flipped)*" : ""}`} />
      {containingAnimations.map(([animationName, frames]) => (
        <AnimationPreview
          key={animationName}
          animationName={animationName}
          frames={frames}
        />
      ))}
    </div>
  );
};

const SpriteOverlayTooltip = ({ position }: { position: SpritePosition }) => {
  const currentSpritesheetData = useCurrentSpritesheetData();
  const { frame, textureIds } = position;

  return (
    <>
      <BlockyMarkdown
        markdown={`*${frame.w}*x*${frame.h}* @**${frame.x}**,**${frame.y}**`}
      />
      {textureIds.map((textureId) => {
        const idFrame = currentSpritesheetData.frames[textureId]
          .frame as AppSpriteFrame;
        return (
          <TextureIdEntry
            key={textureId}
            textureId={textureId}
            frame={frame}
            flipX={idFrame.flipX === true}
          />
        );
      })}
    </>
  );
};

const SpriteOverlay = ({ position }: { position: SpritePosition }) => {
  const { frame, textureIds } = position;
  return (
    <Tooltip
      triggerContent={
        <a
          href={`#sprite-${sanitiseForClassName(textureIds[0])}`}
          className="absolute cursor-pointer block border hover:bg-[rgba(255,255,255,0.25)] z-[1]"
          style={{
            left: xRelative(frame.x),
            top: yRelative(frame.y),
            width: xRelative(frame.w),
            height: yRelative(frame.h),
          }}
        />
      }
      tooltipContent={<SpriteOverlayTooltip position={position} />}
    />
  );
};

export const SpritesheetImage = ({
  spriteFilter,
}: {
  spriteFilter: string;
}) => {
  const spriteOption = useSpritesOption();
  const currentSpritesheetData = useCurrentSpritesheetData();
  const [mousePos, setMousePos] = useState<null | Xy>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) {
      return;
    }

    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const sheetW = Number(style.getPropertyValue("--spritesheetW"));
    const sheetH = Number(style.getPropertyValue("--spritesheetH"));

    const pixelX = Math.floor(((e.clientX - rect.left) / rect.width) * sheetW);
    const pixelY = Math.floor(((e.clientY - rect.top) / rect.height) * sheetH);

    if (pixelX >= 0 && pixelX < sheetW && pixelY >= 0 && pixelY < sheetH) {
      setMousePos({ x: pixelX, y: pixelY });
    }
  };

  // collate textureIds by the region they resolve to: copyFrom copies share
  // their source's region, so each unique position lists the sprite drawn there
  // plus every copy of it
  const uniquePositions = useMemo<SpritePosition[]>(() => {
    const byLocation = new Map<string, SpritePosition>();
    for (const [textureId, { frame }] of entries(
      currentSpritesheetData.frames,
    )) {
      const spriteFrame = frame as AppSpriteFrame;
      const key = positionKey(spriteFrame);
      const existing = byLocation.get(key);
      if (existing === undefined) {
        byLocation.set(key, {
          frame: spriteFrame,
          textureIds: [textureId],
        });
      } else {
        existing.textureIds.push(textureId);
      }
    }
    return [...byLocation.values()];
  }, [currentSpritesheetData]);

  return (
    <div
      ref={containerRef}
      className="relative w-full cursor-crosshair [background:repeating-conic-gradient(#ddd_0_25%,_#ccc_0_50%)_50%_/_20px_20px]"
      style={{
        aspectRatio: "var(--spritesheetW) / var(--spritesheetH)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos(null)}
    >
      <div
        className={`absolute inset-0 pixelated bg-no-repeat
          ${spriteOption.uncolourised ? "sprite-revert-to-two-tone" : ""}`}
        style={{
          backgroundImage: "var(--spritesheetUrl)",
          backgroundSize: "100% 100%",
        }}
      />

      {/* dark overlay with white sprite cutouts, blended to darken only non-sprite areas */}
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.66)]" />
        {uniquePositions
          .filter(
            (position) =>
              !spriteFilter ||
              position.textureIds.some((id) => id.includes(spriteFilter)),
          )
          .map(({ frame }) => (
            <div
              key={positionKey(frame)}
              className="absolute bg-white"
              style={{
                left: xRelative(frame.x),
                top: yRelative(frame.y),
                width: xRelative(frame.w),
                height: yRelative(frame.h),
              }}
            />
          ))}
      </div>

      {uniquePositions.map((position) => (
        <SpriteOverlay key={positionKey(position.frame)} position={position} />
      ))}

      {mousePos && (
        <>
          <div
            className="absolute pointer-events-none border bg-pink zx:bg-zxMagenta toppy:bg-toppyPink1 outline-2"
            style={{
              left: xRelative(mousePos.x),
              top: yRelative(mousePos.y),
              width: xRelative(1),
              height: yRelative(1),
            }}
          />
          <div
            className="absolute pointer-events-none bg-black zx:bg-zxBlack toppy:bg-toppyBlack text-white zx:text-zxWhite toppy:text-toppyWarm1 px-1 text-xs font-mono"
            style={{
              left: xRelative(mousePos.x),
              top: `calc(${yRelative(mousePos.y)} + 40px)`,
              transform: "translate(8px, -100%)",
            }}
          >
            {mousePos.x},{mousePos.y}
          </div>
        </>
      )}
    </div>
  );
};
