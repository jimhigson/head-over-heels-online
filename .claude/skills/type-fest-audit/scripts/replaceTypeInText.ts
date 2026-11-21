import { isAbsolute } from "node:path";
import type { Node } from "typescript";

import type { TypeScript } from "./loadPrograms.ts";

export type ReplaceTypeOptions = {
  /**
   * the type to replace, as written in source: whitespace is ignored when matching
   */
  matchText: string;
  /**
   * what to write in its place
   */
  withText: string;
  /**
   * the module `importName` comes from; when absent no import is added
   */
  importFrom?: string;
  /**
   * the name to import: defaults to `withText`
   */
  importName?: string;
  /**
   * replace only the nth match (0-based), leaving the rest
   */
  onlyHitIndex?: number;
};

type TextEdit = { start: number; end: number; newText: string };

const squash = (text: string) => text.replaceAll(/\s+/g, "");

/**
 * the character range of every outermost type node whose text is `matchText`
 */
export const findTypeHits = (
  ts: TypeScript,
  fileName: string,
  text: string,
  matchText: string,
): Array<{ start: number; end: number }> => {
  const sourceFile = ts.createSourceFile(
    fileName,
    text,
    ts.ScriptTarget.Latest,
    true,
    fileName.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const wanted = squash(matchText);
  const hits: Array<{ start: number; end: number }> = [];

  const visit = (node: Node) => {
    if (ts.isTypeNode(node) && squash(node.getText(sourceFile)) === wanted) {
      hits.push({ start: node.getStart(sourceFile), end: node.getEnd() });
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);

  return hits;
};

const importEdit = (
  ts: TypeScript,
  fileName: string,
  text: string,
  importFrom: string,
  importName: string,
): TextEdit | undefined => {
  const sourceFile = ts.createSourceFile(
    fileName,
    text,
    ts.ScriptTarget.Latest,
    true,
    fileName.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const imports = sourceFile.statements.filter(ts.isImportDeclaration);
  const fromModule = imports.filter(
    (declaration) =>
      ts.isStringLiteral(declaration.moduleSpecifier) &&
      declaration.moduleSpecifier.text === importFrom,
  );

  const alreadyImported = fromModule.some((declaration) => {
    const bindings = declaration.importClause?.namedBindings;
    return (
      bindings !== undefined &&
      ts.isNamedImports(bindings) &&
      bindings.elements.some((element) => element.name.text === importName)
    );
  });
  if (alreadyImported) {
    return undefined;
  }

  for (const declaration of fromModule) {
    const bindings = declaration.importClause?.namedBindings;
    if (bindings !== undefined && ts.isNamedImports(bindings)) {
      const lastElement = bindings.elements.at(-1);
      if (lastElement !== undefined) {
        const at = lastElement.getEnd();
        return { start: at, end: at, newText: `, type ${importName}` };
      }
    }
  }

  const newImport = `import { type ${importName} } from "${importFrom}";`;
  const isExternal = (declaration: (typeof imports)[number]) =>
    ts.isStringLiteral(declaration.moduleSpecifier) &&
    !declaration.moduleSpecifier.text.startsWith(".") &&
    !isAbsolute(declaration.moduleSpecifier.text);
  const lastExternal = imports.filter(isExternal).at(-1);
  if (lastExternal !== undefined) {
    const at = lastExternal.getEnd();
    return { start: at, end: at, newText: `\n${newImport}` };
  }
  const [firstImport] = imports;
  if (firstImport !== undefined) {
    const at = firstImport.getStart(sourceFile);
    return { start: at, end: at, newText: `${newImport}\n\n` };
  }
  return { start: 0, end: 0, newText: `${newImport}\n\n` };
};

/**
 * replaces matching types in `text` (all of them, or the one at `onlyHitIndex`)
 * and adds the import for the replacement. Returns the new text and how many
 * types were replaced.
 */
export const replaceTypeInText = (
  ts: TypeScript,
  fileName: string,
  text: string,
  {
    matchText,
    withText,
    importFrom,
    importName = withText,
    onlyHitIndex,
  }: ReplaceTypeOptions,
): { text: string; replacedCount: number } => {
  const allHits = findTypeHits(ts, fileName, text, matchText);
  const hits =
    onlyHitIndex === undefined ? allHits : (
      allHits.slice(onlyHitIndex, onlyHitIndex + 1)
    );
  if (hits.length === 0) {
    return { text, replacedCount: 0 };
  }

  const edits: TextEdit[] = hits.map(({ start, end }) => ({
    start,
    end,
    newText: withText,
  }));
  if (importFrom !== undefined) {
    const edit = importEdit(ts, fileName, text, importFrom, importName);
    if (edit !== undefined) {
      edits.push(edit);
    }
  }

  // later edits first, so earlier offsets stay valid
  const newText = edits
    .toSorted((a, b) => b.start - a.start)
    .reduce(
      (result, { start, end, newText: replacement }) =>
        result.slice(0, start) + replacement + result.slice(end),
      text,
    );

  return { text: newText, replacedCount: hits.length };
};
