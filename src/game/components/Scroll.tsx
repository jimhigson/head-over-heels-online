import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { ItemInPlayConfig } from "@/model/ItemInPlay";
import type { GameApi } from "../GameApi";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import type { Components } from "react-markdown";
import Markdown from "react-markdown";
import { Sprite } from "./Sprite";
import type { EmptyObject } from "type-fest";
import { spriteSheet, type TextureId } from "@/sprites/spriteSheet";
import type { InputState } from "../input/InputState";

type ScrollContent = ItemInPlayConfig<"scroll">;

type ScrollContentProps = {
  content: ScrollContent;
};

function assertIsTextureId(textureId: string): asserts textureId is TextureId {
  if (spriteSheet.textures[textureId as TextureId] === undefined) {
    throw new Error(`Invalid textureId: "${textureId}"`);
  }
}

const markdownComponents: Components = {
  h2: ({ children }: PropsWithChildren<EmptyObject>) => (
    <h2 className="scale-y-double text-l mb-6">{children}</h2>
  ),
  h3: ({ children }: PropsWithChildren<EmptyObject>) => (
    <h3 className="text-l mb-6">{children}</h3>
  ),
  p: ({ children }: PropsWithChildren<EmptyObject>) => (
    <p className="text-base mb-6">{children}</p>
  ),
  img({ src }: JSX.IntrinsicElements["img"]) {
    if (src === undefined) return null;

    assertIsTextureId(src);

    return (
      <Sprite
        spriteOptions={src}
        className="float-left mr-8 my-8 w-1/5 aspect-square mb-2"
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
  content: ScrollContent | null;
};

const Scroll = ({ content }: ScrollProps) => {
  return (
    <Dialog open={content !== null}>
      <DialogContent className="font-hoh">
        {content === null ? null : <ScrollContent content={content} />}
        <p className="text-center text-base">Press jump to continue</p>
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
  const [scrollContent, setScrollContent] = useState<ScrollContent | null>(
    null,
  );

  useEffect(
    function listenForScrollOpen() {
      if (gameApi === undefined) return;

      const handleScrollOpened = (scrollContent: ScrollContent) => {
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
