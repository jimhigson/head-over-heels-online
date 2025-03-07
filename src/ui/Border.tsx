"use client";
import type { MouseEvent } from "react";

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
  return (
    <div
      className={`fixed inset-0 z-border ${className ? className : ""}`}
      onClick={onClick}
    />
  );
};
