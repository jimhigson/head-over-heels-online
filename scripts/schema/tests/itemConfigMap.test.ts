import { describe, it, expect } from "vitest";
import { Project } from "ts-morph";
import { flattenFixture } from "./testHelper.js";
import { timeout } from "./timeout.js";

// This test file specifically tests the ItemConfigMap pattern used in the project

function createTestProject(sourceCode: string) {
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      strict: true,
      target: 2, // ES2015
      module: 1, // CommonJS
      lib: ["lib.es2020.d.ts"],
    },
  });

  project.createSourceFile("test.ts", sourceCode);
  return project;
}

describe("ItemConfigMap Pattern", { timeout }, () => {
  it(
    "should handle the ItemConfigMap indexed access pattern",
    { timeout },
    () => {
      const project = createTestProject(`
      // Simplified version of the actual ItemConfigMap
      type ItemConfigMap<RoomId extends string> = {
        door: {
          toRoom: RoomId;
          direction: "left" | "right" | "up" | "down";
        };
        wall: {
          direction: "left" | "right" | "up" | "down";
          tiles?: string[];
        };
        conveyor: {
          direction: "left" | "right" | "up" | "down";
          disappearing?: { on: "stand" };
        };
        block: {} | Record<string, never>; // Empty object
      };

      // This is the pattern that causes issues
      type ItemConfig<T extends keyof ItemConfigMap<string>> = ItemConfigMap<string>[T];
      
      // These should resolve to the specific configs
      type DoorConfig = ItemConfig<"door">;
      type WallConfig = ItemConfig<"wall">;
      type ConveyorConfig = ItemConfig<"conveyor">;
      type BlockConfig = ItemConfig<"block">;
    `);

      const typeChecker = project.getTypeChecker();
      const sourceFile = project.getSourceFileOrThrow("test.ts");

      // Test door config
      const doorType = sourceFile.getTypeAliasOrThrow("DoorConfig");
      const doorTypeNode = doorType.getTypeNode()!;
      const doorResolvedType = typeChecker.getTypeAtLocation(doorTypeNode);
      expect(doorResolvedType.getText()).toContain("toRoom");
      expect(doorResolvedType.getText()).toContain("direction");

      // Test conveyor config
      const conveyorType = sourceFile.getTypeAliasOrThrow("ConveyorConfig");
      const conveyorTypeNode = conveyorType.getTypeNode()!;
      const conveyorResolvedType =
        typeChecker.getTypeAtLocation(conveyorTypeNode);
      expect(conveyorResolvedType.getText()).toContain("direction");
      expect(conveyorResolvedType.getText()).toContain("disappearing");
    },
  );

  it("should handle conditional types in ItemConfigMap", { timeout }, () => {
    const project = createTestProject(`
      type EmptyObject = {};
      
      // Pattern similar to JsonItemConfig
      type JsonItemConfig<T extends string> = 
        T extends "door" ? { toRoom: string; direction: string } :
        T extends "wall" ? { tiles: string[] } :
        T extends "conveyor" ? { direction: string; speed?: number } :
        EmptyObject;
      
      type DoorConfig = JsonItemConfig<"door">;
      type ConveyorConfig = JsonItemConfig<"conveyor">;
      type UnknownConfig = JsonItemConfig<"unknown">;
    `);

    const typeChecker = project.getTypeChecker();
    const sourceFile = project.getSourceFileOrThrow("test.ts");

    // Door should have toRoom and direction
    const doorType = sourceFile.getTypeAliasOrThrow("DoorConfig");
    const doorResolvedType = typeChecker.getTypeAtLocation(
      doorType.getTypeNode()!,
    );
    const doorText = doorResolvedType.getText();
    expect(doorText).toContain("toRoom");
    expect(doorText).toContain("direction");

    // Unknown should be EmptyObject
    const unknownType = sourceFile.getTypeAliasOrThrow("UnknownConfig");
    const unknownResolvedType = typeChecker.getTypeAtLocation(
      unknownType.getTypeNode()!,
    );
    const unknownProperties = unknownResolvedType.getProperties();
    expect(unknownProperties.length).toBe(0);
  });

  it("should handle the JsonItemUnion mapped type pattern", { timeout }, () => {
    const project = createTestProject(`
      type ItemTypes = "door" | "wall" | "conveyor";
      
      type ItemConfigMap = {
        door: { toRoom: string; direction: string };
        wall: { tiles: string[] };
        conveyor: { direction: string; speed: number };
      };
      
      // Simplified version of JsonItem
      type JsonItem<T extends ItemTypes> = {
        type: T;
        position: { x: number; y: number };
        config: ItemConfigMap[T];
      };
      
      // The mapped type pattern used in JsonItemUnion
      type JsonItemUnion = {
        [K in ItemTypes]: JsonItem<K>
      }[ItemTypes];
      
      // This should be a union of all three item types
      type TestUnion = JsonItemUnion;
    `);

    const typeChecker = project.getTypeChecker();
    const sourceFile = project.getSourceFileOrThrow("test.ts");

    const unionType = sourceFile.getTypeAliasOrThrow("TestUnion");
    const resolvedType = typeChecker.getTypeAtLocation(
      unionType.getTypeNode()!,
    );

    // Should be a union type
    expect(resolvedType.isUnion()).toBe(true);

    if (resolvedType.isUnion()) {
      const unionTypes = resolvedType.getUnionTypes();
      expect(unionTypes.length).toBe(3); // door, wall, conveyor

      // Each union member should have type, position, and config
      unionTypes.forEach((memberType) => {
        const props = memberType.getProperties();
        const propNames = props.map((p) => p.getName());
        expect(propNames).toContain("type");
        expect(propNames).toContain("position");
        expect(propNames).toContain("config");
      });
    }
  });

  it(
    "should handle NoInfer wrapper in complex types",
    { timeout },
    async () => {
      // This test is now covered by noInferComplex fixture
      // With our fix, Record types now properly expand their nested object structure
      const result = await flattenFixture("noInferComplex", "TestType");

      // Check that it's a Record type with expanded nested structure
      expect(result).toContain("Record<");
      expect(result).toContain("string");
      expect(result).not.toContain("NoInfer");

      // Verify the nested structure is expanded
      expect(result).toContain("type: string");
      expect(result).toContain("config: any");
    },
  );

  it(
    "should handle intersection types with ConsolidatableConfig",
    { timeout },
    () => {
      const project = createTestProject(`
      type ConsolidatableConfig = {
        times?: { x?: number; y?: number; z?: number };
      };
      
      type ConveyorConfig = ConsolidatableConfig & {
        direction: "left" | "right" | "up" | "down";
        disappearing?: { on: "stand" };
      };
      
      type TestConfig = ConveyorConfig;
    `);

      const typeChecker = project.getTypeChecker();
      const sourceFile = project.getSourceFileOrThrow("test.ts");

      const testType = sourceFile.getTypeAliasOrThrow("TestConfig");
      const resolvedType = typeChecker.getTypeAtLocation(
        testType.getTypeNode()!,
      );

      // Should have properties from both types
      const properties = resolvedType.getProperties();
      const propNames = properties.map((p) => p.getName());
      expect(propNames).toContain("times");
      expect(propNames).toContain("direction");
      expect(propNames).toContain("disappearing");
    },
  );

  it("should handle generic constraints in ItemConfigMap", { timeout }, () => {
    const project = createTestProject(`
      type ItemConfigMap<
        RoomId extends string,
        RoomItemId extends string
      > = {
        door: {
          toRoom: RoomId;
          direction: string;
        };
        switch: {
          controls: RoomItemId[];
          type: "local" | "global";
        };
      };
      
      // With specific type parameters
      type SpecificConfig = ItemConfigMap<"room1" | "room2", "item1" | "item2">;
      type DoorConfig = SpecificConfig["door"];
      type SwitchConfig = SpecificConfig["switch"];
    `);

    const typeChecker = project.getTypeChecker();
    const sourceFile = project.getSourceFileOrThrow("test.ts");

    // Check door config
    const doorType = sourceFile.getTypeAliasOrThrow("DoorConfig");
    const doorResolvedType = typeChecker.getTypeAtLocation(
      doorType.getTypeNode()!,
    );
    const doorText = doorResolvedType.getText();
    expect(doorText).toContain("toRoom");

    // Check switch config
    const switchType = sourceFile.getTypeAliasOrThrow("SwitchConfig");
    const switchResolvedType = typeChecker.getTypeAtLocation(
      switchType.getTypeNode()!,
    );
    const switchText = switchResolvedType.getText();
    expect(switchText).toContain("controls");
    expect(switchText).toContain("type");
  });
});
