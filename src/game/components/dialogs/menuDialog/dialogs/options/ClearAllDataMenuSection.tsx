import { useCallback, useEffect, useState } from "preact/hooks";

import { type TextureTailwindClass } from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useAppDispatch } from "../../../../../../store/hooks";
import { startAppListening } from "../../../../../../store/listenerMiddleware";
import { clearAllData } from "../../../../../../store/slices/clearAllData";
import { setFocussedMenuItemId } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import {
  optionsHintMarkdownClassname,
  spriteLeaderClasses,
} from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";

const clearAllDataMarkdown = `## Rest all data

Wipes saved games, key bindings, display and sound preferences, and all other state. **Cannot be undone.**`;

const menuItemId = "clearAllData";

export const ClearAllDataMenuSection = () => {
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = startAppListening({
      predicate: (action) =>
        setFocussedMenuItemId.match(action) &&
        action.payload.focussedItemId !== menuItemId,
      effect() {
        setAwaitingConfirmation(false);
      },
    });
    return unsubscribe;
  }, []);

  const handleSelect = useCallback(() => {
    if (awaitingConfirmation) {
      dispatch(clearAllData());
    } else {
      setAwaitingConfirmation(true);
    }
  }, [awaitingConfirmation, dispatch]);

  return (
    <>
      <div class="col-span-3 pb-1 mt-3">
        <BlockyMarkdown
          markdown={clearAllDataMarkdown}
          class={optionsHintMarkdownClassname}
        />
      </div>
      <MenuItem
        doubleHeight
        leader={
          <span
            class={`${spriteLeaderClasses} sprite ${"texture-bubbles_white_1" satisfies TextureTailwindClass} sprites-normal-height selectedMenuItem:texture-animated-bubbles_white zx:sprite-revert-to-white`}
          />
        }
        verticalAlignItemsCentre
        id={menuItemId}
        label={
          awaitingConfirmation ? "Press again to confirm" : "Delete everything"
        }
        onSelect={handleSelect}
      />
    </>
  );
};
