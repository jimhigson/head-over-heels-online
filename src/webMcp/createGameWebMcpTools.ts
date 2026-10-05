import { type GameApi } from "../game/GameApi";
import { selectCurrentRoomState } from "../game/gameState/gameStateSelectors/selectCurrentRoomState";
import { type BooleanAction, booleanActions } from "../game/input/actions";
import { type InputStateTrackerInterface } from "../game/input/InputStateTracker";
import { blockSizePx } from "../game/physics/mechanicsConstants";
import { type UnionOfAllItemInPlayTypes } from "../model/ItemInPlay";
import { roomItemsIterable, type RoomState } from "../model/RoomState";
import { selectGameSpeed } from "../store/slices/gameMenus/gameMenusSelectors";
import { store } from "../store/store";
import { appTicker } from "../utils/ticker/appTickerInstance";
import { jsonResult } from "./jsonResult";
import { pathArg, pathArgSchema } from "./pathArg";
import { reduxWebMcpTools } from "./reduxWebMcpTools";
import { valueAtPath } from "./valueAtPath";

const isBooleanAction = (action: unknown): action is BooleanAction =>
  (booleanActions as readonly unknown[]).includes(action);

// long enough to span a tick, so the press registers as a tap
const defaultHoldMs = 100;

const maxAdvanceMs = 10_000;

/** state fields that show what an item is doing, where the item has them */
const summarisedStateFields = [
  "setting",
  "pressed",
  "activated",
  "orientation",
  "disabled",
  "standingOnItemId",
] as const;

const maxEvents = 300;

/** each item's summarised state fields, as json, by id */
const roomSummaries = (
  room: RoomState<string, string> | undefined,
): Map<string, string> =>
  room === undefined ?
    new Map()
  : new Map(
      roomItemsIterable(room.items).map((item) => [
        `${item.id} (${item.type})`,
        // positions change every frame, so are left out of the events:
        JSON.stringify(itemStateSummary(item)),
      ]),
    );

/** what changed between two frames' summaries, eg `sw1 (switch) {"setting":"right"}` */
const summaryChanges = (
  before: Map<string, string>,
  after: Map<string, string>,
): string[] => [
  ...after
    .entries()
    .filter(([key, fields]) => before.get(key) !== fields)
    .map(([key, fields]) =>
      before.has(key) ? `${key} ${fields}` : `+ ${key} ${fields}`,
    ),
  ...before
    .keys()
    .filter((key) => !after.has(key))
    .map((key) => `- ${key}`),
];

/** the summarised state fields this item has */
const itemStateSummary = (item: UnionOfAllItemInPlayTypes<string, string>) => {
  const summary: Record<string, unknown> = {};
  for (const field of summarisedStateFields) {
    if (field in item.state) {
      summary[field] = (item.state as Record<string, unknown>)[field];
    }
  }
  return summary;
};

const roomItemSummary = (item: UnionOfAllItemInPlayTypes<string, string>) => {
  const {
    id,
    type,
    state: { box },
  } = item;
  return {
    id,
    type,
    at: [box.x / blockSizePx.x, box.y / blockSizePx.y, box.z / blockSizePx.z],
    ...itemStateSummary(item),
  };
};

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
    name: "pauseGame",
    description:
      "stop or restart the game's clock. While paused nothing moves or animates except during advanceTime",
    inputSchema: {
      type: "object",
      properties: { paused: { type: "boolean" } },
      required: ["paused"],
    },
    async execute({ paused }) {
      // a listener added to a stopped ticker would otherwise restart it:
      appTicker.autoStart = paused !== true;
      if (paused === true) {
        appTicker.stop();
      } else {
        appTicker.start();
      }
      return jsonResult({ paused: !appTicker.started });
    },
  },
  {
    name: "advanceTime",
    description: `run the game forward this many ms of game time, as fast as possible, in the longest frames the game allows; usually while paused. Returns the events seen on the way, each "roomTime itemId (type) fields": changes to the fields getRoomItems summarises, + added items, - removed items. Blocks the page while it runs, so keep each call to a few seconds of game time. Game time does not pass while a menu or dialog is open (see getMenuStack)`,
    inputSchema: {
      type: "object",
      properties: {
        ms: { type: "number", description: `at most ${maxAdvanceMs}` },
      },
      required: ["ms"],
    },
    async execute({ ms }) {
      if (typeof ms !== "number" || ms <= 0 || ms > maxAdvanceMs) {
        return jsonResult(`ms must be a number in (0, ${maxAdvanceMs}]`);
      }
      const { emitFrame } = appTicker;
      if (emitFrame === undefined) {
        return jsonResult("advancing time needs a dev build");
      }
      const roomNow = () =>
        gameApi === undefined ? undefined : (
          selectCurrentRoomState(gameApi.gameState)
        );
      const events: string[] = [];
      let previous = roomSummaries(roomNow());
      // the main loop scales each frame by the user's game speed - undo that
      // so `ms` is exactly the game time that passes:
      const gameSpeed = selectGameSpeed(store.getState());
      // the longest frame the ticker allows, so as few frames as possible:
      const frameMs = 1_000 / appTicker.minFPS;
      for (let advanced = 0; advanced < ms; advanced += frameMs) {
        emitFrame(Math.min(frameMs, ms - advanced) / gameSpeed);
        const room = roomNow();
        const current = roomSummaries(room);
        if (events.length < maxEvents && room !== undefined) {
          events.push(
            ...summaryChanges(previous, current).map(
              (change) => `${Math.round(room.roomTime)} ${change}`,
            ),
          );
        }
        previous = current;
      }
      return jsonResult({
        roomTime: roomNow()?.roomTime,
        events: events.slice(0, maxEvents),
      });
    },
  },
  {
    name: "getRoomItems",
    description:
      "a compact snapshot of the current room's items: id, type, position in blocks (x, y across; z up), and the state fields that show what an item is doing (setting, pressed, activated, orientation, disabled, standingOnItemId). Optionally only some types or ids",
    inputSchema: {
      type: "object",
      properties: {
        types: { type: "array", items: { type: "string" } },
        ids: { type: "array", items: { type: "string" } },
      },
    },
    async execute({ types, ids }) {
      const room =
        gameApi === undefined ? undefined : (
          selectCurrentRoomState(gameApi.gameState)
        );
      if (room === undefined) {
        return jsonResult("no game is running");
      }
      const wantedTypes = Array.isArray(types) ? types : undefined;
      const wantedIds = Array.isArray(ids) ? ids : undefined;
      return jsonResult({
        roomId: room.id,
        roomTime: room.roomTime,
        items: roomItemsIterable(room.items)
          .filter(
            (item) =>
              (wantedTypes === undefined || wantedTypes.includes(item.type)) &&
              (wantedIds === undefined || wantedIds.includes(item.id)),
          )
          .map((item) => roomItemSummary(item))
          .toArray(),
      });
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
