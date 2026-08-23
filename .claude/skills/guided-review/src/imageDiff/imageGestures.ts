/* The zoomable, pannable image stage and every gesture over it.
 *
 * Pointer events carry mouse and touch alike: a drag pans (or moves the swipe
 * divider when the swipe comparison is showing and the drag starts near it),
 * two fingers pinch-zoom, a double tap resets to fit. Wheel events are split
 * by a device heuristic: a mechanical wheel can only ever turn on one axis,
 * so any horizontal delta at all is trackpad input and pans; a purely
 * vertical delta is a real wheel and zooms at the cursor - deltaY's magnitude
 * can't be trusted for this on its own, since macOS smooths even a plain
 * wheel mouse into small deltas indistinguishable from a trackpad's. Line/
 * page-mode deltas only ever come from a real wheel too. ctrl/⌘-wheel always
 * zooms - macOS delivers trackpad pinch exactly that way.
 */

type Point = { x: number; y: number };

/** a rectangle to frame, in the pixel space of the image */
export type FrameRegion = { x: number; y: number; width: number; height: number };

export type ImageGestures = {
  /** the whole image visible at its fitting scale, centred */
  resetToFit: () => void;
  /** the image's pixel size; sizes the viewport and fits the stage into it */
  setImageSize: (width: number, height: number) => void;
  /** zooms and pans so a region of the image fills the viewport */
  frameRegion: (region: FrameRegion) => void;
  /** re-applies the divider position to the clipped layer */
  applySwipeClip: () => void;
  dispose: () => void;
};

export type AttachImageGesturesProps = {
  viewport: HTMLElement;
  stage: HTMLElement;
  /** the "from" layer, clipped at the divider while swiping */
  clippedLayer: HTMLElement;
  divider: HTMLElement;
  /** whether the swipe comparison is on screen - a drag starting near the
      divider then moves it rather than panning */
  isSwipeShowing: () => boolean;
};

const maxScale = 64;
const doubleTapMillis = 300;
const doubleTapSlopPx = 20;
/** how close to the divider a drag has to start to grab it instead of panning */
const dividerGrabPx = 24;
/** how long after trackpad-looking wheel input a coarse delta is still read as
    trackpad momentum rather than as a mouse wheel */
const trackpadQuietMillis = 400;
const wheelStepFactor = 1.2;
const pinchWheelFactor = 0.01;
const viewportHeightShare = 0.7;
const viewportMinHeightPx = 160;

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const midpoint = (a: Point, b: Point): Point => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

export const attachImageGestures = ({
  viewport,
  stage,
  clippedLayer,
  divider,
  isSwipeShowing,
}: AttachImageGesturesProps): ImageGestures => {
  let imageWidth = 0;
  let imageHeight = 0;
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  /** how far across the image the swipe divider sits, 0 to 100 */
  let swipePercent = 50;
  /** whether any gesture has moved the view since the last fit */
  let touched = false;

  const pointers = new Map<number, Point>();
  let gestureMode: "pan" | "pinch" | "swipe" | undefined;
  let panStart: Point = { x: 0, y: 0 };
  let panStartTranslate: Point = { x: 0, y: 0 };
  let pinchStartDistance = 0;
  let pinchStartScale = 1;
  let pinchStagePoint: Point = { x: 0, y: 0 };
  let lastTap: (Point & { time: number }) | undefined;
  let trackpadSeenAt = -Infinity;

  const abort = new AbortController();
  const { signal } = abort;

  const stageBaseWidth = () => viewport.clientWidth;
  const stageBaseHeight = () =>
    imageWidth === 0 ? viewport.clientHeight : (stageBaseWidth() * imageHeight) / imageWidth;
  const fitScale = () => {
    const baseHeight = stageBaseHeight();
    return baseHeight === 0 ? 1 : Math.min(1, viewport.clientHeight / baseHeight);
  };
  const minScale = () => fitScale() * 0.2;
  const clampScale = (candidate: number) =>
    Math.min(maxScale, Math.max(minScale(), candidate));

  const applyTransform = () => {
    stage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  };

  const resetToFit = () => {
    scale = fitScale();
    translateX = (viewport.clientWidth - stageBaseWidth() * scale) / 2;
    translateY = (viewport.clientHeight - stageBaseHeight() * scale) / 2;
    touched = false;
    applyTransform();
  };

  const toLocal = (event: { clientX: number; clientY: number }): Point => {
    const rect = viewport.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const screenToStagePoint = (localPoint: Point): Point => ({
    x: (localPoint.x - translateX) / scale,
    y: (localPoint.y - translateY) / scale,
  });

  const zoomAt = (localPoint: Point, factor: number) => {
    const nextScale = clampScale(scale * factor);
    const stagePoint = screenToStagePoint(localPoint);
    translateX = localPoint.x - stagePoint.x * nextScale;
    translateY = localPoint.y - stagePoint.y * nextScale;
    scale = nextScale;
    touched = true;
    applyTransform();
  };

  const applySwipeClip = () => {
    clippedLayer.style.clipPath = `inset(0 ${100 - swipePercent}% 0 0)`;
    divider.style.left = `${swipePercent}%`;
  };

  const setSwipeFromClientX = (clientX: number) => {
    const stageRect = stage.getBoundingClientRect();
    swipePercent = Math.min(
      100,
      Math.max(0, ((clientX - stageRect.left) / stageRect.width) * 100),
    );
    applySwipeClip();
  };

  const nearDivider = (clientX: number): boolean => {
    const stageRect = stage.getBoundingClientRect();
    const dividerX = stageRect.left + (stageRect.width * swipePercent) / 100;
    return Math.abs(clientX - dividerX) <= dividerGrabPx;
  };

  const startPan = (point: Point) => {
    gestureMode = "pan";
    panStart = point;
    panStartTranslate = { x: translateX, y: translateY };
  };

  viewport.addEventListener(
    "pointerdown",
    (event) => {
      // capture keeps move/up arriving once the pointer leaves the viewport;
      // losing it degrades the gesture, never breaks it
      try {
        viewport.setPointerCapture(event.pointerId);
      } catch {
        // no-op: tracking below still works without capture
      }
      const point = toLocal(event);
      pointers.set(event.pointerId, point);
      event.preventDefault();

      if (pointers.size === 1) {
        const now = performance.now();
        if (
          lastTap !== undefined &&
          now - lastTap.time < doubleTapMillis &&
          distance(point, lastTap) < doubleTapSlopPx
        ) {
          resetToFit();
          lastTap = undefined;
          gestureMode = undefined;
          return;
        }
        lastTap = { time: now, x: point.x, y: point.y };

        if (isSwipeShowing() && nearDivider(event.clientX)) {
          gestureMode = "swipe";
          setSwipeFromClientX(event.clientX);
        } else {
          startPan(point);
        }
      } else if (pointers.size === 2) {
        const [firstPointer, secondPointer] = [...pointers.values()];
        if (firstPointer === undefined || secondPointer === undefined) {
          return;
        }
        gestureMode = "pinch";
        pinchStartDistance = distance(firstPointer, secondPointer);
        pinchStartScale = scale;
        pinchStagePoint = screenToStagePoint(midpoint(firstPointer, secondPointer));
      }
    },
    { signal },
  );

  viewport.addEventListener(
    "pointermove",
    (event) => {
      const trackedPoint = pointers.get(event.pointerId);
      if (trackedPoint === undefined) {
        return;
      }
      const point = toLocal(event);
      pointers.set(event.pointerId, point);
      event.preventDefault();

      if (gestureMode === "swipe" && pointers.size === 1) {
        setSwipeFromClientX(event.clientX);
      } else if (gestureMode === "pan" && pointers.size === 1) {
        translateX = panStartTranslate.x + (point.x - panStart.x);
        translateY = panStartTranslate.y + (point.y - panStart.y);
        touched = true;
        applyTransform();
      } else if (gestureMode === "pinch" && pointers.size === 2) {
        const [firstPointer, secondPointer] = [...pointers.values()];
        if (firstPointer === undefined || secondPointer === undefined) {
          return;
        }
        const spread = distance(firstPointer, secondPointer);
        scale = clampScale(pinchStartScale * (spread / pinchStartDistance));
        const mid = midpoint(firstPointer, secondPointer);
        translateX = mid.x - pinchStagePoint.x * scale;
        translateY = mid.y - pinchStagePoint.y * scale;
        touched = true;
        applyTransform();
      }
    },
    { signal },
  );

  const endPointer = (event: PointerEvent) => {
    pointers.delete(event.pointerId);
    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
    if (pointers.size === 0) {
      gestureMode = undefined;
    } else if (pointers.size === 1) {
      // a pinch losing one finger becomes a pan from where the survivor is
      const [remainingPoint] = [...pointers.values()];
      if (remainingPoint !== undefined) {
        startPan(remainingPoint);
      }
    }
  };
  viewport.addEventListener("pointerup", endPointer, { signal });
  viewport.addEventListener("pointercancel", endPointer, { signal });

  const looksLikeTrackpad = (event: WheelEvent): boolean => event.deltaX !== 0;

  viewport.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      const local = toLocal(event);

      // macOS delivers trackpad pinch as ctrl+wheel; a held ctrl/⌘ lets a
      // mouse wheel zoom deliberately too
      if (event.ctrlKey || event.metaKey) {
        zoomAt(local, Math.exp(-event.deltaY * pinchWheelFactor));
        return;
      }
      // line/page deltas only come from real wheels
      if (event.deltaMode !== 0) {
        zoomAt(local, event.deltaY < 0 ? wheelStepFactor : 1 / wheelStepFactor);
        return;
      }
      const now = performance.now();
      if (looksLikeTrackpad(event)) {
        trackpadSeenAt = now;
      }
      if (looksLikeTrackpad(event) || now - trackpadSeenAt < trackpadQuietMillis) {
        translateX -= event.deltaX;
        translateY -= event.deltaY;
        touched = true;
        applyTransform();
      } else {
        zoomAt(local, event.deltaY < 0 ? wheelStepFactor : 1 / wheelStepFactor);
      }
    },
    { signal, passive: false },
  );

  // the pane can be resized under the stage (the contents split, a window
  // resize); an untouched view refits, a deliberately-framed one is left alone
  const viewportSizer = new ResizeObserver(() => {
    if (viewport.clientWidth === 0 || imageWidth === 0) {
      return;
    }
    sizeViewport();
    if (!touched) {
      resetToFit();
    }
  });
  viewportSizer.observe(viewport);

  const sizeViewport = () => {
    stage.style.aspectRatio = `${imageWidth} / ${imageHeight}`;
    viewport.style.height = `${Math.round(
      Math.min(
        window.innerHeight * viewportHeightShare,
        Math.max(viewportMinHeightPx, stageBaseHeight()),
      ),
    )}px`;
  };

  return {
    resetToFit,
    applySwipeClip,
    setImageSize(width, height) {
      imageWidth = width;
      imageHeight = height;
      sizeViewport();
      resetToFit();
    },
    frameRegion(region) {
      if (imageWidth === 0) {
        return;
      }
      const marginX = Math.max(region.width * 0.08, 4);
      const marginY = Math.max(region.height * 0.08, 4);
      const regionX = Math.max(0, region.x - marginX);
      const regionY = Math.max(0, region.y - marginY);
      const regionWidth = Math.min(imageWidth - regionX, region.width + marginX * 2);
      const regionHeight = Math.min(imageHeight - regionY, region.height + marginY * 2);

      // image px -> stage px is uniform on both axes: the stage is laid out at
      // the image's own aspect ratio
      const stagePxPerImagePx = stageBaseWidth() / imageWidth;
      const boxWidth = regionWidth * stagePxPerImagePx;
      const boxHeight = regionHeight * stagePxPerImagePx;

      scale = clampScale(
        Math.min(viewport.clientWidth / boxWidth, viewport.clientHeight / boxHeight),
      );
      const centreX = (regionX * stagePxPerImagePx + boxWidth / 2) * scale;
      const centreY = (regionY * stagePxPerImagePx + boxHeight / 2) * scale;
      translateX = viewport.clientWidth / 2 - centreX;
      translateY = viewport.clientHeight / 2 - centreY;
      touched = true;
      applyTransform();
    },
    dispose() {
      abort.abort();
      viewportSizer.disconnect();
    },
  };
};
