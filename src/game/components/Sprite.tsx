import type { ReactElement } from "react";
import {
  cloneElement,
  isValidElement,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { isTextureId } from "../../sprites/assertIsTextureId";
import { escapeCharForTailwind } from "../../sprites/escapeCharForTailwind";
import { spriteSheet } from "../../sprites/spriteSheet";

export interface CssSpriteProps {
  className?: string;
  /** if true, will tint to the colour in the --bitmapTextColour css variable */
  tint?: boolean;
}

/**
 * css sprite is much lighter than using pixi, and can tint the sprite to any colour,
 * but doesn't support filters like pixi does
 */
export const CssSprite = ({ className, tint }: CssSpriteProps) => {
  return (
    <span
      className={twMerge(`sprite  ${tint ? "sprite-tinted" : ""}`, className)}
    />
  );
};

export interface BitmapTextProps {
  children: string | string[];
  /**
   * per-char colour (or any other style) cycling
   */
  classnameCycle?: string[];
  className?: string;
  noSlitWords?: boolean;
}

export const BitmapText = ({
  children: text,
  className,
  noSlitWords,
  classnameCycle,
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
                <CssSprite
                  key={charIndex}
                  className={`${
                    isTextureId(textureId) ?
                      // all texture-hud.char.* classnames are whitelisted in tailwind config so it is
                      // fine to construct dynamically:
                      `texture-${textureId}`
                    : "texture-hud.char.?"
                  } ${classnameCycle === undefined ? "" : classnameCycle[charIndex % classnameCycle.length]}`}
                  tint
                />
              );

              return imgSpriteEle;
            })}
          </span>
        );
      })}
    </span>
  );
};

const elementHasChildrenProp = (
  element: ReactElement,
): element is ReactElement<{ children: React.ReactNode }> => {
  return (
    (element as ReactElement<{ children: React.ReactNode }>).props.children !==
    undefined
  );
};

/** turns any text, at any level deep, in anything it renders into bitmap text */
export const MultipleBitmapText = ({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>): ReactNode => {
  return (
    <div className={`contents ${className}`}>
      {Array.isArray(children) ?
        children.map((c, i) => <MultipleBitmapText key={i} children={c} />)
      : typeof children === "string" ?
        <BitmapText>{children}</BitmapText>
      : isValidElement(children) ?
        elementHasChildrenProp(children) ?
          cloneElement(
            children,
            undefined,
            <MultipleBitmapText>{children.props.children}</MultipleBitmapText>,
          )
        : children
      : children}
    </div>
  );
};
