import { useState } from "preact/hooks";

import { useAppSelector } from "../../../../../../store/hooks";
import { selectIsAskedForSmoothingReadyToUse } from "../../../../../../store/slices/smoothing/selectIsAskedForSmoothingReadyToUse";
import { selectSmoothingInProgress } from "../../../../../../store/slices/smoothing/smoothingSlice";
import { type GameRootState } from "../../../../../../store/store";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { LoadingBorder } from "../../../../../../ui/LoadingBorder";
import { SpinnerHead, SpinnerHeels } from "../../../../../../ui/Spinner";

/**
 * how far the smoothing the settings ask for has got, from 0 to 1: 1 once
 * it is done, and 0 before it starts or when none is asked for
 */
const selectSmoothingProgress = (state: GameRootState): number => {
  if (selectIsAskedForSmoothingReadyToUse(state)) {
    return 1;
  }
  return selectSmoothingInProgress(state)?.progress ?? 0;
};

export type SmoothingProgressBarProps = {
  /**
   * how far through the smoothing is, from 0 to 1
   */
  progress: number;
};

const SmoothingProgressBar = ({ progress }: SmoothingProgressBarProps) => (
  <div
    class="h-1 w-10 bg-shadow zx:bg-zxBlue toppy:bg-toppyGrey3"
    role="progressbar"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={Math.round(progress * 100)}
  >
    <div
      class={
        progress === 1 ?
          "h-full bg-moss zx:bg-zxGreen toppy:bg-toppyWarm1"
        : "h-full bg-highlightBeige zx:bg-zxYellow toppy:bg-toppyWarm3"
      }
      style={{ width: `${progress * 100}%` }}
    />
  </div>
);

/**
 * how far through the smoothing is, counted from when the dialog is first
 * drawn - by then the smoothing is already under way, and a bar starting part
 * full reads as nearly done
 */
const useProgressSinceDrawn = (): number => {
  const progress = useAppSelector(selectSmoothingProgress);
  const [progressWhenDrawn] = useState(progress);
  return progressWhenDrawn === 1 ? 1 : (
      Math.max(0, (progress - progressWhenDrawn) / (1 - progressWhenDrawn))
    );
};

/**
 * whether other menus are open beneath, hidden while this is drawn - with
 * none, the game shows round it instead
 */
const useIsOverOtherMenus = (): boolean =>
  useAppSelector((state) =>
    state.gameMenus.openMenus.some(({ menuId }) => menuId !== "smoothing"),
  );

/**
 * shown while the spritesheet is smoothed
 */
export const SmoothingDialog = () => {
  const progress = useProgressSinceDrawn();
  return (
    <DialogPortal>
      {useIsOverOtherMenus() && <LoadingBorder />}
      <Dialog
        small
        class="items-center justify-center p-2 bg-pureBlack zx:bg-zxBlack toppy:bg-toppyBlack w-32"
        dialogId="smoothing"
        ariaLabel="the sprites are being smoothed"
      >
        <div class="flex flex-row gap-1">
          <SpinnerHead />
          <SpinnerHeels />
        </div>
        <span class="text-white zx:text-zxWhite toppy:text-toppyWarm1 text-double-height">
          Smoothing
        </span>
        <span class="text-highlightBeige zx:text-zxYellow toppy:text-toppyWarm3">
          Can take a while...
        </span>
        <SmoothingProgressBar progress={progress} />
      </Dialog>
    </DialogPortal>
  );
};
