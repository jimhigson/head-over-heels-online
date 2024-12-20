import {
  useEffect,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { createSprite, type CreateSpriteOptions } from "../render/createSprite";
import type { Color } from "pixi.js";
import { Application } from "pixi.js";
import spritesheetUrl from "../../../gfx/sprites.png";
import { spriteSheet, type TextureId } from "@/sprites/spriteSheet";
import { isTextureId } from "@/sprites/assertIsTextureId";
import { spritesheetPalette } from "gfx/spritesheetPalette";

export interface PixiSpriteProps {
  spriteOptions: CreateSpriteOptions;
  className?: string;
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
  doubleHeight?: boolean;
  scale?: number;
  color?: Color;
}

export const ImgSprite = ({
  textureId,
  className,
  doubleHeight,
  scale = 1,
  color,
}: ImgSpriteProps) => {
  const { width, x, y, height } = spriteSheet.textures[textureId].frame;

  const { width: sourceWidth, height: sourceHeight } =
    spriteSheet.textureSource;

  const yScale = scale * (doubleHeight ? 2 : 1);

  if (color) {
    return (
      <span
        style={{
          display: "inline-block",
          width: `${width * scale}px`,
          height: `${height * yScale}px`,
          mask: `url(${spritesheetUrl})`,
          maskPosition: `-${x * scale}px -${y * yScale}px`,
          maskSize: `${sourceWidth * scale}px ${sourceHeight * yScale}px`,
          imageRendering: "pixelated",
          backgroundColor: color.toRgbaString(),
        }}
        className={className}
      />
    );
  }

  return (
    <span
      style={{
        display: "inline-block",
        width: `${width * scale}px`,
        height: `${height * yScale}px`,
        backgroundImage: `url(${spritesheetUrl})`,
        backgroundPosition: `-${x * scale}px -${y * yScale}px`,
        backgroundSize: `${sourceWidth * scale}px ${sourceHeight * yScale}px`,
        imageRendering: "pixelated",
      }}
      className={className}
    />
  );
};

export interface BitmapTextProps {
  children: string | string[];
  scale?: number;
  doubleHeight?: boolean;
  color?: Color;
}

export const BitmapText = ({
  children: text,
  scale = 1,
  doubleHeight,
  color = spritesheetPalette.shadow,
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
    <>
      {words.map((w, wordIndex) => {
        return (
          // me- is margin end - for a space before the next word
          <span className={`word text-nowrap me-${scale}`} key={wordIndex}>
            {w.split("").map((c, charIndex) => {
              const textureId = `hud.char.${c}`;
              return (
                <ImgSprite
                  className={c}
                  key={charIndex}
                  textureId={isTextureId(textureId) ? textureId : "hud.char.?"}
                  doubleHeight={doubleHeight}
                  scale={scale}
                  color={color}
                />
              );
            })}
          </span>
        );
      })}
    </>
  );
};
export const RenderTextChildrenAsSprites = ({
  children,
  imgSpriteTextProps,
  className,
}: PropsWithChildren<{
  imgSpriteTextProps?: Omit<BitmapTextProps, "children">;
  className?: string;
}>): ReactNode => {
  if (Array.isArray(children)) {
    return children.map((c, i) => (
      <RenderTextChildrenAsSprites
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
