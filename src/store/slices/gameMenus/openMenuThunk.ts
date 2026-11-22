import type { SetOptional } from "type-fest";

import type { DialogId } from "../../../game/components/dialogs/menuDialog/DialogId";
import { appTicker } from "../../../utils/ticker/appTickerInstance";
import type { AppThunk } from "../../store";
import { goToSubmenu, type MenuOptions } from "./gameMenusSlice";

export type OpenMenuThunkOptions = SetOptional<
  { dialogId: DialogId } & MenuOptions,
  "alwaysOnTop" | "lingerMs" | "notDismissable" | "showAfterDelayMs"
>;

/**
 * open a menu above the others, now
 */
export const openMenuThunk =
  ({
    dialogId,
    alwaysOnTop = false,
    notDismissable = false,
    showAfterDelayMs = 0,
    lingerMs = 0,
  }: OpenMenuThunkOptions): AppThunk =>
  (dispatch) => {
    dispatch(
      goToSubmenu({
        dialogId,
        openedAt: appTicker.time,
        alwaysOnTop,
        notDismissable,
        showAfterDelayMs,
        lingerMs,
      }),
    );
  };
