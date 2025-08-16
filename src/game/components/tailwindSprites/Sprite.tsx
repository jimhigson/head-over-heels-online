import type { AriaRole, MouseEventHandler, ReactElement } from "react";
import {
  cloneElement,
  isValidElement,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import "react";
import { twMerge } from "tailwind-merge";
import { isTextureId } from "../../../sprites/assertIsTextureId";
import { escapeCharForTailwind } from "../../../sprites/escapeCharForTailwind";
import { loadedSpriteSheet } from "../../../sprites/spriteSheet";
import { ClassnameWrap } from "../../../utils/react/ClassnameWrap";
import { sanitiseForClassName } from "./SanitiseForClassName";

export interface CssSpriteProps {
  className?: string;
  /** if true, will tint to the colour in the --bitmapTextColour css variable */
  tint?: boolean;
}

export interface BitmapTextProps {
  children: number | string | (string | number)[];
  /**
   * per-char colour (or any other style) cycling
   */
  classnameCycle?: string[];
  className?: string;
  noSlitWords?: boolean;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  noTint?: boolean;
  TagName?: "span" | "h1";
  role?: AriaRole;
}

export const BitmapText = ({
  children: text,
  className,
  noSlitWords,
  classnameCycle,
  onClick,
  /**
   * if on, the sprite-tint utility class is not turned on. This means the
   * text will be white, but also allows it (due to a Safari bug) to show text
   * inside translated foreign objects
   */
  noTint = false,
  TagName = "span",
  role,
}: BitmapTextProps) => {
  const textString =
    // trimming helps for some markdown-rendering:
    Array.isArray(text) ? text.join(" ")
    : typeof text === "number" ? `${text}`
    : text;
  if (textString.length === 0) {
    return null;
  }
  const words =
    noSlitWords ?
      [textString.toUpperCase()]
    : textString.toUpperCase().split(/\s+/);

  return (
    <TagName className={className} onClick={onClick}>
      <span className="sr-only">{textString}</span>
      {words.map((word, wordIndex) => {
        return (
          // me- is margin end - for a space before the next word
          <span
            className={twMerge(
              // inline-block only needed for Firefox, no-wrap is enough in Chrome/Safari
              `text-nowrap inline-block`,
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
                  Object.keys(loadedSpriteSheet().textures),
                );
              }
              const imgSpriteEle = (
                <span
                  role={role}
                  key={charIndex}
                  className={`sprite ${
                    isTextureId(textureId) ?
                      // all texture-hud_char_* classnames are whitelisted in tailwind config so it is
                      // fine to construct dynamically:
                      //twClass("texture-hud_char_A")
                      `texture-${sanitiseForClassName(textureId)}`
                    : "texture-hud_char_?"
                  }
                  ${noTint ? "" : "sprite-tinted"}
                  ${
                    classnameCycle === undefined ? "" : (
                      classnameCycle[charIndex % classnameCycle.length]
                    )
                  }`}
                />
              );

              return imgSpriteEle;
            })}
          </span>
        );
      })}
    </TagName>
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
    <ClassnameWrap className={className}>
      {Array.isArray(children) ?
        children.map((c, i) => <MultipleBitmapText key={i} children={c} />)
      : typeof children === "number" ?
        <BitmapText>{String(children)}</BitmapText>
      : typeof children === "string" ?
        <BitmapText>{children}</BitmapText>
      : isValidElement(children) ?
        children.type === BitmapText || children.type === MultipleBitmapText ?
          // avoid double-nesting BitmapText:
          children
        : elementHasChildrenProp(children) ?
          cloneElement(
            children,
            undefined,
            typeof children.props.children === "string" ?
              <BitmapText>{`${children.props.children}`}</BitmapText>
            : <MultipleBitmapText>
                {children.props.children}
              </MultipleBitmapText>,
          )
        : children
      : children}
    </ClassnameWrap>
  );
};
