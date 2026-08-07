import { type KernelRule, kernelRulesForChar } from "./kernelRules";

export type RuleBranch = {
  name: string;
  /** rules directly under this branch, with no further grouping */
  ruleNames: string[];
  branches: RuleBranch[];
};

const staircaseName =
  /^staircase(?<family>Flat1to2|1to2|1to1)Ink(?<ink>Right|Left)Step(?<step>Right|Left)(?<position>junctionStart|junctionEnd|middle|start|end)$/;

const slopeFamilyNames = {
  "1to1": "45°",
  "1to2": "1:2 down",
  Flat1to2: "1:2 across",
} as const satisfies { [family: string]: string };

const isSlopeFamily = (
  family: string,
): family is keyof typeof slopeFamilyNames => family in slopeFamilyNames;

/**
 * where a rule sits in the tree the editor lists them as, deepest part last.
 * Read from the rule's own name rather than kept as a second list beside the
 * rules, so a rule added to the table appears here without being registered
 * anywhere: an unrecognised name simply lands under its own heading
 */
const branchPathOf = ({ name: ruleName, defaultOff }: KernelRule): string[] => {
  if (defaultOff === true) {
    return ["only where switched on"];
  }
  const staircase = staircaseName.exec(ruleName);
  if (staircase?.groups !== undefined) {
    const { family, ink, step } = staircase.groups;
    return [
      "slopes",
      isSlopeFamily(family) ? slopeFamilyNames[family] : family,
      `ink ${ink.toLowerCase()}, stepping ${step.toLowerCase()}`,
    ];
  }
  if (ruleName.startsWith("roundedCorner")) {
    return ["rounded corners"];
  }
  if (ruleName.startsWith("notch")) {
    return ["notches"];
  }
  if (ruleName.endsWith("Hole")) {
    return ["holes"];
  }
  if (ruleName === "taperPoint") {
    return ["points"];
  }
  return ["other"];
};

const inWords = (camelCase: string): string =>
  camelCase
    .replace(/(?<lower>[a-z])(?<upper>[A-Z])/g, "$<lower> $<upper>")
    .toLowerCase();

/**
 * what to call a rule under the branch it sits in. A rule's name spells out
 * everything about it - a staircase names its slope, its ink side and its
 * step direction - but the branches above it already say all of that, so only
 * the part that tells it from its siblings is left
 */
export const ruleLabel = (ruleName: string): string => {
  const position = staircaseName.exec(ruleName)?.groups?.position;
  if (position !== undefined) {
    return inWords(position);
  }
  for (const prefix of ["roundedCorner", "notchOpens"]) {
    if (ruleName.startsWith(prefix)) {
      return inWords(ruleName.slice(prefix.length));
    }
  }
  return ruleName;
};

const branchAt = (branches: RuleBranch[], name: string): RuleBranch => {
  const existing = branches.find((branch) => branch.name === name);
  if (existing !== undefined) {
    return existing;
  }
  const added: RuleBranch = { name, ruleNames: [], branches: [] };
  branches.push(added);
  return added;
};

/** every rule that could apply to a character, grouped for browsing */
export const ruleTree = (char: string): RuleBranch[] => {
  const roots: RuleBranch[] = [];
  for (const rule of kernelRulesForChar(char)) {
    // walked from a stand-in whose children are the roots, so every step of
    // the path is the same "find or add a branch here" move
    const leaf = branchPathOf(rule).reduce<RuleBranch>(
      (branch, name) => branchAt(branch.branches, name),
      { name: "", ruleNames: [], branches: roots },
    );
    leaf.ruleNames.push(rule.name);
  }
  return roots;
};

/** every rule anywhere under a branch, so a whole branch can be turned off at once */
export const rulesUnder = (branch: RuleBranch): string[] => [
  ...branch.ruleNames,
  ...branch.branches.flatMap(rulesUnder),
];
