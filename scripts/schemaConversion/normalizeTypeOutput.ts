import * as prettier from "prettier";

// Helper to normalize TypeScript type output for consistent comparison

export async function normalizeTypeOutput(typeString: string): Promise<string> {
  // For simple types that are not objects/arrays, just return as-is
  if (
    !typeString.includes("{") &&
    !typeString.includes("[") &&
    !typeString.includes("|")
  ) {
    return typeString.trim();
  }

  // Format with prettier using TypeScript parser
  // Wrap in a type declaration to make it valid TypeScript
  const wrappedType = `type T = ${typeString};`;
  const formatted = await prettier.format(wrappedType, {
    parser: "typescript",
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "all",
    bracketSpacing: true,
  });

  // Extract just the type definition (remove "type T = " and the final semicolon)
  const typeMatch = formatted.match(/^type\s+T\s*=\s*(.+);?\s*$/s);
  if (!typeMatch) {
    return typeString.trim();
  }

  let extracted = typeMatch[1].trim();
  // Remove trailing semicolon if present
  if (extracted.endsWith(";")) {
    extracted = extracted.slice(0, -1).trim();
  }

  // Remove blank lines using regex
  const withoutBlankLines = extracted
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n");

  return withoutBlankLines.trim();
}
