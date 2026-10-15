import { useEffect } from "preact/hooks";

import { buildInfo } from "./buildInfo";
import { parseMajorVersion } from "./parseMajorVersion";
import { useGetLatestReleaseQuery } from "./store/slices/githubApiSlice";

const { version: deployedVersion, majorVersion: deployedMajor } = buildInfo;

/**
 * what this build is and where it came from, and whether a newer major
 * release is out (`undefined` until the latest release is known)
 */
export const useGitRepoInfo = () => {
  const { data: latestRelease } = useGetLatestReleaseQuery();

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

  return { ...buildInfo, isOutdated };
};
