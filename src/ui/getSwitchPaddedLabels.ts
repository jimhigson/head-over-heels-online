/**
 * Creates padded labels that slide from left to right based on their position
 */
export const getSwitchPaddedLabels = (labels: readonly string[]): string[] => {
  const numLabels = labels.length;

  if (numLabels === 1) {
    // Single option: return as-is (no padding needed for single option)
    return [labels[0]];
  }

  // Calculate the minimum width needed:
  // - Each non-last label starts at its index position: needs (length + index)
  // - The last label is right-aligned and must not overlap with second-to-last
  let width = 0;

  // Check all non-last labels
  for (let i = 0; i < numLabels - 1; i++) {
    width = Math.max(width, labels[i].length + i);
  }

  // For the last label (right-aligned): minimum width = last_length + number_of_other_items
  // This ensures the last item can be right-aligned with enough space for all previous items
  const lastLabelMinWidth = labels[numLabels - 1].length + (numLabels - 1);
  width = Math.max(width, lastLabelMinWidth);

  // Generate padded labels
  return labels.map((label, index) => {
    const isLast = index === numLabels - 1;

    if (isLast) {
      // Last label is always right-aligned
      const spacesBeforeLabel = width - label.length;
      return " ".repeat(spacesBeforeLabel) + label;
    } else {
      // Each non-last label starts one character further right than the previous
      const spacesBeforeLabel = index;
      const spacesAfterLabel = width - label.length - spacesBeforeLabel;
      return (
        " ".repeat(spacesBeforeLabel) + label + " ".repeat(spacesAfterLabel)
      );
    }
  });
};
