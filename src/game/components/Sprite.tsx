import {
  useEffect,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { createSprite, type CreateSpriteOptions } from "../render/createSprite";
import type { Color } from "pixi.js";
import { Application } from "pixi.js";
import { spriteSheet, type TextureId } from "@/sprites/spriteSheet";
import { isTextureId } from "@/sprites/assertIsTextureId";
import { spritesheetPalette } from "gfx/spritesheetPalette";

export interface PixiSpriteProps {
  spriteOptions: CreateSpriteOptions;
  className?: string;
}

import "react";
import { twMerge } from "tailwind-merge";
import { emptyObject } from "@/utils/empty";

declare module "react" {
  interface CSSProperties {
    [`--w`]?: `${string}px`;
    [`--h`]?: `${string}px`;
    [`--x`]?: `${string}px`;
    [`--y`]?: `${string}px`;
    [`--bitmapTextColour`]?: string;
    [`--spritesheetUrl`]?: string;
    [`--spritesheetW`]?: string;
    [`--spritesheetH`]?: string;
    [`--doubleHeight`]?: "1" | "2";
  }
}

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
  const { width, x, y, height } = spriteSheet.textures[textureId].frame;

  if (tint) {
    return (
      <span
        style={{
          "--w": `${width}px`,
          "--h": `${height}px`,
          "--x": `${x}px`,
          "--y": `${y}px`,

          display: "inline-block",
          width: `calc(var(--w) * var(--scale))`,
          height: `calc(var(--h) * var(--scale) * var(--doubleHeight))`,
          maskImage: `var(--spritesheetUrl)`,
          maskPosition: `calc(-1 * var(--x) * var(--scale)) calc(-1 * var(--y) * var(--scale) * var(--doubleHeight))`,
          maskSize: `calc(var(--spritesheetW) * var(--scale)) calc( var(--spritesheetH) * var(--scale) * var(--doubleHeight))`,
          backgroundColor: `var(--bitmapTextColour)`,
          imageRendering: "pixelated",
        }}
        className={className}
      />
    );
  }

  return (
    <span
      style={{
        "--w": `${width}px`,
        "--h": `${height}px`,
        "--x": `${x}px`,
        "--y": `${y}px`,
        display: "inline-block",
        width: `calc(var(--w) * var(--scale))`,
        height: `calc(var(--h) * var(--scale) * var(--doubleHeight))`,
        backgroundImage: `var(--spritesheetUrl)`,
        backgroundPosition: `calc(-1 * var(--x) * var(--scale)) calc(-1 * var(--y) * var(--scale) * var(--doubleHeight))`,
        backgroundSize: `calc(var(--spritesheetW) * var(--scale)) calc( var(--spritesheetH) * var(--scale) * var(--doubleHeight))`,
        imageRendering: "pixelated",
      }}
      className={className}
    />
  );
};

export interface BitmapTextProps {
  children: string | string[];
  doubleHeight?: boolean;
  colour?: Color | Color[];
  className?: string;
  noSpaceAfter?: boolean;
  noTrim?: boolean;
  noSlitWords?: boolean;
}

export const BitmapText = ({
  children: text,
  doubleHeight,
  colour = spritesheetPalette.shadow,
  className,
  noSpaceAfter,
  noTrim,
  noSlitWords,
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
    <span
      className={twMerge(className, doubleHeight && "[--doubleHeight:2]")}
      style={
        Array.isArray(colour) ? emptyObject : (
          {
            "--bitmapTextColour": colour.toRgbaString(),
          }
        )
      }
    >
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

              if (Array.isArray(colour)) {
                return (
                  <span
                    key={charIndex}
                    // all these styles could be replaced with a tailwind plugin
                    style={{
                      "--bitmapTextColour":
                        colour[charIndex % colour.length].toRgbaString(),
                    }}
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
  imgSpriteTextProps,
  className,
}: PropsWithChildren<{
  imgSpriteTextProps?: Omit<BitmapTextProps, "children">;
  className?: string;
}>): ReactNode => {
  if (Array.isArray(children)) {
    return children.map((c, i) => (
      <RenderTextChildrenAsBitmapText
        key={i}
        children={c}
        imgSpriteTextProps={imgSpriteTextProps}
      />
    ));
  } else if (typeof children === "string") {
    return (
      <span className={className}>
        <BitmapText {...imgSpriteTextProps}>{children}</BitmapText>
      </span>
    );
  } else {
    return children;
  }
};
