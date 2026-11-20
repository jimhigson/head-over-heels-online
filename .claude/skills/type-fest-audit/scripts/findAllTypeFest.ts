#!/usr/bin/env node
/**
 * Read-only broad scan for hand-rolled types that a type-fest utility could
 * express, found through the TypeScript compiler API. Prints one JSON object
 * per finding: { file, kind, suggest, text }.
 *
 * node findAllTypeFest.ts --root <dir> [--tsconfig <file>]... [--exclude <text>]...
 *
 * It is noisy on purpose (it lists every Exclude/Extract, Partial<Record>,
 * Record<string, unknown>...): filter by `kind`. A `generic alias:` finding is a
 * census entry for review against the utility list, not a claim.
 */
import { relative } from "node:path";
import type {
  ConditionalTypeNode,
  Node,
  Program,
  TypeNode,
} from "typescript";

import {
  loadPrograms,
  loadTypescript,
  projectSourceFiles,
} from "./loadPrograms.ts";
import { parseScanArgs } from "./scanArgs.ts";

type Finding = { file: string; kind: string; suggest: string; text: string };

const options = parseScanArgs(process.argv.slice(2));
const ts = loadTypescript(options.rootDir);

const findings: Finding[] = [];
const seen = new Set<string>();

const squash = (text: string, length = 110) =>
  text
    .replaceAll(/\/\*[\s\S]*?\*\//g, "")
    .replaceAll(/\s+/g, " ")
    .slice(0, length);

const referenceName = (node: TypeNode): string | undefined =>
  ts.isTypeReferenceNode(node) ? node.typeName.getText() : undefined;

const isKeyof = (node: TypeNode) =>
  ts.isTypeOperatorNode(node) && node.operator === ts.SyntaxKind.KeyOfKeyword;

const containsInfer = (node: Node): boolean =>
  ts.isInferTypeNode(node) ||
  ts.forEachChild(node, (child) => containsInfer(child) || undefined) === true;

const brandPropertyName =
  /^\[?(_{1,2}(brand|tag|opaque)|brand|tag|opaque|\w*Symbol|\w*brand)\]?$/i;

const scanProgram = (program: Program) => {
  const checker = program.getTypeChecker();

  for (const sourceFile of projectSourceFiles(program, options)) {
    const record = (node: Node, kind: string, suggest: string) => {
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
        suggest,
        text: squash(node.getText(sourceFile)),
      });
    };

    const scanMapped = (node: Node & { kind: number }) => {
      if (!ts.isMappedTypeNode(node)) {
        return;
      }
      const { constraint } = node.typeParameter;
      const overKeyof = constraint !== undefined && isKeyof(constraint);
      const valueText = node.type?.getText(sourceFile);
      const keyName = node.typeParameter.name.getText(sourceFile);
      const readonlyMinus =
        node.readonlyToken?.kind === ts.SyntaxKind.MinusToken;
      const questionMinus =
        node.questionToken?.kind === ts.SyntaxKind.MinusToken;

      if (overKeyof && readonlyMinus) {
        record(node, "mapped -readonly", "Writable / WritableDeep");
      }
      if (overKeyof && questionMinus) {
        record(node, "mapped -?", "Required / SetRequired / RequiredDeep");
      }
      if (overKeyof && node.readonlyToken !== undefined && !readonlyMinus) {
        record(
          node,
          "mapped +readonly",
          "Readonly / ReadonlyDeep / SetReadonly",
        );
      }
      if (overKeyof && node.questionToken !== undefined && !questionMinus) {
        record(node, "mapped ?", "Partial / SetOptional / PartialDeep");
      }
      if (
        overKeyof &&
        node.nameType === undefined &&
        node.questionToken === undefined &&
        node.readonlyToken === undefined &&
        valueText !== undefined &&
        new RegExp(`^\\w+\\[${keyName}\\]$`).test(valueText)
      ) {
        record(node, "mapped identity", "Simplify");
      }
      if (node.nameType !== undefined) {
        const nameText = node.nameType.getText(sourceFile);
        if (/Uppercase|Lowercase|Capitalize|Uncapitalize|\$\{/.test(nameText)) {
          record(
            node,
            "mapped as template",
            "CamelCasedProperties / SnakeCasedProperties and the other case types",
          );
        } else if (/extends/.test(nameText) && /never/.test(nameText)) {
          record(
            node,
            "mapped as filter",
            "ConditionalPick / ConditionalExcept / OmitIndexSignature / PickIndexSignature",
          );
        } else {
          record(
            node,
            "mapped as",
            "Except / ConditionalPick / key remapping helpers",
          );
        }
      }
      if (
        overKeyof &&
        valueText !== undefined &&
        /extends object|extends Record|Deep/.test(valueText) &&
        valueText.includes("[")
      ) {
        record(
          node,
          "mapped recursive",
          "ReadonlyDeep / PartialDeep / WritableDeep / RequiredDeep",
        );
      }
      if (
        valueText !== undefined &&
        /\{\}\s*extends\s*Pick<|extends Pick<\w+, *\w+> *\? *never/.test(
          valueText,
        )
      ) {
        record(
          node,
          "keys-of by optionality",
          "RequiredKeysOf / OptionalKeysOf / HasRequiredKeys",
        );
      }
    };

    const scanIndexedAccess = (node: Node) => {
      if (!ts.isIndexedAccessTypeNode(node)) {
        return;
      }
      const objectText = node.objectType.getText(sourceFile);
      if (
        isKeyof(node.indexType) &&
        ts.isTypeOperatorNode(node.indexType) &&
        node.indexType.type.getText(sourceFile) === objectText
      ) {
        record(node, "T[keyof T]", "ValueOf");
      }
      if (objectText.startsWith("{") && isKeyof(node.indexType)) {
        record(
          node,
          "{mapped}[keyof]",
          "ValueOf / KeysOfUnion / ConditionalKeys / RequiredKeysOf",
        );
      }
      if (
        ts.isIndexedAccessTypeNode(node.objectType) &&
        ts.isIndexedAccessTypeNode(node.objectType.objectType)
      ) {
        record(
          node,
          "X[a][b][c] deep index",
          "Get (only if the path is dynamic): informational",
        );
      }
    };

    const scanConditional = (node: ConditionalTypeNode) => {
      const check = node.checkType.getText(sourceFile);
      const extendsText = node.extendsType.getText(sourceFile);
      const infers = containsInfer(node.extendsType);

      if (
        infers &&
        /\(\s*\w+\s*:\s*infer\s+\w+\s*\)\s*=>\s*void/.test(extendsText) &&
        /\(\s*\w+\s*:\s*\w+\s*\)\s*=>\s*void/.test(check)
      ) {
        record(node, "UnionToIntersection idiom", "UnionToIntersection");
      }
      if (/<\w+>\(\)\s*=>\s*\w+\s*extends/.test(check)) {
        record(node, "IsEqual idiom", "IsEqual");
      }
      if (/^\[\w+\]$/.test(check) && extendsText === "[never]") {
        record(node, "IsNever idiom", "IsNever / IfNever");
      }
      if (/^0 extends \(?1 & \w+\)?$/.test(check)) {
        record(node, "IsAny idiom", "IsAny / IfAny");
      }
      if (extendsText === "unknown" && /unknown extends/.test(check)) {
        record(node, "IsUnknown idiom", "IsUnknown");
      }
      if (
        node.trueType.getText(sourceFile).startsWith("keyof ") &&
        (extendsText === "any" || extendsText === "unknown")
      ) {
        record(
          node,
          "distributive keyof",
          "KeysOfUnion / SharedUnionFields / AllUnionFields",
        );
      }
      if (infers && /\(infer \w+\)\[\]|Array<infer \w+>/.test(extendsText)) {
        record(node, "infer array element", "ArrayElement / ArrayValues");
      }
      if (
        infers &&
        extendsText.startsWith("[infer") &&
        /\.\.\.infer \w+\]/.test(extendsText)
      ) {
        record(node, "infer tuple head", "FirstArrayElement / ArrayTail");
      }
      if (infers && /^\[\.\.\.infer \w+, infer \w+\]/.test(extendsText)) {
        record(node, "infer tuple last", "LastArrayElement / ArrayTail");
      }
      if (infers && /Promise<infer|PromiseLike<infer/.test(extendsText)) {
        record(node, "infer promise", "Awaited (built in) / AsyncReturnType");
      }
      if (infers && /\) *=> *infer/.test(extendsText)) {
        record(
          node,
          "infer function return",
          "ReturnType (built in) / AsyncReturnType / OverloadReturnType",
        );
      }
      if (infers && /\(\.\.\.\w+: *infer/.test(extendsText)) {
        record(
          node,
          "infer function params",
          "Parameters (built in) / FunctionParameters / OverloadParameters",
        );
      }
      if (infers && extendsText.startsWith("new (")) {
        record(node, "infer constructor", "Class / Constructor / InstanceType");
      }
      if (infers && ts.isTemplateLiteralTypeNode(node.extendsType)) {
        record(
          node,
          "template-literal infer",
          "Split / Trim / Replace / RemovePrefix / RemoveSuffix / StartsWith / CamelCase / Words / ToString",
        );
      }
      if (
        node.falseType.getText(sourceFile) === "never" &&
        !infers &&
        ts.isTypeReferenceNode(node.checkType) &&
        node.trueType.getText(sourceFile) === node.checkType.getText(sourceFile)
      ) {
        record(
          node,
          "distributive filter (T extends U ? T : never)",
          "Extract / ExtractStrict / ConditionalPick",
        );
      }
      if (
        node.trueType.getText(sourceFile) === "true" &&
        node.falseType.getText(sourceFile) === "false"
      ) {
        record(
          node,
          "type predicate conditional",
          "IsEqual / IsLiteral / IsUnion / IsTuple and the other Is* types",
        );
      }
    };

    const scanTypeReference = (node: Node) => {
      if (!ts.isTypeReferenceNode(node)) {
        return;
      }
      const name = node.typeName.getText(sourceFile);
      const [first, second] = node.typeArguments ?? [];

      if (
        name === "Awaited" &&
        first !== undefined &&
        referenceName(first) === "ReturnType"
      ) {
        record(node, "Awaited<ReturnType<F>>", "AsyncReturnType");
      }
      if (
        name === "Extract" &&
        first !== undefined &&
        isKeyof(first) &&
        second?.getText(sourceFile) === "string"
      ) {
        record(node, "Extract<keyof T, string>", "StringKeyOf");
      }
      if (name === "Exclude" || name === "Extract") {
        record(node, name, `${name}Strict (stricter): informational`);
      }
      if (name === "NonNullable") {
        record(
          node,
          "NonNullable",
          "SetNonNullable (if applied to a property)",
        );
      }
      if (name === "Record" && first?.getText(sourceFile) === "string") {
        if (second?.kind === ts.SyntaxKind.UnknownKeyword) {
          record(node, "Record<string, unknown>", "UnknownRecord");
        }
        if (second?.kind === ts.SyntaxKind.NeverKeyword) {
          record(node, "Record<string, never>", "EmptyObject");
        }
      }
      if (
        name === "Readonly" &&
        first !== undefined &&
        ts.isArrayTypeNode(first)
      ) {
        record(node, "Readonly<T[]>", "ReadonlyArray<T> (built in)");
      }
      if (
        name === "Readonly" &&
        first !== undefined &&
        referenceName(first) === "Record"
      ) {
        record(node, "Readonly<Record>", "informational");
      }
      if (name === "InstanceType") {
        record(node, "InstanceType", "Class / Constructor: informational");
      }
      if (
        name === "Partial" &&
        first !== undefined &&
        referenceName(first) === "Record"
      ) {
        record(node, "Partial<Record<K,V>>", "informational");
      }
      if (
        name === "Pick" &&
        first !== undefined &&
        ["Required", "Partial"].includes(referenceName(first) ?? "")
      ) {
        record(node, "Pick<Partial|Required>", "SetOptional / SetRequired");
      }
    };

    const scanUnion = (node: Node) => {
      if (!ts.isUnionTypeNode(node)) {
        return;
      }
      const texts = node.types.map((member) => member.getText(sourceFile));

      for (const member of node.types) {
        if (
          ts.isArrayTypeNode(member) &&
          texts.includes(member.elementType.getText(sourceFile))
        ) {
          record(node, "T | T[]", "Arrayable");
        }
        if (ts.isTypeReferenceNode(member)) {
          const memberName = referenceName(member) ?? "";
          const argument = member.typeArguments?.[0]?.getText(sourceFile);
          if (
            ["Array", "ReadonlyArray"].includes(memberName) &&
            argument !== undefined &&
            texts.includes(argument)
          ) {
            record(node, "T | Array<T>", "Arrayable");
          }
          if (
            ["Promise", "PromiseLike"].includes(memberName) &&
            argument !== undefined &&
            texts.includes(argument)
          ) {
            record(node, "T | Promise<T>", "Promisable");
          }
        }
      }
      if (texts.some((text) => /^\(?string & \{\}\)?$/.test(text))) {
        record(node, "string & {}", "LiteralUnion");
      }
      const primitives = [
        "string",
        "number",
        "bigint",
        "boolean",
        "symbol",
        "null",
        "undefined",
      ];
      if (primitives.every((primitive) => texts.includes(primitive))) {
        record(node, "primitive union", "Primitive");
      }
      if (
        ["string", "number", "boolean", "null"].every((primitive) =>
          texts.includes(primitive),
        ) &&
        texts.some((text) => /\[\]|Record|\{/.test(text))
      ) {
        record(node, "json-value-like union", "JsonValue / Jsonifiable");
      }
    };

    const scanTuple = (node: Node) => {
      const nonEmptyTuple = (tuple: Node) =>
        ts.isTupleTypeNode(tuple) &&
        tuple.elements.length === 2 &&
        ts.isRestTypeNode(tuple.elements[1]) &&
        ts.isArrayTypeNode(tuple.elements[1].type) &&
        tuple.elements[1].type.elementType.getText(sourceFile) ===
          tuple.elements[0].getText(sourceFile);

      if (nonEmptyTuple(node)) {
        record(node, "[T, ...T[]]", "NonEmptyTuple");
      }
      if (
        ts.isTypeOperatorNode(node) &&
        node.operator === ts.SyntaxKind.ReadonlyKeyword &&
        nonEmptyTuple(node.type)
      ) {
        record(node, "readonly [T, ...T[]]", "NonEmptyTuple (readonly)");
      }
    };

    const scanFunctionShapes = (node: Node) => {
      const text = node.getText(sourceFile);
      if (
        ts.isConstructorTypeNode(node) &&
        /\.\.\.\w+: *(any|unknown)\[\]/.test(text)
      ) {
        record(node, "new (...args) => T", "Constructor / Class");
      }
      if (ts.isFunctionTypeNode(node)) {
        if (/\(\.\.\.\w+: *Parameters<[^>]+>\)/.test(text)) {
          record(node, "(...args: Parameters<F>) => X", "SetReturnType");
        }
        if (
          /=> *ReturnType<[^>]+>$/.test(text) &&
          /\.\.\.\w+: *(any|unknown)/.test(text)
        ) {
          record(node, "(...args: any) => ReturnType<F>", "SetParameterType");
        }
        if (/^\(\.\.\.\w+: *any(\[\])?\) *=> *any$/.test(text)) {
          record(
            node,
            "(...args: any) => any",
            "AnyFunction / UnknownFunction",
          );
        }
      }
    };

    const scanIntersection = (node: Node) => {
      if (!ts.isIntersectionTypeNode(node)) {
        return;
      }
      for (const member of node.types) {
        if (
          ts.isTypeLiteralNode(member) &&
          member.members.some((element) => {
            const name = element.name?.getText(sourceFile) ?? "";
            return (
              brandPropertyName.test(name) ||
              (/^\[\w+\]$/.test(name) && member.members.length === 1)
            );
          })
        ) {
          record(
            node,
            "branded intersection",
            "Tagged / Opaque (only for a phantom brand never assigned at runtime)",
          );
        }
      }

      const memberTypes = node.types.map((member) =>
        checker.getTypeFromTypeNode(member),
      );
      node.types.forEach((member, index) => {
        if (!ts.isTypeLiteralNode(member)) {
          return;
        }
        for (const element of member.members) {
          if (element.name === undefined) {
            continue;
          }
          const name = element.name.getText(sourceFile);
          const overlaps = memberTypes.some(
            (other, otherIndex) =>
              otherIndex !== index && other.getProperty(name) !== undefined,
          );
          if (overlaps) {
            record(
              node,
              "intersection key overlap",
              `Merge / OverrideProperties / SetFieldType / SetRequired / SetOptional (key \`${name}\` is in both)`,
            );
          }
        }
      });

      const names = node.types.map(referenceName);
      if (names.includes("Required") && names.includes("Partial")) {
        record(
          node,
          "Required<A> & Partial<B>",
          "SetRequired / SetOptional / Merge",
        );
      }
      if (names.includes("Pick") && names.includes("Omit")) {
        record(node, "Pick & Omit", "SetRequired / SetOptional / Merge");
      }
      if (
        node.types.length === 2 &&
        node.types.every(ts.isTypeReferenceNode) &&
        names.includes("Required")
      ) {
        record(node, "X & Required<..>", "SetRequired");
      }
    };

    const scanGenericAlias = (node: Node) => {
      if (
        !ts.isTypeAliasDeclaration(node) ||
        node.typeParameters === undefined
      ) {
        return;
      }
      const kindName = ts.SyntaxKind[node.type.kind];
      const infers = containsInfer(node.type);
      if (
        ["ConditionalType", "MappedType", "TemplateLiteralType"].includes(
          kindName,
        ) ||
        infers
      ) {
        record(
          node,
          `generic alias: ${kindName}${infers ? "+infer" : ""}`,
          `review: ${node.name.getText(sourceFile)}`,
        );
      }
    };

    const visit = (node: Node) => {
      scanMapped(node);
      scanIndexedAccess(node);
      if (ts.isConditionalTypeNode(node)) {
        scanConditional(node);
      }
      scanTypeReference(node);
      scanUnion(node);
      scanTuple(node);
      scanFunctionShapes(node);
      scanIntersection(node);
      scanGenericAlias(node);
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
