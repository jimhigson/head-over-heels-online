import { type VNode } from "preact";
import { type PropsWithChildren } from "preact/compat";
import {
  type CustomComponentsOption,
  SnarkdownInReact,
} from "snarkdown-in-react";
import { twMerge } from "tailwind-merge";
import { type EmptyObject } from "type-fest";

import { linkOpenExternalClickHandler } from "../../utils/tauri/openExternalLink";

const markdownComponents: CustomComponentsOption = {
  h2: function H2({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <h2 class="mb-1 text-metallicBlue zx:text-zxBlue toppy:text-toppyCool3 clear-both text-double-height">
        {children}
      </h2>
    );
  },
  h3: function H3({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <h3 class="mt-1 mb-1 text-metallicBlue zx:text-zxBlue toppy:text-toppyCool3 clear-both text-multi-line">
        {children}
      </h3>
    );
  },
  blockquote: function Blockquote({
    children,
  }: PropsWithChildren<EmptyObject>) {
    return (
      <blockquote class="mt-1 mb-1 text-moss zx:text-zxBlue toppy:text-toppyCool2 clear-both text-multi-line">
        &gt; {children}
      </blockquote>
    );
  },
  p: function P({ children }: PropsWithChildren<EmptyObject>) {
    return <div class={`mb-1 last:mb-0 text-multi-line`}>{children}</div>;
  },
  a: function A({ children, href }: PropsWithChildren<{ href: string }>) {
    return (
      <a
        class="bitmap-text-link"
        href={href}
        onClick={linkOpenExternalClickHandler}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  },
  li: function Li({ children }: PropsWithChildren<EmptyObject>) {
    return (
      // clear left allows to go below other lis that have images in them:
      <div class={`mb-1 clear-both text-multi-line`}>
        <span class="text-metallicBlue zx:text-zxYellow toppy:text-toppyWarm3 text-multi-line">
          •
        </span>
        {children}
      </div>
    );
  },
  strong: function Strong({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <strong class="strong text-midRed zx:text-zxRed toppy:text-toppyPink2">
        {children}
      </strong>
    );
  },
  em: function Em({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <em class="em text-moss zx:text-zxBlue toppy:text-toppyCool2">
        {children}
      </em>
    );
  },
  img: function Img({ src }: { src: string; alt: string }) {
    // the src is actually tailwind classes, usually just giving a single texture, but
    // can also give extra params by writing as a url and using ? an & to encode them
    const classes = src.split(/\?|&/);

    return (
      <span
        class={twMerge(
          "sprite float-left mr-1 mb-1 zx:sprite-revert-to-two-tone",
          classes.join(" "),
        )}
      />
    );
  },
  hr: function Hr() {
    return (
      <hr class="bg-metallicBlue zx:bg-zxWhite toppy:bg-toppyCool3 h-half mb-half border-none" />
    );
  },
  pre: function Pre({ children }: PropsWithChildren<EmptyObject>) {
    return (
      <div class="bg-shadow zx:bg-zxBlack toppy:bg-toppyGrey3 p-1 my-1 mr-1">
        <div
          class={`text-white zx:text-zxWhite toppy:text-toppyWarm1 px-1 w-max min-w-full text-multi-line`}
        >
          {children}
        </div>
      </div>
    );
  },
};

export function BlockyMarkdown(props: {
  class?: string;
  children: string;
}): VNode;
export function BlockyMarkdown(props: {
  class?: string;
  markdown: string;
}): VNode;
export function BlockyMarkdown(props: {
  class?: string;
  children?: string;
  markdown?: string;
}): VNode {
  const md = (props.markdown ?? props.children)!;

  return (
    <div class={twMerge("contents", props.class)}>
      <SnarkdownInReact customComponents={markdownComponents} markdown={md} />
    </div>
  );
}
