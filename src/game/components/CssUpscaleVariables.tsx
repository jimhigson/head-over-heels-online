import { type PropsWithChildren } from "react";

import { useTotalUpscale } from "../../store/slices/upscale/upscaleSelectors";

declare module "react" {
  interface CSSProperties {
    [`--scale`]?: number | string;
    [`--block`]?: number | string;
  }
}

export type CssUpscaleVariablesProps = {
  scaleFactor?: number;
};

/**
 * Sets CSS variables (`--scale`, `--block`) with values from the upscale slice
 *
 * Pass `scaleFactor` to render at a fixed size, overriding the store-driven
 * upscale (e.g. spritesheet preview pages)
 */
export const CssUpscaleVariables = ({
  children,
  scaleFactor: propsScaleFactor,
}: PropsWithChildren<CssUpscaleVariablesProps>) => {
  const storeScaleFactor = useTotalUpscale();
  const scaleFactor = propsScaleFactor ?? storeScaleFactor;
  return (
    <div
      className="contents"
      style={{
        "--scale": scaleFactor,
        "--block": `${scaleFactor * 8}px`,
        // same rules as the body default, but resolved here where --block /
        // --scale are in scope, so text inside scales with the upscale factor
        fontSize: `${scaleFactor * 8}px`,
        lineHeight: `${10 * scaleFactor}px`,
      }}
    >
      {children}
    </div>
  );
};
