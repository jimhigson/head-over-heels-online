import { clipToInk, inkBounds } from "./clipToInk";
import { roundedCornersNamed } from "./corners";
import {
  baselineFromTop,
  type Contour,
  px,
  toFontUnits,
  wound,
} from "./fontUnits";
import { holeContour } from "./holeContour";
import {
  type KernelMatch,
  kernelRulesForChar,
  type RuleSettings,
  scanKernelRules,
  taperStrokeHalfWidth,
} from "./kernelRules";
import {
  chamferCornerCut,
  chamferStepCut,
  halfDiscCut,
  halfDiscFill,
  roundedCornerContour,
} from "./kernelShapes";
import { diagonalRuns, dropCollinear, straightenRuns } from "./straightenRuns";
import { traceBitmapToLoops } from "./traceSmoothContours";

export type SmoothGlyphResult = {
  contours: Contour[];
  /** which rules fired where - the editor lists these against their toggles */
  matches: KernelMatch[];
};

/**
 * as {@link squareGlyphContours}, but pixels matching a {@link kernelRules}
 * pattern are replaced by that rule's action instead of contributing their
 * plain square shape - a lone hole becomes round, a two-cell-tall one becomes
 * a slot. Every other pixel stays perfectly square: this is the base the
 * kernel rule set grows from, one exception at a time.
 */
export const smoothGlyphContours = (
  bitmap: boolean[][],
  char: string,
  /** what this character says each rule may do, where, and how it draws */
  settings?: RuleSettings,
): SmoothGlyphResult => {
  const matches = scanKernelRules(bitmap, kernelRulesForChar(char), settings);

  // matched cells no longer contribute their plain square shape to the
  // trace - carve them so the rectilinear tracer ignores them, then add the
  // rule's own shape on top:
  const carved = bitmap.map((row) => [...row]);
  const shapes: Contour[] = [];
  for (const { x, y, rule, choices } of matches) {
    switch (rule.action.type) {
      case "hole": {
        // the whole block of cells is filled in so the tracer leaves it
        // alone, then the hole is cut back out as one rounded rectangle
        const { cellsWide, cellsTall } = rule.action;
        for (let down = 0; down < cellsTall; down++) {
          for (let across = 0; across < cellsWide; across++) {
            carved[y + down][x + across] = true;
          }
        }
        shapes.push(
          holeContour(
            x,
            y,
            cellsWide,
            cellsTall,
            roundedCornersNamed(choices.corners),
            choices.scale === "fitInPixel" ? "fitInPixel" : "areaPreserving",
          ),
        );
        break;
      }
      case "taperPoint": {
        // The tip cell is cleared and the stroke brought to a proper point:
        // two sides at 45 degrees running all the way up to the full width of
        // the stroke above, so the taper starts by cutting the outer corners
        // off that row rather than stepping in abruptly at the tip.
        //
        // How far above the tip the full width is reached follows from
        // keeping the ink: a 45 degree point on a stroke of half-width h
        // encloses h², and what it replaces is the tip cell plus a band 2h
        // wide of the row above, so 2h·rise + 1 = h²
        carved[y][x] = false;
        const halfWidth = taperStrokeHalfWidth;
        const rise = (halfWidth * halfWidth - 1) / (2 * halfWidth);
        const at = (across: number, along: number): [number, number] => [
          (x + 0.5 + across) * px,
          baselineFromTop * px - (y + along) * px,
        ];
        // only the part below the tip row is drawn: above it the taper runs
        // through ink the tracer has already laid down, and two contours over
        // the same ground is not something to hand a rasteriser
        const atTipRow = halfWidth - rise;
        shapes.push(
          wound([at(-atTipRow, 0), at(atTipRow, 0), at(0, atTipRow)], true),
        );
        // the row above still traces as full-width squares, so the two
        // corners the taper cuts away are taken back out of it
        for (const side of [-1, 1]) {
          shapes.push(
            wound(
              [
                at(side * halfWidth, -rise),
                at(side * halfWidth, 0),
                at(side * (halfWidth - rise), 0),
              ],
              false,
            ),
          );
        }
        break;
      }
      case "apexPoint": {
        // the lone cell is cleared and the edge brought to a point: two sides
        // at 45 degrees meeting a whole cell out from the edge it stands on.
        // A right-angled point of that reach encloses exactly the one pixel
        // taken away, at the cost of standing half a cell into the clear cell
        // above and below - where the edge it grows from carries on regardless
        carved[y][x] = false;
        const towardsLeft = rule.action.towards === "left";
        const reach = 1;
        const apexX = towardsLeft ? x : x + 1;
        const baseX = towardsLeft ? x + reach : x + 1 - reach;
        const at = (across: number, down: number): [number, number] => [
          across * px,
          baselineFromTop * px - down * px,
        ];
        shapes.push(
          wound(
            [
              at(apexX, y + 0.5),
              at(baseX, y + 0.5 - reach),
              at(baseX, y + 0.5 + reach),
            ],
            true,
          ),
        );
        // the two sides carry on into the ink they grow out of, taking the
        // corner off the cell each runs into, so the point is one unbroken
        // taper rather than a triangle set against a flat wall. That costs
        // more ink than the pixel replaced - a point that reads as a point is
        // worth the quarter of a pixel it takes
        const intoInk = towardsLeft ? 1 : -1;
        const carries = (side: number) =>
          choices.carryInto === "neither" ? false
          : choices.carryInto === "above" ? side === -1
          : choices.carryInto === "below" ? side === 1
          : true;
        for (const side of [-1, 1].filter(carries)) {
          const meets = y + 0.5 + side * reach;
          shapes.push(
            wound(
              [
                at(baseX, meets),
                at(baseX, meets + side * 0.5),
                at(baseX + intoInk * 0.5, meets + side * 0.5),
              ],
              false,
            ),
          );
        }
        break;
      }
      case "valleyPoint": {
        // the bite is filled in so the surface traces straight across it, then
        // a V one cell wide is cut back out: from the two corners of the cell
        // the bite took, down to the middle of its far edge. Half the pixel
        // comes back, which is what brings the two surfaces to a point
        carved[y][x] = true;
        const at = (across: number, down: number): [number, number] => [
          across * px,
          baselineFromTop * px - down * px,
        ];
        shapes.push(wound([at(x, y), at(x + 1, y), at(x + 0.5, y + 1)], false));
        break;
      }
      case "notch": {
        // the bite is filled in so the edge traces straight, then a triangle
        // of the same area is taken back out of it. As a symmetrical V that
        // is a mouth two cells wide narrowing to a point one cell in; as a
        // wedge it is a right-angled triangle with one side square to the
        // edge, whose equal legs must be √2 to come to the same one pixel
        carved[y][x] = true;
        const { opens } = rule.action;
        const sideways = opens === "left" || opens === "right";
        // the edge is the side of the cell the bite opens towards
        const mouth = opens === "right" || opens === "down" ? 1 : 0;
        const apex = 1 - mouth;
        const at = (across: number, along: number): [number, number] =>
          sideways ?
            [(x + across) * px, baselineFromTop * px - (y + along) * px]
          : [(x + along) * px, baselineFromTop * px - (y + across) * px];
        // the symmetrical V is what the rule does unasked, so it is what an
        // unrecognised choice falls back to - a missing answer should draw
        // the shape the option says it defaults to, not some other one
        const squareLow = choices.shape === "wedgeSquareLow";
        if (!squareLow && choices.shape !== "wedgeSquareHigh") {
          shapes.push(
            wound([at(mouth, -0.5), at(apex, 0.5), at(mouth, 1.5)], false),
          );
          break;
        }
        const intoInk = mouth === 1 ? -1 : 1;
        // the square edge sits on the boundary of the claimed cell that the
        // stroke carrying straight on runs down
        const square = squareLow ? 0 : 1;
        const leg = Math.SQRT2;
        shapes.push(
          wound(
            [
              at(mouth, square),
              at(mouth + intoInk * leg, square),
              at(mouth, square + (squareLow ? 1 : -1) * leg),
            ],
            false,
          ),
        );
        break;
      }
      case "chamferStep":
        // fill the step in, then cut a 45 degree line back across it. Reaching
        // past the cell takes away exactly the pixel the fill put back and
        // straightens the whole edge, but only where the edges either side
        // carry straight on; cutting corner to corner within the cell asks
        // nothing of its surroundings and so is always safe
        carved[y][x] = true;
        shapes.push(
          wound(
            choices.scale === "areaPreserving" ?
              chamferStepCut(x, y, rule.action.corner)
            : chamferCornerCut(x, y, rule.action.corner),
            false,
          ),
        );
        break;
      case "waistedCorner":
        // fill the cut corner in, then take it back out - as a quarter circle
        // like every other rounded corner, or straight across at 45 degrees
        carved[y][x] = true;
        shapes.push(
          choices.cut === "round" ?
            roundedCornerContour(x, y, rule.action.corner)
          : wound(chamferCornerCut(x, y, rule.action.corner), false),
        );
        break;
      case "uValley": {
        // adding puts the curve at the far edge of the bite, filling only the
        // corners behind it - the bite keeps its depth and gains a round
        // floor. Subtracting scoops the ink behind the bite instead, taking
        // the floor half a cell further in
        const { opens, fills } = rule.action;
        if (fills) {
          shapes.push(...halfDiscFill(x, y, opens));
        } else {
          shapes.push(halfDiscCut(x, y, opens));
        }
        break;
      }
      case "singleChamferSub":
        // the cell is already ink, so there is nothing to fill first: half of
        // it is simply taken away along the diagonal
        shapes.push(wound(chamferCornerCut(x, y, rule.action.corner), false));
        break;
      case "singleChamferAdd":
        // the cell is clear, so the tracer draws nothing here and the half
        // cell is added on its own, bridging the two neighbours it touches
        shapes.push(wound(chamferCornerCut(x, y, rule.action.corner), true));
        break;
      case "inkCorner":
        // no fill first - the cell is already ink, and the corner is simply
        // taken off it. Both cuts stay inside the cell, so a corner that was
        // never a bitten-out square does not eat into its neighbours
        shapes.push(
          choices.cut === "round" ?
            roundedCornerContour(x, y, rule.action.corner, 1)
          : wound(chamferCornerCut(x, y, rule.action.corner), false),
        );
        break;
      case "roundedCorner":
        // fill the cut corner in, so the traced outline is a clean right
        // angle, then take the rounding back out of it
        carved[y][x] = true;
        shapes.push(roundedCornerContour(x, y, rule.action.corner));
        break;
      case "chamferCorner":
        // fill the cut corner in, then cut it back at 45 degrees: the half of
        // the cell nearest the corner is taken out again, leaving a straight
        // chamfer joining the two edges either side
        carved[y][x] = true;
        shapes.push(wound(chamferCornerCut(x, y, rule.action.corner), false));
        break;
      case "diagonalEdge":
        // drawn below, once every tread of its run is known and the run's
        // two ends can be carried out to meet what lies beyond them
        break;
      default:
        rule.action satisfies never;
    }
  }

  // the y-flip into font units reverses orientation, so the point order is
  // reversed too, keeping the convention that outers wind clockwise in
  // y-up space
  const traced = traceBitmapToLoops(carved).map((loop): Contour =>
    dropCollinear(straightenRuns(loop, diagonalRuns(matches)))
      .map(toFontUnits)
      .reverse(),
  );

  const bounds = inkBounds(bitmap);
  return {
    contours: [...traced, ...shapes]
      .map((contour) => clipToInk(contour, bounds))
      .filter((contour) => contour.length > 0),
    matches,
  };
};
