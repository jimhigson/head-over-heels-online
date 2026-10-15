import { execSync } from "node:child_process";
import { env } from "node:process";

import { repository, version } from "../package.json";
import { parseMajorVersion } from "./parseMajorVersion";

const readGitBranch = (): string | undefined => {
  // netlify builds from a detached HEAD so asking git for the branch doesn't
  // work there; it provides the branch name in the build env instead. HEAD is
  // the pr's source branch name, whereas BRANCH can be a fetched ref like
  // pull/123/head:
  // https://docs.netlify.com/configure-builds/environment-variables/#git-metadata
  const netlifyBranch = env.HEAD || env.BRANCH;
  if (netlifyBranch) {
    return netlifyBranch;
  }
  try {
    return execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
  } catch {
    return undefined;
  }
};

const readGitPrNumber = (): string | undefined =>
  // netlify deploy previews give the pr number as REVIEW_ID:
  // https://docs.netlify.com/configure-builds/environment-variables/#git-metadata
  env.REVIEW_ID || undefined;

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
