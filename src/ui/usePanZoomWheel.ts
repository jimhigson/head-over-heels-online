import normalizeWheel from "normalize-wheel-es";
import { type RefObject } from "preact";
import { useEffect } from "preact/hooks";

import { type Xy } from "../utils/vectors/vectors";

/**
 * how strongly wheel deltas zoom: a pinch's deltaY is scaled so that
 * exp(-deltaY / 100) is the zoom factor it stands for
 */
const zoomPerWheelPixel = 0.01;

/**
 * caps one event's zoom, so a ctrl/⌘ + mouse wheel notch (a large delta) is a
 * comfortable step rather than a leap
 */
const maxZoomWheelPixels = 25;

/**
 * wheel zooming has no end event, so it is taken to have ended once no zoom
 * has arrived for this long (ms)
 */
const wheelZoomEndDelayMs = 200;

/**
 * Safari's own pinch gesture events - not in the dom typings
 */
type SafariGestureEvent = UIEvent & {
  scale: number;
  clientX: number;
  clientY: number;
};

export type PanZoomWheelHandlers = {
  /**
   * the content should move by this many css px
   */
  onPan: (delta: Xy) => void;
  /**
   * the zoom should be multiplied by this factor, about this client point
   */
  onZoom: (factor: number, clientXy: Xy) => void;
  /**
   * a zoom gesture finished, last zooming about this client point
   */
  onZoomEnd: (clientXy: Xy) => void;
};

/**
 * pans and zooms from wheel input, mapping gestures rather than guessing the
 * device: plain wheel (two-finger scroll, mouse wheel, tilt) pans on both
 * axes; pinch and ctrl/⌘ + wheel zoom about the pointer, freely while the
 * gesture lasts
 */
export const usePanZoomWheel = (
  elementRef: RefObject<Element | null>,
  { onPan, onZoom, onZoomEnd }: PanZoomWheelHandlers,
) => {
  useEffect(() => {
    const element = elementRef.current;
    if (element === null) {
      return;
    }

    let wheelZoomEndTimeout: ReturnType<typeof setTimeout> | undefined;

    const onWheel = (e: Event) => {
      const wheelEvent = e as WheelEvent;
      // also stops ctrl + wheel (and pinch) zooming the whole page:
      wheelEvent.preventDefault();
      wheelEvent.stopPropagation();

      // pixels whatever the deltaMode:
      const { pixelX, pixelY } = normalizeWheel(wheelEvent);

      if (wheelEvent.ctrlKey || wheelEvent.metaKey) {
        const cappedPixelY = Math.max(
          -maxZoomWheelPixels,
          Math.min(maxZoomWheelPixels, pixelY),
        );
        const clientXy = { x: wheelEvent.clientX, y: wheelEvent.clientY };
        onZoom(Math.exp(-cappedPixelY * zoomPerWheelPixel), clientXy);
        clearTimeout(wheelZoomEndTimeout);
        wheelZoomEndTimeout = setTimeout(
          () => onZoomEnd(clientXy),
          wheelZoomEndDelayMs,
        );
      } else {
        onPan({ x: -pixelX, y: -pixelY });
      }
    };

    // Safari pinches report a scale relative to the gesture's start:
    let lastGestureScale = 1;
    const onGestureStart = (e: Event) => {
      e.preventDefault();
      lastGestureScale = 1;
    };
    const onGestureChange = (e: Event) => {
      e.preventDefault();
      const gestureEvent = e as SafariGestureEvent;
      onZoom(gestureEvent.scale / lastGestureScale, {
        x: gestureEvent.clientX,
        y: gestureEvent.clientY,
      });
      lastGestureScale = gestureEvent.scale;
    };
    const onGestureEnd = (e: Event) => {
      e.preventDefault();
      const gestureEvent = e as SafariGestureEvent;
      onZoomEnd({ x: gestureEvent.clientX, y: gestureEvent.clientY });
    };

    // manual adding is needed to explicitly give passive: false
    element.addEventListener("wheel", onWheel, { passive: false });
    element.addEventListener("gesturestart", onGestureStart);
    element.addEventListener("gesturechange", onGestureChange);
    element.addEventListener("gestureend", onGestureEnd);
    return () => {
      clearTimeout(wheelZoomEndTimeout);
      element.removeEventListener("wheel", onWheel);
      element.removeEventListener("gesturestart", onGestureStart);
      element.removeEventListener("gesturechange", onGestureChange);
      element.removeEventListener("gestureend", onGestureEnd);
    };
  }, [elementRef, onPan, onZoom, onZoomEnd]);
};
