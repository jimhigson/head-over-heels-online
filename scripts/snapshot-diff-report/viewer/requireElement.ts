/**
 * Looks up an element the generated markup is guaranteed to contain. A miss
 * means the generator and the viewer have drifted apart, so it throws rather
 * than degrading silently.
 */
export const requireElement = <ElementType extends Element>(
  /** any css selector, eg "#row-select" */
  selector: string,
): ElementType => {
  const element = document.querySelector<ElementType>(selector);
  if (element === null) {
    throw new Error(`the report page has no element matching "${selector}"`);
  }
  return element;
};
