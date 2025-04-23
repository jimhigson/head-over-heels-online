import { Dialog } from "../../../../../../ui/dialog";
import { Border } from "../../../../../../ui/Border";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import {
  gameOver,
  reincarnationAccepted,
} from "../../../../../../store/slices/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchCallback";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";
import { multilineTextClass } from "../../multilineTextClass";
import { useGameApi } from "../../../../GameApiContext";
import { store } from "../../../../../../store/store";
import type { GameApi } from "../../../../../GameApi";

export const reincarnateSelected = (gameApi: GameApi<string>) => {
  gameApi.reincarnateFrom(store.getState().gameMenus.reincarnationPoint!);
  // dispatch something to close the menu and remove the reincarnation point
  store.dispatch(reincarnationAccepted());
};

export const OfferReincarnationDialog = () => {
  const gameApi = useGameApi();

  return (
    <DialogPortal>
      <Border className="bg-midRed zx:bg-zxYellow" />
      <Dialog className="bg-white zx:bg-zxRed">
        <BitmapText className="sprites-double-height mt-2 resHandheld:mt-0 text-redShadow zx:text-zxWhite">
          Uh-oh! Game over.
        </BitmapText>
        <span className="sprite texture-animated-fish float-left" />
        <BitmapText
          className={`resHandheld:mt-0 text-redShadow zx:text-zxWhite ${multilineTextClass}`}
        >
          Ah, But you ate a Reincarnation Fish! Reincarnate?
        </BitmapText>
        <MenuItems className="text-lightGrey zx:text-zxWhite mt-1 resHandheld:mt-0 selectedMenuItem:text-midRed zx:selectedMenuItem:text-zxYellow resHandheld:!gap-y-1">
          <MenuItem
            doubleHeightWhenFocussed
            id="reincarnate"
            label="Reincarnate"
            onSelect={() => {
              reincarnateSelected(gameApi);
            }}
          />
          <MenuItem
            doubleHeightWhenFocussed
            id="donotreincarnate"
            label="Stay dead"
            onSelect={useDispatchActionCallback(gameOver, {
              offerReincarnation: false,
            })}
          />
        </MenuItems>
      </Dialog>
    </DialogPortal>
  );
};
