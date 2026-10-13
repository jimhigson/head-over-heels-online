import { useGitRepoInfo } from "../../useGitRepoInfo";

// subdued, as it is only for information:
const pieceClassName =
  "text-single-line px-1 py-half whitespace-nowrap text-midGrey hover:text-lightGrey";

/** which build of the editor this is, for the menu bar */
export const EditorBuildInfo = () => {
  const {
    majorVersion,
    isOutdated,
    prNumber,
    prUrl,
    gitBranch,
    releasesUrl,
    isDevBuild,
  } = useGitRepoInfo();

  return (
    <>
      <a href={releasesUrl} target="_blank" class={pieceClassName}>
        {`build v${majorVersion}`}
        {isOutdated && <span class="animate-flash text-midRed"> ⬆</span>}
      </a>
      {prNumber !== undefined && (
        <a href={prUrl} target="_blank" class={pieceClassName}>
          {`#${prNumber}`}
        </a>
      )}
      {(isDevBuild || prNumber !== undefined) && gitBranch && (
        <span class={pieceClassName}>{gitBranch}</span>
      )}
    </>
  );
};
