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
  color?: Color;
}

export const ImgSprite = ({ textureId, className, color }: ImgSpriteProps) => {
  const { width, x, y, height } = spriteSheet.textures[textureId].frame;

  if (color) {
    return (
      <span
        style={{
          "--w": `${width}px`,
          "--h": `${height}px`,
          "--x": `${x}px`,
          "--y": `${y}px`,

          display: "inline-block",
          width: `calc(var(--w) * var(--scale))`,
          height: `calc(var(--w) * var(--scale) * var(--doubleHeight))`,
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
        height: `calc(var(--w) * var(--scale) * var(--doubleHeight))`,
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
  color?: Color;
  className?: string;
}

export const BitmapText = ({
  children: text,
  doubleHeight,
  color = spritesheetPalette.shadow,
  className,
}: BitmapTextProps) => {
  const trimmed =
    Array.isArray(text) ?
      text.map((text) => text.trim()).join(" ")
    : text.trim();
  if (trimmed.length === 0) {
    return null;
  }
  const words = trimmed.toUpperCase().split(/\s+/);
  return (
    <span
      className={className}
      style={{
        "--bitmapTextColour": color.toRgbaString(),
        ...(doubleHeight ? { "--doubleHeight": "2" } : {}),
      }}
    >
      {words.map((w, wordIndex) => {
        return (
          // me- is margin end - for a space before the next word
          <span className={`word text-nowrap me-[--block]`} key={wordIndex}>
            {w.split("").map((c, charIndex) => {
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
              return (
                <ImgSprite
                  className={c}
                  key={charIndex}
                  textureId={isTextureId(textureId) ? textureId : "hud.char.?"}
                  color={color}
                />
              );
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
