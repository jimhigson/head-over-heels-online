import { spritesheetData, type TextureId } from "../sprites/spriteSheetData";
import spritesheetUrl from "../../gfx/sprites.png";
import type { Xy } from "../utils/vectors/vectors";
import { CssVariables } from "../game/components/CssVariables";
import { useState, useRef, useEffect } from "react";

declare module "react" {
  interface CSSProperties {
    "--x"?: string | number;
    "--y"?: string | number;
    "--h"?: string | number;
    "--w"?: string | number;
  }
}

const spritePageScale = 4;
const pivotCircleSizePx = 20;

const SpritesheetImage = () => {
  const [mousePos, setMousePos] = useState<Xy | null>(null);
  const [imageSize, setImageSize] = useState<Xy | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateImageSize = () => {
      if (imgRef.current) {
        setImageSize({
          x: imgRef.current.naturalWidth,
          y: imgRef.current.naturalHeight,
        });
      }
    };

    const img = imgRef.current;
    if (img) {
      if (img.complete) {
        updateImageSize();
      } else {
        img.addEventListener("load", updateImageSize);
        return () => img.removeEventListener("load", updateImageSize);
      }
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current || !imageSize) return;

    const rect = imgRef.current.getBoundingClientRect();
    const scaleX = imageSize.x / rect.width;
    const scaleY = imageSize.y / rect.height;

    const pixelX = Math.floor((e.clientX - rect.left) * scaleX);
    const pixelY = Math.floor((e.clientY - rect.top) * scaleY);

    if (
      pixelX >= 0 &&
      pixelX < imageSize.x &&
      pixelY >= 0 &&
      pixelY < imageSize.y
    ) {
      setMousePos({ x: pixelX, y: pixelY });
    }
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

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
      {mousePos && imageSize && imgRef.current && (
        <>
          {/* Highlight square for the hovered pixel - 6x6 outline centered on pixel */}
          <div
            className="absolute pointer-events-none border bg-pink outline-2"
            style={{
              left: `${(mousePos.x / imageSize.x) * 100}%`,
              top: `${(mousePos.y / imageSize.y) * 100}%`,
              width: `${(1 / imageSize.x) * 100}%`,
              height: `${(1 / imageSize.y) * 100}%`,
            }}
          />
          <div
            className="absolute pointer-events-none bg-black text-white px-1 text-xs font-mono"
            style={{
              left: `${(mousePos.x / imageSize.x) * 100}%`,
              top: `calc(${(mousePos.y / imageSize.y) * 100}% + 40px)`,
              transform: "translate(8px, -100%)",
            }}
          >
            {/* <BitmapText className="bg-pureBlack text-white block"> */}
            {mousePos.x},{mousePos.y}
            {/* </BitmapText> */}
          </div>
        </>
      )}
    </div>
  );
};

export const SpritePageInner = () => {
  const textureIds = Object.keys(spritesheetData.frames).sort() as TextureId[];
  return (
    <>
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
              className="bg-shadow m-[8px] p-[16px] text-center flex flex-col"
            >
              <div
                className={`sprite bg-shadow hover:bg-pink hover:border-white border-shadow border-1 mb-1 box-content mx-auto w-min`}
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
                    className="border-midRed relative"
                    style={{
                      borderWidth: "2px",
                      borderRadius: "50%",
                      width: `${pivotCircleSizePx}px`,
                      height: `${pivotCircleSizePx}px`,
                      left: `${frameMaybeWithPivot.pivot.x * spritePageScale - pivotCircleSizePx / 2}px`,
                      top: `${frameMaybeWithPivot.pivot.y * spritePageScale - pivotCircleSizePx / 2}px`,
                    }}
                  />
                : null}
              </div>
              {/* take up space to keep the text at the bottom: */}
              <div className="flex-grow" />
              <div className="text-moss">{textureId}</div>
              <div className="text-lightGrey">
                {frame.w}&nbsp;x&nbsp;{frame.h}
              </div>
              <div className="text-midRed">
                {frameMaybeWithPivot.pivot ?
                  <>
                    pivot: ({frameMaybeWithPivot.pivot.x},&nbsp;
                    {frameMaybeWithPivot.pivot.y})
                  </>
                : "no pivot"}
              </div>
              <div className="text-midGrey">
                @({frame.x},&nbsp;{frame.y})
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export const SpritePage = () => {
  return (
    <CssVariables scaleFactor={spritePageScale}>
      <SpritePageInner />
    </CssVariables>
  );
};
