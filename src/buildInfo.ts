import { repository, version } from "../package.json";

const parseMajorVersionRegex = /v?(?<major>\d+)\./;

/** the major part of a version or release tag, eg 27 from "27.0.0" or "v27.1.0" */
export const parseMajorVersion = (
  /** a semver version, optionally prefixed with "v" */
  versionOrTag: string,
): number | undefined => {
  const major = versionOrTag.match(parseMajorVersionRegex)?.groups?.major;
  return major === undefined ? undefined : parseInt(major);
};

const prNumber = import.meta.env.VITE_GIT_PR_NUMBER;

/** what this build of the game is, fixed when it was built */
export const buildInfo = {
  /** the version from package.json, eg "27.0.0" */
  version,
  majorVersion: parseMajorVersion(version)!,
  repositoryUrl: repository.url,
  releasesUrl: `${repository.url}/releases`,
  /** the git branch built from, when the build knows it */
  gitBranch: import.meta.env.VITE_GIT_BRANCH,
  /** the pr this is a preview build of, if any */
  prNumber,
  prUrl:
    prNumber === undefined ? undefined : `${repository.url}/pull/${prNumber}`,
  isDevBuild: import.meta.env.DEV,
};
