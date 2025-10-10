export const findScrollableAncestor = (element: Element): Element | null => {
  let current = element.parentElement;
  while (current !== null) {
    const { overflowY } = window.getComputedStyle(current);
    if (overflowY === "scroll" || overflowY === "auto") {
      return current;
    }
    current = current.parentElement;
  }
  return null;
};
