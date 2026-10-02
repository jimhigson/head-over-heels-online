import { type GameApi } from "../game/GameApi";
import { type BooleanAction, booleanActions } from "../game/input/actions";
import { type InputStateTrackerInterface } from "../game/input/InputStateTracker";
import { store } from "../store/store";
import { jsonResult } from "./jsonResult";
import { pathArg, pathArgSchema } from "./pathArg";
import { reduxWebMcpTools } from "./reduxWebMcpTools";
import { valueAtPath } from "./valueAtPath";

const isBooleanAction = (action: unknown): action is BooleanAction =>
  (booleanActions as readonly unknown[]).includes(action);

// long enough to span a tick, so the press registers as a tap
const defaultHoldMs = 100;

/** debugging tools for agents driving the game */
export const createGameWebMcpTools = (
  gameApi: GameApi<string> | undefined,
  inputStateTracker: InputStateTrackerInterface,
): WebMCP.ModelContextTool[] => [
  ...reduxWebMcpTools,
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
