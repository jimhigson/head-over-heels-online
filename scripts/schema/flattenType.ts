#!/usr/bin/env -S pnpm tsx

import type { Type, TypeChecker } from "ts-morph";
import { Project } from "ts-morph";
import * as path from "path";
import { fileURLToPath } from "url";
import { Command } from "commander";
import { normalizeTypeOutput } from "./normalizeTypeOutput.js";
import { freeItemTypes } from "../../src/game/physics/itemPredicates.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class TypeFlattener {
  private processedTypes = new Set<string>();
  private typeDefinitions: string[] = [];
  private typeChecker: TypeChecker;
  private project: Project;
  private currentSourceFile?: string;

  constructor(typeChecker: TypeChecker, project: Project, sourceFile?: string) {
    this.typeChecker = typeChecker;
    this.project = project;
    this.currentSourceFile = sourceFile;
  }

  public reset() {
    this.processedTypes.clear();
    this.typeDefinitions = [];
  }

  public getTypeDefinitions(): string[] {
    return [...this.typeDefinitions];
  }

  // Helper to ensure type names start with capital letter
  private capitalizeTypeName(typeName: string): string {
    if (
      !typeName ||
      typeName === "any" ||
      typeName === "string" ||
      typeName === "number" ||
      typeName === "boolean" ||
      typeName === "undefined" ||
      typeName === "null"
    ) {
      return typeName;
    }
    return typeName.charAt(0).toUpperCase() + typeName.slice(1);
  }

  // Process object types with optional property support
  public processTypeAsObject(
    type: Type,
    typeName: string,
    depth: number,
    forceOptional: boolean = false,
  ): string {
    // Use getApparentProperties() for better performance and resolution
    const properties = type.getApparentProperties();

    if (properties.length === 0) {
      // Check if this might be a type with call signatures or other complex structure
      const callSignatures = type.getCallSignatures();
      if (callSignatures.length > 0) {
        return "(...args: any[]) => any";
      }

      // Check for string index signature (Record types)
      const stringIndexType = type.getStringIndexType();
      if (stringIndexType) {
        // This is a Record<string, T> type - process the value type
        const valueType = this.processType(
          stringIndexType,
          this.capitalizeTypeName(`${typeName}Value`),
          depth + 1,
        );
        return `Record<string, ${valueType}>`;
      }

      return "Record<string, any>";
    }

    const propertyDefinitions: string[] = [];

    for (const prop of properties) {
      const propName = prop.getName();

      // Skip symbol properties and invalid names
      if (
        propName.startsWith("__") ||
        !propName.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/)
      ) {
        continue;
      }

      try {
        // Use better property type resolution
        const propDeclaration =
          prop.getValueDeclaration() ?? prop.getDeclarations()[0];
        if (!propDeclaration) {
          propertyDefinitions.push(`  ${propName}: any;`);
          continue;
        }

        // Get the type at the property's location for better accuracy
        const propType = this.typeChecker.getTypeOfSymbolAtLocation(
          prop,
          propDeclaration,
        );

        // Check if property is optional
        const hasQuestionToken =
          propDeclaration &&
          "hasQuestionToken" in propDeclaration &&
          typeof (
            propDeclaration as unknown as { hasQuestionToken?: () => boolean }
          ).hasQuestionToken === "function" &&
          (
            propDeclaration as unknown as { hasQuestionToken: () => boolean }
          ).hasQuestionToken();

        // Check if the property is actually optional using symbol flags
        const propFlags = prop.getFlags();
        const isOptionalProperty = (propFlags & 16777216) !== 0; // ts.SymbolFlags.Optional

        // Check if the type includes undefined (e.g., string | undefined)
        const includesUndefined =
          propType.isUnion() &&
          propType.getUnionTypes().some((t) => t.isUndefined());

        const isOptional =
          forceOptional ||
          hasQuestionToken ||
          isOptionalProperty ||
          includesUndefined;

        // Process the type, but if it includes undefined and we're marking as optional,
        // we should process a version without undefined
        let typeToProcess = propType;
        if (includesUndefined && propType.isUnion()) {
          // Filter out undefined from the union
          const nonUndefinedTypes = propType
            .getUnionTypes()
            .filter((t) => !t.isUndefined());
          if (nonUndefinedTypes.length === 1) {
            // If only one type remains, use it directly
            [typeToProcess] = nonUndefinedTypes;
          } else if (nonUndefinedTypes.length > 1) {
            // Multiple types remain, we need to create a new union
            // For now, we'll process the original type and handle it in processType
            typeToProcess = propType;
          }
        }

        // Special case for RoomJson.items property
        let propTypeName: string;
        const propTypeText = propType.getText();
        if (
          propName === "items" &&
          typeName.includes("RoomJson") &&
          (propTypeText.includes("Record") ||
            propTypeText.includes("RoomJsonItems"))
        ) {
          // This is the special case for RoomJson.items
          // We need to manually construct the union of all JsonItem types
          propTypeName = this.buildJsonItemUnion(depth + 1);
        } else if (
          propName === "emits" &&
          (typeName.includes("Emitter") || typeName.includes("emitter")) &&
          (propTypeText.includes("EmittableItemRecipe") ||
            propTypeText.includes("Omit"))
        ) {
          // Special case for emitter.emits property
          // We need to manually construct the union of emittable item types
          propTypeName = this.buildEmittableItemUnion(depth + 1);
        } else {
          propTypeName = this.processType(
            typeToProcess,
            this.capitalizeTypeName(
              `${typeName}${propName.charAt(0).toUpperCase() + propName.slice(1)}`,
            ),
            depth + 1,
            isOptional && includesUndefined, // Pass flag to strip undefined
          );
        }

        // Get JSDoc comments from the property
        let jsDocComment = "";
        if (propDeclaration) {
          const jsDocNodes =
            (
              "getJsDocs" in propDeclaration &&
              typeof (
                propDeclaration as unknown as { getJsDocs?: () => unknown[] }
              ).getJsDocs === "function"
            ) ?
              (
                propDeclaration as unknown as { getJsDocs: () => unknown[] }
              ).getJsDocs()
            : [];
          if (jsDocNodes.length > 0) {
            const comment = jsDocNodes[0].getComment();
            if (comment) {
              const commentText =
                typeof comment === "string" ? comment : (
                  comment.map((c) => c.getText()).join("")
                );
              jsDocComment = `\n  /**\n   * ${commentText.replace(/\n/g, "\n   * ")}\n   */`;
            }
          }
        }

        propertyDefinitions.push(
          `${jsDocComment}\n  ${propName}${isOptional ? "?" : ""}: ${propTypeName};`,
        );
      } catch (error) {
        // If we can't process a property, skip it or use any
        if (process.env.DEBUG) {
          console.error(`Error processing property ${propName}:`, error);
        }
        propertyDefinitions.push(`  ${propName}: any;`);
      }
    }

    if (propertyDefinitions.length === 0) {
      return "Record<string, any>";
    }

    return `{\n${propertyDefinitions.join("\n")}\n}`;
  }

  // Recursively process the type
  public processType(
    type: Type,
    typeName: string,
    depth: number = 0,
    stripUndefined: boolean = false,
  ): string {
    // Prevent infinite recursion
    if (depth > 20) {
      return "any";
    }

    // Check for type symbol early to handle type references properly
    const typeSymbol = type.getSymbol();
    const typeString = type.getText();

    // Handle primitives first
    if (type.isString()) return "string";
    if (type.isNumber()) return "number";
    if (type.isBoolean()) return "boolean";
    if (type.isUndefined()) return "undefined";
    if (type.isNull()) return "null";
    if (type.isNever()) return "never";
    if (type.isStringLiteral()) return `"${type.getLiteralValue()}"`;
    if (type.isNumberLiteral()) return String(type.getLiteralValue());
    if (type.isBooleanLiteral()) {
      // getLiteralValue() returns undefined for boolean literals, use getText() instead
      return type.getText();
    }

    // Handle type parameters by resolving to their constraints
    if (type.isTypeParameter()) {
      const constraint = type.getConstraint();
      if (constraint) {
        return this.processType(constraint, typeName, depth + 1);
      }
      // If no constraint, default to string for most generic parameters
      return "string";
    }

    // Handle Partial<T> types specially
    if (type.getSymbol()?.getName() === "Partial") {
      const typeArgs = type.getTypeArguments();
      if (typeArgs.length === 1) {
        return this.processTypeAsObject(typeArgs[0], typeName, depth + 1, true);
      }
    }

    // Also check for Partial types in the type string (alternative detection)
    if (typeString.includes("Partial<")) {
      const typeArgs = type.getTypeArguments();
      if (typeArgs.length === 1) {
        return this.processTypeAsObject(typeArgs[0], typeName, depth + 1, true);
      }
    }

    // Handle Omit<Union, K> types specially
    if (
      type.getSymbol()?.getName() === "Omit" ||
      typeString.includes("Omit<")
    ) {
      const typeArgs = type.getTypeArguments();
      if (typeArgs.length === 2) {
        const [sourceType, keysToOmit] = typeArgs;

        // If the source type is a union, we need to distribute Omit over each member
        if (sourceType.isUnion()) {
          const unionMembers = sourceType.getUnionTypes();
          const distributedMembers = unionMembers.map((memberType, index) => {
            // For each union member, create an object without the omitted keys
            return this.processOmitType(
              memberType,
              keysToOmit,
              `${typeName}Member${index}`,
              depth + 1,
            );
          });

          return distributedMembers.join(" | ");
        } else {
          // Not a union, process normally
          return this.processOmitType(
            sourceType,
            keysToOmit,
            typeName,
            depth + 1,
          );
        }
      }
    }

    // Handle NoInfer<T> types by unwrapping them - NoInfer serves no purpose in flattened output
    if (type.getSymbol()?.getName() === "NoInfer") {
      const typeArgs = type.getTypeArguments();
      if (typeArgs.length === 1) {
        return this.processType(typeArgs[0], typeName, depth + 1);
      }
    }

    // Also check for NoInfer types in the type string (alternative detection)
    if (typeString.includes("NoInfer<")) {
      const typeArgs = type.getTypeArguments();
      if (typeArgs.length === 1) {
        return this.processType(typeArgs[0], typeName, depth + 1);
      }
    }

    // Enhanced symbol-based type resolution
    if (typeSymbol && !type.isArray()) {
      // Use getAliasedSymbol() for better import resolution
      const targetSymbol = typeSymbol.getAliasedSymbol() || typeSymbol;
      const symbolName = targetSymbol.getName();

      if (
        symbolName &&
        symbolName !== "__type" &&
        !symbolName.startsWith("__")
      ) {
        const capitalizedSymbolName = this.capitalizeTypeName(symbolName);

        // If we haven't processed this type yet, resolve it now
        if (!this.processedTypes.has(capitalizedSymbolName)) {
          const typeDeclarations = targetSymbol.getDeclarations();
          if (typeDeclarations && typeDeclarations.length > 0) {
            const [declaration] = typeDeclarations;

            // Mark as processing to avoid infinite recursion
            this.processedTypes.add(capitalizedSymbolName);

            let resolvedTypeDefinition = "";

            // Use more robust type resolution based on declaration kind
            try {
              if (
                "getTypeNode" in declaration &&
                typeof declaration.getTypeNode === "function"
              ) {
                // Type alias: resolve the aliased type
                const aliasedTypeNode = declaration.getTypeNode();
                if (aliasedTypeNode) {
                  // Check if this is an Omit type
                  const typeNodeText = aliasedTypeNode.getText();
                  if (typeNodeText.includes("Omit<")) {
                    // Parse the Omit type manually
                    const omitMatch = typeNodeText.match(
                      /Omit<([^,]+),\s*([^>]+)>/,
                    );
                    if (omitMatch) {
                      const [, sourceTypeName, keysToOmitStr] = omitMatch;

                      // Try to resolve the source type
                      const sourceTypeSymbol = this.project
                        .getSourceFiles()
                        .flatMap((sf) => [
                          ...sf.getTypeAliases(),
                          ...sf.getInterfaces(),
                        ])
                        .find((t) => t.getName() === sourceTypeName.trim());

                      if (sourceTypeSymbol) {
                        const sourceType =
                          this.typeChecker.getTypeAtLocation(sourceTypeSymbol);

                        // Create a synthetic string literal type for the keys
                        const keysToOmit = keysToOmitStr
                          .replace(/['"]/g, "")
                          .trim();

                        if (sourceType.isUnion()) {
                          // Manually distribute Omit over union
                          const unionMembers = sourceType.getUnionTypes();
                          const distributedMembers = unionMembers.map(
                            (memberType) => {
                              const props = memberType.getApparentProperties();
                              const propertyDefinitions: string[] = [];

                              for (const prop of props) {
                                const propName = prop.getName();
                                if (propName === keysToOmit) continue;

                                const propDeclaration =
                                  prop.getValueDeclaration() ??
                                  prop.getDeclarations()[0];
                                if (!propDeclaration) continue;

                                const propType =
                                  this.typeChecker.getTypeOfSymbolAtLocation(
                                    prop,
                                    propDeclaration,
                                  );
                                const propTypeName = this.processType(
                                  propType,
                                  `${capitalizedSymbolName}${propName.charAt(0).toUpperCase() + propName.slice(1)}`,
                                  depth + 1,
                                );

                                propertyDefinitions.push(
                                  `  ${propName}: ${propTypeName};`,
                                );
                              }

                              return `{\n${propertyDefinitions.join("\n")}\n}`;
                            },
                          );

                          return distributedMembers.join(" | ");
                        }
                      }
                    }
                  }

                  const aliasedType =
                    this.typeChecker.getTypeAtLocation(aliasedTypeNode);
                  resolvedTypeDefinition = this.processType(
                    aliasedType,
                    capitalizedSymbolName,
                    depth + 1,
                  );
                }
              } else {
                // Interface or other: get the type directly from the declaration
                const declType =
                  this.typeChecker.getTypeAtLocation(declaration);
                resolvedTypeDefinition = this.processType(
                  declType,
                  capitalizedSymbolName,
                  depth + 1,
                );
              }
            } catch (_error) {
              // Fallback: try to resolve by name from project files
              this.resolveTypeByName(symbolName);
              return capitalizedSymbolName;
            }

            // For inline types, we don't create separate type definitions
            // Just return the resolved definition directly
            if (
              resolvedTypeDefinition &&
              resolvedTypeDefinition !== capitalizedSymbolName &&
              resolvedTypeDefinition !== "any"
            ) {
              return resolvedTypeDefinition;
            }
          } else {
            // Try to resolve this type from the project files as fallback
            this.resolveTypeByName(symbolName);
          }
        } else {
          // Already processed, but we might have a definition for it
          // This handles circular references
          return capitalizedSymbolName;
        }

        // Return the resolved type definition inline if we have it
        return capitalizedSymbolName;
      }
    }

    // Fallback for unresolved type references - try to resolve from project
    if (
      typeString &&
      !type.isArray() &&
      !type.isUnion() &&
      !type.isIntersection() &&
      !type.isObject()
    ) {
      let cleanTypeString = typeString.replace(/import\([^)]+\)\./g, "");

      // Handle NoInfer<T> by unwrapping to just T
      if (
        cleanTypeString.startsWith("NoInfer<") &&
        cleanTypeString.endsWith(">")
      ) {
        cleanTypeString = cleanTypeString.slice(8, -1); // Remove "NoInfer<" and ">"
      }

      // Handle generic type instantiations that should be expanded (e.g., SwitchItemModificationUnion<string, string>)
      const genericMatch = cleanTypeString.match(
        /^([A-Za-z_$][A-Za-z0-9_$]*)<(.+)>$/,
      );
      if (genericMatch) {
        const [, baseTypeName] = genericMatch;

        // Try to find and resolve the base type from the project
        const sourceFiles = this.getProject().getSourceFiles();
        for (const sourceFile of sourceFiles) {
          const typeAlias = sourceFile.getTypeAlias(baseTypeName);
          if (typeAlias) {
            const typeNode = typeAlias.getTypeNode();
            if (typeNode) {
              const resolvedType = this.typeChecker.getTypeAtLocation(typeNode);
              const baseDefinition = this.processType(
                resolvedType,
                typeName,
                depth + 1,
              );
              return baseDefinition;
            }
          }
        }
      }

      const capitalizedName = this.capitalizeTypeName(cleanTypeString);

      // Try to resolve this type from the project if we haven't seen it yet
      if (!this.processedTypes.has(capitalizedName)) {
        this.resolveTypeByName(cleanTypeString);
      }

      return capitalizedName;
    }

    // Handle arrays
    if (type.isArray()) {
      const elementType = type.getArrayElementType();
      if (elementType) {
        const elementTypeName = this.processType(
          elementType,
          `${typeName}Element`,
          depth + 1,
        );
        // Always wrap in parentheses - prettier will remove them if unnecessary
        // This ensures union types like (A | B)[] are handled correctly
        return `(${elementTypeName})[]`;
      }
      return "any[]";
    }

    // Check if this is Array<T> syntax
    if (
      typeSymbol?.getName() === "Array" &&
      type.getTypeArguments().length === 1
    ) {
      const [elementType] = type.getTypeArguments();
      const elementTypeName = this.processType(
        elementType,
        `${typeName}Element`,
        depth + 1,
      );
      // Always wrap in parentheses - prettier will remove them if unnecessary
      // This ensures union types like (A | B)[] are handled correctly
      return `(${elementTypeName})[]`;
    }

    // Handle union types
    if (type.isUnion()) {
      const unionTypes = type.getUnionTypes();

      // Check if all union members are literals
      const allLiterals = unionTypes.every(
        (t) =>
          t.isStringLiteral() || t.isNumberLiteral() || t.isBooleanLiteral(),
      );

      if (allLiterals) {
        return unionTypes
          .map((t) => {
            if (t.isStringLiteral()) return `"${t.getLiteralValue()}"`;
            if (t.isNumberLiteral()) return String(t.getLiteralValue());
            if (t.isBooleanLiteral()) return t.getText();
            return "unknown";
          })
          .join(" | ");
      }

      const unionMembers = unionTypes
        .filter((unionType) => !stripUndefined || !unionType.isUndefined())
        .map((unionType, index) => {
          if (unionType.isStringLiteral()) {
            return `"${unionType.getLiteralValue()}"`;
          } else if (unionType.isNumberLiteral()) {
            return unionType.getLiteralValue().toString();
          } else if (unionType.isBooleanLiteral()) {
            // getLiteralValue() returns undefined for boolean literals, use getText() instead
            return unionType.getText();
          } else if (unionType.isUndefined()) {
            return "undefined";
          } else if (unionType.isNull()) {
            return "null";
          } else {
            return this.processType(
              unionType,
              this.capitalizeTypeName(`${typeName}Union${index}`),
              depth + 1,
              stripUndefined,
            );
          }
        });

      // Filter out duplicates and join
      const uniqueMembers = [...new Set(unionMembers)];
      return uniqueMembers.join(" | ");
    }

    // Handle intersection types (A & B)
    if (type.isIntersection()) {
      const members = type.getIntersectionTypes();
      const objectMembers: Type[] = [];
      const unionMembers: Type[] = [];

      for (const t of members) {
        if (t.isUnion()) {
          unionMembers.push(...t.getUnionTypes());
        } else {
          objectMembers.push(t);
        }
      }

      if (unionMembers.length > 0) {
        // Handle cases like ConsolidatableConfig & { style: BlockStyle } where one part is a union
        return unionMembers
          .map((t) => {
            const merged = [...objectMembers, t];
            return merged
              .map((m) => this.processType(m, typeName, depth + 1))
              .filter(Boolean)
              .map((s) =>
                s.startsWith("{") && s.endsWith("}") ?
                  s.slice(1, -1).trim()
                : s,
              )
              .join("\n");
          })
          .map((body) => `{\n${body}\n}`)
          .join(" | ");
      }

      // Regular intersection - merge all members by forcing object expansion
      const mergedProperties: string[] = [];

      for (const member of members) {
        const processed = this.processType(
          member,
          `${typeName}Member`,
          depth + 1,
        );

        if (processed.startsWith("{") && processed.endsWith("}")) {
          // Extract object properties
          const properties = processed.slice(1, -1).trim();
          if (properties) {
            mergedProperties.push(properties);
          }
        } else {
          // For type references, try to expand them as objects
          const expandedAsObject = this.processTypeAsObject(
            member,
            `${typeName}Member`,
            depth + 1,
          );
          if (
            expandedAsObject.startsWith("{") &&
            expandedAsObject.endsWith("}")
          ) {
            const properties = expandedAsObject.slice(1, -1).trim();
            if (properties) {
              mergedProperties.push(properties);
            }
          }
        }
      }

      return `{\n${mergedProperties.join("\n")}\n}`;
    }

    // Handle object types
    if (type.isObject()) {
      const objectTypeString = type.getText();

      // Handle Record types specially
      // Note: We need to be careful here because TypeScript might have already
      // resolved the Record type in some cases
      const isRecordType =
        type.getSymbol()?.getName() === "Record" ||
        objectTypeString.startsWith("Record<") ||
        objectTypeString.includes("Record<");

      if (isRecordType) {
        const typeArguments = type.getTypeArguments();
        if (typeArguments.length === 2) {
          const keyType = this.processType(
            typeArguments[0],
            this.capitalizeTypeName(`${typeName}Key`),
            depth + 1,
          );

          // For the value type, check if it's an object type that needs expansion
          const [, valueTypeArg] = typeArguments;

          // Process the value type - if it's an object, make sure to expand it properly
          let valueType: string;
          if (valueTypeArg.isObject() && !valueTypeArg.isArray()) {
            // For object types, use processTypeAsObject to ensure all properties are expanded
            valueType = this.processTypeAsObject(
              valueTypeArg,
              this.capitalizeTypeName(`${typeName}Value`),
              depth + 1,
            );
          } else {
            // For non-object types, process normally
            valueType = this.processType(
              valueTypeArg,
              this.capitalizeTypeName(`${typeName}Value`),
              depth + 1,
            );
          }

          // Special case: Record<string, never> should be {} for JSON schema
          if (keyType === "string" && valueType === "never") {
            return "{}";
          }

          return `Record<${keyType}, ${valueType}>`;
        } else if (typeArguments.length === 0) {
          // TypeScript might have already resolved the Record type
          // Check for string index signature first
          const stringIndexType = type.getStringIndexType();
          if (stringIndexType) {
            // This is a Record<string, T> type - process the value type properly
            const valueType = this.processType(
              stringIndexType,
              this.capitalizeTypeName(`${typeName}Value`),
              depth + 1,
            );
            return `Record<string, ${valueType}>`;
          }

          // Otherwise, treat it as a regular object
          const objectDefinition = this.processTypeAsObject(
            type,
            typeName,
            depth,
          );

          return objectDefinition;
        }
      }

      const objectDefinition = this.processTypeAsObject(type, typeName, depth);

      // Always inline object definitions instead of creating separate types
      return objectDefinition;
    }

    // Return the type string as fallback, cleaned of import paths
    return typeString.replace(/import\([^)]+\)\./g, "");
  }

  // Helper function to resolve a type by name from the project
  private resolveTypeByName(typeName: string): void {
    if (this.processedTypes.has(typeName)) {
      return; // Already processed
    }

    // Search for the type in all source files
    const sourceFiles = this.getProject().getSourceFiles();
    for (const sourceFile of sourceFiles) {
      // Look for type alias declarations
      const typeAlias = sourceFile.getTypeAlias(typeName);
      if (typeAlias) {
        const typeNode = typeAlias.getTypeNode();
        if (typeNode) {
          // Check if this is an Omit type
          const resolvedType = this.typeChecker.getTypeAtLocation(typeNode);
          this.processedTypes.add(typeName);
          const definition = this.processType(resolvedType, typeName, 0);
          if (definition !== typeName && definition !== "any") {
            // Don't create separate type definitions for inline resolution
            // This is handled by the caller
          }
          return;
        }
      }

      // Look for interface declarations
      const interfaceDecl = sourceFile.getInterface(typeName);
      if (interfaceDecl) {
        const resolvedType = this.typeChecker.getTypeAtLocation(interfaceDecl);
        this.processedTypes.add(typeName);
        const definition = this.processType(resolvedType, typeName, 0);
        if (definition !== typeName && definition !== "any") {
          // Don't create separate type definitions for inline resolution
        }
        return;
      }
    }
  }

  private getProject(): Project {
    return this.project;
  }

  // Special method to build the JsonItemUnion for RoomJson.items
  private buildJsonItemUnion(_depth: number): string {
    // Try to find JsonItemType in the project
    let itemTypes: string[] = [];

    // First try to find it in the current source files
    const sourceFiles = this.getProject().getSourceFiles();
    for (const sourceFile of sourceFiles) {
      const filePath = sourceFile.getFilePath();
      if (filePath.includes("JsonItem")) {
        // Look for JsonItemType type alias
        const jsonItemType = sourceFile.getTypeAlias("JsonItemType");
        if (jsonItemType) {
          const typeNode = jsonItemType.getTypeNode();
          if (typeNode) {
            const type = this.typeChecker.getTypeAtLocation(typeNode);
            if (type.isUnion()) {
              itemTypes = type
                .getUnionTypes()
                .filter((t) => t.isStringLiteral())
                .map((t) => t.getLiteralValue() as string);
              break;
            }
          }
        }
      }
    }

    // If still no item types found, fall back to a comprehensive list
    if (itemTypes.length === 0) {
      itemTypes = [
        "door",
        "bubbles",
        "teleporter",
        "barrier",
        "block",
        "deadlyBlock",
        "spikes",
        "portableBlock",
        "pushableBlock",
        "movingPlatform",
        "moveableDeadly",
        "conveyor",
        "pickup",
        "spring",
        "sceneryPlayer",
        "sceneryCrown",
        "emitter",
        "firedDoughnut",
        "slidingDeadly",
        "slidingBlock",
        "player",
        "monster",
        "lift",
        "joystick",
        "charles",
        "switch",
        "hushPuppy",
        "ball",
        "wall",
        "floor",
      ];
    }

    // Build the union of all JsonItem types
    const unionParts: string[] = [];

    for (const itemType of itemTypes) {
      const itemTypeDef = `{

  type: "${itemType}";

  position: {

  x: number;

  y: number;

  z: number;
};

  config: ${this.getConfigForItemType(itemType)};
}`;
      unionParts.push(itemTypeDef);
    }

    return `Record<string, ${unionParts.join(" | ")}>`;
  }

  // Process Omit<T, K> type by removing specified keys
  private processOmitType(
    sourceType: Type,
    keysToOmit: Type,
    typeName: string,
    depth: number,
  ): string {
    // Get all properties of the source type
    const properties = sourceType.getApparentProperties();

    // Get the keys to omit
    const omitKeys = new Set<string>();
    if (keysToOmit.isUnion()) {
      // Multiple keys to omit
      keysToOmit.getUnionTypes().forEach((keyType) => {
        if (keyType.isStringLiteral()) {
          omitKeys.add(keyType.getLiteralValue() as string);
        }
      });
    } else if (keysToOmit.isStringLiteral()) {
      // Single key to omit
      omitKeys.add(keysToOmit.getLiteralValue() as string);
    }

    // Process as object but skip omitted properties
    const propertyDefinitions: string[] = [];

    for (const prop of properties) {
      const propName = prop.getName();

      // Skip if this property should be omitted
      if (omitKeys.has(propName)) {
        continue;
      }

      // Skip symbol properties and invalid names
      if (
        propName.startsWith("__") ||
        !propName.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/)
      ) {
        continue;
      }

      try {
        // Use better property type resolution
        const propDeclaration =
          prop.getValueDeclaration() ?? prop.getDeclarations()[0];
        if (!propDeclaration) {
          propertyDefinitions.push(`  ${propName}: any;`);
          continue;
        }

        // Get the type at the property's location for better accuracy
        const propType = this.typeChecker.getTypeOfSymbolAtLocation(
          prop,
          propDeclaration,
        );

        // Check if property is optional
        const hasQuestionToken =
          propDeclaration &&
          "hasQuestionToken" in propDeclaration &&
          typeof (
            propDeclaration as unknown as { hasQuestionToken?: () => boolean }
          ).hasQuestionToken === "function" &&
          (
            propDeclaration as unknown as { hasQuestionToken: () => boolean }
          ).hasQuestionToken();

        // Check if the property is actually optional using symbol flags
        const propFlags = prop.getFlags();
        const isOptionalProperty = (propFlags & 16777216) !== 0; // ts.SymbolFlags.Optional

        // Check if the type includes undefined (e.g., string | undefined)
        const includesUndefined =
          propType.isUnion() &&
          propType.getUnionTypes().some((t) => t.isUndefined());

        const isOptional =
          hasQuestionToken || isOptionalProperty || includesUndefined;

        // Process the type
        const propTypeName = this.processType(
          propType,
          this.capitalizeTypeName(
            `${typeName}${propName.charAt(0).toUpperCase() + propName.slice(1)}`,
          ),
          depth + 1,
          isOptional && includesUndefined, // Pass flag to strip undefined
        );

        // Get JSDoc comments from the property
        let jsDocComment = "";
        if (propDeclaration) {
          const jsDocNodes =
            (
              "getJsDocs" in propDeclaration &&
              typeof (
                propDeclaration as unknown as { getJsDocs?: () => unknown[] }
              ).getJsDocs === "function"
            ) ?
              (
                propDeclaration as unknown as { getJsDocs: () => unknown[] }
              ).getJsDocs()
            : [];
          if (jsDocNodes.length > 0) {
            const comment = jsDocNodes[0].getComment();
            if (comment) {
              const commentText =
                typeof comment === "string" ? comment : (
                  comment.map((c) => c.getText()).join("")
                );
              jsDocComment = `\n  /**\n   * ${commentText.replace(/\n/g, "\n   * ")}\n   */`;
            }
          }
        }

        propertyDefinitions.push(
          `${jsDocComment}\n  ${propName}${isOptional ? "?" : ""}: ${propTypeName};`,
        );
      } catch (error) {
        // If we can't process a property, skip it or use any
        if (process.env.DEBUG) {
          console.error(`Error processing property ${propName}:`, error);
        }
        propertyDefinitions.push(`  ${propName}: any;`);
      }
    }

    if (propertyDefinitions.length === 0) {
      return "Record<string, any>";
    }

    return `{\n${propertyDefinitions.join("\n")}\n}`;
  }

  // Special method to build the EmittableItemRecipe union for emitter.emits
  private buildEmittableItemUnion(_depth: number): string {
    // Get the list of emittable item types (FreeItemTypes | "firedDoughnut")
    const emittableItemTypes = [...freeItemTypes, "firedDoughnut"] as const;

    // Build the union of emittable items (without position)
    const unionParts: string[] = [];

    for (const itemType of emittableItemTypes) {
      const config = this.getConfigForItemType(itemType);
      // Skip items that have no meaningful config
      if (
        config === "Record<string, never>" ||
        config === "Record<string, any>"
      ) {
        unionParts.push(`{
  type: "${itemType}";
  config: ${config};
}`);
      } else {
        unionParts.push(`{
  type: "${itemType}";
  config: ${config};
}`);
      }
    }

    return unionParts.join(" | ");
  }

  // Helper to get the config type for each item type
  private getConfigForItemType(itemType: string): string {
    // Try to find the actual config type from ItemConfigMap
    const sourceFiles = this.getProject().getSourceFiles();
    for (const sourceFile of sourceFiles) {
      const filePath = sourceFile.getFilePath();
      if (filePath.includes("ItemConfigMap")) {
        // Look for ItemConfigMap type
        const itemConfigMap = sourceFile.getTypeAlias("ItemConfigMap");
        if (itemConfigMap) {
          // Try to get the property for this item type
          const typeNode = itemConfigMap.getTypeNode();
          if (typeNode) {
            const type = this.typeChecker.getTypeAtLocation(typeNode);
            const prop = type.getProperty(itemType);
            if (prop) {
              const propType = this.typeChecker.getTypeOfSymbolAtLocation(
                prop,
                itemConfigMap,
              );
              return this.processType(propType, `${itemType}Config`, 0);
            }
          }
        }
      }
    }

    // Fallback to simplified configs for known types
    switch (itemType) {
      case "door":
        return `{

  toRoom: string;

  direction: "left" | "right" | "towards" | "away";
}`;
      case "wall":
        return `{

  direction: "left" | "right" | "towards" | "away";

  tiles?: string[];
}`;
      case "conveyor":
        return `{

  times?: {

  x?: number;

  y?: number;

  z?: number;
};

  direction: "left" | "right" | "towards" | "away";

  disappearing?: {

  on: "stand";
};
}`;
      case "block":
        return `{

  times?: {

  x?: number;

  y?: number;

  z?: number;
};

  style: "artificial" | "organic" | "tower" | "book";

  disappearing?: {

  on: "stand";
};
}`;
      case "teleporter":
        return `{

  toRoom: string;

  toPosition: {

  x: number;

  y: number;

  z: number;
};

  direction?: "left" | "right" | "towards" | "away";
}`;
      case "barrier":
        return `{

  direction: "left" | "right" | "towards" | "away";

  disappearing?: boolean;

  keyholeFor?: string[];
}`;
      case "pickup":
        return `{

  gives: string;
}`;
      case "switch":
        return `{

  controls: string[];

  style: string;

  type: "toggle" | "multiuse";
}`;
      case "lift":
        return `{

  bottom: number;

  top: number;

  position?: "top" | "bottom";
}`;
      default:
        // For types with no config or unknown types
        return "Record<string, never>";
    }
  }
}

export async function flattenTypes(
  project: Project,
  sourceFilePath: string,
  typeName: string,
  outputTypeName: string,
): Promise<string> {
  // Get type checker
  const typeChecker = project.getTypeChecker();

  // Create the flattener instance
  const flattener = new TypeFlattener(typeChecker, project, sourceFilePath);

  // Get the source file and type to flatten
  const sourceFile = project.getSourceFileOrThrow(sourceFilePath);

  const typeAlias = sourceFile.getTypeAliasOrThrow(typeName);
  const typeNode = typeAlias.getTypeNode();

  if (!typeNode) {
    throw new Error(`Could not get type node for ${typeName}`);
  }

  // Get the resolved type - this should expand the generics
  const resolvedType = typeChecker.getTypeAtLocation(typeNode);

  // Process the main type
  const mainTypeDefinition = flattener.processType(
    resolvedType,
    outputTypeName,
    0,
  );

  // Normalize the type definition for consistent formatting
  const normalizedType = await normalizeTypeOutput(mainTypeDefinition);

  // No longer output separate type definitions since everything is inlined

  // Output the main type with the new name (this will be the only export)
  return `// Auto-generated flattened types
// Generated from ${typeName}

// Type aliases for generic parameters that appear in the output
type RoomItemId = string;

export type ${outputTypeName} = ${normalizedType};`;
}

// Only run if this is the main module
if (
  process.argv[1] &&
  import.meta.url.endsWith(path.basename(process.argv[1]))
) {
  const program = new Command();

  program
    .name("flatten-type")
    .description("Flatten TypeScript types for JSON schema generation")
    .version("1.0.0")
    .requiredOption(
      "-f, --file <path>",
      "Path to TypeScript file containing the type",
    )
    .requiredOption("-t, --type <name>", "Name of the type to flatten")
    .option(
      "-o, --output-type <name>",
      "Name for the output type",
      "FlattenedType",
    )
    .option(
      "-p, --tsconfig <path>",
      "Path to tsconfig.json",
      path.resolve(__dirname, "../../tsconfig.app.json"),
    )
    .parse(process.argv);

  const options = program.opts();

  // Create project
  const project = new Project({
    tsConfigFilePath: options.tsconfig,
  });

  // Resolve the file path
  const filePath = path.resolve(process.cwd(), options.file);

  // Add only the specified file to the project
  project.addSourceFileAtPath(filePath);

  // Run the flattening
  flattenTypes(project, filePath, options.type, options.outputType)
    .then((result) => {
      console.log(result); // eslint-disable-line no-console
    })
    .catch((error) => {
      console.error("Error flattening types:", error);
      process.exit(1);
    });
}
