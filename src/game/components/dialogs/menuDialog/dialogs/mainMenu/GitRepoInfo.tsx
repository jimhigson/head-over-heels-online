import { version } from "../../../../../../../package.json";
import { nerdFontGithubChar } from "../../../../../../sprites/hudSritesheetData";
import { BitmapText } from "../../../../tailwindSprites/Sprite";

const repoLocation = "https://github.com/jimhigson/head-over-heels-online/";

export const GitRepoInfo = () => {
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
      <footer
        className="flex absolute bottom-0 right-0 z-dialog"
        // this needs to be masked out of screenshots, or tests will fail after version updates:
        data-screenshot-mask
      >
        <a
          href={`${repoLocation}releases`}
          target="_blank"
          className="bitmap-text-link bg-pastelBlueHalfbrite text-metallicBlueHalfbrite zx:bg-zxBlack"
        >
          <BitmapText>
            {/* extra space pulls away from rounded corners of phone screens and app windows */}
            {`v${version} `}
          </BitmapText>
        </a>
      </footer>
    </>
  );
};
