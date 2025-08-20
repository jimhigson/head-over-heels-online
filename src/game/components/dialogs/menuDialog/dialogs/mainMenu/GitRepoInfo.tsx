import { useReducer } from "react";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { nerdFontGithubChar } from "../../../../../../sprites/hudSritesheetData";

const repoLocation = "https://github.com/jimhigson/head-over-heels-online/";

export const GitRepoInfo = () => {
  const [open, toggleOpen] = useReducer((o: boolean) => !o, false);

  return (
    <div className="flex  justify-between absolute bottom-oneScaledPix right-2 left-2 z-dialog">
      <div onClick={toggleOpen} className="text-metallicBlue zx:text-zxMagenta">
        {!open && <BitmapText>v</BitmapText>}
        {open && (
          <BitmapText className="bg-metallicBlueHalfbrite block">
            {__gitHash__ || ""}
            {__buildDate__ || ""}
          </BitmapText>
        )}
      </div>
      <a
        href={repoLocation}
        className="bitmap-text-link bg-transparent zx:bg-zxBlack"
      >
        <BitmapText className="text-highlightBeige zx:text-zxYellow">
          ★
        </BitmapText>
        <span className="text-lightGrey zx:text-whiteHalfbrite">
          <BitmapText className="resHandheld:hidden"> on</BitmapText>
          <BitmapText>{nerdFontGithubChar}</BitmapText>
          <BitmapText className="resHandheld:hidden">github</BitmapText>
        </span>
      </a>
    </div>
  );
};
