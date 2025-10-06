import { useReducer } from "react";

import { version } from "../../../../../../../package.json";
import { nerdFontGithubChar } from "../../../../../../sprites/hudSritesheetData";
import { BitmapText } from "../../../../tailwindSprites/Sprite";

const repoLocation = "https://github.com/jimhigson/head-over-heels-online/";

export const GitRepoInfo = () => {
  const [open, toggleOpen] = useReducer((o: boolean) => !o, false);

  return (
    <>
      <div className="flex absolute top-oneScaledPix right-1 z-dialog">
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
            <BitmapText className="resHandheld:hidden">Github</BitmapText>
          </span>
        </a>
      </div>
      <div className="flex absolute bottom-oneScaledPix right-oneScaledPix z-dialog">
        <div
          onClick={toggleOpen}
          className="text-pastelBlueHalfbrite zx:text-zxMagenta"
        >
          {!open && <BitmapText>{version}</BitmapText>}
          {open && (
            <BitmapText className="bg-metallicBlueHalfbrite block">
              {__gitHash__ || ""}
              {__buildDate__ || ""}
            </BitmapText>
          )}
        </div>
      </div>
    </>
  );
};
