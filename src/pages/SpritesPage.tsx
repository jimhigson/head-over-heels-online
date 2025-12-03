import { useEffect, useRef, useState } from "react";

import type { TextureId } from "../sprites/spritesheet/spritesheetData/spriteSheetData";
import type { Xy } from "../utils/vectors/vectors";

import spritesheetUrl from "../../gfx/sprites.png";
import { CssVariables } from "../game/components/CssVariables";
import { typedURLSearchParams } from "../options/queryParams";
import { spritesheetData } from "../sprites/spritesheet/spritesheetData/spriteSheetData";

declare module "react" {
  interface CSSProperties {
    "--x"?: number | string;
    "--y"?: number | string;
    "--h"?: number | string;
    "--w"?: number | string;
  }
}

const defaultScale = 2;
const pivotOutlineSizePx = 10;

const SpriteOverlay = ({
  textureId,
  spritesheetSize,
}: {
  textureId: TextureId;
  spritesheetSize: Xy;
}) => {
  const { frame } = spritesheetData.frames[textureId];
  return (
    <div
      className="absolute border hover:bg-white group"
      style={{
        left: `${(frame.x / spritesheetSize.x) * 100}%`,
        top: `${(frame.y / spritesheetSize.y) * 100}%`,
        width: `${(frame.w / spritesheetSize.x) * 100}%`,
        height: `${(frame.h / spritesheetSize.y) * 100}%`,
      }}
    >
      <span className="group-hover:inline text-pureBlack hidden">
        {textureId}
      </span>
    </div>
  );
};

const SpritesheetImage = () => {
  const [mousePos, setMousePos] = useState<null | Xy>(null);
  const [spritesheetSize, setSpritesheetSize] = useState<null | Xy>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSpritesheetSize = () => {
      if (imgRef.current) {
        setSpritesheetSize({
          x: imgRef.current.naturalWidth,
          y: imgRef.current.naturalHeight,
        });
      }
    };

    const img = imgRef.current;
    if (img) {
      if (img.complete) {
        updateSpritesheetSize();
      } else {
        img.addEventListener("load", updateSpritesheetSize);
        return () => img.removeEventListener("load", updateSpritesheetSize);
      }
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current || !spritesheetSize) return;

    const rect = imgRef.current.getBoundingClientRect();
    const scaleX = spritesheetSize.x / rect.width;
    const scaleY = spritesheetSize.y / rect.height;

    const pixelX = Math.floor((e.clientX - rect.left) * scaleX);
    const pixelY = Math.floor((e.clientY - rect.top) * scaleY);

    if (
      pixelX >= 0 &&
      pixelX < spritesheetSize.x &&
      pixelY >= 0 &&
      pixelY < spritesheetSize.y
    ) {
      setMousePos({ x: pixelX, y: pixelY });
    }
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  const textureIds = Object.keys(spritesheetData.frames).sort() as TextureId[];

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        src={spritesheetUrl}
        className="w-full cursor-crosshair [background:repeating-conic-gradient(#999_0_25%,_#888_0_50%)_50%_/_20px_20px] pixelated"
      />

      {/* Sprite overlays */}
      {spritesheetSize &&
        textureIds.map((textureId) => (
          <SpriteOverlay
            key={textureId}
            textureId={textureId}
            spritesheetSize={spritesheetSize}
          />
        ))}

      {mousePos && spritesheetSize && imgRef.current && (
        <>
          {/* Highlight square for the hovered pixel - 6x6 outline centered on pixel */}
          <div
            className="absolute pointer-events-none border bg-pink outline-2"
            style={{
              left: `${(mousePos.x / spritesheetSize.x) * 100}%`,
              top: `${(mousePos.y / spritesheetSize.y) * 100}%`,
              width: `${(1 / spritesheetSize.x) * 100}%`,
              height: `${(1 / spritesheetSize.y) * 100}%`,
            }}
          />
          <div
            className="absolute pointer-events-none bg-black text-white px-1 text-xs font-mono"
            style={{
              left: `${(mousePos.x / spritesheetSize.x) * 100}%`,
              top: `calc(${(mousePos.y / spritesheetSize.y) * 100}% + 40px)`,
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

export const SpritesPageInner = ({ scale }: { scale: number }) => {
  const textureIds = Object.keys(spritesheetData.frames).sort() as TextureId[];
  return (
    <div className="e2e-snapshot-target">
      <SpritesheetImage />
      <title>Sprites</title>
      <div className="flex flex-wrap p-[8px] bg-pureBlack">
        {textureIds.map((textureId) => {
          const { frame } = spritesheetData.frames[textureId];
          const frameMaybeWithPivot = frame as typeof frame & {
            pivot?: Xy;
          };
          return (
            <div
              key={textureId}
              className="bg-shadow m-[4px] p-[8px] text-left flex flex-col w-8"
              data-texture-id={textureId}
            >
              <div
                className={`
                  sprite bg-pureBlack hover:bg-moss border-shadow 
                  box-content w-min`}
                // most of these textures won't have classes loaded by tailwind due to ,
                // so inline the relevant info - including how tailwind would inflate
                // the css in prod
                style={{
                  "--x": `${spritesheetData.frames[textureId].frame.x}px`,
                  "--y": `${spritesheetData.frames[textureId].frame.y}px`,
                  "--h": `${spritesheetData.frames[textureId].frame.h}px`,
                  "--w": `${spritesheetData.frames[textureId].frame.w}px`,
                }}
              >
                {frameMaybeWithPivot.pivot ?
                  <div
                    className="bg-midRed relative"
                    style={{
                      width: `${pivotOutlineSizePx}px`,
                      height: `${pivotOutlineSizePx}px`,
                      left: `${frameMaybeWithPivot.pivot.x * scale - pivotOutlineSizePx / 2}px`,
                      top: `${frameMaybeWithPivot.pivot.y * scale - pivotOutlineSizePx / 2}px`,
                    }}
                  />
                : null}
              </div>
              {/* take up space to keep the text at the bottom: */}
              <div className="flex-grow" />
              <div className="text-moss mt-1 flex-wrap flex-row flex">
                {textureId.split(/(\.)/).map((frag) => (
                  <span>{frag}</span>
                ))}
              </div>

              <div className="text-lightGrey">
                {frame.w}&nbsp;x&nbsp;{frame.h}
              </div>

              {frameMaybeWithPivot.pivot ?
                <div className="text-midRed">
                  pivot: ({frameMaybeWithPivot.pivot.x},&nbsp;
                  {frameMaybeWithPivot.pivot.y})
                </div>
              : <div className="text-metallicBlue">no pivot</div>}
              <div className="text-midGrey">
                @({frame.x},&nbsp;{frame.y})
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SpritesPage = () => {
  const scaleParam = typedURLSearchParams().get("scale");
  const scale = scaleParam ? Number(scaleParam) : defaultScale;

  return (
    <CssVariables scaleFactor={scale}>
      <SpritesPageInner scale={scale} />
    </CssVariables>
  );
};
