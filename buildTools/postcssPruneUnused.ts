import {
  type AtRule,
  type ChildNode,
  type Declaration,
  type PluginCreator,
  type Root,
} from "postcss";

const varRef = /var\(\s*--(?<name>[a-zA-Z0-9_-]+)/g;

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const collectVarRefs = (root: Root) => {
  const refs = new Set<string>();
  root.walkDecls((decl: Declaration) => {
    for (const match of decl.value.matchAll(varRef)) {
      refs.add(match.groups!.name);
    }
  });
  return refs;
};

const pruneVarsOnce = (root: Root) => {
  const refs = collectVarRefs(root);
  let removed = 0;
  root.walkDecls(/^--/, (decl: Declaration) => {
    if (!refs.has(decl.prop.slice(2))) {
      decl.remove();
      removed++;
    }
  });
  return removed;
};

const removeEmptyContainers = (root: Root) => {
  let removed = true;
  while (removed) {
    removed = false;
    root.walk((node: ChildNode) => {
      if (
        (node.type === "rule" || node.type === "atrule") &&
        node.nodes?.length === 0
      ) {
        node.remove();
        removed = true;
      }
    });
  }
};

const pruneKeyframes = (root: Root) => {
  const allValues: Array<string> = [];
  root.walkDecls((decl: Declaration) => {
    allValues.push(decl.value);
  });
  const joined = allValues.join(" ");

  root.walkAtRules((atrule: AtRule) => {
    if (!/(^|-)keyframes$/.test(atrule.name)) {
      return;
    }
    const name = atrule.params.trim();
    const re = new RegExp(`\\b${escapeRegex(name)}\\b`);
    if (!re.test(joined)) {
      atrule.remove();
    }
  });
};

/**
 * drops css custom properties nothing refers to, the rules left empty by
 * dropping them, and keyframes no animation uses
 */
export const postcssPruneUnused: PluginCreator<void> = () => ({
  postcssPlugin: "prune-unused",
  OnceExit(root) {
    while (pruneVarsOnce(root) > 0) {
      // intentionally empty
    }
    removeEmptyContainers(root);
    pruneKeyframes(root);
    removeEmptyContainers(root);
  },
});
postcssPruneUnused.postcss = true;
