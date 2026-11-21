import type { DialogId } from "../../../game/components/dialogs/menuDialog/DialogId";
import { appTicker } from "../../../utils/ticker/appTickerInstance";
import type { AppThunk } from "../../store";
import {
  menuClosed,
  menuLingerEnded,
  menuLingerStarted,
} from "./gameMenusSlice";
import { isOpenMenuShown } from "./selectDrawnMenu";

/**
 * close a menu wherever it is in the stack - straight away, unless it has
 * been drawn and lingers, when it stays open until its `lingerMs` is up
 */
export const closeMenuThunk =
  (menuId: DialogId): AppThunk =>
  (dispatch, getState) => {
    const closingMenu = getState().gameMenus.openMenus.find(
      (menu) => menu.menuId === menuId,
    );
    if (closingMenu === undefined || closingMenu.closingAt !== undefined) {
      // not open, or already lingering
      return;
    }
    const closingAt = appTicker.time;
    if (
      closingMenu.lingerMs === 0 ||
      !isOpenMenuShown(closingMenu, closingAt)
    ) {
      dispatch(menuClosed({ menuId }));
      return;
    }
    dispatch(menuLingerStarted({ menuId, closingAt }));
    appTicker.setTimeout(closingMenu.lingerMs, () => {
      dispatch(menuLingerEnded({ menuId, closingAt }));
    });
  };
