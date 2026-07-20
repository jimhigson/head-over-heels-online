import { useEffect } from "preact/hooks";

import {
  version as deployedVersion,
  repository,
} from "../../../../../../../package.json";
import { nerdFontGithubChar } from "../../../../../../sprites/spritesheet/spritesheetData/hudChars";
import { useGetLatestReleaseQuery } from "../../../../../../store/slices/githubApiSlice";
import { linkOpenExternalClickHandler } from "../../../../../../utils/tauri/openExternalLink";

const parseMajorRegex = /v?(?<major>\d+)\./;
const parseMajor = (version: string): number | undefined => {
  const str = version.match(parseMajorRegex)?.groups?.major;
  return str ? parseInt(str) : undefined;
};
const deployedMajor = parseMajor(deployedVersion)!;

export const GitRepoInfo = () => {
  const { data: latestRelease } = useGetLatestReleaseQuery();

  const latestTag = latestRelease?.tag_name;
  const latestMajor =
    latestTag === undefined ? undefined : parseMajor(latestTag);
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
    <div class="flex absolute top-0 z-dialog w-full justify-between">
      <span>
        <a
          href={`${repository.url}/releases`}
          target="_blank"
          onClick={linkOpenExternalClickHandler}
          class="bitmap-text-link bg-pastelBlueHalfbrite text-metallicBlueHalfbrite zx:bg-zxBlack toppy:bg-toppyCool3"
        >
          <span class="text-single-line"> v</span>
          <span class="text-single-line screenshot-mask mr-1 inline-block">
            {/* extra space pulls away from rounded corners of phone screens and app windows */}
            {deployedMajor}
          </span>
          {import.meta.env.DEV && (
            <span class="text-single-line screenshot-mask mr-1 inline-block">
              {` + ${import.meta.env.VITE_GIT_BRANCH}`}
            </span>
          )}
          {isOutdated && (
            <span class="text-single-line animate-flash text-midRed zx:text-zxRed toppy:text-toppyPink2">
              {/* extra space pulls away from rounded corners of phone screens and app windows */}
              {"⬆ "}
            </span>
          )}
        </a>
      </span>
      <a
        href={repository.url}
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
