// for the WebMCP global types:
import type {} from "webmcp-types";

import { jsonStringifySafe } from "../game/components/cheats/jsonStringifySafe";
import { type GameApi } from "../game/GameApi";
import { type BooleanAction, booleanActions } from "../game/input/actions";
import { type InputStateTrackerInterface } from "../game/input/InputStateTracker";
import { getRecentActions } from "../store/recentActions";
import { store } from "../store/store";
import { valueAtPath } from "./valueAtPath";

const jsonResult = (value: unknown) => ({
  content: [
    {
      type: "text",
      text: value === undefined ? "undefined" : jsonStringifySafe(value),
    },
  ],
});

const pathArgSchema = {
  type: "object",
  properties: {
    path: {
      type: "string",
      description: "dotted path into the state, eg `a.b.0`; omit for all",
    },
  },
};

const pathArg = (args: Record<string, unknown>) =>
  typeof args.path === "string" ? args.path : "";

const isBooleanAction = (action: unknown): action is BooleanAction =>
  (booleanActions as readonly unknown[]).includes(action);

// long enough to span a tick, so the press registers as a tap
const defaultHoldMs = 100;

/** debugging tools for agents driving the game */
export const createWebMcpTools = (
  gameApi: GameApi<string> | undefined,
  inputStateTracker: InputStateTrackerInterface,
): WebMCP.ModelContextTool[] => [
  {
    name: "pressAction",
    description:
      "press and release a game input action (eg jump, menu_openOrExit) as if from a key or button",
    inputSchema: {
      type: "object",
      properties: {
        action: { type: "string", enum: booleanActions },
        holdMs: {
          type: "number",
          description: `how long to hold it down; default ${defaultHoldMs}`,
        },
      },
      required: ["action"],
    },
    async execute({ action, holdMs }) {
      if (!isBooleanAction(action)) {
        return jsonResult(`unknown action; one of ${booleanActions.join()}`);
      }
      const { hudInputState } = inputStateTracker;
      hudInputState[action] = true;
      await new Promise((resolve) =>
        setTimeout(
          resolve,
          typeof holdMs === "number" ? holdMs : defaultHoldMs,
        ),
      );
      hudInputState[action] = false;
      return jsonResult(`pressed ${action}`);
    },
  },
  {
    name: "getMenuStack",
    description:
      "the stack of open menus/dialogs, top (visible) first; empty during play",
    inputSchema: { type: "object", properties: {} },
    execute: async () => jsonResult(store.getState().gameMenus.openMenus),
  },
  {
    name: "getActionLog",
    description: "the most recent redux actions, oldest last",
    inputSchema: {
      type: "object",
      properties: {
        typePrefix: {
          type: "string",
          description: "only actions whose type starts with this",
        },
      },
    },
    execute: async ({ typePrefix }) =>
      jsonResult(
        getRecentActions().filter(
          ({ type }) =>
            typeof typePrefix !== "string" ||
            (typeof type === "string" && type.startsWith(typePrefix)),
        ),
      ),
  },
  {
    name: "getReduxState",
    description: "the redux store's state, or part of it",
    inputSchema: pathArgSchema,
    execute: async (args) =>
      jsonResult(valueAtPath(store.getState(), pathArg(args))),
  },
  {
    name: "dispatchAction",
    description: "dispatch a plain redux action",
    inputSchema: {
      type: "object",
      properties: {
        type: { type: "string", description: "eg `gameMenus/closeAllMenus`" },
        payload: { description: "the action's payload, if it has one" },
      },
      required: ["type"],
    },
    async execute({ type, payload }) {
      if (typeof type !== "string") {
        return jsonResult("type must be a string");
      }
      store.dispatch({ type, payload });
      return jsonResult(`dispatched ${type}`);
    },
  },
  {
    name: "getGameState",
    description:
      "the running game engine's state (not redux), or part of it; repeated objects show as [circular]",
    inputSchema: pathArgSchema,
    execute: async (args) =>
      gameApi === undefined ?
        jsonResult("no game is running")
      : jsonResult(valueAtPath(gameApi.gameState, pathArg(args))),
  },
];
