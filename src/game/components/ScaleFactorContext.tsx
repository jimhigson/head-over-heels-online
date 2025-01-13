import type { PropsWithChildren } from "react";
import { createContext } from "react";

import "react";

declare module "react" {
  interface CSSProperties {
    [`--scaleFactor`]?: string | number;
  }
}

export const ScaleFactorContext = createContext<number>(1);
export type ScaleFactorBoundaryProps = PropsWithChildren<{
  scaleFactor: number;
}>;
export const ScaleFactorBoundary = ({
  scaleFactor,
  children,
}: ScaleFactorBoundaryProps) => {
  return (
    <div className="contents" style={{ "--scaleFactor": scaleFactor }}>
      <ScaleFactorContext value={scaleFactor}>{children}</ScaleFactorContext>
    </div>
  );
};
