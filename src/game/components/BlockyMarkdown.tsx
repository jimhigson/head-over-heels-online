import type { PropsWithChildren } from "react";
import type { Components } from "react-markdown";
import Markdown from "react-markdown";
import { ImgSprite, RenderTextChildrenAsSprites } from "./Sprite";
import type { EmptyObject } from "type-fest";
import { assertIsTextureId } from "../../sprites/assertIsTextureId";
import { imageScale, textScale } from "./dialogScales";
import { spritesheetPalette } from "gfx/spritesheetPalette";

export interface BlockyMarkdownProps {
  markdown: string;
  className?: string;
}

const markdownComponents: Components = {
  h2: ({ children }: PropsWithChildren<EmptyObject>) => (
    <h2 className={`text-metallicBlue mb-${textScale}`}>
      <RenderTextChildrenAsSprites
        imgSpriteTextProps={{
          doubleHeight: true,
          color: spritesheetPalette.metallicBlue,
          scale: textScale,
        }}
      >
        {children}
      </RenderTextChildrenAsSprites>
    </h2>
  ),
  h3: ({ children }: PropsWithChildren<EmptyObject>) => (
    <h3 className={`text-metallicBlue mt-${textScale} mb-${textScale}`}>
      <RenderTextChildrenAsSprites
        imgSpriteTextProps={{
          color: spritesheetPalette.metallicBlue,
          scale: textScale,
        }}
      >
        {children}
      </RenderTextChildrenAsSprites>
    </h3>
  ),
  p: ({ children }: PropsWithChildren<EmptyObject>) => (
    <p className={`mb-${textScale} leading-${textScale} clear-both`}>
      <RenderTextChildrenAsSprites imgSpriteTextProps={{ scale: textScale }}>
        {children}
      </RenderTextChildrenAsSprites>
    </p>
  ),
  li: ({ children }: PropsWithChildren<EmptyObject>) => (
    <p className={`mb-${textScale} leading-${textScale} clear-both`}>
      <RenderTextChildrenAsSprites imgSpriteTextProps={{ scale: textScale }}>
        {children}
      </RenderTextChildrenAsSprites>
    </p>
  ),
  strong: ({ children }: PropsWithChildren<EmptyObject>) => (
    <RenderTextChildrenAsSprites
      imgSpriteTextProps={{
        scale: textScale,
        color: spritesheetPalette.midRed,
      }}
    >
      {children}
    </RenderTextChildrenAsSprites>
  ),
  em: ({ children }: PropsWithChildren<EmptyObject>) => (
    <RenderTextChildrenAsSprites
      imgSpriteTextProps={{
        scale: textScale,
        color: spritesheetPalette.moss,
      }}
    >
      {children}
    </RenderTextChildrenAsSprites>
  ),
  img({ src }: JSX.IntrinsicElements["img"]) {
    if (src === undefined) return null;

    assertIsTextureId(src);

    return (
      <ImgSprite
        scale={imageScale}
        textureId={src}
        className={`float-left mr-${textScale} mb-${textScale} w-1/5 mb-2`}
      />
    );
  },
};

export const BlockyMarkdown = ({
  markdown,
  className,
}: BlockyMarkdownProps) => {
  return (
    <Markdown
      className={className}
      components={markdownComponents}
      allowedElements={[
        "h1",
        "h2",
        "h3",
        "p",
        "em",
        "img",
        "ul",
        "li",
        "ol",
        "strong",
      ]}
    >
      {markdown}
    </Markdown>
  );
};
