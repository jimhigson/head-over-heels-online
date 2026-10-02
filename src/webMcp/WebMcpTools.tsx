import { useEffect, useMemo } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { useMaybeGameApi } from "../game/components/GameApiContext";
import { useInputStateTracker } from "../game/input/InputStateProvider";
import { createGameWebMcpTools } from "./createGameWebMcpTools";
import { getModelContext } from "./modelContext";
import { useRegisterWebMcpTools } from "./useRegisterWebMcpTools";

/** registers the debugging tools with the browser's webmcp api */
export const WebMcpTools = (_emptyProps: EmptyObject) => {
  const gameApi = useMaybeGameApi();
  const inputStateTracker = useInputStateTracker();

  useEffect(() => {
    if (getModelContext() === undefined) {
      console.warn("this browser has no webmcp, so can't add webmcp tools");
    }
  }, []);

  useRegisterWebMcpTools(
    useMemo(
      () => createGameWebMcpTools(gameApi, inputStateTracker),
      [gameApi, inputStateTracker],
    ),
  );

  return null;
};

export default WebMcpTools;
