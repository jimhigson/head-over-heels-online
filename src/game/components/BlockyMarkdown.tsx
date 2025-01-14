import type { JSX } from "react";
import { useContext, type PropsWithChildren } from "react";
import type { Components } from "react-markdown";
import Markdown from "react-markdown";
import { ImgSprite, RenderTextChildrenAsBitmapText } from "./Sprite";
import type { EmptyObject } from "type-fest";
import { assertIsTextureId } from "../../sprites/assertIsTextureId";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { ScaleFactorContext } from "./ScaleFactorContext";

export interface BlockyMarkdownProps {
  markdown: string;
  className?: string;
}

const markdownComponents: Components = {
  h2: function H2({ children }: PropsWithChildren<EmptyObject>) {
    const scaleFactor = useContext(ScaleFactorContext);
    return (
      <h2 className={`text-metallicBlue mb-${scaleFactor}`}>
        <RenderTextChildrenAsBitmapText
          imgSpriteTextProps={{
            doubleHeight: true,
            color: spritesheetPalette.metallicBlue,
          }}
        >
          {children}
        </RenderTextChildrenAsBitmapText>
      </h2>
    );
  },
  h3: function H3({ children }: PropsWithChildren<EmptyObject>) {
    const scaleFactor = useContext(ScaleFactorContext);
    return (
      <h3 className={`text-metallicBlue mt-${scaleFactor} mb-${scaleFactor}`}>
        <RenderTextChildrenAsBitmapText
          imgSpriteTextProps={{
            color: spritesheetPalette.metallicBlue,
          }}
        >
          {children}
        </RenderTextChildrenAsBitmapText>
      </h3>
    );
  },
  p: function P({ children }: PropsWithChildren<EmptyObject>) {
    const scaleFactor = useContext(ScaleFactorContext);
    return (
      <p className={`mb-${scaleFactor} leading-${scaleFactor} clear-both`}>
        <RenderTextChildrenAsBitmapText>
          {children}
        </RenderTextChildrenAsBitmapText>
      </p>
    );
  },
  li: function Li({ children }: PropsWithChildren<EmptyObject>) {
    const scaleFactor = useContext(ScaleFactorContext);
    return (
      <p className={`mb-${scaleFactor} leading-${scaleFactor} clear-both`}>
        <RenderTextChildrenAsBitmapText>
          {children}
        </RenderTextChildrenAsBitmapText>
      </p>
    );
  },
  strong: function Strong({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <RenderTextChildrenAsBitmapText
        imgSpriteTextProps={{
          color: spritesheetPalette.midRed,
        }}
      >
        {children}
      </RenderTextChildrenAsBitmapText>
    );
  },
  em: function Em({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <RenderTextChildrenAsBitmapText
        imgSpriteTextProps={{
          color: spritesheetPalette.moss,
        }}
      >
        {children}
      </RenderTextChildrenAsBitmapText>
    );
  },
  img: function Img({ src }: JSX.IntrinsicElements["img"]) {
    const scaleFactor = useContext(ScaleFactorContext);
    if (src === undefined) return null;

    assertIsTextureId(src);

    return (
      // make double-size:
      <span style={{ "--scale": scaleFactor * 2 }}>
        <ImgSprite
          scale={2 * scaleFactor}
          textureId={src}
          className={`float-left mr-${scaleFactor} mb-${scaleFactor} w-1/5 mb-2`}
        />
      </span>
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
