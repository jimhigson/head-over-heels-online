import { type KernelRule } from "../geometry/kernelRules";

export type KernelShapeProps = {
  rule: KernelRule;
};

const cell = 9;

const isInSite = (
  site: KernelRule["activeSite"] | KernelRule["alsoClaims"],
  x: number,
  y: number,
): boolean => (site ?? []).some(([siteX, siteY]) => siteX === x && siteY === y);

/**
 * A rule's pattern drawn out: which cells it needs inked, which it needs
 * clear, and which it does not care about - plus the cells it takes over
 * where it matches. Reading a rule from its name alone is guesswork, and the
 * pattern is the whole of what the rule is, so it is what the tooltip shows.
 */
export const KernelShape = ({ rule }: KernelShapeProps) => {
  const [firstRow] = rule.pattern;
  const width = firstRow.length;
  const height = rule.pattern.length;

  return (
    <div class="editor-kernel-shape">
      <svg width={width * cell} height={height * cell}>
        {rule.pattern.map((row, y) =>
          [...row].map((patternCell, x) => (
            <g key={`${x},${y}`}>
              <rect
                x={x * cell}
                y={y * cell}
                width={cell}
                height={cell}
                fill={
                  patternCell === "#" ? "#e8e8ea"
                  : patternCell === "." ?
                    "#101218"
                  : "#2c3040"
                }
                stroke="#5a5f70"
                stroke-width={0.5}
              />
              {patternCell === "?" && (
                <text
                  x={x * cell + cell / 2}
                  y={y * cell + cell - 2}
                  text-anchor="middle"
                  font-size={cell - 2}
                  fill="#8990a5"
                >
                  ?
                </text>
              )}
              {isInSite(rule.activeSite, x, y) && (
                <rect
                  x={x * cell + 1}
                  y={y * cell + 1}
                  width={cell - 2}
                  height={cell - 2}
                  fill="none"
                  stroke="#ff173d"
                  stroke-width={1.5}
                />
              )}
              {isInSite(rule.alsoClaims, x, y) && (
                <rect
                  x={x * cell + 1}
                  y={y * cell + 1}
                  width={cell - 2}
                  height={cell - 2}
                  fill="none"
                  stroke="#ff173d"
                  stroke-width={1}
                  stroke-dasharray="2 2"
                />
              )}
            </g>
          )),
        )}
      </svg>
      <p>{rule.name}</p>
      <p class="editor-note">
        redraws the solid outlined cell{rule.activeSite.length === 1 ? "" : "s"}
        {rule.alsoClaims === undefined ? "" : ", and reaches into the dashed"}
        {rule.defaultOff === true ? " — off until switched on at a pixel" : ""}
      </p>
    </div>
  );
};
