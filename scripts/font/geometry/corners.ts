/** which corner of a cell or shape a treatment applies to */
export type CornerName = "bottomLeft" | "bottomRight" | "topLeft" | "topRight";

/**
 * the four corners in the order a shape is walked - clockwise from the top
 * left in the pixel grid's y-down space
 */
export const cornersClockwise = [
  "topLeft",
  "topRight",
  "bottomRight",
  "bottomLeft",
] as const satisfies readonly CornerName[];

/** the corners a choice names as rounded, as a set */
export type RoundedCorners = ReadonlySet<CornerName>;

const shortNames = {
  topLeft: "TopLeft",
  topRight: "TopRight",
  bottomRight: "BottomRight",
  bottomLeft: "BottomLeft",
} as const satisfies { [K in CornerName]: string };

const pairNames: ReadonlyArray<{ of: readonly CornerName[]; called: string }> =
  [
    { of: ["topLeft", "topRight"], called: "roundTop" },
    { of: ["bottomLeft", "bottomRight"], called: "roundBottom" },
    { of: ["topLeft", "bottomLeft"], called: "roundLeft" },
    { of: ["topRight", "bottomRight"], called: "roundRight" },
    { of: ["topLeft", "bottomRight"], called: "roundTopLeftBottomRight" },
    { of: ["topRight", "bottomLeft"], called: "roundTopRightBottomLeft" },
  ];

const sameCorners = (a: readonly CornerName[], b: readonly CornerName[]) =>
  a.length === b.length && a.every((corner) => b.includes(corner));

/**
 * what to call a set of rounded corners: the ones that stand out get named,
 * so "roundTop" and "squareBottomLeft" say more than a list of four would
 */
export const cornerChoiceName = (rounded: readonly CornerName[]): string => {
  if (rounded.length === 0) {
    return "allSquare";
  }
  if (rounded.length === 4) {
    return "allRound";
  }
  if (rounded.length === 3) {
    const [square] = cornersClockwise.filter(
      (corner) => !rounded.includes(corner),
    );
    return `square${shortNames[square]}`;
  }
  if (rounded.length === 1) {
    return `round${shortNames[rounded[0]]}`;
  }
  const pair = pairNames.find(({ of }) => sameCorners(of, rounded));
  return pair?.called ?? `round${rounded.map((c) => shortNames[c]).join("")}`;
};

/** every way the four corners can be round or square, squarest first */
const everyCornerSet = (): CornerName[][] => {
  const sets: CornerName[][] = [];
  for (let bits = 0; bits < 16; bits++) {
    sets.push(
      cornersClockwise.filter((_, index) => (bits & (1 << index)) !== 0),
    );
  }
  return sets.sort((a, b) => a.length - b.length);
};

export const cornerChoices = everyCornerSet().map((rounded) => ({
  name: cornerChoiceName(rounded),
  description:
    rounded.length === 0 ? "no corner rounded"
    : rounded.length === 4 ? "every corner rounded"
    : `rounded at ${rounded.join(", ")}`,
}));

const bySetName = new Map(
  everyCornerSet().map((rounded) => [
    cornerChoiceName(rounded),
    new Set(rounded) as RoundedCorners,
  ]),
);

export const roundedCornersNamed = (choice: string): RoundedCorners =>
  bySetName.get(choice) ?? new Set();
