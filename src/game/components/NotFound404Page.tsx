import { Border } from "../../ui/Border";
import { Dialog } from "../../ui/dialog";
import { DialogPortal } from "../../ui/DialogPortal";
import { directionsXy8 } from "../../utils/vectors/vectors";
import { multilineTextClass } from "./dialogs/menuDialog/multilineTextClass";
import { playableTailwindSpriteClassname } from "./tailwindSprites/PlayableTailwindSprite";
import { BitmapText } from "./tailwindSprites/Sprite";

export const NotFound404Page = () => {
  return (
    <DialogPortal>
      <Border className="loading-border" />
      <Dialog className="bg-white zx:bg-zxRed gap-y-0 text-redShadow zx:text-zxBlack px-1 flex-row">
        <div className="flex flex-col">
          {directionsXy8.map((d) => (
            <span
              key={d}
              className={`sprite zx:sprite-revert-to-white ${playableTailwindSpriteClassname({ action: "walking", character: "head", facingXy8: d })}`}
            />
          ))}
        </div>
        <div className="flex flex-col grow text-center justify-center">
          <BitmapText className="sprites-double-height">
            404 Not found
          </BitmapText>
          <BitmapText
            className={`${multilineTextClass} p-1 pt-2 text-metallicBlue zx:text-zxYellow`}
          >
            whatever you’re looking for, it ain’t here
          </BitmapText>
        </div>
        <div className="flex flex-col">
          {directionsXy8.toReversed().map((d) => (
            <span
              key={d}
              className={`sprite zx:sprite-revert-to-white ${playableTailwindSpriteClassname({ action: "walking", character: "heels", facingXy8: d })}`}
            />
          ))}
        </div>
      </Dialog>
    </DialogPortal>
  );
};
