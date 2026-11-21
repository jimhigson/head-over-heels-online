import type { UnknownRecord } from "type-fest";

export const pathArgSchema = {
  type: "object",
  properties: {
    path: {
      type: "string",
      description: "dotted path into the state, eg `a.b.0`; omit for all",
    },
  },
};

/** the `path` argument of a tool taking `pathArgSchema`; empty for the root */
export const pathArg = (args: UnknownRecord) =>
  typeof args.path === "string" ? args.path : "";
