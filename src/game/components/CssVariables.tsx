import { type PropsWithChildren } from "react";

import { CssSpritesVariables } from "./CssSpritesVariables";
import { CssUpscaleVariables } from "./CssUpscaleVariables";

export type CssVariablesProps = {
  scaleFactor?: number;
};

/**
 * Convenience wrapper that nests `<CssUpscaleVariables>` and
 * `<CssSpritesVariables>` for callsites that want both sets of CSS
 * variables
 */
export const CssVariables = ({
  children,
  scaleFactor,
}: PropsWithChildren<CssVariablesProps>) => (
  <CssUpscaleVariables scaleFactor={scaleFactor}>
    <CssSpritesVariables>{children}</CssSpritesVariables>
  </CssUpscaleVariables>
);
