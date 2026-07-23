"use client";

import { type ComponentChildren, createContext } from "preact";
import { createPortal } from "preact/compat";
import { useContext } from "preact/hooks";

import { CssVariables } from "../game/components/CssVariables";

export type DialogPortalTarget = {
  /** the element dialogs should portal into */
  container: HTMLElement;
  /**
   * overrides the store-driven upscale for the portalled dialogs' CSS
   * variables - used when the container is laid out at a different scale to
   * the page (eg inside the game's canvas, where only the game engine
   * upscale applies and the css upscale is applied to the whole canvas)
   */
  scaleFactor?: number;
};

/**
 * where {@link DialogPortal} sends its dialogs; null (the default) means
 * document.body. The html-in-canvas dialog mirroring provides a target
 * inside the game's canvas so dialogs render through the game's filters.
 */
export const DialogPortalTargetContext =
  createContext<DialogPortalTarget | null>(null);

export const DialogPortal = ({ children }: { children: ComponentChildren }) => {
  const target = useContext(DialogPortalTargetContext);
  return createPortal(
    <CssVariables scaleFactor={target?.scaleFactor}>{children}</CssVariables>,
    target?.container ?? document.body,
  );
};
