import {
  getRecentActions,
  getRecentHistory,
  recentHistoryStateAt,
} from "../store/recentActions";
import { store } from "../store/store";
import { jsonResult } from "./jsonResult";
import { pathArg, pathArgSchema } from "./pathArg";
import { valueAtPath } from "./valueAtPath";

/** tools for agents to read and dispatch to the redux store */
export const reduxWebMcpTools: WebMCP.ModelContextTool[] = [
  {
    name: "getActionLog",
    description:
      "the most recent redux actions, oldest last; only recorded in dev builds",
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
    name: "getStateHistoryIndex",
    description:
      "the recent redux actions as a history of states to read: each action's index, type and time. The state at an index is the state just after that action; index -1 is the state before the oldest. Stops at a caught error until it is dismissed, so what led up to it can be read. Only recorded in dev builds",
    inputSchema: { type: "object", properties: {} },
    execute: async () =>
      jsonResult(
        getRecentHistory().map(({ action, timestamp }, index) => ({
          index,
          type: action.type,
          timestamp,
        })),
      ),
  },
  {
    name: "getStateHistoryDiff",
    description:
      "how the redux state changed between two indexes of the state history, as a JSON Patch (RFC 6902) - eg `from` 11, `to` 12 for what action 12 did. Optionally only within a dotted path to an object or array",
    inputSchema: {
      type: "object",
      properties: {
        from: {
          type: "number",
          description: "an index; -1 for the state before the oldest action",
        },
        to: { type: "number", description: "an index" },
        path: pathArgSchema.properties.path,
      },
      required: ["from", "to"],
    },
    async execute(args) {
      const { from, to } = args;
      if (typeof from !== "number" || typeof to !== "number") {
        return jsonResult("from and to must be numbers");
      }
      const path = pathArg(args);
      const { compare } = await import("fast-json-patch");
      return jsonResult(
        compare(
          valueAtPath(recentHistoryStateAt(from), path) ?? {},
          valueAtPath(recentHistoryStateAt(to), path) ?? {},
        ),
      );
    },
  },
  {
    name: "getStateHistoryValue",
    description:
      "the redux state, or part of it, at an index of the state history",
    inputSchema: {
      type: "object",
      properties: {
        index: {
          type: "number",
          description: "an index; -1 for the state before the oldest action",
        },
        path: pathArgSchema.properties.path,
      },
      required: ["index"],
    },
    async execute(args) {
      const { index } = args;
      if (typeof index !== "number") {
        return jsonResult("index must be a number");
      }
      return jsonResult(
        valueAtPath(recentHistoryStateAt(index), pathArg(args)),
      );
    },
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
];
