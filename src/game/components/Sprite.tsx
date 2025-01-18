import {
  useEffect,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { createSprite, type CreateSpriteOptions } from "../render/createSprite";
import { Application } from "pixi.js";
import { spriteSheet } from "@/sprites/spriteSheet";
import { isTextureId } from "@/sprites/assertIsTextureId";

export interface PixiSpriteProps {
  spriteOptions: CreateSpriteOptions;
  className?: string;
}

import "react";
import { twMerge } from "tailwind-merge";
import type { TextureId } from "@/sprites/spriteSheetData";
import type { SpritesheetPaletteColourName } from "gfx/spritesheetPalette";

/** displays one sprite from the spritesheet */
export const PixiSprite = ({ spriteOptions, className }: PixiSpriteProps) => {
  const [containerEle, setContainerEle] = useState<HTMLSpanElement | null>(
    null,
  );

  useEffect(() => {
    if (containerEle === null) return;

    const app = new Application();

    const asyncEffect = async () => {
      await app.init({ backgroundAlpha: 0, resizeTo: containerEle });
      containerEle.appendChild(app.canvas);
      const sprite = createSprite(spriteOptions);

      sprite.x = containerEle.clientWidth / 2;
      sprite.y = containerEle.clientHeight;
      sprite.scale = containerEle.clientWidth / sprite.width;
      app.stage.addChild(sprite);
    };

    asyncEffect();

    return () => {
      containerEle.removeChild(app.canvas);
      app.destroy();
    };
  }, [containerEle, spriteOptions]);

  return <span className={className} ref={setContainerEle} />;
};

export interface ImgSpriteProps {
  textureId: TextureId;
  className?: string;
  scale?: number;
  /** if true, will tint to the colour in the --bitmapTextColour css variable */
  tint?: boolean;
}

export const ImgSprite = ({ textureId, className, tint }: ImgSpriteProps) => {
  return (
    <span
      className={twMerge(
        `${tint ? "sprite-tinted" : "sprite"} texture-${textureId}`,
        className,
      )}
    />
  );
};

export interface BitmapTextProps {
  children: string | string[];
  /**
   * special case of per-char colour cycling - otherwise
   * set a single colour using classname/tailwind
   */
  colourCycle?: SpritesheetPaletteColourName[];
  className?: string;
  noSpaceAfter?: boolean;
  noTrim?: boolean;
  noSlitWords?: boolean;
}

export const BitmapText = ({
  children: text,
  className,
  noSpaceAfter,
  noTrim,
  noSlitWords,
  colourCycle,
}: BitmapTextProps) => {
  const trimmed =
    Array.isArray(text) ?
      text.map((text) => (noTrim ? text : text.trim())).join(" ")
    : noTrim ? text
    : text.trim();
  if (trimmed.length === 0) {
    return null;
  }
  const words =
    noSlitWords ? [trimmed.toUpperCase()] : trimmed.toUpperCase().split(/\s+/);
  return (
    <span className={className}>
      {words.map((w, wordIndex) => {
        return (
          // me- is margin end - for a space before the next word
          <span
            className={twMerge(
              `word text-nowrap`,
              noSpaceAfter && wordIndex === words.length - 1 ? "" : "me-1",
            )}
            key={wordIndex}
          >
            {/* Array.from(string) is unicode-aware */}
            {Array.from(w).map((c, charIndex) => {
              const textureId = `hud.char.${c}`;
              if (!isTextureId(textureId)) {
                console.error(
                  "no texture for char",
                  c,
                  c.charCodeAt(0),
                  textureId,
                  "we have:",
                  Object.keys(spriteSheet.textures),
                );
              }
              const imgSpriteEle = (
                <ImgSprite
                  key={charIndex}
                  textureId={isTextureId(textureId) ? textureId : "hud.char.?"}
                  tint
                />
              );

              if (colourCycle !== undefined) {
                return (
                  <span
                    className={`text-${colourCycle[charIndex % colourCycle.length]}`}
                    key={charIndex}
                  >
                    {imgSpriteEle}
                  </span>
                );
              }

              return imgSpriteEle;
            })}
          </span>
        );
      })}
    </span>
  );
};
export const RenderTextChildrenAsBitmapText = ({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>): ReactNode => {
  if (Array.isArray(children)) {
    return children.map((c, i) => (
      <RenderTextChildrenAsBitmapText key={i} children={c} />
    ));
  } else if (typeof children === "string") {
    return (
      <span className={className}>
        <BitmapText>{children}</BitmapText>
      </span>
    );
  } else {
    return children;
  }
};
