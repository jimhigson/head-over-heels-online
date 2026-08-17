import { useCallback, useEffect, useRef, useState } from "preact/hooks";

import {
  type GlyphOverride,
  type PixelKey,
  pixelKey,
  type VectorContour,
  type VectorShape,
} from "../geometry/glyphOverrides";
import { type PixelRules, rulesAt } from "../geometry/pixelRuleIndex";
import { settingAt } from "../geometry/ruleEnablement";
import { slopeLabel, slopeOf } from "../geometry/slopes";
import { movePoint, translateSide } from "../geometry/vectorEdits";
import { contoursPath } from "./contourPath";
import { PixelCell } from "./PixelCell";
import { type EditorGlyph } from "./useGlyphs";

/** what the pointer is currently working on, if anything */
export type Selection = {
  type: "point" | "shape" | "side";
  shape: number;
  index: number;
};

export type GlyphViewProps = {
  glyph: EditorGlyph;
  shapes: readonly VectorShape[];
  editable: boolean;
  selection: Selection | undefined;
  onSelect: (selection: Selection | undefined) => void;
  onShapeChange: (shapeIndex: number, shape: VectorShape) => void;
  /** the cell whose own rule settings are being edited, if any */
  selectedPixel: PixelKey | undefined;
  onSelectPixel: (pixel: PixelKey | undefined) => void;
  /** which rules bear on which cells, so the useful ones can be picked out */
  pixelRules: Map<PixelKey, PixelRules>;
  override: GlyphOverride | undefined;
  showArt: boolean;
  showOutline: boolean;
  showGrid: boolean;
  /** glyph pixels per screen pixel */
  zoom: number;
};

type Drag = {
  /** whether the whole side is being slid, or one corner moved on its own */
  type: "point" | "side";
  shape: number;
  index: number;
  from: [number, number];
  original: VectorContour;
};

const gridLines = (width: number, height: number) => {
  const lines: Array<[number, number, number, number]> = [];
  for (let x = 0; x <= width; x++) {
    lines.push([x, 0, x, height]);
  }
  for (let y = 0; y <= height; y++) {
    lines.push([0, y, width, y]);
  }
  return lines;
};

/**
 * The glyph as it will be drawn, over the pixel art it came from. The art is
 * the ground truth the outline is judged against, so it sits underneath at
 * full size rather than beside: every place the outline leaves a pixel or
 * covers one it should not is visible directly.
 */
export const GlyphView = ({
  glyph,
  shapes,
  editable,
  selection,
  onSelect,
  onShapeChange,
  selectedPixel,
  onSelectPixel,
  pixelRules,
  override,
  showArt,
  showOutline,
  showGrid,
  zoom,
}: GlyphViewProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [drag, setDrag] = useState<Drag | undefined>(undefined);
  const { w, h } = glyph.frame;
  // a margin of half a cell all round, so a handle sitting on the very edge of
  // a glyph is still whole and still grabbable
  const margin = 0.5;

  const glyphPixelsAt = useCallback(
    (event: PointerEvent): [number, number] => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (rect === undefined) {
        return [0, 0];
      }
      return [
        ((event.clientX - rect.left) / rect.width) * (w + margin * 2) - margin,
        ((event.clientY - rect.top) / rect.height) * (h + margin * 2) - margin,
      ];
    },
    [w, h, margin],
  );

  // the two layers are opposite colours only while both are shown, so that
  // together they sum to white. Alone, a layer has nothing to be told apart
  // from and is simply drawn white
  const bothShown = showArt && showOutline;
  const artColour = bothShown ? "#00ffff" : "#ffffff";
  const outlineColour = bothShown ? "#ff0000" : "#ffffff";

  const isSelected = (type: Selection["type"], shape: number, index: number) =>
    selection?.type === type &&
    selection.shape === shape &&
    selection.index === index;

  const startDrag = (
    event: PointerEvent,
    type: Drag["type"],
    shapeIndex: number,
    index: number,
    contour: VectorContour,
  ) => {
    onSelect({ type, shape: shapeIndex, index });
    if (editable) {
      setDrag({
        type,
        shape: shapeIndex,
        index,
        from: glyphPixelsAt(event),
        original: contour,
      });
    }
  };

  // a drag is followed on the window rather than on the svg, so a side can be
  // dragged past the edge of the glyph and back without being dropped
  useEffect(() => {
    if (drag === undefined) {
      return;
    }
    const move = (event: PointerEvent) => {
      const [x, y] = glyphPixelsAt(event);
      const by: [number, number] = [x - drag.from[0], y - drag.from[1]];
      onShapeChange(
        drag.shape,
        drag.type === "point" ?
          movePoint(drag.original, drag.index, by)
        : translateSide(drag.original, drag.index, by),
      );
    };
    const end = () => setDrag(undefined);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [drag, glyphPixelsAt, onShapeChange]);

  return (
    <svg
      ref={svgRef}
      viewBox={`${-margin} ${-margin} ${w + margin * 2} ${h + margin * 2}`}
      width={(w + margin * 2) * zoom}
      height={(h + margin * 2) * zoom}
      style={{
        touchAction: "none",
        userSelect: "none",
        // the outline blends additively with the art below it, which only
        // works against a backdrop that is part of this element's own stack
        isolation: "isolate",
      }}
    >
      <rect
        x={-margin}
        y={-margin}
        width={w + margin * 2}
        height={h + margin * 2}
        fill="#000"
      />

      {showArt &&
        glyph.bitmap.map((row, y) =>
          row.map((inked, x) =>
            inked ?
              <rect
                key={`${x},${y}`}
                x={x}
                y={y}
                width={1}
                height={1}
                fill={artColour}
              />
            : null,
          ),
        )}

      {/* The drawn outline over the art it came from, added to it rather than
          laid on top: the two are opposite colours, so bare cyan is a pixel
          the outline missed, bare red is the outline overrunning, and
          everywhere the two agree they sum to white */}
      {showOutline && (
        <path
          d={contoursPath(glyph.outline.contours)}
          fill={outlineColour}
          fill-rule="nonzero"
          style={{ mixBlendMode: "plus-lighter" }}
        />
      )}

      {/* every cell is pickable, ink or not: a rule's active site can cover a
          clear cell, and blocking one there is as meaningful as on ink. Only
          the cells some rule bears on are outlined, since nothing said about
          any of the others could change the glyph */}
      {!editable &&
        glyph.bitmap.flatMap((row, y) =>
          row.map((_, x) => {
            const cell = pixelKey(x, y);
            return (
              <PixelCell
                key={cell}
                cell={cell}
                x={x}
                y={y}
                rules={rulesAt(pixelRules, cell)}
                selected={selectedPixel === cell}
                customised={override?.pixelRules?.[cell] !== undefined}
                settingOf={(ruleName) => settingAt(override, cell, ruleName)}
                onSelect={() =>
                  onSelectPixel(selectedPixel === cell ? undefined : cell)
                }
                zoom={zoom}
              />
            );
          }),
        )}

      {/* drawn last so the grid reads over everything, which is what makes it
          possible to say which cell a piece of outline is in */}
      {showGrid &&
        gridLines(w, h).map(([x1, y1, x2, y2]) => (
          <line
            key={`${x1},${y1},${x2},${y2}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#ffffff59"
            stroke-width={4 / zoom}
            pointer-events="none"
          />
        ))}

      {editable &&
        shapes.map((shape, shapeIndex) =>
          shape.type === "circle" ?
            <circle
              key={`circle${shapeIndex}`}
              cx={shape.cell[0] + 0.5}
              cy={shape.cell[1] + 0.5}
              r={0.5}
              fill="none"
              stroke={
                isSelected("shape", shapeIndex, 0) ? "#ff7ea8" : "#7ea8ff"
              }
              stroke-width={6 / zoom}
              onPointerDown={() =>
                onSelect({ type: "shape", shape: shapeIndex, index: 0 })
              }
            />
          : <g key={`contour${shapeIndex}`}>
              {shape.points.map((from, index) => {
                const to = shape.points[(index + 1) % shape.points.length];
                const slope = slopeOf(from, to);
                const curved = (shape.curves ?? []).includes(index);
                return (
                  <g key={`side${index}`}>
                    <line
                      x1={from[0]}
                      y1={from[1]}
                      x2={to[0]}
                      y2={to[1]}
                      stroke={
                        isSelected("side", shapeIndex, index) ? "#ff7ea8"
                        : curved ?
                          "#8de08d"
                        : slope !== undefined ?
                          "#7ea8ff"
                          // aimed between the preferred slopes: allowed, but
                          // named by nothing, so it is drawn as the odd one out
                        : "#c9a0ff"
                      }
                      stroke-width={4 / zoom}
                      stroke-dasharray={curved ? 12 / zoom : undefined}
                    />
                    {slope !== undefined && !curved && (
                      <text
                        x={(from[0] + to[0]) / 2}
                        y={(from[1] + to[1]) / 2}
                        font-size={0.3}
                        text-anchor="middle"
                        dominant-baseline="central"
                        fill="#7ea8ff"
                        pointer-events="none"
                      >
                        {slopeLabel(slope)}
                      </text>
                    )}
                    <line
                      x1={from[0]}
                      y1={from[1]}
                      x2={to[0]}
                      y2={to[1]}
                      stroke="transparent"
                      stroke-width={10 / zoom}
                      style={{ cursor: "move" }}
                      onPointerDown={(event) =>
                        startDrag(event, "side", shapeIndex, index, shape)
                      }
                    />
                  </g>
                );
              })}
              {shape.points.map(([x, y], index) => (
                <circle
                  key={`point${index}`}
                  cx={x}
                  cy={y}
                  r={10 / zoom}
                  fill={
                    isSelected("point", shapeIndex, index) ? "#ff7ea8"
                    : shape.corners?.[String(index)] !== undefined ?
                      "#ffd479"
                    : "#ffffff"
                  }
                  style={{ cursor: "move" }}
                  onPointerDown={(event) =>
                    startDrag(event, "point", shapeIndex, index, shape)
                  }
                />
              ))}
            </g>,
        )}
    </svg>
  );
};
