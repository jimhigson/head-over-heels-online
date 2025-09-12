/**
 * Creates padded labels that slide from left to right based on their position
 */
export const getSwitchPaddedLabels = (labels: readonly string[]): string[] => {
  const numLabels = labels.length;

  if (numLabels === 1) {
    // Single option: return as-is (no padding needed for single option)
    return [labels[0]];
  }

  // Calculate the target width
  const maxLabelLength = Math.max(...labels.map((l) => l.length));
  const width = maxLabelLength + (numLabels - 1);

  // For 2+ options, distribute positions from left to right
  return labels.map((label, index) => {
    // Calculate position as a fraction from 0 to 1
    const position = index / (numLabels - 1);

    // Available space for padding
    const totalPadding = width - label.length;

    // Distribute padding based on position
    const spacesBeforeLabel = Math.floor(totalPadding * position);
    const spacesAfterLabel = totalPadding - spacesBeforeLabel;

    return " ".repeat(spacesBeforeLabel) + label + " ".repeat(spacesAfterLabel);
  });
};
