import * as fs from "fs";
import * as path from "path";
import { Project } from "ts-morph";
import { fileURLToPath } from "url";

import { flattenTypes } from "../flattenType.js";
import { normalizeTypeOutput } from "../normalizeTypeOutput.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to run the flattening script on a fixture file
export async function flattenFixture(
  fixtureName: string,
  typeName: string,
): Promise<string> {
  const fixturePath = path.join(__dirname, `${fixtureName}.ts`);

  // Create a temporary file to capture output
  const tempFile = path.join(__dirname, `temp-${Date.now()}.ts`);

  try {
    const testProject = new Project({
      tsConfigFilePath: path.resolve(__dirname, "../../../tsconfig.app.json"),
    });

    // Add only the fixture file
    testProject.addSourceFileAtPath(fixturePath);

    if (
      fixturePath.includes("empty") ||
      fixturePath.includes("itemConfig") ||
      fixturePath.includes("realWorld") ||
      fixturePath.includes("mapped") ||
      fixturePath.includes("conditional") ||
      fixturePath.includes("requireAtLeastOne") ||
      fixturePath.includes("nonEmptyRecord")
    ) {
      testProject.addSourceFilesAtPaths("node_modules/type-fest/**/*.d.ts");
    }

    // Also add our custom type utilities
    if (
      fixturePath.includes("requireAtLeastOne") ||
      fixturePath.includes("nonEmptyRecord")
    ) {
      testProject.addSourceFileAtPath("src/utils/types/NonEmptyRecord.ts");
    }

    const fullOutput = await flattenTypes(
      testProject,
      fixturePath,
      typeName,
      typeName,
    );

    // Debug output for failing tests
    if (!fullOutput.includes(`export type ${typeName}`)) {
      throw new Error(`Type ${typeName} not found in output:\n${fullOutput}`);
    }

    // Handle multi-line type definitions
    const typeStartRegex = new RegExp(`export type ${typeName} = `);
    const startIndex = fullOutput.search(typeStartRegex);

    if (startIndex === -1) {
      // Type not found, return undefined or empty
      return "undefined";
    }

    // Find the end of the type definition (look for semicolon at end of line)
    const afterTypeStart = fullOutput.substring(
      startIndex + `export type ${typeName} = `.length,
    );

    // For simple types that end with semicolon on same line
    const simpleMatch = afterTypeStart.match(/^([^;\n]+);/);
    if (simpleMatch) {
      // Normalize the result using prettier and remove blank lines
      const normalized = await normalizeTypeOutput(simpleMatch[1]);
      return normalized;
    }

    // For complex multi-line types, we need to find the matching closing brace/bracket
    let depth = 0;
    let inString = false;
    let stringChar = "";
    let result = "";

    for (let i = 0; i < afterTypeStart.length; i++) {
      const char = afterTypeStart[i];
      const prevChar = i > 0 ? afterTypeStart[i - 1] : "";

      // Handle string literals
      if ((char === '"' || char === "'") && prevChar !== "\\") {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
        }
      }

      if (!inString) {
        if (char === "{" || char === "[" || char === "(") depth++;
        if (char === "}" || char === "]" || char === ")") depth--;

        // Found the end
        if (depth === 0 && char === ";") {
          // Normalize the result using prettier and remove blank lines
          const normalized = await normalizeTypeOutput(result.trim());
          return normalized;
        }
      }

      if (char !== ";" || depth > 0 || inString) {
        result += char;
      }
    }

    // Normalize the result using prettier and remove blank lines
    const normalized = await normalizeTypeOutput(result.trim());
    return normalized;
  } finally {
    // Clean up temp file if it exists
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  }
}
