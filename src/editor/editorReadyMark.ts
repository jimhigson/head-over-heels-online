const pendingParts = new Set(["monaco", "map"]);
let marked = false;

/**
 * readiness signal for network-cost measurement (true-site-size): the editor
 * counts as ready only once both the monaco json editor and the map have
 * loaded, since both load asynchronously after the shell mounts
 */
export const editorPartReady = (part: "map" | "monaco") => {
  if (marked) {
    return;
  }
  pendingParts.delete(part);
  if (pendingParts.size === 0) {
    marked = true;
    performance.mark("editor-ready");
  }
};
