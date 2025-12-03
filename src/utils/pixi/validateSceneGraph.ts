import { type Container, Sprite } from "pixi.js";

import { formatContainerInfo } from "./containerInfo";

const getAncestryPath = (container: Container, root: Container): string => {
  let path = formatContainerInfo(container);
  for (
    let current = container.parent;
    current !== null && current !== root.parent;
    current = current.parent
  ) {
    path = `${formatContainerInfo(current)}\n  → ${path}`;
  }
  return path;
};

const getDestroyedIssue = (container: Container): string | undefined => {
  if (container.destroyed) {
    return "container destroyed";
  }
  if (container instanceof Sprite) {
    const { texture } = container;
    if (texture.destroyed) return "texture destroyed";
    if (texture.source?.destroyed) return "texture source destroyed";
  }
  return undefined;
};

const assertNotDestroyed = (
  container: Container,
  root: Container,
  context: string,
): void => {
  const issue = getDestroyedIssue(container);
  if (issue !== undefined) {
    throw new Error(
      `${context} (${issue}):\n  ${getAncestryPath(container, root)}`,
    );
  }
};

const assertFiltersNotDestroyed = (
  container: Container,
  root: Container,
): void => {
  const { filters } = container;
  if (filters === null || filters === undefined) return;

  for (const filter of filters) {
    if (!filter.enabled) continue;
    if (filter._destroyed) {
      throw new Error(
        `Destroyed filter found:\n  ${getAncestryPath(container, root)}`,
      );
    }
  }
};

const validateRecursive = (container: Container, root: Container): void => {
  assertNotDestroyed(container, root, "Destroyed node found");

  if (container.mask instanceof Sprite) {
    assertNotDestroyed(container.mask, root, "Mask destroyed");
  }

  assertFiltersNotDestroyed(container, root);

  for (const child of container.children) {
    if (!child.visible) continue;
    validateRecursive(child as Container, root);
  }
};

/**
 * Traverse the scene graph looking for issues
 */
export const validateSceneGraph = (container: Container): void => {
  validateRecursive(container, container);
};
