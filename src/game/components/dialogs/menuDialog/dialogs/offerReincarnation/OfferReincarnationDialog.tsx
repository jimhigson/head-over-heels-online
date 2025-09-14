import type { GameApi } from "../../../../../GameApi";

import {
  gameOver,
  reincarnationAccepted,
} from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { store } from "../../../../../../store/store";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { useGameApi } from "../../../../GameApiContext";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";

export const reincarnateSelected = (gameApi: GameApi<string>) => {
  gameApi.reincarnateFrom(
    store.getState().gameMenus.gameInPlay.reincarnationPoint!,
  );
  // dispatch something to close the menu and remove the reincarnation point
  store.dispatch(reincarnationAccepted());
};

const markdown = `![](?sprite&texture-animated-fish&float-left)Ah, But you ate a Reincarnation Fish! Reincarnate?`;

export const OfferReincarnationDialog = () => {
  const gameApi = useGameApi();

  return (
    <DialogPortal>
      <Border className="bg-midRed zx:bg-zxYellow" />
      <Dialog className="bg-white zx:bg-zxRed px-1">
        <BitmapText className="sprites-double-height mt-1 mb-2 resHandheld:mt-0 text-redShadow zx:text-zxWhite">
          Uh-oh! Game over.
        </BitmapText>
        <BlockyMarkdown
          markdown={markdown}
          className="text-redShadow zx:text-zxWhite"
        />
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
