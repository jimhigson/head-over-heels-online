import { useAppSelector } from "../../../../../../store/hooks";
import { useIsGameLoading } from "../../../../../../store/hooks/loadingHooks";
import { selectIsSoundMuted } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { LoadingBanner } from "../../../../../../ui/LoadingBanner";
import { PlayAudio } from "../../../../../../utils/sound/PlayAudio";
import { BackMenuItem } from "../../BackMenuItem";
import { MenuItems } from "../../MenuItems";
import { FiveCrownsDisplay } from "./FiveCrownsDisplay";

export const CrownsDialog = ({
  /**
   * Should we play intro music? (if sound muted ignores this value and never plays)
   */
  playMusic = false,
}: {
  playMusic?: boolean;
}) => {
  const isLoading = useIsGameLoading();
  const muted = useAppSelector(selectIsSoundMuted);
  const shouldPlayMusic = playMusic && !muted;

  const closeDialog = useDispatchActionCallback(backToParentMenu);
  return (
    <DialogPortal>
      <Border class="bg-pureBlack zx:bg-zxBlack toppy:bg-toppyBlack" />

      <Dialog
        class="bg-pureBlack w-zx h-full block p-0"
        onClick={isLoading ? undefined : closeDialog}
        dialogId="crowns"
      >
        {shouldPlayMusic && <PlayAudio soundId="intro" loop />}
        <FiveCrownsDisplay />
        {isLoading && (
          <div>
            <LoadingBanner>LOADING</LoadingBanner>
          </div>
        )}
        {!isLoading && (
          <MenuItems class="hidden">
            <BackMenuItem />
          </MenuItems>
        )}
      </Dialog>
    </DialogPortal>
  );
};
