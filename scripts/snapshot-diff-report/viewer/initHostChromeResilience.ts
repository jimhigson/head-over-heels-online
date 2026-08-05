import { app, toolbar, toolbarHandle } from "./viewerElements";

/**
 * Keeps the viewer usable inside apps that overlay their own auto-hiding bars
 * on the page (phone document viewers, in-app browsers):
 *
 * - the app's px dimensions are frozen to the largest viewport seen in the
 *   current orientation, so bars appearing and disappearing never reflow the
 *   layout - the centre-anchored container just shifts by half a bar's height,
 *   the least movement available to the page
 * - the page itself never scrolls or zooms; every pinch and pan is the in-app
 *   image transform instead
 * - the toolbar floats and is draggable by its handle, so it can be moved
 *   clear of whatever the host overlays
 */
export const initHostChromeResilience = () => {
  let frozenWidth = 0;
  let frozenHeight = 0;
  const freezeSize = () => {
    frozenWidth = window.innerWidth;
    frozenHeight = window.innerHeight;
    app.style.width = `${frozenWidth}px`;
    app.style.height = `${frozenHeight}px`;
  };
  freezeSize();
  window.addEventListener("resize", () => {
    // a width change is a real orientation change and starts afresh; a taller
    // viewport is chrome having hidden itself, so grow into it:
    if (
      window.innerWidth !== frozenWidth ||
      window.innerHeight > frozenHeight
    ) {
      freezeSize();
    }
  });

  // native select popups don't need touchmove, and taps (touchstart+touchend)
  // still click buttons:
  document.addEventListener("touchmove", (event) => event.preventDefault(), {
    passive: false,
  });
  document.addEventListener("gesturestart", (event) => event.preventDefault());

  let toolbarDragOffset: { x: number; y: number } | undefined;
  toolbarHandle.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    const rect = toolbar.getBoundingClientRect();
    toolbarDragOffset = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    try {
      toolbarHandle.setPointerCapture(event.pointerId);
    } catch {
      // no-op: capture failure never blocks the drag itself
    }
  });
  toolbarHandle.addEventListener("pointermove", (event) => {
    if (toolbarDragOffset === undefined) {
      return;
    }
    // positioned in the app's own (centre-anchored, frozen-size) frame, so the
    // panel holds still wherever host chrome pushes the viewport edges:
    const appRect = app.getBoundingClientRect();
    const rect = toolbar.getBoundingClientRect();
    const leftPx = event.clientX - toolbarDragOffset.x - appRect.left;
    const bottomPx =
      appRect.bottom - (event.clientY - toolbarDragOffset.y) - rect.height;
    toolbar.style.left = `${Math.min(appRect.width - rect.width, Math.max(0, leftPx))}px`;
    toolbar.style.bottom = `${Math.min(appRect.height - rect.height, Math.max(0, bottomPx))}px`;
  });
  const endToolbarDrag = () => {
    toolbarDragOffset = undefined;
  };
  toolbarHandle.addEventListener("pointerup", endToolbarDrag);
  toolbarHandle.addEventListener("pointercancel", endToolbarDrag);
};
