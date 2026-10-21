import { type Middleware, type UnknownAction } from "@reduxjs/toolkit";

import { errorCaught, errorDismissed } from "./slices/errors/errorsSlice";

const maxRecentActions = 50;

/**
 * an action, and the store's state just after it
 */
export type RecentHistoryEntry = {
  action: UnknownAction;
  /**
   * shares everything the action didn't change with the states either side,
   * so keeping it costs little
   */
  stateAfter: unknown;
  timestamp: number;
};

const recentHistory: RecentHistoryEntry[] = [];
/**
 * the state before the oldest kept action
 */
let stateBeforeRecentHistory: unknown = undefined;
/**
 * while an error is shown, the history stops at it, so what led up to it can
 * still be looked at
 */
let frozenForError = false;

const isAction = (action: unknown): action is UnknownAction =>
  typeof action === "object" && action !== null && "type" in action;

/**
 * for debugging, capture the most recent actions and the states they led to,
 * to show in the ErrorDialog and for agents to read
 */
export const recentActionsMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    if (stateBeforeRecentHistory === undefined) {
      stateBeforeRecentHistory = getState();
    }
    const result = next(action);
    if (errorDismissed.match(action)) {
      frozenForError = false;
    }
    if (!isAction(action) || frozenForError) {
      return result;
    }
    recentHistory.push({
      action,
      stateAfter: getState(),
      timestamp: Date.now(),
    });
    if (recentHistory.length > maxRecentActions) {
      stateBeforeRecentHistory = recentHistory.shift()!.stateAfter;
    }
    if (errorCaught.match(action)) {
      frozenForError = true;
    }
    return result;
  };

export const getRecentActions = (): UnknownAction[] =>
  recentHistory.map(({ action }) => action);

export const getRecentHistory = (): readonly RecentHistoryEntry[] =>
  recentHistory;

/**
 * the state at an index into the recent history - the state after that
 * index's action, or with -1 the state before the oldest
 */
export const recentHistoryStateAt = (index: number): unknown =>
  index === -1 ? stateBeforeRecentHistory : recentHistory[index]?.stateAfter;
