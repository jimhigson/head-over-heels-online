import type { Middleware, UnknownAction } from "@reduxjs/toolkit";

const maxRecentActions = 20;
const recentActions: UnknownAction[] = [];

/** for debugging, capture the most recent actions to show in the ErrorDialog */
export const recentActionsMiddleware: Middleware = () => (next) => (action) => {
  if (typeof action === "object" && action !== null && "type" in action) {
    recentActions.push(action as UnknownAction);
    if (recentActions.length > maxRecentActions) {
      recentActions.shift();
    }
  }
  return next(action);
};

export const getRecentActions = (): UnknownAction[] => [...recentActions];
