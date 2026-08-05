import { type VersionKey } from "../reportData";
import { getDiffResult } from "./computeDiff";
import {
  type ComparisonSide,
  createVersionChooser,
  type VersionSelection,
} from "./createVersionChooser";
import { createViewport } from "./createViewport";
import { initHostChromeResilience } from "./initHostChromeResilience";
import {
  getRowBlobs,
  getVersionDataUri,
  reportMeta,
  rowsMeta,
} from "./rowData";
import {
  diffCountReadout,
  layerDiff,
  layerFrom,
  layerTo,
  modeButtons,
  overlayCheckbox,
  rowSelect,
  sortSelect,
  stage,
  swapButton,
  swipeDivider,
  swipeLabelLeft,
  swipeLabelRight,
  zoomDiffButton,
} from "./viewerElements";

/** how the chosen pair of versions is put on screen */
const viewModes = ["from", "to", "diff", "swipe"] as const;

type ViewMode = (typeof viewModes)[number];

const isViewMode = (value: string): value is ViewMode =>
  viewModes.some((mode) => mode === value);

/** modes needing two distinct versions to show anything */
const isPairMode = (mode: ViewMode) => mode === "diff" || mode === "swipe";

const viewModeOfKey = {
  d: "diff",
  f: "from",
  s: "swipe",
  t: "to",
} as const satisfies { [key: string]: ViewMode };

const isViewModeKey = (key: string): key is keyof typeof viewModeOfKey =>
  key in viewModeOfKey;

let currentRowIndex = 0;
let viewMode: ViewMode = "to";
let applyViewRequestId = 0;

const showVersionOnLayer = (layer: HTMLImageElement, version: VersionKey) => {
  layer.src = getVersionDataUri(currentRowIndex, version);
  layer.style.display = "block";
};

/**
 * Puts the chosen pair on screen in the current mode, and keeps every control's
 * enabled/active state in step with what the mode and the pair allow. Diffs are
 * awaited, so a stale request that resolves after a newer one bails out.
 */
const applyView = async () => {
  const requestId = ++applyViewRequestId;
  const { from, to } = chooser.selection();
  // a row can only offer one version at all if every other version of the file
  // is missing at its ref; there is then nothing to compare it against
  const comparable = from !== to;

  for (const button of modeButtons) {
    const buttonMode = button.dataset.mode;
    button.classList.toggle("active", buttonMode === viewMode);
    button.disabled =
      !comparable &&
      buttonMode !== undefined &&
      isViewMode(buttonMode) &&
      isPairMode(buttonMode);
  }
  overlayCheckbox.disabled = !comparable || viewMode !== "swipe";
  zoomDiffButton.disabled = !comparable;
  swapButton.disabled = !comparable;

  layerFrom.style.display = "none";
  layerTo.style.display = "none";
  layerDiff.style.display = "none";
  layerFrom.style.clipPath = "";
  swipeDivider.style.display = "none";

  if (viewMode === "from" || viewMode === "to") {
    showVersionOnLayer(
      viewMode === "from" ? layerFrom : layerTo,
      viewMode === "from" ? from : to,
    );
    diffCountReadout.textContent = "";
    return;
  }

  if (viewMode === "swipe") {
    showVersionOnLayer(layerTo, to);
    showVersionOnLayer(layerFrom, from);
    swipeLabelLeft.textContent = from;
    swipeLabelRight.textContent = to;
    swipeDivider.style.display = "block";
    viewportView.applySwipeClip();
    if (!overlayCheckbox.checked) {
      diffCountReadout.textContent = "";
      return;
    }
  }

  const result = await getDiffResult(currentRowIndex, from, to);
  if (requestId !== applyViewRequestId) {
    return;
  }
  layerDiff.src = result.dataUri;
  layerDiff.style.display = "block";
  diffCountReadout.textContent = `${result.count}px`;
};

const onSelectionChange = (selection: VersionSelection) => {
  // solo modes stay meaningful whatever is chosen, but a pair comparison of a
  // row with only one version has nothing to show:
  if (selection.from === selection.to && viewMode !== "from") {
    viewMode = "to";
  }
  applyView();
};

const chooser = createVersionChooser({
  baseVersion: reportMeta.baseVersion,
  onChange: onSelectionChange,
});

const viewportView = createViewport({
  isSwipeShowing: () => viewMode === "swipe",
});

const zoomToDiff = async () => {
  const { from, to } = chooser.selection();
  if (from === to) {
    return;
  }
  const result = await getDiffResult(currentRowIndex, from, to);
  diffCountReadout.textContent = `${result.count}px`;
  if (result.box !== undefined) {
    viewportView.frameRegion(result.box, result.width, result.height);
  }
};

const showRow = (index: number) => {
  currentRowIndex =
    ((index % rowsMeta.length) + rowsMeta.length) % rowsMeta.length;
  const meta = rowsMeta[currentRowIndex];

  stage.style.aspectRatio = `${meta.width} / ${meta.height}`;
  rowSelect.value = String(currentRowIndex);
  diffCountReadout.textContent = "";
  viewportView.resetTransform();
  // re-targeting the chooser fires its change callback, which renders the view:
  chooser.showVersionsOfRow(getRowBlobs(currentRowIndex).versions);
};

const setViewMode = (mode: ViewMode) => {
  const { from, to } = chooser.selection();
  if (from === to && isPairMode(mode)) {
    return;
  }
  viewMode = mode;
  applyView();
};

const stepRow = (delta: number) => {
  const optionCount = rowSelect.options.length;
  rowSelect.selectedIndex =
    (((rowSelect.selectedIndex + delta) % optionCount) + optionCount) %
    optionCount;
  showRow(Number(rowSelect.value));
};

const rebuildRowSelect = () => {
  const previousValue = rowSelect.value;
  rowSelect.replaceChildren();
  if (sortSelect.value === "name") {
    const indicesByGroup = new Map<string, Array<number>>();
    for (const [index, meta] of rowsMeta.entries()) {
      const label = `${meta.project} / ${meta.scenario}`;
      const existing = indicesByGroup.get(label);
      if (existing === undefined) {
        indicesByGroup.set(label, [index]);
      } else {
        existing.push(index);
      }
    }
    for (const [label, indices] of indicesByGroup) {
      const optgroup = document.createElement("optgroup");
      optgroup.label = label;
      for (const index of indices) {
        const option = document.createElement("option");
        option.value = String(index);
        option.textContent = rowsMeta[index].stem;
        optgroup.appendChild(option);
      }
      rowSelect.appendChild(optgroup);
    }
  } else {
    const indices = rowsMeta
      .map((_meta, index) => index)
      .sort(
        (a, b) =>
          rowsMeta[b].baseWorkingDiffCount - rowsMeta[a].baseWorkingDiffCount,
      );
    for (const index of indices) {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = `${rowsMeta[index].stem} — ${rowsMeta[index].baseWorkingDiffCount}px`;
      rowSelect.appendChild(option);
    }
  }
  rowSelect.value = previousValue;
};

rowSelect.addEventListener("change", () => showRow(Number(rowSelect.value)));
sortSelect.addEventListener("change", rebuildRowSelect);
overlayCheckbox.addEventListener("change", applyView);
zoomDiffButton.addEventListener("click", zoomToDiff);
swapButton.addEventListener("click", chooser.swap);

for (const button of modeButtons) {
  const { mode } = button.dataset;
  if (mode !== undefined && isViewMode(mode)) {
    button.addEventListener("click", () => setViewMode(mode));
  }
}

/** number keys pick a version column: plain for the "to" side, shifted for "from" */
const selectVersionByColumnNumber = (
  side: ComparisonSide,
  columnNumber: number,
) => {
  const version = chooser.availableVersions()[columnNumber - 1];
  if (version !== undefined) {
    chooser.select(side, version);
  }
};

document.addEventListener("keydown", (event) => {
  const activeTag = document.activeElement?.tagName;
  if (
    activeTag === "INPUT" ||
    activeTag === "SELECT" ||
    activeTag === "TEXTAREA"
  ) {
    return;
  }
  const digitPressed = /^Digit(?<digit>[1-9])$/.exec(event.code);
  if (digitPressed !== null) {
    selectVersionByColumnNumber(
      event.shiftKey ? "from" : "to",
      Number(digitPressed.groups!.digit),
    );
    return;
  }
  if (isViewModeKey(event.key)) {
    setViewMode(viewModeOfKey[event.key]);
  } else if (event.key === "ArrowLeft") {
    stepRow(-1);
  } else if (event.key === "ArrowRight") {
    stepRow(1);
  } else if (event.key === "x") {
    chooser.swap();
  }
});

initHostChromeResilience();

// every JS-dependent control renders disabled in the static markup and is
// enabled here - so a viewing context that never runs scripts (eg iOS Quick
// Look) shows greyed-out controls rather than dead-looking live ones. The
// chooser's own radios are excluded: which of those are usable depends on the
// current selection, so the chooser decides:
for (const control of document.querySelectorAll<
  HTMLButtonElement | HTMLInputElement | HTMLSelectElement
>(
  "#diffViewerApp button, #diffViewerApp select, #diffViewerApp input:not(.version-radio)",
)) {
  control.disabled = false;
}
chooser.setEnabled(true);

// the row dropdown's initial (name-sorted) options are static markup;
// rebuildRowSelect only runs when the sort changes:
showRow(0);
