import type { JSX, MouseEventHandler, ReactElement } from "react";

import {
  cloneElement,
  isValidElement,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import "react";
import { twMerge } from "tailwind-merge";

import { escapeCharForTailwind } from "../../../sprites/escapeCharForTailwind";
import { ClassnameWrap } from "../../../utils/react/ClassnameWrap";
import { sanitiseForClassName } from "./SanitiseForClassName";

export interface CssSpriteProps {
  className?: string;
  /** if true, will tint to the colour in the --bitmapTextColour css variable */
  tint?: boolean;
}

type BitmapTextTagName = "h1" | "h2" | "label" | "li" | "span";

export type BitmapTextProps<Tag extends BitmapTextTagName = "span"> = {
  children: (number | string)[] | number | string;
  /**
   * per-char colour (or any other style) cycling
   */
  classnameCycle?: string[];
  className?: string;
  noSlitWords?: boolean;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  noTint?: boolean;
  TagName?: Tag;
} & JSX.IntrinsicElements[Tag];

export const BitmapText = <Tag extends BitmapTextTagName = "span">({
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
  TagName = "span" as Tag,
  ...tagProps
}: BitmapTextProps<Tag>) => {
  const textString =
    // trimming helps for some markdown-rendering:
    Array.isArray(text) ? text.join(" ")
    : typeof text === "number" ? `${text}`
    : text;
  if (textString.length === 0) {
    return null;
  }
  const words = noSlitWords ? [textString] : textString.split(/\s+/);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- typescript can't infer TagName = JSX.IntrinsicElements[Tag] = is safe for TagName
    <TagName {...(tagProps as any)} className={className} onClick={onClick}>
      <span className="sr-only">{textString}</span>
      {words.map((word, wordIndex) => (
        <span
          className={twMerge(
            `text-nowrap inline-block [&>*]:align-top`,
            wordIndex === words.length - 1 ?
              ""
            : "me-threeQuarters sprites-uppercase:me-1",
          )}
          key={wordIndex}
        >
          {Array.from(word).map((c, charIndex) => (
            <span
              key={charIndex}
              className={`sprite ${`texture-${sanitiseForClassName(`hud.char.${escapeCharForTailwind(c)}`)}`}
              ${noTint ? "" : "sprite-tinted"}
              ${classnameCycle === undefined ? "" : classnameCycle[charIndex % classnameCycle.length]}`}
            />
          ))}
        </span>
      ))}
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
