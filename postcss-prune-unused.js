const VAR_REF = /var\(\s*--([a-zA-Z0-9_-]+)/g;

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const collectVarRefs = (root) => {
  const refs = new Set();
  root.walkDecls((decl) => {
    for (const m of decl.value.matchAll(VAR_REF)) refs.add(m[1]);
  });
  return refs;
};

const pruneVarsOnce = (root) => {
  const refs = collectVarRefs(root);
  let removed = 0;
  root.walkDecls(/^--/, (decl) => {
    if (!refs.has(decl.prop.slice(2))) {
      decl.remove();
      removed++;
    }
  });
  return removed;
};

const removeEmptyContainers = (root) => {
  let removed = true;
  while (removed) {
    removed = false;
    root.walk((node) => {
      if (
        (node.type === "rule" || node.type === "atrule") &&
        node.nodes &&
        node.nodes.length === 0
      ) {
        node.remove();
        removed = true;
      }
    });
  }
};

const pruneKeyframes = (root) => {
  const allValues = [];
  root.walkDecls((decl) => allValues.push(decl.value));
  const joined = allValues.join(" ");

  root.walkAtRules((atrule) => {
    if (!/(^|-)keyframes$/.test(atrule.name)) return;
    const name = atrule.params.trim();
    const re = new RegExp(`\\b${escapeRegex(name)}\\b`);
    if (!re.test(joined)) atrule.remove();
  });
};

const plugin = () => ({
  postcssPlugin: "prune-unused",
  OnceExit(root) {
    while (pruneVarsOnce(root) > 0) {}
    removeEmptyContainers(root);
    pruneKeyframes(root);
    removeEmptyContainers(root);
  },
});
plugin.postcss = true;

export default plugin;
