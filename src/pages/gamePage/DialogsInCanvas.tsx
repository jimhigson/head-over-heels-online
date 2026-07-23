import { createPortal, type PropsWithChildren } from "preact/compat";
import { useEffect, useState } from "preact/hooks";

import { CssUpscaleVariables } from "../../game/components/CssUpscaleVariables";
import { type GameApi } from "../../game/GameApi";
import { useAppSelector } from "../../store/hooks";
import { selectUpscale } from "../../store/slices/upscale/upscaleSlice";
import { DialogPortalTargetContext } from "../../ui/DialogPortal";

export type DialogsInCanvasProps = PropsWithChildren<{
  gameApi: GameApi<string>;
}>;

/**
 * Renders its children (the dialogs) as a direct child of the game's canvas
 * and mirrors them into the pixi stage via the experimental html-in-canvas
 * api, so the top-level (crt) filters apply to the dialogs exactly as they do
 * to the game itself. The dom subtree stays live and interactive; only its
 * pixels are drawn by the game.
 *
 * The subtree is laid out inside the canvas' box (the canvas device-pixel
 * size, before the css upscale), so `--scale` here is only the
 * gameEngineUpscale - the css upscale is applied to the whole canvas,
 * mirrored dialogs included, exactly like the game's own pixels.
 *
 * Dialogs that use DialogPortal are steered into this subtree (instead of
 * document.body) via {@link DialogPortalTargetContext}, or they would escape
 * the mirror.
 */
export const DialogsInCanvas = ({
  gameApi,
  children,
}: DialogsInCanvasProps) => {
  const [mirrorElement, setMirrorElement] = useState<HTMLDivElement | null>(
    null,
  );
  const { gameEngineUpscale, canvasSize, rotate90 } =
    useAppSelector(selectUpscale);

  useEffect(() => {
    if (mirrorElement === null) {
      return;
    }
    return gameApi.mirrorHtmlElement(mirrorElement);
    // gameEngineUpscale/canvasSize: the mirror sprite's counter-scale and the
    // source texture's size are fixed at attach time, so re-attach on change
  }, [gameApi, mirrorElement, gameEngineUpscale, canvasSize]);

  return createPortal(
    <div
      ref={setMirrorElement}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: canvasSize.x,
        height: canvasSize.y,
        overflow: "hidden",
        // always a transform (even identity) so this is the containing block
        // for the dialogs' position:fixed, keeping them inside the mirrored
        // subtree and centring them on the canvas
        transform:
          rotate90 ?
            `rotate(90deg) translate(0, -${canvasSize.y}px)`
          : "translate(0, 0)",
        transformOrigin: "top left",
      }}
    >
      <CssUpscaleVariables scaleFactor={gameEngineUpscale}>
        {mirrorElement !== null && (
          <DialogPortalTargetContext.Provider
            value={{
              container: mirrorElement,
              scaleFactor: gameEngineUpscale,
            }}
          >
            {children}
          </DialogPortalTargetContext.Provider>
        )}
      </CssUpscaleVariables>
    </div>,
    gameApi.canvas,
  );
};
