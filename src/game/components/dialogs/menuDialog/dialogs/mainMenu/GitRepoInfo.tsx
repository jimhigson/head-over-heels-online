import { useEffect } from "react";

import {
  version as deployedVersion,
  repository,
} from "../../../../../../../package.json";
import { nerdFontGithubChar } from "../../../../../../sprites/spritesheet/spritesheetData/hudSritesheetData";
import { useGetLatestReleaseQuery } from "../../../../../../store/slices/githubApiSlice";
import { linkOpenExternalClickHandler } from "../../../../../../utils/tauri/openExternalLink";
import { BitmapText } from "../../../../tailwindSprites/BitmapText";

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
    <div className="flex absolute z-dialog w-full justify-between">
      <span>
        <a
          href={`${repository.url}/releases`}
          target="_blank"
          onClick={linkOpenExternalClickHandler}
          className="bitmap-text-link bg-pastelBlueHalfbrite text-metallicBlueHalfbrite zx:bg-zxBlack toppy:bg-toppyCool3"
        >
          <BitmapText> v</BitmapText>
          <BitmapText className="screenshot-mask mr-1 inline-block">
            {/* extra space pulls away from rounded corners of phone screens and app windows */}
            {deployedMajor}
          </BitmapText>
          {isOutdated && (
            <BitmapText className="animate-flash text-midRed zx:text-zxRed toppy:text-toppyPink2">
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
        className="bitmap-text-link zx:bg-zxBlack toppy:bg-toppyCool3 bg-metallicBlue pl-1"
      >
        <BitmapText className="text-highlightBeige zx:text-zxYellow toppy:text-toppyWarm1">
          ★
        </BitmapText>
        <span className="text-lightGrey zx:text-whiteHalfbrite toppy:text-toppyGrey1 mr-1">
          <BitmapText className="resHandheld:hidden"> on</BitmapText>
          <BitmapText>{nerdFontGithubChar}</BitmapText>
          <BitmapText className="resHandheld:hidden">Github</BitmapText>
        </span>
      </a>
    </div>
  );
};
