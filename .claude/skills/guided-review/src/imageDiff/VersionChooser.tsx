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
 * labels picking the "from" side and radios below picking the "to" side. From
 * must precede to, so a column past the other side's radio is disabled there
 * - there's no swap, reversing the pair is never a valid choice. With only
 * two versions there is only one possible pair, so nothing to choose: the
 * chooser shows nothing at all. Labels of versions byte-identical to an
 * earlier column are greyed, so comparisons guaranteed empty are visible up
 * front.
 */
export const VersionChooser = ({ versions, from, to, onPick }: VersionChooserProps) => {
  const radioGroupId = useId();

  if (versions.length < 3) {
    return null;
  }

  const duplicateOf = (index: number): string | undefined =>
    versions
      .slice(0, index)
      .find((earlier) => earlier.blob === versions[index]?.blob)?.label;

  const radioRow = (side: ChooserSide) => (
    <tr>
      <td class="img-side">{side}</td>
      {versions.map((version, index) => (
        <td key={index}>
          <input
            type="radio"
            class="img-radio"
            name={`${radioGroupId}-${side}`}
            checked={index === (side === "from" ? from : to)}
            disabled={side === "from" ? index >= to : index <= from}
            aria-label={`compare ${side} ${version.label}`}
            onChange={() => onPick(side, index)}
          />
        </td>
      ))}
    </tr>
  );

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
