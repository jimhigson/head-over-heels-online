import type { JSX } from "react";
import { type PropsWithChildren } from "react";
import type { Components } from "react-markdown";
import Markdown from "react-markdown";
import { ImgSprite, RenderTextChildrenAsBitmapText } from "./Sprite";
import type { EmptyObject } from "type-fest";
import { assertIsTextureId } from "../../sprites/assertIsTextureId";
import { spritesheetPalette } from "gfx/spritesheetPalette";
import { useScaleFactor } from "@/store/selectors";

export interface BlockyMarkdownProps {
  markdown: string;
  className?: string;
}

const markdownComponents: Components = {
  h2: function H2({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <h2 className={`text-metallicBlue mb-1`}>
        <RenderTextChildrenAsBitmapText
          imgSpriteTextProps={{
            doubleHeight: true,
            colour: spritesheetPalette.metallicBlue,
          }}
        >
          {children}
        </RenderTextChildrenAsBitmapText>
      </h2>
    );
  },
  h3: function H3({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <h3 className={`text-metallicBlue mt-1 mb-1`}>
        <RenderTextChildrenAsBitmapText
          imgSpriteTextProps={{
            colour: spritesheetPalette.metallicBlue,
          }}
        >
          {children}
        </RenderTextChildrenAsBitmapText>
      </h3>
    );
  },
  p: function P({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <p className={`mb-1 leading-blockPlusOne clear-both`}>
        <RenderTextChildrenAsBitmapText>
          {children}
        </RenderTextChildrenAsBitmapText>
      </p>
    );
  },
  li: function Li({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <p className={`mb-1 leading-blockPlusOne clear-both`}>
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
          colour: spritesheetPalette.midRed,
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
          colour: spritesheetPalette.moss,
        }}
      >
        {children}
      </RenderTextChildrenAsBitmapText>
    );
  },
  img: function Img({ src }: JSX.IntrinsicElements["img"]) {
    const scaleFactor = useScaleFactor();
    if (src === undefined) return null;

    assertIsTextureId(src);

    return (
      // make double-size:
      <span style={{ "--scale": scaleFactor * 2 }}>
        <ImgSprite
          scale={2 * scaleFactor}
          textureId={src}
          className={`float-left mr-1 mb-1 w-1/5`}
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
