const attributeSelectorRegex = /^\[(?<propertyPath>[\w.]+)=(?<value>[^\]]+)\]$/;

/**
 * whether one part of a json pattern matches a key and the value under it.
 * A part is one of:
 *  - `door1` - exactly that key
 *  - `*` - any key
 *  - `door*` - any key starting `door`
 *  - `[type=door]`, `[config.which=skiHead]` - any key whose value has that
 *    (possibly nested) property, compared as a string
 */
export const matchesJsonPatternPart = (
  part: string,
  key: number | string,
  /** reads a (possibly nested) property of the value under the key */
  propertyOfValue: (propertyPath: string[]) => unknown,
): boolean => {
  const attributeSelector = attributeSelectorRegex.exec(part)?.groups;
  if (attributeSelector !== undefined) {
    const propertyValue = propertyOfValue(
      attributeSelector.propertyPath.split("."),
    );
    return (
      propertyValue !== undefined &&
      String(propertyValue) === attributeSelector.value
    );
  }
  if (part === "*") {
    return true;
  }
  if (part.endsWith("*")) {
    return String(key).startsWith(part.slice(0, -1));
  }
  return String(key) === part;
};
