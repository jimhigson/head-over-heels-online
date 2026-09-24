import { useEffect } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { useMaybeGameApi } from "../game/components/GameApiContext";
import { useInputStateTracker } from "../game/input/InputStateProvider";
import { createWebMcpTools } from "./createWebMcpTools";
import { getModelContext } from "./modelContext";

/** registers the debugging tools with the browser's webmcp api */
export const WebMcpTools = (_emptyProps: EmptyObject) => {
  const gameApi = useMaybeGameApi();
  const inputStateTracker = useInputStateTracker();

  useEffect(() => {
    const modelContext = getModelContext();
    if (modelContext === undefined) {
      console.warn("webmcp tools requested, but this browser has no webmcp");
      return;
    }
    const controller = new AbortController();
    for (const tool of createWebMcpTools(gameApi, inputStateTracker)) {
      modelContext.registerTool(tool, { signal: controller.signal });
    }
    return () => controller.abort();
  }, [gameApi, inputStateTracker]);

  return null;
};

export default WebMcpTools;
