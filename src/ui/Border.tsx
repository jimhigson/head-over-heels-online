"use client";
import type { MouseEvent } from "react";

import { useIsLoading } from "../store/hooks/loadingHooks";
import { LoadingBorder } from "./LoadingBorder";

/**
 * if you know the spectrum, you know this - the unusable/unused
 * area around the dialog
 */

export const Border = ({
  className,
  onClick,
}: {
  className?: string;
  /** click (or tap) handler for anywhere on the div; usually for closing the dialog */
  onClick?: (e: MouseEvent) => void;
}) => {
  const isLoading = useIsLoading();

  if (isLoading) {
    return <LoadingBorder />;
  }

  return (
    <div
      className={`fixed inset-0 z-border ${className ?? ""}`}
      onClick={onClick}
    />
  );
};
