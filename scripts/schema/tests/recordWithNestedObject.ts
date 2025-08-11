/* eslint-disable @typescript-eslint/no-unused-vars */

// Test fixture for Record types with nested object values
// This would have been simplified to Record<string, any> before the fix

type Coordinate = {
  x: number;
  y: number;
};

type NestedStructure = {
  /**
   * the position in the grid
   */
  gridPosition: Coordinate;
  /**
   * physical bounds of the area
   */
  physicalBounds: {
    from: Coordinate;
    to: Coordinate;
  };
};

// This is similar to the SubRooms type that was failing
type NestedRecordType = Record<string, NestedStructure>;

// Also test a directly defined Record with inline nested object
type InlineNestedRecord = Record<
  string,
  {
    /**
     * primary location
     */
    location: {
      x: number;
      y: number;
    };
    /**
     * metadata about the item
     */
    metadata: {
      name: string;
      tags: string[];
      config: {
        enabled: boolean;
        value: number;
      };
    };
  }
>;
