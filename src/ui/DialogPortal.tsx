"use client";
import type { ReactNode } from "react";

import { createPortal } from "react-dom";

import { CssVariables } from "../game/components/CssVariables";

export const DialogPortal = ({ children }: { children: ReactNode }) => {
  return createPortal(<CssVariables>{children}</CssVariables>, document.body);
};
