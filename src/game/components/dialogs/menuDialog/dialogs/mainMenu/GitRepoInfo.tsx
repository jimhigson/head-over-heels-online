import { useEffect } from "preact/hooks";

import { buildInfo, parseMajorVersion } from "../../../../../../buildInfo";
import { nerdFontGithubChar } from "../../../../../../sprites/spritesheet/spritesheetData/hudChars";
import { useAppSelector } from "../../../../../../store/hooks";
import { selectShouldRenderOnScreenControls } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { useGetLatestReleaseQuery } from "../../../../../../store/slices/githubApiSlice";
import { cn } from "../../../../../../ui/cn";
import { linkOpenExternalClickHandler } from "../../../../../../utils/tauri/openExternalLink";
import { usePointerActive } from "../../../../../input/usePointerActive";

const { version: deployedVersion, majorVersion: deployedMajor } = buildInfo;

export const GitRepoInfo = () => {
  const { data: latestRelease } = useGetLatestReleaseQuery();

  const pointerActive = usePointerActive();
  // with touch controls there is no mouse to summon it back, so it always shows
  const onScreenControls = useAppSelector(selectShouldRenderOnScreenControls);
  const shown = onScreenControls || pointerActive;

  const { prNumber, prUrl, gitBranch, releasesUrl, repositoryUrl, isDevBuild } =
    buildInfo;

  const latestTag = latestRelease?.tag_name;
  const latestMajor =
    latestTag === undefined ? undefined : parseMajorVersion(latestTag);
  const isOutdated =
    latestMajor === undefined ? undefined : latestMajor > deployedMajor;

  useEffect(() => {
    if (isOutdated) {
      console.warn(
        `current game version at ${deployedMajor} (from "${deployedVersion}") but latest is ${latestMajor} (from "${latestTag}")`,
      );
    }
  }, [isOutdated, latestMajor, latestTag]);

  return (
    <div
      class={cn(
        "flex absolute top-0 z-dialog w-full justify-between",
        !shown && "hidden",
      )}
    >
      <span>
        <a
          href={releasesUrl}
          target="_blank"
          onClick={linkOpenExternalClickHandler}
          class="bitmap-text-link bg-pastelBlueHalfbrite text-metallicBlueHalfbrite zx:bg-zxBlack toppy:bg-toppyCool3"
        >
          <span class="text-single-line"> v</span>
          <span class="text-single-line screenshot-mask mr-1 inline-block">
            {/* extra space pulls away from rounded corners of phone screens and app windows */}
            {deployedMajor}
          </span>
          {isOutdated && (
            <span class="text-single-line animate-flash text-midRed zx:text-zxRed toppy:text-toppyPink2">
              {/* extra space pulls away from rounded corners of phone screens and app windows */}
              {"⬆ "}
            </span>
          )}
        </a>
        {(isDevBuild || prNumber !== undefined) && (
          <span class="text-single-line ml-1 screenshot-mask mr-1 inline-block max-w-14 whitespace-nowrap text-pastelBlueHalfbrite zx:text-zxBlack">
            {" "}
            {prNumber !== undefined && (
              <a
                href={prUrl}
                target="_blank"
                onClick={linkOpenExternalClickHandler}
                class="bitmap-text-link"
              >
                {`#${prNumber} `}
              </a>
            )}
            {gitBranch}
          </span>
        )}
      </span>
      <a
        href={repositoryUrl}
        onClick={linkOpenExternalClickHandler}
        target="_blank"
        class="bitmap-text-link zx:bg-zxBlack toppy:bg-toppyCool3 bg-metallicBlue pl-1"
      >
        <span class="text-single-line text-highlightBeige zx:text-zxYellow toppy:text-toppyWarm1">
          ★
        </span>
        <span class="text-lightGrey zx:text-whiteHalfbrite toppy:text-toppyGrey1 mr-1">
          <span class="text-single-line resHandheld:hidden"> on</span>
          <span class="text-single-line">{nerdFontGithubChar}</span>
          <span class="text-single-line resHandheld:hidden">GitHub</span>
        </span>
      </a>
    </div>
  );
};
