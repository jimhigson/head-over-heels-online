import { useState } from "preact/hooks";

let uniqueIdCount = 0;

const nextId = () => String(++uniqueIdCount);

/**
 * an id unique on the page, kept for the component's life. Unlike preact's
 * `useId`, whose ids repeat in each separately rendered root (eg dialogs shown
 * from outside the component tree), so can collide
 */
export const useUniqueId = (): string => {
  const [id] = useState(nextId);
  return id;
};
