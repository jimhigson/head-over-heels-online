#!/usr/bin/env node
/**
 * Read-only scan for types that remove keys from a base type and add the same
 * keys back with other types (type-fest `OverrideProperties` / `Merge` /
 * `SetOptional` / `SetRequired` / `DistributedOmit`), found through the
 * TypeScript compiler API. Prints one JSON object per finding.
 *
 * node findOverrides.ts --root <dir> [--tsconfig <file>]... [--exclude <text>]...
 *
 * finding kinds:
 *   omit&re-add             Omit/Except<Base, K> & { k: ... } (or & Pick / Partial<Pick>)
 *   interface-extends-omit  interface X extends Omit<Base, K> { k: ... }
 *   Partial<Pick>, Required<Pick>, Partial<Omit>, Required<Omit>
 *   NonNullable<indexed>, Required<indexed>   over X["k"]
 *   Omit-of-union, Pick-of-union              these collapse a union to its shared keys
 */
import { relative } from "node:path";
import {
  type InterfaceDeclaration,
  type Node,
  type Program,
  type SourceFile,
  type Type,
  type TypeNode,
  type TypeReferenceNode,
} from "typescript";

import {
  loadPrograms,
  loadTypescript,
  projectSourceFiles,
} from "./loadPrograms.ts";
import { parseScanArgs } from "./scanArgs.ts";

type Finding = { file: string; kind: string; [detail: string]: string };

const options = parseScanArgs(process.argv.slice(2));
const ts = loadTypescript(options.rootDir);

const findings: Finding[] = [];
const seen = new Set<string>();

const omitNames = ["Omit", "Except", "DistributedOmit"];

const referenceName = (node: TypeNode): string | undefined =>
  ts.isTypeReferenceNode(node) ? node.typeName.getText() : undefined;

const squash = (text: string, length = 80) =>
  text.replaceAll(/\s+/g, " ").slice(0, length);

const scanProgram = (program: Program) => {
  const checker = program.getTypeChecker();

  const keyNames = (keys: TypeNode): string[] => {
    const names: string[] = [];
    const walk = (type: Type) => {
      if (type.isUnion()) {
        type.types.forEach(walk);
      } else if (type.isStringLiteral()) {
        names.push(type.value);
      } else {
        names.push(`<${checker.typeToString(type)}>`);
      }
    };
    walk(checker.getTypeFromTypeNode(keys));
    return names;
  };

  const record = (
    node: Node,
    sourceFile: SourceFile,
    kind: string,
    details: Record<string, string>,
  ) => {
    const { line } = sourceFile.getLineAndCharacterOfPosition(
      node.getStart(sourceFile),
    );
    const key = `${sourceFile.fileName}:${line}:${kind}`;
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    findings.push({
      file: `${relative(options.rootDir, sourceFile.fileName)}:${line + 1}`,
      kind,
      ...details,
    });
  };

  const literalProps = (node: TypeNode) =>
    ts.isTypeLiteralNode(node) ?
      node.members.flatMap((member) =>
        member.name === undefined ?
          []
        : [
            {
              name: member.name.getText(),
              optional: member.questionToken !== undefined,
            },
          ],
      )
    : undefined;

  const scanIntersection = (
    node: Node,
    sourceFile: SourceFile,
    members: readonly TypeNode[],
  ) => {
    const omits = members.filter(
      (member) =>
        omitNames.includes(referenceName(member) ?? "") &&
        ts.isTypeReferenceNode(member) &&
        member.typeArguments?.length === 2,
    );
    const others = members.filter((member) => !omits.includes(member));

    for (const omit of omits) {
      if (!ts.isTypeReferenceNode(omit) || omit.typeArguments === undefined) {
        continue;
      }
      const [base, keys] = omit.typeArguments;
      const omitted = keyNames(keys);
      const readded: string[] = [];

      for (const other of others) {
        const props = literalProps(other);
        if (props !== undefined) {
          for (const { name, optional } of props) {
            if (omitted.includes(name)) {
              readded.push(name + (optional ? "?" : ""));
            }
          }
          continue;
        }
        const name = referenceName(other);
        const inner =
          ts.isTypeReferenceNode(other) ? other.typeArguments?.[0] : undefined;
        const pickLike =
          name === "Pick" && ts.isTypeReferenceNode(other) ? other
          : (
            ["Partial", "Required", "SetOptional"].includes(name ?? "") &&
            inner !== undefined &&
            referenceName(inner) === "Pick"
          ) ?
            inner
          : undefined;
        if (
          pickLike !== undefined &&
          ts.isTypeReferenceNode(pickLike) &&
          pickLike.typeArguments?.[1] !== undefined
        ) {
          readded.push(
            `[${name}<Pick>:${keyNames(pickLike.typeArguments[1]).join("|")}]`,
          );
        }
      }

      if (readded.length > 0) {
        const readdedNames = readded.map((name) => name.replace("?", ""));
        record(node, sourceFile, "omit&re-add", {
          base: squash(base.getText(sourceFile), 70),
          omitted: omitted.join("|"),
          readded: readded.join("|"),
          notReadded: omitted
            .filter((key) => !readdedNames.includes(key))
            .join("|"),
        });
      }
    }
  };

  const scanTypeReference = (
    node: TypeReferenceNode,
    sourceFile: SourceFile,
  ) => {
    const name = node.typeName.getText();
    const [first, second] = node.typeArguments ?? [];

    if (
      ["Partial", "Required"].includes(name) &&
      first !== undefined &&
      ["Pick", "Omit"].includes(referenceName(first) ?? "") &&
      ts.isTypeReferenceNode(first) &&
      first.typeArguments?.length === 2
    ) {
      const [base, keys] = first.typeArguments;
      record(node, sourceFile, `${name}<${referenceName(first)}>`, {
        base: squash(base.getText(sourceFile), 70),
        keys: keyNames(keys).join("|"),
      });
    }

    if (
      ["NonNullable", "Required"].includes(name) &&
      first !== undefined &&
      ts.isIndexedAccessTypeNode(first)
    ) {
      record(node, sourceFile, `${name}<indexed>`, {
        base: squash(first.getText(sourceFile)),
      });
    }

    if (
      ["Omit", "Pick"].includes(name) &&
      first !== undefined &&
      second !== undefined
    ) {
      const baseType = checker.getTypeFromTypeNode(first);
      if (baseType.isUnion()) {
        record(node, sourceFile, `${name}-of-union`, {
          base: squash(first.getText(sourceFile), 70),
          keys: keyNames(second).join("|"),
        });
      }
    }
  };

  const scanInterface = (
    node: InterfaceDeclaration,
    sourceFile: SourceFile,
  ) => {
    for (const clause of node.heritageClauses ?? []) {
      for (const heritage of clause.types) {
        const name = heritage.expression.getText();
        const [base, keys] = heritage.typeArguments ?? [];
        if (
          !["Omit", "Except"].includes(name) ||
          base === undefined ||
          keys === undefined
        ) {
          continue;
        }
        const omitted = keyNames(keys);
        const ownNames = node.members.flatMap((member) =>
          member.name === undefined ? [] : [member.name.getText()],
        );
        const readded = ownNames.filter((own) => omitted.includes(own));
        if (readded.length > 0) {
          record(node, sourceFile, "interface-extends-omit", {
            base: base.getText(sourceFile),
            omitted: omitted.join("|"),
            readded: readded.join("|"),
            notReadded: omitted
              .filter((key) => !readded.includes(key))
              .join("|"),
          });
        }
      }
    }
  };

  for (const sourceFile of projectSourceFiles(program, options)) {
    const visit = (node: Node) => {
      if (ts.isIntersectionTypeNode(node)) {
        scanIntersection(node, sourceFile, node.types);
      }
      if (ts.isInterfaceDeclaration(node)) {
        scanInterface(node, sourceFile);
      }
      if (ts.isTypeReferenceNode(node)) {
        scanTypeReference(node, sourceFile);
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
  }
};

loadPrograms(ts, options).forEach(scanProgram);

findings
  .toSorted(
    (a, b) => a.kind.localeCompare(b.kind) || a.file.localeCompare(b.file),
  )
  .forEach((finding) => console.log(JSON.stringify(finding)));
