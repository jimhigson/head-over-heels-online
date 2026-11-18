import { type ComponentChildren } from "preact";

import { Border } from "../../../ui/Border";
import { Button } from "../../../ui/Button";
import { Dialog } from "../../../ui/Dialog";
import { DialogHeader } from "../../../ui/DialogHeader";
import { DialogPortal } from "../../../ui/DialogPortal";
import { useGitRepoInfo } from "../../../useGitRepoInfo";

const linkClassName = "text-midRed hover:text-shadow underline";

type AboutRowProps = {
  label: string;
  children: ComponentChildren;
};

const AboutRow = ({ label, children }: AboutRowProps) => (
  <>
    <span class="text-midGrey">{label}</span>
    <span class="text-shadow">{children}</span>
  </>
);

export type AboutDialogProps = {
  onClose: () => void;
};

/**
 * which build of the editor this is, and where its source lives
 */
export const AboutDialog = ({ onClose }: AboutDialogProps) => {
  const {
    version,
    majorVersion,
    isOutdated,
    prNumber,
    prUrl,
    gitBranch,
    repositoryUrl,
    releasesUrl,
    isDevBuild,
  } = useGitRepoInfo();

  return (
    <DialogPortal>
      <Border class="scale-editor" scrim />
      <div class="contents no-keyboard-shortcuts">
        <Dialog small ariaLabel="About" class="scale-editor p-1 !h-min">
          <DialogHeader>About</DialogHeader>
          <div class="grid grid-cols-[auto_1fr] gap-x-1 gap-y-half text-single-line pt-1">
            <AboutRow label="Build">
              <a href={releasesUrl} target="_blank" class={linkClassName}>
                {`v${majorVersion}`}
              </a>
              {` (${version}${isDevBuild ? ", dev" : ""})`}
              {isOutdated && (
                <span class="animate-flash text-midRed">
                  {" "}
                  ⬆ newer release out
                </span>
              )}
            </AboutRow>
            {prNumber !== undefined && (
              <AboutRow label="Preview of">
                <a href={prUrl} target="_blank" class={linkClassName}>
                  {`#${prNumber}`}
                </a>
              </AboutRow>
            )}
            {gitBranch !== undefined && (
              <AboutRow label="Branch">{gitBranch}</AboutRow>
            )}
            <AboutRow label="Source">
              <a href={repositoryUrl} target="_blank" class={linkClassName}>
                {repositoryUrl}
              </a>
            </AboutRow>
          </div>
          <div class="flex justify-end text-white mt-1">
            <Button class="px-1 py-half" onClick={onClose} aria-label="Close">
              Close
            </Button>
          </div>
        </Dialog>
      </div>
    </DialogPortal>
  );
};
