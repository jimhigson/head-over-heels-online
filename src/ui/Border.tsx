"use client";

import { useIsLoading } from "../store/hooks/loadingHooks";
import { LoadingBorder } from "./LoadingBorder";

export type BorderProps = {
  class?: string;
  /**
   * fill with a see-through checkerboard, so what is behind the dialog shows
   * through, dimmed
   */
  scrim?: boolean;
  /** click (or tap) handler for anywhere on the div; usually for closing the dialog */
  onClick?: (e: MouseEvent) => void;
};

/**
 * if you know the spectrum, you know this - the unusable/unused
 * area around the dialog
 */

export const Border = ({
  class: className,
  scrim = false,
  onClick,
}: BorderProps) => {
  const isLoading = useIsLoading();

  if (isLoading) {
    return <LoadingBorder />;
  }

  return (
    <div
      class={`fixed inset-0 z-border ${scrim ? "bg-checkerboard-stifled-alphas" : ""} ${className ?? ""}`}
      onClick={onClick}
    />
  );
};
