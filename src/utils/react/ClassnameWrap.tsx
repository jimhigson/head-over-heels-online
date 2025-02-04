import type { PropsWithChildren } from "react";

/**
 * wrap some elements in a contents div for the sake of tagging with a classname,
 * but only if we have a classname to put on them - otherwise, include them as-is
 */
export const ClassnameWrap = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return className ?
      <div className={`contents ${className}`}>{children}</div>
    : children;
};
