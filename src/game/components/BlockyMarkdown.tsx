import type { JSX, ReactElement } from "react";
import { type PropsWithChildren } from "react";
import { BitmapText, MultipleBitmapText } from "./tailwindSprites/Sprite";
import type { EmptyObject } from "type-fest";
import { useTotalUpscale } from "../../store/selectors";
import { twMerge } from "tailwind-merge";
import type { CustomComponentsOption } from "snarkdown-in-react";
import { SnarkdownInReact } from "snarkdown-in-react";
import { multilineTextClass } from "./dialogs/menuDialog/multilineTextClass";

const markdownComponents: CustomComponentsOption = {
  h2: function H2({ children }: PropsWithChildren<EmptyObject>) {
    return (
      // <div className="flex flex-row items-start justify-start gap-1">
      <h2
        // multiline: "history of the blacktooth empire" is a title that needs two lines
        className={`mb-1 sprites-double-height text-metallicBlue zx:text-zxBlue clear-both ${multilineTextClass}`}
      >
        <MultipleBitmapText>{children}</MultipleBitmapText>
      </h2>
      // </div>
    );
  },
  h3: function H3({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <h3 className="mt-1 mb-1 text-metallicBlue zx:text-zxBlue clear-both">
        <MultipleBitmapText>{children}</MultipleBitmapText>
      </h3>
    );
  },
  blockquote: function Blockquote({
    children,
  }: PropsWithChildren<EmptyObject>) {
    return (
      <blockquote
        className={`${multilineTextClass} mt-1 mb-1 text-moss zx:text-zxBlue clear-both`}
      >
        <MultipleBitmapText>&gt; {children}</MultipleBitmapText>
      </blockquote>
    );
  },
  p: function P({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <div className={`mb-1 last:mb-0 ${multilineTextClass}`}>
        <MultipleBitmapText>{children}</MultipleBitmapText>
      </div>
    );
  },
  a: function A({ children, href }: PropsWithChildren<{ href: string }>) {
    return (
      <a
        className="text-white zx:text-zxWhite bg-metallicBlue hover:bg-white hover:text-metallicBlue zx:bg-zxBlue zx:hover:bg-zxWhite zx:hover:text-zxBlue inline-block pl-oneScaledPix pt-oneScaledPix"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MultipleBitmapText>{children}</MultipleBitmapText>
      </a>
    );
  },
  li: function Li({ children }: PropsWithChildren<EmptyObject>) {
    return (
      // clear left allows to go below other lis that have images in them:
      <div className={`mb-1 clear-both ${multilineTextClass}`}>
        <MultipleBitmapText>
          <BitmapText className="text-metallicBlue zx:text-zxYellow">
            •
          </BitmapText>
          {children}
        </MultipleBitmapText>
      </div>
    );
  },
  strong: function Strong({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <MultipleBitmapText className="strong text-midRed zx:text-zxRed">
        {children}
      </MultipleBitmapText>
    );
  },
  em: function Em({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <MultipleBitmapText className="em text-moss zx:text-zxBlue">
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
        <span
          className={twMerge(
            "sprite float-left mr-1 mb-1 zx:sprite-revert-to-two-tone",
            classes.join(" "),
          )}
        />
      </span>
    );
  },
  hr: function Hr() {
    return (
      <hr className="bg-metallicBlue zx:bg-zxWhite h-half mb-half border-none" />
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
    <div className={`contents ${className}`}>
      <SnarkdownInReact
        customComponents={markdownComponents}
        markdown={markdown}
      />
    </div>
  );
};
