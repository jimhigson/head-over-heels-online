import { layerFrom, stage, swipeDivider, viewport } from "./viewerElements";

type Point = { x: number; y: number };

/** a rectangle to frame, in the pixel space of the image it came from */
export type Region = { x: number; y: number; width: number; height: number };

export type Viewport = {
  resetTransform: () => void;
  /**
   * zooms and pans so a region of the image fills the viewport, using the same
   * transform state as pinch-zoom
   */
  frameRegion: (
    region: Region,
    /** width of the pixel space `region` is measured in */
    spaceWidth: number,
    /** height of the pixel space `region` is measured in */
    spaceHeight: number,
  ) => void;
  /** re-applies the current divider position to the clipped layer */
  applySwipeClip: () => void;
};

export type CreateViewportProps = {
  /** whether a one-finger drag moves the swipe divider rather than panning */
  isSwipeShowing: () => boolean;
};

const minScale = 1;
const maxScale = 10;
const doubleTapMillis = 300;
const doubleTapSlopPx = 20;

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const midpoint = (a: Point, b: Point) => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

/**
 * The zoomable, pannable image stage and the gestures over it (Pointer Events,
 * so mouse and touch alike): one finger drags the swipe divider when the swipe
 * comparison is on screen and pans otherwise, two fingers pinch-zoom in every
 * mode, and a double tap resets.
 */
export const createViewport = ({
  isSwipeShowing,
}: CreateViewportProps): Viewport => {
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  /** how far across the image the swipe divider sits, 0 to 100 */
  let swipePercent = 50;

  const pointers = new Map<number, Point>();
  let gestureMode: "pan" | "pinch" | "swipe" | undefined;
  let panStart: Point = { x: 0, y: 0 };
  let panStartTranslate: Point = { x: 0, y: 0 };
  let pinchStartDistance = 0;
  let pinchStartScale = 1;
  let pinchStagePoint: Point = { x: 0, y: 0 };
  let lastTap: (Point & { time: number }) | undefined;

  const applyTransform = () => {
    stage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  };

  const resetTransform = () => {
    scale = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
  };

  const toViewportLocal = (event: PointerEvent): Point => {
    const rect = viewport.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const screenToStagePoint = (localPoint: Point): Point => ({
    x: (localPoint.x - translateX) / scale,
    y: (localPoint.y - translateY) / scale,
  });

  const applySwipeClip = () => {
    layerFrom.style.clipPath = `inset(0 ${100 - swipePercent}% 0 0)`;
    swipeDivider.style.left = `${swipePercent}%`;
  };

  const setSwipeFromLocalPoint = (localPoint: Point) => {
    const stageWidth = viewport.getBoundingClientRect().width;
    const stagePoint = screenToStagePoint(localPoint);
    swipePercent = Math.min(
      100,
      Math.max(0, (stagePoint.x / stageWidth) * 100),
    );
    applySwipeClip();
  };

  const startPan = (point: Point) => {
    gestureMode = "pan";
    panStart = point;
    panStartTranslate = { x: translateX, y: translateY };
  };

  viewport.addEventListener("pointerdown", (event) => {
    // Pointer capture keeps move/up events arriving even if the finger leaves
    // the element's bounds; its absence shouldn't stop gesture tracking, so a
    // capture failure here is swallowed, not fatal.
    try {
      viewport.setPointerCapture(event.pointerId);
    } catch {
      // no-op: gesture tracking below still works without capture
    }
    const point = toViewportLocal(event);
    pointers.set(event.pointerId, point);
    event.preventDefault();

    if (pointers.size === 1) {
      const now = Date.now();
      if (
        lastTap !== undefined &&
        now - lastTap.time < doubleTapMillis &&
        distance(point, lastTap) < doubleTapSlopPx
      ) {
        resetTransform();
        lastTap = undefined;
        gestureMode = undefined;
        return;
      }
      lastTap = { time: now, x: point.x, y: point.y };

      if (isSwipeShowing()) {
        gestureMode = "swipe";
        setSwipeFromLocalPoint(point);
      } else {
        startPan(point);
      }
    } else if (pointers.size === 2) {
      gestureMode = "pinch";
      const [firstPointer, secondPointer] = [...pointers.values()];
      pinchStartDistance = distance(firstPointer, secondPointer);
      pinchStartScale = scale;
      pinchStagePoint = screenToStagePoint(
        midpoint(firstPointer, secondPointer),
      );
    }
  });

  viewport.addEventListener("pointermove", (event) => {
    const trackedPoint = pointers.get(event.pointerId);
    if (trackedPoint === undefined) {
      return;
    }
    const point = toViewportLocal(event);
    pointers.set(event.pointerId, point);
    event.preventDefault();

    if (gestureMode === "swipe" && pointers.size === 1) {
      setSwipeFromLocalPoint(point);
    } else if (gestureMode === "pan" && pointers.size === 1) {
      translateX = panStartTranslate.x + (point.x - panStart.x);
      translateY = panStartTranslate.y + (point.y - panStart.y);
      applyTransform();
    } else if (gestureMode === "pinch" && pointers.size === 2) {
      const [firstPointer, secondPointer] = [...pointers.values()];
      const spread = distance(firstPointer, secondPointer);
      scale = Math.min(
        maxScale,
        Math.max(minScale, pinchStartScale * (spread / pinchStartDistance)),
      );
      const mid = midpoint(firstPointer, secondPointer);
      translateX = mid.x - pinchStagePoint.x * scale;
      translateY = mid.y - pinchStagePoint.y * scale;
      applyTransform();
    }
  });

  const endPointer = (event: PointerEvent) => {
    pointers.delete(event.pointerId);
    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
    if (pointers.size === 0) {
      gestureMode = undefined;
    } else if (pointers.size === 1) {
      const [remainingPoint] = [...pointers.values()];
      if (isSwipeShowing()) {
        gestureMode = "swipe";
      } else {
        startPan(remainingPoint);
      }
    }
  };
  viewport.addEventListener("pointerup", endPointer);
  viewport.addEventListener("pointercancel", endPointer);

  return {
    resetTransform,
    applySwipeClip,
    frameRegion(region, spaceWidth, spaceHeight) {
      const marginX = Math.max(region.width * 0.08, 4);
      const marginY = Math.max(region.height * 0.08, 4);
      const regionX = Math.max(0, region.x - marginX);
      const regionY = Math.max(0, region.y - marginY);
      const regionWidth = Math.min(
        spaceWidth - regionX,
        region.width + marginX * 2,
      );
      const regionHeight = Math.min(
        spaceHeight - regionY,
        region.height + marginY * 2,
      );

      const viewportRect = viewport.getBoundingClientRect();
      // image px -> stage px is uniform on both axes, since the stage is laid
      // out at the image's own aspect ratio:
      const stagePxPerImagePx = viewportRect.width / spaceWidth;
      const boxWidth = regionWidth * stagePxPerImagePx;
      const boxHeight = regionHeight * stagePxPerImagePx;

      scale = Math.min(
        maxScale,
        Math.max(
          minScale,
          Math.min(
            viewportRect.width / boxWidth,
            viewportRect.height / boxHeight,
          ),
        ),
      );
      const centreX = (regionX * stagePxPerImagePx + boxWidth / 2) * scale;
      const centreY = (regionY * stagePxPerImagePx + boxHeight / 2) * scale;
      translateX = viewportRect.width / 2 - centreX;
      translateY = viewportRect.height / 2 - centreY;
      applyTransform();
    },
  };
};
