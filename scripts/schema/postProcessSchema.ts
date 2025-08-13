#!/usr/bin/env -S pnpm tsx

import type { JsonArray, JsonObject, JsonValue } from "type-fest";
import { wallTiles } from "../../src/sprites/planets.js";

// Read from stdin
let input = "";
process.stdin.setEncoding("utf8");

process.stdin.on("data", (chunk) => {
  input += chunk;
});

function assertIsJsonObject(val: JsonValue): asserts val is JsonObject {
  if (!(typeof val === "object" && val !== null && !Array.isArray(val))) {
    throw new Error("Expected a JSON object");
  }
}
function isJsonObjectOrArray(val: JsonValue): val is JsonObject | JsonArray {
  return typeof val === "object" && val !== null;
}
function isJsonObject(val: JsonValue): val is JsonObject {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

process.stdin.on("end", () => {
  try {
    const schema = JSON.parse(input) as JsonObject;

    // recursively add validation beyond what the typescript we converted from can handle:
    const addExtraValidation = (
      node: JsonObject | JsonArray,
      path: string[] = [],
    ): void => {
      // Check if we're at a position object with x, y, z properties
      if (isJsonObject(node)) {
        const currentPath = path.join(".");
        if (currentPath.endsWith("properties.position")) {
          assertIsJsonObject(node.properties);

          // Add multipleOf to x and y (0.5)
          if (node.properties.x) {
            assertIsJsonObject(node.properties.x);
            node.properties.x.multipleOf = 0.125;
            node.properties.x.minimum = -30;
            node.properties.x.maximum = 30;
          }
          if (node.properties.y) {
            assertIsJsonObject(node.properties.y);
            node.properties.y.multipleOf = 0.125;
            node.properties.y.minimum = -30;
            node.properties.y.maximum = 30;
          }
          // Add multipleOf to z (1)
          if (node.properties.z) {
            assertIsJsonObject(node.properties.z);
            node.properties.z.multipleOf = 1;
            node.properties.z.minimum = -30;
            node.properties.z.maximum = 30;
          }
        }

        // Check if we're at a times object with x, y, z properties
        if (currentPath.endsWith("properties.times")) {
          assertIsJsonObject(node.properties);

          // Add multipleOf and minimum to x, y, and z (all integers with minimum 1)
          if (node.properties.x) {
            assertIsJsonObject(node.properties.x);
            node.properties.x.multipleOf = 1;
            node.properties.x.minimum = 1;
            node.properties.x.maximum = 20;
          }
          if (node.properties.y) {
            assertIsJsonObject(node.properties.y);
            node.properties.y.multipleOf = 1;
            node.properties.y.minimum = 1;
            node.properties.y.maximum = 20;
          }
          if (node.properties.z) {
            assertIsJsonObject(node.properties.z);
            node.properties.z.multipleOf = 1;
            node.properties.z.minimum = 1;
            node.properties.z.maximum = 20;
          }
        }

        // Check if we're at a subRooms object - enforce at least one property
        // this avoids crashes in the editor where it thinks there are sub-rooms
        // but zero are defined
        if (currentPath.endsWith("properties.subRooms")) {
          node.minProperties = 1;
        }
      }

      // Recursively process child properties
      for (const [key, childNode] of Object.entries(node)) {
        if (isJsonObjectOrArray(childNode)) {
          addExtraValidation(childNode, [...path, key]);
        }
      }
    };

    // Apply the modifications
    addExtraValidation(schema);

    // Generate conditional wall tile validation rules
    const generateWallTileConditions = () => {
      const planets = Object.keys(wallTiles);

      // Build nested if/then/else structure
      const buildConditions = (
        planetIndex: number,
      ): Record<string, unknown> => {
        if (planetIndex >= planets.length) {
          return {}; // No more conditions
        }

        const planet = planets[planetIndex];
        const tiles = wallTiles[planet as keyof typeof wallTiles];

        const condition: Record<string, unknown> = {
          if: {
            properties: {
              planet: { const: planet },
            },
          },
          then: {
            type: "object",
            properties: {
              items: {
                type: "object",
                additionalProperties: {
                  if: {
                    type: "object",
                    properties: {
                      type: { const: "wall" },
                    },
                  },
                  then: {
                    type: "object",
                    properties: {
                      config: {
                        type: "object",
                        properties: {
                          tiles: {
                            type: "array",
                            items: {
                              enum: tiles,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        };

        // Add the next condition as else
        const nextCondition = buildConditions(planetIndex + 1);
        if (Object.keys(nextCondition).length > 0) {
          condition.else = nextCondition;
        }

        return condition;
      };

      return buildConditions(0);
    };

    // Add conditional rules to RoomJsonSchema
    const definitions = schema.definitions as Record<string, unknown>;
    if (definitions && definitions.RoomJsonSchema) {
      const roomSchema = definitions.RoomJsonSchema as Record<string, unknown>;
      const conditions = generateWallTileConditions();

      // Merge the conditions into the schema
      Object.assign(roomSchema, conditions);
    }

    // Output the modified JSON
    process.stdout.write(JSON.stringify(schema, null, 2));
  } catch (error) {
    console.error("Error processing schema:", error);
    process.exit(1);
  }
});
