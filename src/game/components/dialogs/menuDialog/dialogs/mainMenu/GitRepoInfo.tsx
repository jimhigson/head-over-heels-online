import { repository, version } from "../../../../../../../package.json";
import { nerdFontGithubChar } from "../../../../../../sprites/spritesheet/spritesheetData/hudSritesheetData";
import { useGetLatestReleaseQuery } from "../../../../../../store/slices/githubApiSlice";
import { linkOpenExternalClickHandler } from "../../../../../../utils/tauri/openExternalLink";
import { BitmapText } from "../../../../tailwindSprites/Sprite";

export const GitRepoInfo = () => {
  const { data: latestRelease } = useGetLatestReleaseQuery();

  const latestTag = latestRelease?.tag_name;
  const isLatest =
    latestTag === undefined ? undefined : latestTag === `v${version}`;

  return (
    <>
      <div className="flex absolute top-oneScaledPix right-1 z-dialog">
        <a
          href={repository.url}
          onClick={linkOpenExternalClickHandler}
          target="_blank"
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
          href={`${repository.url}/releases`}
          onClick={linkOpenExternalClickHandler}
          target="_blank"
          className="bitmap-text-link bg-pastelBlueHalfbrite text-metallicBlueHalfbrite zx:bg-zxBlack"
          data-screenshot-mask
        >
          <BitmapText>
            {/* extra space pulls away from rounded corners of phone screens and app windows */}
            {` ${version} `}
          </BitmapText>
          {isLatest === false && (
            <BitmapText className="animate-flash text-midRed zx:text-zxRed">
              {/* extra space pulls away from rounded corners of phone screens and app windows */}
              {"⬆ "}
            </BitmapText>
          )}
        </a>
      </footer>
    </>
  );
};
