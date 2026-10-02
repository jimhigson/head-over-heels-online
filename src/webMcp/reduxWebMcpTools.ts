import { getRecentActions } from "../store/recentActions";
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
