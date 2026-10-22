import { type GameRootState } from "../../store";
import { type GameMenusState, type OpenMenu } from "./gameMenusSlice";

/**
 * whether a menu has waited out its `showAfterDelayMs` and is drawn
 */
export const isOpenMenuShown = (
  { openedAt, showAfterDelayMs }: OpenMenu,
  /**
   * the time now, by the app ticker's `time` - an argument so selectors over it
   * stay pure
   */
  now: number,
): boolean => now - openedAt >= showAfterDelayMs;

/**
 * of these menus, the one drawn: the first shown that is always on top, or
 * failing that the first shown - a menu still waiting out its delay is
 * passed over
 */
export const findDrawnMenu = (
  menus: OpenMenu[],
  /**
   * the time now, by the app ticker's `time`
   */
  now: number,
): OpenMenu | undefined => {
  let firstShown: OpenMenu | undefined = undefined;
  for (const menu of menus) {
    if (!isOpenMenuShown(menu, now)) {
      continue;
    }
    if (menu.alwaysOnTop) {
      return menu;
    }
    firstShown ??= menu;
  }
  return firstShown;
};

/**
 * the menu drawn now
 */
export const selectMenuToDraw = (
  state: GameRootState,
  /**
   * the time now, by the app ticker's `time`
   */
  now: number,
): OpenMenu | undefined => findDrawnMenu(state.gameMenus.openMenus, now);

/**
 * how long until the drawn menu can next change with nothing dispatched - a
 * show delay running out - or undefined if none is still to
 */
export const msUntilDrawnMenuChanges = (
  { openMenus }: GameMenusState,
  /**
   * the time now, by the app ticker's `time`
   */
  now: number,
): number | undefined => {
  let soonest = Infinity;
  for (const { openedAt, showAfterDelayMs } of openMenus) {
    const shownAt = openedAt + showAfterDelayMs;
    if (shownAt > now) {
      soonest = Math.min(soonest, shownAt);
    }
  }
  return soonest === Infinity ? undefined : soonest - now;
};
