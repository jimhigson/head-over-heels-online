import { Button } from "../../../src/ui/Button";
import {
  cornerCutKind,
  type CornerTreatment,
  type VectorContour,
  type VectorShape,
} from "../geometry/glyphOverrides";
import { slopeLabel, slopeOf } from "../geometry/slopes";
import {
  removeCorner,
  setCorner,
  splitSide,
  toggleCurve,
  turnSide,
} from "../geometry/vectorEdits";
import { type Selection } from "./GlyphView";

export type VectorPanelProps = {
  shapes: readonly VectorShape[];
  selection: Selection | undefined;
  onShapeChange: (shapeIndex: number, shape: VectorShape) => void;
  onShapesChange: (shapes: VectorShape[]) => void;
  onSelect: (selection: Selection | undefined) => void;
};

/** what a side is running along, or that it is aimed between the named ones */
const sideName = (contour: VectorContour, index: number): string => {
  const { points } = contour;
  const slope = slopeOf(points[index], points[(index + 1) % points.length]);
  return slope === undefined ? "free angle" : slopeLabel(slope);
};

const isRightAngle = (contour: VectorContour, index: number): boolean => {
  const { points } = contour;
  const count = points.length;
  const before = slopeOf(points[(index + count - 1) % count], points[index]);
  const after = slopeOf(points[index], points[(index + 1) % count]);
  if (before === undefined || after === undefined) {
    return false;
  }
  return before[0] * after[0] + before[1] * after[1] === 0;
};

/**
 * What can be done to whatever is selected.
 *
 * The operations here work on whole sides: a side is aimed and slid, and its
 * corners follow to wherever it now meets its neighbours, which is the way to
 * move an outline that keeps the sides either side of a corner at the angles
 * they were drawn at. Corners can also be dragged one at a time, which is the
 * way to reach a shape the preferred slopes cannot describe.
 */
export const VectorPanel = ({
  shapes,
  selection,
  onShapeChange,
  onShapesChange,
  onSelect,
}: VectorPanelProps) => {
  const selectedShape =
    selection === undefined ? undefined : shapes[selection.shape];
  const contour = selectedShape?.type === "contour" ? selectedShape : undefined;

  const change = (next: VectorContour) => {
    if (selection !== undefined) {
      onShapeChange(selection.shape, next);
    }
  };

  const cornerCut =
    contour !== undefined && selection?.type === "point" ?
      contour.corners?.[String(selection.index)]
    : undefined;
  // a corner carrying its own arc size still reads as the round it is
  const cornerTreatment =
    cornerCut === undefined ? undefined : cornerCutKind(cornerCut);

  const setTreatment = (treatment: CornerTreatment | undefined) => {
    if (contour !== undefined && selection?.type === "point") {
      change(setCorner(contour, selection.index, treatment));
    }
  };

  return (
    <div class="editor-column">
      <div class="editor-row">
        <Button
          onClick={() =>
            onShapesChange([
              ...shapes,
              {
                type: "contour",
                points: [
                  [1, 1],
                  [5, 1],
                  [5, 5],
                  [1, 5],
                ],
              },
            ])
          }
        >
          add contour
        </Button>
        <Button
          onClick={() =>
            onShapesChange([...shapes, { type: "circle", cell: [3, 4] }])
          }
        >
          add circle
        </Button>
        <Button
          disabled={selection === undefined}
          onClick={() =>
            selection !== undefined &&
            onShapesChange(shapes.toSpliced(selection.shape, 1))
          }
        >
          delete shape
        </Button>
      </div>

      {contour !== undefined && selection?.type === "side" && (
        <div class="editor-column">
          <div class="editor-note">
            side {selection.index} — {sideName(contour, selection.index)}
          </div>
          <div class="editor-row">
            <Button
              onClick={() => change(turnSide(contour, selection.index, -1))}
            >
              turn ↺
            </Button>
            <Button
              onClick={() => change(turnSide(contour, selection.index, 1))}
            >
              turn ↻
            </Button>
            <Button onClick={() => change(splitSide(contour, selection.index))}>
              split
            </Button>
            <Button
              selected={(contour.curves ?? []).includes(selection.index)}
              onClick={() => change(toggleCurve(contour, selection.index))}
            >
              curve
            </Button>
          </div>
        </div>
      )}

      {contour !== undefined &&
        selection?.type === "point" &&
        contour.points[selection.index] !== undefined && (
          <div class="editor-column">
            <div class="editor-note">
              corner {selection.index} at{" "}
              {contour.points[selection.index].join(", ")}
            </div>
            <div class="editor-row">
              <Button
                selected={cornerTreatment === undefined}
                onClick={() => setTreatment(undefined)}
              >
                sharp
              </Button>
              <Button
                selected={cornerTreatment === "round"}
                onClick={() => setTreatment("round")}
              >
                round
              </Button>
              <Button
                selected={cornerTreatment === "chamfer"}
                disabled={!isRightAngle(contour, selection.index)}
                aria-label="chamfer — only cuts a right angle"
                onClick={() => setTreatment("chamfer")}
              >
                chamfer
              </Button>
              {/* the corner is gone once removed, so nothing is left to have
                selected - holding on to its index would point at whichever
                corner shuffled into its place, or past the end of the shape */}
              <Button
                onClick={() => {
                  change(removeCorner(contour, selection.index));
                  onSelect(undefined);
                }}
              >
                remove
              </Button>
            </div>
          </div>
        )}

      {selectedShape?.type === "circle" && (
        <div class="editor-row">
          <span class="editor-note">
            circle on cell {selectedShape.cell.join(", ")}
          </span>
          {(
            [
              ["←", [-1, 0]],
              ["→", [1, 0]],
              ["↑", [0, -1]],
              ["↓", [0, 1]],
            ] as const
          ).map(([label, [byX, byY]]) => (
            <Button
              key={label}
              onClick={() =>
                selection !== undefined &&
                onShapeChange(selection.shape, {
                  ...selectedShape,
                  cell: [
                    selectedShape.cell[0] + byX,
                    selectedShape.cell[1] + byY,
                  ],
                })
              }
            >
              {label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
