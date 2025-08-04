import { Border } from "../../ui/Border";
import { Dialog } from "../../ui/dialog";
import { DialogPortal } from "../../ui/DialogPortal";
import { directionsXy8 } from "../../utils/vectors/vectors";
import { multilineTextClass } from "./dialogs/menuDialog/multilineTextClass";
import { playableTailwindSpriteClassname } from "./tailwindSprites/PlayableTailwindSprite";
import { BitmapText, MultipleBitmapText } from "./tailwindSprites/Sprite";

export const WantedEditor404 = () => {
  return (
    <DialogPortal>
      <Border className="loading-border" />
      <Dialog className="bg-white zx:bg-zxRed gap-y-0 text-redShadow zx:text-zxBlack px-1 flex-row">
        <div className="flex flex-col">
          {directionsXy8.map((d) => (
            <span
              key={d}
              className={`sprite ${playableTailwindSpriteClassname({ action: "idle", character: "head", facingXy8: d })}`}
            />
          ))}
        </div>
        <div className="flex flex-col grow text-center justify-center">
          <BitmapText className="sprites-double-height mb-1">
            This is not the editor
          </BitmapText>
          <MultipleBitmapText
            className={`${multilineTextClass} p-1 pt-2 text-metallicBlue`}
          >
            <p>
              If you’re seeing this, you’re trying to access the level editor,
              but the web manifest is getting in the way and redirected you to
              the game’s client-side routing.
            </p>
            <p className="pt-1">
              You could try going to:{" "}
              <a href="/editor/" className="bitmap-text-link">
                /editor/
              </a>{" "}
              (with a slash on the end)
            </p>
          </MultipleBitmapText>
        </div>
        <div className="flex flex-col">
          {directionsXy8.toReversed().map((d) => (
            <span
              key={d}
              className={`sprite ${playableTailwindSpriteClassname({ action: "idle", character: "heels", facingXy8: d })}`}
            />
          ))}
        </div>
      </Dialog>
    </DialogPortal>
  );
};
