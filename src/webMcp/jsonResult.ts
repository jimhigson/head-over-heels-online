import { jsonStringifySafe } from "../game/components/cheats/jsonStringifySafe";

/** a webmcp tool result holding the value as json text */
export const jsonResult = (value: unknown) => ({
  content: [
    {
      type: "text",
      text: value === undefined ? "undefined" : jsonStringifySafe(value),
    },
  ],
});
