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

const describeDestroyedNode = (
  container: Container,
  root: Container,
  context: string,
): string | undefined => {
  const issue = getDestroyedIssue(container);
  if (issue === undefined) return undefined;
  return `${context} (${issue}):\n  ${getAncestryPath(container, root)}`;
};

const describeDestroyedFilters = (
  container: Container,
  root: Container,
): string[] => {
  const { filters } = container;
  if (filters === null || filters === undefined) return [];

  const issues: string[] = [];
  for (const filter of filters) {
    if (!filter.enabled) continue;
    if (filter._destroyed) {
      issues.push(
        `Destroyed filter found:\n  ${getAncestryPath(container, root)}`,
      );
    }
  }
  return issues;
};

const collectIssues = (
  container: Container,
  root: Container,
  issues: string[],
): void => {
  const nodeIssue = describeDestroyedNode(
    container,
    root,
    "Destroyed node found",
  );
  if (nodeIssue !== undefined) {
    issues.push(nodeIssue);
  }

  if (container.mask instanceof Sprite) {
    const maskIssue = describeDestroyedNode(
      container.mask,
      root,
      "Mask destroyed",
    );
    if (maskIssue !== undefined) {
      issues.push(maskIssue);
    }
  }

  issues.push(...describeDestroyedFilters(container, root));

  for (const child of container.children) {
    if (!child.visible) continue;
    collectIssues(child as Container, root, issues);
  }
};

/**
 * Traverse the scene graph looking for issues
 */
export const validateSceneGraph = (container: Container): void => {
  const issues: string[] = [];
  collectIssues(container, container, issues);
  if (issues.length > 0) {
    throw new Error(
      `Scene graph has ${issues.length} destroyed reference${issues.length > 1 ? "s" : ""}:\n\n${issues.join("\n\n")}`,
    );
  }
};
