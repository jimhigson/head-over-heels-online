import type { AnimatedTextureTailwindClass } from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import type { GameApi } from "../../../../../GameApi";

import {
  gameOver,
  gameRestoreFromSave,
  reincarnationAccepted,
} from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { store } from "../../../../../../store/store";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { useGameApi } from "../../../../GameApiContext";
import { BitmapText } from "../../../../tailwindSprites/BitmapText";
import { MenuItem } from "../../MenuItem";
import { MenuItems } from "../../MenuItems";

export const reincarnateSelected = (gameApi: GameApi<string>) => {
  const savedGame = store.getState().gameMenus.gameInPlay.reincarnationPoint!;
  gameApi.reincarnateFrom(savedGame);
  // Pop the reincarnationPoint stack: restore the redux gameInPlay from
  // the saved snapshot, which carries the prior reincarnationPoint (one
  // link back) plus the rolled-back roomsExplored / scrollsRead /
  // freeCharacters at fish-eaten time. Each fish save was created with
  // the previous reincarnationPoint nested inside, so each pop walks
  // one link back through the chain.
  store.dispatch(gameRestoreFromSave(savedGame.store.gameMenus.gameInPlay));
  // Closes the offerReincarnation/quitGameConfirm menu and opens the
  // reincarnatedRestart confirmation.
  store.dispatch(reincarnationAccepted());
};

const markdown = `![](?sprite&${"texture-animated-fish" satisfies AnimatedTextureTailwindClass}&float-left)Ah, But you ate a Reincarnation Fish! Reincarnate?`;

export const OfferReincarnationDialog = () => {
  const gameApi = useGameApi();

  return (
    <DialogPortal>
      <Border className="bg-midRed zx:bg-zxYellow toppy:bg-toppyPink2" />
      <Dialog
        className="bg-white zx:bg-zxRed toppy:bg-toppyWarm6 px-1"
        dialogId="offerReincarnation"
      >
        <BitmapText className="sprites-double-height mt-1 mb-2 resHandheld:mt-0 text-redShadow zx:text-zxWhite toppy:text-toppyWarm1">
          Uh-oh! Game over.
        </BitmapText>
        <BlockyMarkdown
          markdown={markdown}
          className="text-redShadow zx:text-zxWhite toppy:text-toppyWarm3"
        />
        <MenuItems className="text-lightGrey zx:text-zxWhite toppy:text-toppyGrey1 mt-1 resHandheld:mt-0 selectedMenuItem:text-midRed zx:selectedMenuItem:text-zxYellow toppy:selectedMenuItem:text-toppyPink2 resHandheld:!gap-y-1">
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
