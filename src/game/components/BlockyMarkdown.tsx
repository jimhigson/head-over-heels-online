import type { JSX } from "react";
import { useContext, type PropsWithChildren } from "react";
import type { Components } from "react-markdown";
import Markdown from "react-markdown";
import { ImgSprite, RenderTextChildrenAsSprites } from "./Sprite";
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
        <RenderTextChildrenAsSprites
          imgSpriteTextProps={{
            doubleHeight: true,
            color: spritesheetPalette.metallicBlue,
            scale: scaleFactor,
          }}
        >
          {children}
        </RenderTextChildrenAsSprites>
      </h2>
    );
  },
  h3: function H3({ children }: PropsWithChildren<EmptyObject>) {
    const scaleFactor = useContext(ScaleFactorContext);
    return (
      <h3 className={`text-metallicBlue mt-${scaleFactor} mb-${scaleFactor}`}>
        <RenderTextChildrenAsSprites
          imgSpriteTextProps={{
            color: spritesheetPalette.metallicBlue,
            scale: scaleFactor,
          }}
        >
          {children}
        </RenderTextChildrenAsSprites>
      </h3>
    );
  },
  p: function P({ children }: PropsWithChildren<EmptyObject>) {
    const scaleFactor = useContext(ScaleFactorContext);
    return (
      <p className={`mb-${scaleFactor} leading-${scaleFactor} clear-both`}>
        <RenderTextChildrenAsSprites
          imgSpriteTextProps={{ scale: scaleFactor }}
        >
          {children}
        </RenderTextChildrenAsSprites>
      </p>
    );
  },
  li: function Li({ children }: PropsWithChildren<EmptyObject>) {
    const scaleFactor = useContext(ScaleFactorContext);
    return (
      <p className={`mb-${scaleFactor} leading-${scaleFactor} clear-both`}>
        <RenderTextChildrenAsSprites
          imgSpriteTextProps={{ scale: scaleFactor }}
        >
          {children}
        </RenderTextChildrenAsSprites>
      </p>
    );
  },
  strong: function Strong({ children }: PropsWithChildren<EmptyObject>) {
    const scaleFactor = useContext(ScaleFactorContext);
    return (
      <RenderTextChildrenAsSprites
        imgSpriteTextProps={{
          scale: scaleFactor,
          color: spritesheetPalette.midRed,
        }}
      >
        {children}
      </RenderTextChildrenAsSprites>
    );
  },
  em: function Em({ children }: PropsWithChildren<EmptyObject>) {
    const scaleFactor = useContext(ScaleFactorContext);
    return (
      <RenderTextChildrenAsSprites
        imgSpriteTextProps={{
          scale: scaleFactor,
          color: spritesheetPalette.moss,
        }}
      >
        {children}
      </RenderTextChildrenAsSprites>
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
