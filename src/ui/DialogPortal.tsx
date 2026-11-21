"use client";

import type { ComponentChildren } from "preact";
import { createPortal } from "preact/compat";

import { CssUpscaleVariables } from "../game/components/CssUpscaleVariables";

export const DialogPortal = ({ children }: { children: ComponentChildren }) => {
  return createPortal(
    <CssUpscaleVariables>{children}</CssUpscaleVariables>,
    document.body,
  );
};
