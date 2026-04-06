import { repository } from "../../../package.json";
import { Border } from "../../ui/Border";
import { Dialog } from "../../ui/dialog";
import { DialogPortal } from "../../ui/DialogPortal";
import { directionsXy8 } from "../../utils/vectors/vectors";
import { BlockyMarkdown } from "./BlockyMarkdown";
import { usePlayableTailwindSpriteClassname } from "./tailwindSprites/PlayableTailwindSprite";

const editorUrl = import.meta.env.VITE_EDITOR_URL;

export const WantedEditor404 = () => {
  const spriteClassname = usePlayableTailwindSpriteClassname();
  return (
    <DialogPortal>
      <Border className="loading-border" />
      <Dialog className="bg-white zx:bg-zxRed gap-y-0 text-redShadow zx:text-zxBlack px-1 flex-row">
        <div className="flex flex-col">
          {directionsXy8.map((d) => (
            <span
              key={d}
              className={`sprite ${spriteClassname({ action: "idle", character: "head", facingXy8: d })}`}
            />
          ))}
        </div>
        <div className="flex flex-col grow text-center justify-center">
          <BlockyMarkdown>{`## This is not the editor

If you’re seeing this, you got routed wrong somehow

Maybe the web manifest is getting in the way and redirected to the game’s client-side routing.

Maybe [open an issue on github](${repository.url}/issues)

The link I have is: [${editorUrl}](${editorUrl})
`}</BlockyMarkdown>
        </div>
        <div className="flex flex-col">
          {directionsXy8.toReversed().map((d) => (
            <span
              key={d}
              className={`sprite ${spriteClassname({ action: "idle", character: "heels", facingXy8: d })}`}
            />
          ))}
        </div>
      </Dialog>
    </DialogPortal>
  );
};
