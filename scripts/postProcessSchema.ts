#!/usr/bin/env -S pnpm tsx

import { wallTiles } from "../src/sprites/planets.js";

// Read from stdin
let input = "";
process.stdin.setEncoding("utf8");

process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  try {
    // Parse the JSON
    const schema = JSON.parse(input) as Record<string, unknown>;

    // Function to recursively find and modify position and times properties
    const addMultipleOf = (obj: unknown, path: string[] = []): void => {
      if (typeof obj !== "object" || obj === null) return;

      const record = obj as Record<string, unknown>;

      // Check if we're at a position object with x, y, z properties
      const currentPath = path.join(".");
      if (
        currentPath.endsWith("properties.position") &&
        record.properties &&
        typeof record.properties === "object"
      ) {
        const props = record.properties as Record<string, unknown>;

        // Add multipleOf to x and y (0.5)
        if (props.x && typeof props.x === "object") {
          (props.x as Record<string, unknown>).multipleOf = 0.5;
        }
        if (props.y && typeof props.y === "object") {
          (props.y as Record<string, unknown>).multipleOf = 0.5;
        }
        // Add multipleOf to z (1)
        if (props.z && typeof props.z === "object") {
          (props.z as Record<string, unknown>).multipleOf = 1;
        }
      }

      // Check if we're at a times object with x, y, z properties
      if (
        currentPath.endsWith("properties.times") &&
        record.properties &&
        typeof record.properties === "object"
      ) {
        const props = record.properties as Record<string, unknown>;

        // Add multipleOf and minimum to x, y, and z (all integers with minimum 1)
        if (props.x && typeof props.x === "object") {
          const xProp = props.x as Record<string, unknown>;
          xProp.multipleOf = 1;
          xProp.minimum = 1;
        }
        if (props.y && typeof props.y === "object") {
          const yProp = props.y as Record<string, unknown>;
          yProp.multipleOf = 1;
          yProp.minimum = 1;
        }
        if (props.z && typeof props.z === "object") {
          const zProp = props.z as Record<string, unknown>;
          zProp.multipleOf = 1;
          zProp.minimum = 1;
        }
      }

      // Recursively process all properties
      for (const key in record) {
        if (Object.prototype.hasOwnProperty.call(record, key)) {
          addMultipleOf(record[key], [...path, key]);
        }
      }
    };

    // Apply the modifications
    addMultipleOf(schema);

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
            properties: {
              items: {
                additionalProperties: {
                  if: {
                    properties: {
                      type: { const: "wall" },
                    },
                  },
                  then: {
                    properties: {
                      config: {
                        properties: {
                          tiles: {
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
