import { useId } from "preact/hooks";

import { type ImageVersion } from "../ReviewPayload.ts";

export type ChooserSide = "from" | "to";

export type VersionChooserProps = {
  /** oldest first - the column order */
  versions: ImageVersion[];
  /** column index of the "from" side */
  from: number;
  /** column index of the "to" side */
  to: number;
  onPick: (side: ChooserSide, index: number) => void;
};

/**
 * The version chooser: a table with a column per version, radios above the
 * labels picking the "from" side and radios below picking the "to" side. A
 * version can never be both sides at once, so whichever column one side holds
 * has its radio on the other side disabled; the pair reverses with the swap
 * button instead. Labels of versions byte-identical to an earlier column are
 * greyed, so comparisons guaranteed empty are visible up front.
 */
export const VersionChooser = ({ versions, from, to, onPick }: VersionChooserProps) => {
  const radioGroupId = useId();

  const duplicateOf = (index: number): string | undefined =>
    versions
      .slice(0, index)
      .find((earlier) => earlier.blob === versions[index]?.blob)?.label;

  const radioRow = (side: ChooserSide) => {
    const own = side === "from" ? from : to;
    const other = side === "from" ? to : from;
    return (
      <tr>
        <td class="img-side">{side}</td>
        {versions.map((version, index) => (
          <td key={index}>
            <input
              type="radio"
              class="img-radio"
              name={`${radioGroupId}-${side}`}
              checked={index === own}
              disabled={index === other && versions.length > 1}
              aria-label={`compare ${side} ${version.label}`}
              onChange={() => onPick(side, index)}
            />
          </td>
        ))}
      </tr>
    );
  };

  return (
    <table class="img-chooser">
      <tbody>
        {radioRow("from")}
        <tr>
          <td />
          {versions.map((version, index) => {
            const duplicate = duplicateOf(index);
            return (
              <th
                scope="col"
                key={index}
                class={`img-version-label ${duplicate !== undefined ? "is-duplicate" : ""}`}
                title={
                  duplicate === undefined ?
                    version.description
                  : `${version.description} — byte-identical to ${duplicate}`
                }
              >
                {version.label}
              </th>
            );
          })}
        </tr>
        {radioRow("to")}
      </tbody>
    </table>
  );
};
