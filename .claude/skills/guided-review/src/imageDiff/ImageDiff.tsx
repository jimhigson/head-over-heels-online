import { useEffect, useMemo, useRef, useState } from "preact/hooks";

import { type ImageRow } from "../ReviewPayload.ts";
import { imageBlobUris } from "./imageBlobs.ts";
import { type ImageDiffRender, renderImageDiff } from "./imageDiffCompute.ts";
import { attachImageGestures, type ImageGestures } from "./imageGestures.ts";
import { type ChooserSide, VersionChooser } from "./VersionChooser.tsx";

/** how the chosen pair of versions is put on screen */
type ImageMode = "diff" | "flick" | "from" | "swipe" | "to";

const imageModes = ["from", "to", "diff", "swipe", "flick"] as const;

/** modes needing two distinct versions to show anything */
const isPairMode = (mode: ImageMode): boolean =>
  mode === "diff" || mode === "swipe" || mode === "flick";

/** how fast flick mode alternates between the two versions */
const flickIntervalMs = 600;

export type ImageDiffProps = { path: string; row: ImageRow };

/**
 * One image file's comparison panel: the version chooser, the mode strip
 * (from | to | diff | swipe | flick, plus the diff overlay), and the pan/zoom
 * stage. The diff itself is computed here in the page, so any pair of
 * versions can be compared, not only the pair the review was built around.
 */
export const ImageDiff = ({ path, row }: ImageDiffProps) => {
  const [fromIndex, setFromIndex] = useState(row.from);
  const [toIndex, setToIndex] = useState(row.to);
  const [mode, setMode] = useState<ImageMode>("to");
  const [overlay, setOverlay] = useState(false);
  const [flickShowing, setFlickShowing] = useState<ChooserSide>("to");
  const [diffState, setDiffState] = useState<
    { key: string; render: ImageDiffRender } | undefined
  >(undefined);

  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fromLayerRef = useRef<HTMLImageElement>(null);
  const toLayerRef = useRef<HTMLImageElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const gesturesRef = useRef<ImageGestures | undefined>(undefined);
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const sizedAs = useRef("");

  const uris = useMemo(() => imageBlobUris(path, true), [path]);
  const { versions } = row;
  const fromVersion = versions[fromIndex];
  const toVersion = versions[toIndex];

  const adoptImageSize = (image: HTMLImageElement) => {
    if (image.naturalWidth === 0) {
      return;
    }
    const size = `${image.naturalWidth}x${image.naturalHeight}`;
    if (sizedAs.current === size) {
      return;
    }
    sizedAs.current = size;
    gesturesRef.current?.setImageSize(image.naturalWidth, image.naturalHeight);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    const clippedLayer = fromLayerRef.current;
    const divider = dividerRef.current;
    if (viewport === null || stage === null || clippedLayer === null || divider === null) {
      return;
    }
    const gestures = attachImageGestures({
      viewport,
      stage,
      clippedLayer,
      divider,
      isSwipeShowing: () => modeRef.current === "swipe",
    });
    gesturesRef.current = gestures;
    // a data uri can finish decoding before this effect ran, in which case the
    // load event already came and went
    const toLayer = toLayerRef.current;
    if (toLayer !== null && toLayer.naturalWidth > 0) {
      sizedAs.current = `${toLayer.naturalWidth}x${toLayer.naturalHeight}`;
      gestures.setImageSize(toLayer.naturalWidth, toLayer.naturalHeight);
    }
    return () => {
      gestures.dispose();
      gesturesRef.current = undefined;
    };
  }, []);

  // the swipe clip belongs to the swipe view only; anywhere else the from
  // layer shows whole
  useEffect(() => {
    if (mode === "swipe") {
      gesturesRef.current?.applySwipeClip();
      return;
    }
    const fromLayer = fromLayerRef.current;
    if (fromLayer !== null) {
      fromLayer.style.clipPath = "";
    }
  }, [mode]);

  // flick alternates the two layers on a timer rather than showing both at
  // once, so a real difference reads as motion instead of a static overlay
  useEffect(() => {
    if (mode !== "flick") {
      return;
    }
    setFlickShowing("to");
    const timer = setInterval(() => {
      setFlickShowing((showing) => (showing === "to" ? "from" : "to"));
    }, flickIntervalMs);
    return () => clearInterval(timer);
  }, [mode]);

  const fromBlob = fromVersion?.blob;
  const toBlob = toVersion?.blob;
  // keyed by the row's block, not its path: in a stack page the same path can
  // appear in several reviews with different content
  const diffKey =
    fromBlob === undefined || toBlob === undefined ?
      ""
    : `${row.block}|${Math.min(fromBlob, toBlob)}|${Math.max(fromBlob, toBlob)}`;

  // the overlay only adds anything over a single version: diff mode IS the
  // overlay, and swipe already shows the pair
  const overlayApplies = mode === "from" || mode === "to";

  const diffWanted = (mode === "diff" || (overlay && overlayApplies)) && fromIndex !== toIndex;

  useEffect(() => {
    if (!diffWanted || diffKey === "") {
      return;
    }
    const fromUri = uris[fromBlob ?? -1];
    const toUri = uris[toBlob ?? -1];
    if (fromUri === undefined || toUri === undefined) {
      return;
    }
    let live = true;
    renderImageDiff(diffKey, fromUri, toUri).then((render) => {
      if (live) {
        setDiffState({ key: diffKey, render });
      }
    });
    return () => {
      live = false;
    };
  }, [diffWanted, diffKey, fromBlob, toBlob, uris]);

  if (fromVersion === undefined || toVersion === undefined) {
    return null;
  }

  const comparable = versions.length > 1;
  const diffReady = diffState !== undefined && diffState.key === diffKey;

  const pick = (side: ChooserSide, index: number) => {
    if (side === "from") {
      if (index === toIndex) {
        return;
      }
      setFromIndex(index);
    } else {
      if (index === fromIndex) {
        return;
      }
      setToIndex(index);
    }
  };

  const swap = () => {
    setFromIndex(toIndex);
    setToIndex(fromIndex);
  };

  const zoomToDiff = async () => {
    const fromUri = uris[fromVersion.blob];
    const toUri = uris[toVersion.blob];
    if (fromUri === undefined || toUri === undefined) {
      return;
    }
    const render = await renderImageDiff(diffKey, fromUri, toUri);
    setDiffState({ key: diffKey, render });
    if (render.box !== undefined) {
      gesturesRef.current?.frameRegion(render.box);
    }
  };

  const showFromLayer =
    mode === "from" || mode === "swipe" || (mode === "flick" && flickShowing === "from");
  const showToLayer =
    mode === "to" || mode === "swipe" || (mode === "flick" && flickShowing === "to");
  const showDiffLayer =
    diffReady && (mode === "diff" || (overlay && overlayApplies && fromIndex !== toIndex));

  const readout =
    diffReady && (mode === "diff" || (overlay && overlayApplies)) ?
      `${diffState.render.count.toLocaleString("en-GB")}px · ${((diffState.render.count / diffState.render.total) * 100).toFixed(diffState.render.count === 0 ? 0 : 2)}%`
    : mode === "flick" ?
      (flickShowing === "to" ? toVersion.label : fromVersion.label)
    : "";

  return (
    <div class="img-diff">
      <div class="img-toolbar">
        <VersionChooser versions={versions} from={fromIndex} to={toIndex} onPick={pick} />
        <button
          type="button"
          class="control img-swap"
          title="swap from and to"
          aria-label="swap from and to"
          disabled={!comparable}
          onClick={swap}
        >
          ⇄
        </button>
        <div class="img-modes" role="group" aria-label="How the pair is shown">
          {imageModes.map((candidate) => (
            <button
              key={candidate}
              type="button"
              class={`control img-mode ${mode === candidate ? "is-active" : ""}`}
              disabled={isPairMode(candidate) && !comparable}
              aria-pressed={mode === candidate}
              onClick={() => {
                setMode(candidate);
                // a mode that disables the overlay also unticks it, so no
                // hidden state comes back to surprise on the next mode
                if (isPairMode(candidate)) {
                  setOverlay(false);
                }
              }}
            >
              {candidate}
            </button>
          ))}
        </div>
        <label class="img-overlay">
          <input
            type="checkbox"
            checked={overlay}
            disabled={!comparable || !overlayApplies}
            onChange={(event) => setOverlay(event.currentTarget.checked)}
          />
          overlay
        </label>
        <button
          type="button"
          class="control"
          disabled={!comparable}
          onClick={() => {
            zoomToDiff();
          }}
        >
          zoom diff
        </button>
        <button type="button" class="control" onClick={() => gesturesRef.current?.resetToFit()}>
          fit
        </button>
        <span class="img-readout">{readout}</span>
      </div>

      <div class="img-viewport" ref={viewportRef}>
        <div class="img-stage" ref={stageRef}>
          <img
            class="img-layer img-layer-to"
            ref={toLayerRef}
            src={uris[toVersion.blob]}
            alt={`${path} — ${toVersion.label}`}
            draggable={false}
            style={{ display: showToLayer ? "block" : "none" }}
            onLoad={(event) => adoptImageSize(event.currentTarget)}
          />
          <img
            class="img-layer img-layer-from"
            ref={fromLayerRef}
            src={uris[fromVersion.blob]}
            alt={`${path} — ${fromVersion.label}`}
            draggable={false}
            style={{ display: showFromLayer ? "block" : "none" }}
          />
          <img
            class="img-layer img-layer-diff"
            src={diffReady ? diffState.render.dataUri : undefined}
            alt="differing pixels"
            draggable={false}
            style={{ display: showDiffLayer ? "block" : "none" }}
          />
          <div
            class="img-divider"
            ref={dividerRef}
            style={{ display: mode === "swipe" ? "block" : "none" }}
          >
            <span class="img-swipe-label img-swipe-left">{fromVersion.label}</span>
            <span class="img-swipe-label img-swipe-right">{toVersion.label}</span>
          </div>
        </div>
      </div>

      <p class="img-hint">
        drag to pan · pinch or ctrl-scroll to zoom · double-tap to fit
        {mode === "swipe" ? " · drag the line to sweep" : ""}
        {mode === "flick" ? ` · flicking from/to every ${flickIntervalMs}ms` : ""}
      </p>
    </div>
  );
};

export type ImagePanelProps = { path: string; row: ImageRow };

/** the fold-out panel of an image row: the comparison, or why there isn't one */
export const ImagePanel = ({ path, row }: ImagePanelProps) => {
  if (row.versions.length === 0) {
    return (
      <p class="img-omitted">
        not embedded — this review was built past its <code>--max-images</code> cap
      </p>
    );
  }
  return <ImageDiff path={path} row={row} />;
};
