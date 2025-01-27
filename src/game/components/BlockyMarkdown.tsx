import type { JSX, ReactElement } from "react";
import { type PropsWithChildren } from "react";
import type { Components } from "react-markdown";
import Markdown from "react-markdown";
import { CssSprite, MultipleBitmapText } from "./Sprite";
import type { EmptyObject } from "type-fest";
import { useTotalUpscale } from "../../store/selectors";
import { twMerge } from "tailwind-merge";

const markdownComponents: Components = {
  h2: function H2({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <h2 className="mb-1 sprites-double-height text-metallicBlue zx:text-zxBlue">
        <MultipleBitmapText>{children}</MultipleBitmapText>
      </h2>
    );
  },
  h3: function H3({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <h3 className="mt-1 mb-1 text-metallicBlue zx:text-zxBlue">
        <MultipleBitmapText>{children}</MultipleBitmapText>
      </h3>
    );
  },
  p: function P({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <div className="mb-1">
        <MultipleBitmapText>{children}</MultipleBitmapText>
      </div>
    );
  },
  li: function Li({ children }: PropsWithChildren<EmptyObject>) {
    return (
      // clear left allows to go below other lis that have images in them:
      <div className="mb-1 clear-left">
        <MultipleBitmapText>{children}</MultipleBitmapText>
      </div>
    );
  },
  strong: function Strong({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <MultipleBitmapText className="text-midRed zx:text-zxRed">
        {children}
      </MultipleBitmapText>
    );
  },
  em: function Em({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <MultipleBitmapText className="text-moss zx:text-zxBlue">
        {children}
      </MultipleBitmapText>
    );
  },
  img: function Img({ src }: JSX.IntrinsicElements["img"]) {
    const scaleFactor = useTotalUpscale();

    if (src === undefined) throw new Error("image without src");

    // the src is actually tailwind classes, usually just giving a single texture, but
    // can also give extra params by writing as a url and using ? an & to encode them
    const classes = src.split(/\?|&/);

    return (
      // make double-size:
      <span style={{ "--scale": scaleFactor * 2 }}>
        <CssSprite
          className={twMerge("float-left mr-1 mb-1", classes.join(" "))}
        />
      </span>
    );
  },
};

export type BlockyMarkdownProps = {
  markdown: string;
  className?: string;
};

export const BlockyMarkdown = ({
  markdown,
  className,
}: BlockyMarkdownProps): ReactElement => {
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
