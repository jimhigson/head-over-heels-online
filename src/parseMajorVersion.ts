const parseMajorVersionRegex = /v?(?<major>\d+)\./;

/** the major part of a version or release tag, eg 27 from "27.0.0" or "v27.1.0" */
export const parseMajorVersion = (
  /** a semver version, optionally prefixed with "v" */
  versionOrTag: string,
): number | undefined => {
  const major = versionOrTag.match(parseMajorVersionRegex)?.groups?.major;
  return major === undefined ? undefined : parseInt(major);
};
