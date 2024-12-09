import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { ItemInPlayConfig } from "@/model/ItemInPlay";
import type { GameApi } from "../GameApi";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import type { Components } from "react-markdown";
import Markdown from "react-markdown";
import {
  ImgSprite,
  ImgSpriteText,
  RenderTextChildrenAsSprites,
} from "./Sprite";
import type { EmptyObject } from "type-fest";
import type { InputState } from "../input/InputState";
import { assertIsTextureId } from "../../sprites/assertIsTextureId";
import { spritesheetPalette } from "@/sprites/samplePalette";

const imageScale = 8;
const textScale = 4;

type ScrollConfig = ItemInPlayConfig<"scroll">;

type ScrollContentProps = {
  content: ScrollConfig;
};

const markdownComponents: Components = {
  h2: ({ children }: PropsWithChildren<EmptyObject>) => (
    <h2 className={`text-metallicBlue mb-${textScale}`}>
      <RenderTextChildrenAsSprites
        imgSpriteTextProps={{
          doubleHeight: true,
          color: spritesheetPalette().metallicBlue,
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
          color: spritesheetPalette().metallicBlue,
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
        color: spritesheetPalette().midRed,
      }}
    >
      {children}
    </RenderTextChildrenAsSprites>
  ),
  em: ({ children }: PropsWithChildren<EmptyObject>) => (
    <RenderTextChildrenAsSprites
      imgSpriteTextProps={{
        scale: textScale,
        color: spritesheetPalette().moss,
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

const ScrollContent = ({ content }: ScrollContentProps) => {
  return (
    <>
      <Markdown
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
        {content.text}
      </Markdown>
    </>
  );
};

type ScrollProps = {
  content: ScrollConfig | null;
};

const Scroll = ({ content }: ScrollProps) => {
  const isOpen = content !== null;
  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-highlightBeige" aria-describedby={undefined}>
        {content === null ? null : <ScrollContent content={content} />}
        {isOpen && (
          <p className="text-center">
            <ImgSpriteText
              scale={textScale}
              doubleHeight
              color={spritesheetPalette().redShadow}
            >
              Press jump to continue
            </ImgSpriteText>
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export type ScrollOpenerProps<RoomId extends string> = {
  gameApi: GameApi<RoomId> | undefined;
};

export const ScrollOpener = <RoomId extends string>({
  gameApi,
}: ScrollOpenerProps<RoomId>) => {
  const [scrollContent, setScrollContent] = useState<ScrollConfig | null>(null);

  useEffect(
    function listenForScrollOpen() {
      if (gameApi === undefined) return;

      const handleScrollOpened = (scrollContent: ScrollConfig) => {
        setScrollContent(scrollContent);
      };

      gameApi.events.on("scrollOpened", handleScrollOpened);

      return () => {
        gameApi.events.off("scrollOpened", handleScrollOpened);
      };
    },
    [gameApi],
  );

  useEffect(
    function handleClosingScroll() {
      if (gameApi === undefined || scrollContent === null)
        // nothing to do here
        return;

      const handleInput = (inputState: InputState) => {
        if (scrollContent === null)
          // not open - do nothing
          return;
        if (inputState.jump)
          // close the scroll
          setScrollContent(null);

        inputState.jump = false; // handled this input
      };

      gameApi.events.on("inputStateChanged", handleInput);

      return () => {
        gameApi.events.off("inputStateChanged", handleInput);
      };
    },
    [gameApi, scrollContent],
  );

  return <Scroll content={scrollContent} />;
};
