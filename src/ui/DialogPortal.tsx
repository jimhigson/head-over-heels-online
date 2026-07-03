"use client";

import { type ComponentChildren } from "preact";
import { createPortal } from "preact/compat";

import { CssVariables } from "../game/components/CssVariables";

export const DialogPortal = ({ children }: { children: ComponentChildren }) => {
  return createPortal(<CssVariables>{children}</CssVariables>, document.body);
};
