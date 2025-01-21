import { type PropsWithChildren, type ReactNode } from "react";
import "react";
import { twMerge } from "tailwind-merge";
import type { SpritesheetPaletteColourName } from "gfx/spritesheetPalette";
import clsx from "clsx";
import { isTextureId } from "../../sprites/assertIsTextureId";
import { escapeCharForTailwind } from "../../sprites/escapeCharForTailwind";
import { spriteSheet } from "../../sprites/spriteSheet";

export interface SpritesheetSpriteProps {
  className?: string;
  /** if true, will tint to the colour in the --bitmapTextColour css variable */
  tint?: boolean;
}

export const SpritesheetSprite = ({
  className,
  tint,
}: SpritesheetSpriteProps) => {
  return (
    <span
      className={twMerge(`sprite  ${tint ? "sprite-tinted" : ""}`, className)}
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
  noSlitWords?: boolean;
}

export const BitmapText = ({
  children: text,
  className,
  noSlitWords,
  colourCycle,
}: BitmapTextProps) => {
  const textString =
    // trimming helps for some markdown-rendering:
    Array.isArray(text) ? text.join(" ") : text;
  if (textString.length === 0) {
    return null;
  }
  const words =
    noSlitWords ?
      [textString.toUpperCase()]
    : textString.toUpperCase().split(/\s+/);

  return (
    <span className={clsx(className)}>
      {words.map((word, wordIndex) => {
        return (
          // me- is margin end - for a space before the next word
          <span
            className={twMerge(
              `text-nowrap`,
              wordIndex === words.length - 1 ? "" : "me-1",
            )}
            key={wordIndex}
          >
            {/* Array.from(string) is unicode-aware */}
            {Array.from(word).map((c, charIndex) => {
              const textureId = `hud.char.${escapeCharForTailwind(c)}`;
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
                <SpritesheetSprite
                  key={charIndex}
                  className={
                    isTextureId(textureId) ?
                      // all texture-hud.char.* classnames are whitelisted in tailwind config so it is
                      // fine to construct dynamically:
                      `texture-${textureId}`
                    : "texture-hud.char.?"
                  }
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
