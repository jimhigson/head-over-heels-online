import { useEffect } from "preact/hooks";

import { getModelContext } from "./modelContext";

/**
 * registers the tools with the browser's webmcp api while mounted; does
 * nothing in browsers without webmcp
 */
export const useRegisterWebMcpTools = (
  /** should be referentially stable, or the tools re-register every render */
  tools: WebMCP.ModelContextTool[],
) => {
  useEffect(() => {
    const modelContext = getModelContext();
    if (modelContext === undefined) {
      return;
    }
    const controller = new AbortController();
    for (const tool of tools) {
      modelContext.registerTool(tool, { signal: controller.signal });
    }
    return () => controller.abort();
  }, [tools]);
};
