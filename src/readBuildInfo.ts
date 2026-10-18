import { execSync } from "node:child_process";
import { env } from "node:process";

import { repository, version } from "../package.json";
import { parseMajorVersion } from "./parseMajorVersion";

const readGitBranch = (): string | undefined => {
  // deploy previews build from a detached HEAD so asking git for the branch
  // doesn't work there; the workflow passes the pr's source branch instead
  // https://docs.github.com/en/actions/reference/workflows-and-actions/variables
  const previewBranch = env.PREVIEW_BRANCH;
  if (previewBranch) {
    return previewBranch;
  }
  try {
    return execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
  } catch {
    return undefined;
  }
};

const readGitPrNumber = (): string | undefined =>
  // the deploy preview workflow passes the pr it is building
  env.PREVIEW_PR_NUMBER || undefined;

/**
 * what is being built, read at build time - for use as a macro, never at
 * runtime
 */
export const readBuildInfo = () => {
  const majorVersion = parseMajorVersion(version);
  if (majorVersion === undefined) {
    throw new Error(`package.json version "${version}" has no major version`);
  }
  const prNumber = readGitPrNumber();
  return {
    /** the version from package.json, eg "27.0.0" */
    version,
    majorVersion,
    repositoryUrl: repository.url,
    releasesUrl: `${repository.url}/releases`,
    /** the git branch built from, when the build knows it */
    gitBranch: readGitBranch(),
    /** the pr this is a preview build of, if any */
    prNumber,
    prUrl:
      prNumber === undefined ? undefined : `${repository.url}/pull/${prNumber}`,
  };
};
