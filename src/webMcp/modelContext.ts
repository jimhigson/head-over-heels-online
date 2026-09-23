// for the WebMCP global types (document.modelContext):
import type {} from "webmcp-types";

declare global {
  interface Navigator {
    /** early chrome builds put the model context here, not on the document */
    readonly modelContext?: WebMCP.ModelContext;
  }
}

/** the browser's webmcp api, if it has one */
export const getModelContext = (): undefined | WebMCP.ModelContext =>
  document.modelContext ?? navigator.modelContext;
