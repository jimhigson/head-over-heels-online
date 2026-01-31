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
    <div className="flex absolute z-dialog w-full justify-between">
      <span>
        <a
          href={`${repository.url}/releases`}
          target="_blank"
          onClick={linkOpenExternalClickHandler}
          className={`bitmap-text-link bg-pastelBlueHalfbrite text-metallicBlueHalfbrite zx:bg-zxBlack`}
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
      </span>
      <a
        href={repository.url}
        onClick={linkOpenExternalClickHandler}
        target="_blank"
        className="bitmap-text-link zx:bg-zxBlack bg-metallicBlue"
      >
        <BitmapText className="text-highlightBeige zx:text-zxYellow">
          ★
        </BitmapText>
        <span className="text-lightGrey zx:text-whiteHalfbrite mr-1">
          <BitmapText className="resHandheld:hidden"> on</BitmapText>
          <BitmapText>{nerdFontGithubChar}</BitmapText>
          <BitmapText className="resHandheld:hidden">Github</BitmapText>
        </span>
      </a>
    </div>
  );
};
