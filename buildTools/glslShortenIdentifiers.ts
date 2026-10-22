import {
  type AstNode,
  type IdentifierNode,
  type Program,
} from "@shaderfrog/glsl-parser/ast/ast-types.js";
import { visit } from "@shaderfrog/glsl-parser/ast/visit.js";
import generate from "@shaderfrog/glsl-parser/parser/generator.js";
import { FN_BUILT_INS } from "@shaderfrog/glsl-parser/parser/grammar.js";
import parse from "@shaderfrog/glsl-parser/parser/index.js";
import {
  type FunctionOverloadIndex,
  type ScopeEntry,
  type TypeScopeEntry,
} from "@shaderfrog/glsl-parser/parser/scope.js";
import {
  renameBindings,
  renameFunctions,
  renameTypes,
} from "@shaderfrog/glsl-parser/parser/utils.js";
import preprocess from "@shaderfrog/glsl-parser/preprocessor/index.js";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { minify } from "vite-plugin-glsl";

import { keysIter, objectEntriesIter, valuesIter } from "../src/utils/entries";

const shaderExtensions = [".frag", ".vert", ".glsl"];

/**
 * a name, but not a field or swizzle after a `.` - those are never renamed,
 * and a variable can share a field's name
 */
const identifierPattern = /(?<![.\w])[A-Za-z_]\w*/g;

const fieldSelectionPattern = /\.(?<field>[A-Za-z_]\w*)/g;

const swizzlePattern = /^(?:[xyzw]{1,4}|[rgba]{1,4}|[stpq]{1,4})$/;

const versionLine = /^\s*#version[^\n]*\n/;

/**
 * names glsl reserves - keywords, reserved words, types and built-in
 * functions - which a short name must never be, even where a shader doesn't
 * use them
 */
const reservedNames = new Set(
  `attribute const uniform varying layout centroid flat smooth break continue
  do for while switch case default if else in out inout float int void bool
  true false invariant discard return mat2 mat3 mat4 mat2x2 mat2x3 mat2x4
  mat3x2 mat3x3 mat3x4 mat4x2 mat4x3 mat4x4 vec2 vec3 vec4 ivec2 ivec3 ivec4
  bvec2 bvec3 bvec4 uint uvec2 uvec3 uvec4 lowp mediump highp precision
  sampler2D sampler3D samplerCube sampler2DShadow samplerCubeShadow
  sampler2DArray sampler2DArrayShadow isampler2D isampler3D isamplerCube
  isampler2DArray usampler2D usampler3D usamplerCube usampler2DArray struct
  asm class union enum typedef template this goto inline noinline volatile
  public static extern external interface long short double half fixed
  unsigned superp input output hvec2 hvec3 hvec4 dvec2 dvec3 dvec4 fvec2
  fvec3 fvec4 sampler3DRect filter image1D image2D image3D imageCube
  iimage1D iimage2D iimage3D iimageCube uimage1D uimage2D uimage3D uimageCube
  image1DArray image2DArray iimage1DArray iimage2DArray uimage1DArray
  uimage2DArray image1DShadow image2DShadow image1DArrayShadow
  image2DArrayShadow imageBuffer iimageBuffer uimageBuffer sampler1D
  sampler1DShadow sampler1DArray sampler1DArrayShadow isampler1D
  isampler1DArray usampler1D usampler1DArray sampler2DRect
  sampler2DRectShadow isampler2DRect usampler2DRect samplerBuffer
  isamplerBuffer usamplerBuffer sampler2DMS isampler2DMS usampler2DMS
  sampler2DMSArray isampler2DMSArray usampler2DMSArray sizeof cast namespace
  using main`
    .split(/\s+/)
    .concat(...FN_BUILT_INS),
);

/**
 * names a shader declares that are read from outside it - by js, or by the
 * other stage of its program - so must keep their names
 */
const externalDeclaration =
  /\b(?:uniform|in|out|inout|attribute|varying)\s+(?:(?:highp|mediump|lowp|flat|smooth|centroid)\s+)*\w+\s+(?<name>\w+)/g;

const withoutComments = (source: string) =>
  source.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "");

/**
 * every shader source under a directory, in path order, so the names given
 * out in order of first appearance are the same on every machine
 */
const shaderSourcesIn = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true, recursive: true })
    .filter(
      (entry) =>
        entry.isFile() && shaderExtensions.includes(path.extname(entry.name)),
    )
    .map((entry) => path.join(entry.parentPath, entry.name))
    .sort()
    .map((file) => withoutComments(readFileSync(file, "utf8")));

/**
 * short names in order: one letter, then two, and so on - never one a glsl
 * name or any name already in the shaders could be confused with
 */
function* shortNamesAvoiding(
  taken: ReadonlySet<string>,
): Generator<string, never> {
  const firstChars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const laterChars = [...firstChars, ..."0123456789"];
  let lengthNames = firstChars;
  while (true) {
    for (const name of lengthNames) {
      if (!taken.has(name) && !reservedNames.has(name)) {
        yield name;
      }
    }
    lengthNames = lengthNames.flatMap((prefix) =>
      laterChars.map((char) => `${prefix}${char}`),
    );
  }
}

const includeLine = /^\s*#include[^\n]*$/gm;

/**
 * a shader source on its own, without its includes or version - enough to
 * see what it declares
 */
const parsedAlone = (source: string) =>
  parse(preprocess(source.replace(versionLine, "").replace(includeLine, "")), {
    quiet: true,
  });

type ShaderNames = {
  /**
   * a short name for every name declared outside functions - functions,
   * constants and struct types - the same in every shader, so code shared
   * between shaders comes out the same in each and compresses together
   */
  globalShortNames: ReadonlyMap<string, string>;
  /**
   * names read from outside a shader, or built into glsl, which keep their
   * names
   */
  keptNames: ReadonlySet<string>;
  /**
   * a short name for every struct field, the most used shortest - fields
   * are only ever read after a `.`, so need only differ from each other
   */
  fieldShortNames: ReadonlyMap<string, string>;
};

/**
 * the short names for every shader under a directory. Globals are given them
 * in order of first appearance, which compresses better than giving the most
 * used the shortest: names then come out in the same order the code reads
 */
const shaderNamesIn = (
  /**
   * the directory every shader is under
   */
  shadersDirectory: string,
): ShaderNames => {
  const sources = shaderSourcesIn(shadersDirectory);
  const uses = new Map<string, number>();
  const external = new Set<string>();
  const declaredGlobally = new Set<string>();
  const declaredInFunctions = new Set<string>();
  const fieldNames = new Set<string>();
  const fieldUses = new Map<string, number>();
  for (const source of sources) {
    for (const [name] of source.matchAll(identifierPattern)) {
      uses.set(name, (uses.get(name) ?? 0) + 1);
    }
    for (const match of source.matchAll(externalDeclaration)) {
      external.add(match.groups!.name);
    }
    const parsedSource = parsedAlone(source);
    visit(parsedSource, {
      struct_declarator: {
        enter({ node }) {
          for (const declaration of node.declarations) {
            fieldNames.add(declaration.identifier.identifier);
          }
        },
      },
    });
    for (const match of source.matchAll(fieldSelectionPattern)) {
      const { field } = match.groups!;
      fieldUses.set(field, (fieldUses.get(field) ?? 0) + 1);
    }
    const [globalScope, ...functionScopes] = parsedSource.scopes;
    for (const declarations of [
      globalScope.bindings,
      globalScope.types,
      globalScope.functions,
    ]) {
      for (const name of keysIter<string>(declarations)) {
        declaredGlobally.add(name);
      }
    }
    for (const scope of functionScopes) {
      for (const name of keysIter<string>(scope.bindings)) {
        declaredInFunctions.add(name);
      }
    }
  }
  const isGlobalRenamable = (name: string) =>
    declaredGlobally.has(name) &&
    !reservedNames.has(name) &&
    !external.has(name) &&
    !name.startsWith("gl_");
  // a map keeps the order its names first appeared in
  const globalNames = uses
    .keys()
    .filter((name) => isGlobalRenamable(name))
    .toArray();
  // every renamed name changes at once, so only the names kept are taken
  const keptNames = new Set(uses.keys())
    .difference(new Set(globalNames))
    .difference(declaredInFunctions);
  const globalShortNames = shortNamesAvoiding(keptNames);
  // a swizzle-like field read after a `.` can't be told from a swizzle
  const isKeptField = (name: string) =>
    swizzlePattern.test(name) || name === "length";
  // and a shortened field can't share a struct with a kept one
  const fieldShortNames = shortNamesAvoiding(
    new Set(fieldNames.values().filter(isKeptField)),
  );
  return {
    globalShortNames: new Map(
      globalNames.map((name) => [name, globalShortNames.next().value]),
    ),
    keptNames,
    fieldShortNames: new Map(
      fieldNames
        .values()
        .filter((name) => !isKeptField(name))
        .toArray()
        .sort(
          (fieldA, fieldB) =>
            (fieldUses.get(fieldB) ?? 0) - (fieldUses.get(fieldA) ?? 0) ||
            fieldA.localeCompare(fieldB),
        )
        .map((name) => [name, fieldShortNames.next().value]),
    ),
  };
};

/**
 * `1.0` as `1.`, `0.5` as `.5` - the same float in fewer characters
 */
const shortestFloat = (token: string): string => {
  const match = /^(?<whole>\d*)\.(?<fraction>\d*)$/.exec(token);
  if (match === null) {
    return token;
  }
  const whole = match.groups!.whole.replace(/^0+/, "");
  const fraction = match.groups!.fraction.replace(/0+$/, "");
  return whole === "" && fraction === "" ? "0." : `${whole}.${fraction}`;
};

/**
 * every node within a node, itself included
 */
const nodesWithin = (node: AstNode): ReadonlySet<unknown> => {
  const nodes = new Set<unknown>();
  const walk = (value: unknown) => {
    if (Array.isArray(value)) {
      for (const item of value) {
        walk(item);
      }
    } else if (
      typeof value === "object" &&
      value !== null &&
      "type" in value &&
      !nodes.has(value)
    ) {
      nodes.add(value);
      for (const property of valuesIter(value)) {
        walk(property);
      }
    }
  };
  walk(node);
  return nodes;
};

/**
 * gives each function's own names - its parameters and locals, in the order
 * they are declared - the shortest names free in it, from `a` again in every
 * function: they need only differ from each other and from the names the
 * function uses from outside it. A local may hide a global the function never
 * uses
 */
const shortenFunctionNames = (
  program: Program,
  keptNames: ReadonlySet<string>,
) => {
  const [globalScope, ...innerScopes] = program.scopes;
  for (const functionNode of program.program) {
    if (functionNode.type !== "function") {
      continue;
    }
    const within = nodesWithin(functionNode);
    const isUsedWithin = ({ references }: { references: AstNode[] }) =>
      references.some((reference) => within.has(reference));
    // its locals hide anything else, so every name it uses from outside stays
    const usedFromOutside = new Set(
      objectEntriesIter<string, ScopeEntry>(globalScope.bindings)
        .filter(([, binding]) => isUsedWithin(binding))
        .map(([name]) => name),
    )
      .union(
        new Set(
          objectEntriesIter<string, TypeScopeEntry>(globalScope.types)
            .filter(([, type]) => isUsedWithin(type))
            .map(([name]) => name),
        ),
      )
      .union(
        new Set(
          objectEntriesIter<string, FunctionOverloadIndex>(
            globalScope.functions,
          )
            .filter(([, overloads]) => valuesIter(overloads).some(isUsedWithin))
            .map(([name]) => name),
        ),
      );
    // one run of names over all its scopes, so no local hides another
    const shortNames = shortNamesAvoiding(keptNames.union(usedFromOutside));
    for (const scope of innerScopes) {
      const ownNames = new Map(
        objectEntriesIter<string, ScopeEntry>(scope.bindings)
          .filter(
            ([, { declaration }]) =>
              declaration !== undefined && within.has(declaration),
          )
          .map(([name]) => [name, shortNames.next().value]),
      );
      if (ownNames.size > 0) {
        scope.bindings = renameBindings(
          scope.bindings,
          (name) => ownNames.get(name) ?? name,
        );
      }
    }
  }
};

/**
 * A `vite-plugin-glsl` `onComplete` that shortens a shader's own names -
 * functions, variables, parameters, constants, struct types and their
 * fields - and its float literals. What is read from outside the shader
 * (uniforms, ins and outs, `main`, built-ins) keeps its name. Macros are
 * expanded first, since their bodies are text the renaming cannot see into
 */
export const glslShortenIdentifiers = (
  /**
   * the directory every shader is under
   */
  shadersDirectory: string,
) => {
  const { globalShortNames, keptNames, fieldShortNames } =
    shaderNamesIn(shadersDirectory);
  const globalShortNameOf = (name: string) =>
    globalShortNames.get(name) ?? name;

  return (shader: string): string => {
    // kept aside, since the preprocessor drops it
    const [version = ""] = versionLine.exec(shader) ?? [];
    const program = parse(preprocess(shader.slice(version.length)), {
      quiet: true,
    });
    visit(program, {
      struct_declarator: {
        enter({ node }) {
          for (const { identifier } of node.declarations) {
            identifier.identifier =
              fieldShortNames.get(identifier.identifier) ??
              identifier.identifier;
          }
        },
      },
      field_selection: {
        enter({ node }) {
          // the parser gives an identifier here, though its types say a literal
          const selection = node.selection as unknown as IdentifierNode;
          selection.identifier =
            fieldShortNames.get(selection.identifier) ?? selection.identifier;
        },
      },
      float_constant: {
        enter({ node }) {
          node.token = shortestFloat(node.token);
        },
      },
    });
    const [globalScope] = program.scopes;
    globalScope.bindings = renameBindings(globalScope.bindings, (name) =>
      globalScope.bindings[name].declaration === undefined ?
        name
      : globalShortNameOf(name),
    );
    globalScope.types = renameTypes(globalScope.types, (name) =>
      globalScope.types[name].declaration === undefined ?
        name
      : globalShortNameOf(name),
    );
    globalScope.functions = renameFunctions(globalScope.functions, (name) =>
      (
        valuesIter(globalScope.functions[name]).some(
          ({ declaration }) => declaration !== undefined,
        )
      ) ?
        globalShortNameOf(name)
      : name,
    );
    shortenFunctionNames(program, keptNames);
    return `${version}${minify(generate(program))}`;
  };
};
