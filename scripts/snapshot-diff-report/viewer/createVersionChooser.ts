import {
  type RowBlobs,
  versionDescriptions,
  type VersionKey,
  versionOrder,
} from "../reportData";
import { requireElement } from "./requireElement";

export type VersionSelection = {
  /** the "before" side of the comparison */
  from: VersionKey;
  /** the "after" side of the comparison */
  to: VersionKey;
};

export type ComparisonSide = keyof VersionSelection;

export type VersionChooser = {
  selection: () => VersionSelection;
  /** the current row's versions in column order, for the number-key shortcuts */
  availableVersions: () => Array<VersionKey>;
  /** re-targets the chooser at a row, keeping the selection where it still fits */
  showVersionsOfRow: (versions: RowBlobs["versions"]) => void;
  select: (side: ComparisonSide, version: VersionKey) => void;
  swap: () => void;
  setEnabled: (enabled: boolean) => void;
};

export type CreateVersionChooserProps = {
  /**
   * the "from" side to fall back to whenever the current one is missing from
   * the row - the version the report was generated against
   */
  baseVersion: VersionKey;
  onChange: (selection: VersionSelection) => void;
};

/** one column of the chooser: every cell of the page's static markup for a version */
type VersionColumn = {
  version: VersionKey;
  cells: Array<HTMLTableCellElement>;
  labelCell: HTMLTableCellElement;
  radios: { [S in ComparisonSide]: HTMLInputElement };
};

const otherSide = (side: ComparisonSide): ComparisonSide =>
  side === "from" ? "to" : "from";

/**
 * The version chooser: a table whose columns are the versions of the current
 * row, with a row of radios above the labels picking the "from" side and a row
 * below picking the "to" side. Whichever column one side sits in has its radio
 * on the other side disabled, so a version is never compared with itself; the
 * pair is reversed with `swap` instead.
 *
 * Every column is in the page's static markup; a row is shown by hiding the
 * columns it has no version for, so the chooser never builds markup.
 */
export const createVersionChooser = ({
  baseVersion,
  onChange,
}: CreateVersionChooserProps): VersionChooser => {
  const chooser = requireElement<HTMLTableElement>("#version-chooser");

  const columns: Array<VersionColumn> = versionOrder.flatMap((version) => {
    const cells = [
      ...chooser.querySelectorAll<HTMLTableCellElement>(
        `[data-version="${version}"]`,
      ),
    ];
    return cells.length === 0 ?
        []
      : [
          {
            version,
            cells,
            labelCell: requireElement<HTMLTableCellElement>(
              `#label-cell-${version}`,
            ),
            radios: {
              from: requireElement<HTMLInputElement>(`#from-radio-${version}`),
              to: requireElement<HTMLInputElement>(`#to-radio-${version}`),
            },
          },
        ];
  });

  let availableVersions: Array<VersionKey> = [];
  let selection: VersionSelection = { from: baseVersion, to: "working" };
  let enabledByPage = false;

  const applyToDom = () => {
    for (const column of columns) {
      const isAvailable = availableVersions.includes(column.version);
      for (const cell of column.cells) {
        cell.hidden = !isAvailable;
      }
      for (const side of ["from", "to"] as const) {
        const radio = column.radios[side];
        radio.checked = selection[side] === column.version;
        // a version can only be one side of the comparison at a time, so its
        // radio on the other side is unusable while it holds this one:
        const heldByOtherSide = selection[otherSide(side)] === column.version;
        radio.disabled =
          !enabledByPage ||
          !isAvailable ||
          (heldByOtherSide && availableVersions.length > 1);
      }
    }
  };

  const changeSelection = (next: VersionSelection) => {
    selection = next;
    applyToDom();
    onChange(selection);
  };

  const select: VersionChooser["select"] = (side, version) => {
    if (
      !availableVersions.includes(version) ||
      selection[side] === version ||
      selection[otherSide(side)] === version
    ) {
      applyToDom();
      return;
    }
    changeSelection({ ...selection, [side]: version });
  };

  for (const column of columns) {
    for (const side of ["from", "to"] as const) {
      column.radios[side].addEventListener("change", () =>
        select(side, column.version),
      );
    }
  }

  /**
   * marks the labels of versions this row stores as the very same image, so it
   * is obvious up front which comparisons are guaranteed to come out empty
   */
  const markDuplicateLabels = (versions: RowBlobs["versions"]) => {
    const firstVersionOfBlob = new Map<number, VersionKey>();
    for (const column of columns) {
      const blobIndex = versions[column.version];
      const duplicateOf =
        blobIndex === undefined ? undefined : firstVersionOfBlob.get(blobIndex);
      column.labelCell.classList.toggle("duplicate", duplicateOf !== undefined);
      column.labelCell.title =
        duplicateOf === undefined ?
          versionDescriptions[column.version]
        : `${versionDescriptions[column.version]} — byte-identical to ${duplicateOf}`;
      if (blobIndex !== undefined && duplicateOf === undefined) {
        firstVersionOfBlob.set(blobIndex, column.version);
      }
    }
  };

  return {
    selection: () => selection,
    availableVersions: () => availableVersions,
    select,
    showVersionsOfRow(versions) {
      availableVersions = columns
        .map(({ version }) => version)
        .filter((version) => version in versions);
      markDuplicateLabels(versions);

      const to =
        availableVersions.includes(selection.to) ? selection.to : "working";
      // the base version is the natural "before"; failing that, the newest
      // other version the row has - and a row with only one version at all can
      // only compare it with itself
      const fallbackFrom =
        availableVersions.includes(baseVersion) && baseVersion !== to ?
          baseVersion
        : (availableVersions.findLast((version) => version !== to) ?? to);
      const from =
        availableVersions.includes(selection.from) && selection.from !== to ?
          selection.from
        : fallbackFrom;
      changeSelection({ from, to });
    },
    swap() {
      changeSelection({ from: selection.to, to: selection.from });
    },
    setEnabled(enabled) {
      enabledByPage = enabled;
      applyToDom();
    },
  };
};
